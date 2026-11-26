import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import nodemailer from "nodemailer";
import { site } from "@/config/site";
import {
  type FormKind,
  inquirySubject,
  inquiryText,
  safeCdlFilename,
} from "@/lib/forms";

export type DeliveryReport = {
  id: string;
  stored: boolean;
  emailed: boolean;
  webhook: boolean;
};

export type InquiryAttachment = {
  filename: string;
  contentType: string;
  data: Buffer;
};

const hits = new Map<string, number[]>();
let warned = false;

function submissionsDir() {
  return process.env.SUBMISSIONS_DIR || path.join(process.cwd(), "data", "submissions");
}

function recipient() {
  return process.env.FORM_TO_EMAIL || site.email;
}

export function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < 10 * 60 * 1000);
  if (recent.length >= 8) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function warnIfUnconfigured() {
  if (warned) return;
  warned = true;
  const configured = Boolean(
    (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ||
      process.env.RESEND_API_KEY ||
      process.env.FORM_WEBHOOK_URL,
  );
  if (!configured) {
    console.warn(
      "[inquiries] No SMTP, Resend, or webhook is configured. Submissions are stored on disk only.",
    );
  }
}

async function storeSubmission(record: {
  id: string;
  kind: FormKind;
  createdAt: string;
  fields: Record<string, string>;
}) {
  const payload = JSON.stringify(record, null, 2);
  const directories = [
    submissionsDir(),
    path.join(tmpdir(), "roadrunner-usa-submissions"),
  ];
  const failures: string[] = [];

  for (const dir of directories) {
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, `${record.id}.json`), payload, "utf8");
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "write failed";
      failures.push(`${dir}: ${message}`);
    }
  }

  // Render's disk is ephemeral and can reject writes. Keep the process up and
  // leave the submission in the service logs instead of throwing.
  console.error(`[inquiries] Disk save failed for ${record.id}. ${failures.join(" | ")}`);
  console.log(`[inquiries] submission ${record.id} ${payload}`);
  return false;
}

function safeAddress(value: string | undefined) {
  if (!value) return undefined;
  const cleaned = value.replace(/[\r\n]/g, "").trim();
  return cleaned.includes("@") ? cleaned : undefined;
}

async function sendSmtp(
  subject: string,
  text: string,
  replyTo?: string,
  attachment?: InquiryAttachment,
) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to: recipient(),
    replyTo,
    subject,
    text,
    attachments: attachment
      ? [
          {
            filename: attachment.filename,
            content: attachment.data,
            contentType: attachment.contentType,
          },
        ]
      : undefined,
  });
  return true;
}

async function sendResend(
  subject: string,
  text: string,
  replyTo?: string,
  attachment?: InquiryAttachment,
) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "RoadRunner USA <onboarding@resend.dev>",
      to: [recipient()],
      reply_to: replyTo,
      subject,
      text,
      attachments: attachment
        ? [
            {
              filename: attachment.filename,
              content: attachment.data.toString("base64"),
            },
          ]
        : undefined,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend rejected the message (${response.status}): ${detail.slice(0, 300)}`);
  }
  return true;
}

async function sendWebhook(record: unknown) {
  const url = process.env.FORM_WEBHOOK_URL;
  if (!url) return false;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  if (!response.ok) {
    throw new Error(`Form webhook returned ${response.status}`);
  }
  return true;
}

async function storeAttachment(id: string, attachment: InquiryAttachment) {
  const filename = safeCdlFilename(attachment.filename);
  const directories = [submissionsDir(), path.join(tmpdir(), "roadrunner-usa-submissions")];
  const failures: string[] = [];

  for (const dir of directories) {
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, `${id}-${filename}`), attachment.data);
      return filename;
    } catch (error) {
      const message = error instanceof Error ? error.message : "write failed";
      failures.push(`${dir}: ${message}`);
    }
  }

  console.error(`[inquiries] CDL file save failed for ${id}. ${failures.join(" | ")}`);
  return null;
}

export async function deliverInquiry(
  kind: FormKind,
  fields: Record<string, string>,
  attachment?: InquiryAttachment,
): Promise<DeliveryReport> {
  warnIfUnconfigured();
  const id = randomUUID();
  const savedFile = attachment ? await storeAttachment(id, attachment) : null;
  const record = {
    id,
    kind,
    createdAt: new Date().toISOString(),
    fields,
    to: recipient(),
    cdlFile: savedFile,
  };
  const subject = inquirySubject(kind, fields).replace(/[\r\n]/g, " ");
  const text = attachment
    ? `${inquiryText(kind, fields)}\n\nCDL file attached: ${attachment.filename}`
    : inquiryText(kind, fields);
  const replyTo = safeAddress(fields.email);

  let stored = false;
  let emailed = false;
  let webhook = false;
  const failures: string[] = [];

  try {
    stored = await storeSubmission(record);
  } catch (error) {
    failures.push(error instanceof Error ? error.message : "Could not store the submission.");
    console.error(`[inquiries] submission ${record.id} ${JSON.stringify(record)}`);
  }

  if (process.env.SMTP_HOST) {
    try {
      emailed = await sendSmtp(subject, text, replyTo, attachment);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : "SMTP send failed.");
    }
  } else if (process.env.RESEND_API_KEY) {
    try {
      emailed = await sendResend(subject, text, replyTo, attachment);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : "Resend send failed.");
    }
  }

  if (process.env.FORM_WEBHOOK_URL) {
    try {
      webhook = await sendWebhook(record);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : "Webhook failed.");
    }
  }

  if (!stored && !emailed && !webhook) {
    console.error(
      `[inquiries] No email or webhook is configured and the disk copy did not stick for ${id}. The submission was written to the process log.`,
    );
  }

  if (failures.length) {
    console.error(`[inquiries] Partial delivery for ${id}: ${failures.join(" | ")}`);
  }

  if (attachment && !emailed) {
    throw new Error(
      `CDL file for ${id} was not emailed. Set SMTP_HOST, SMTP_USER, and SMTP_PASS, or RESEND_API_KEY.`,
    );
  }

  return { id, stored, emailed, webhook };
}
