import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { site } from "@/config/site";
import {
  type FormKind,
  inquirySubject,
  inquiryText,
} from "@/lib/forms";

export type DeliveryReport = {
  id: string;
  stored: boolean;
  emailed: boolean;
  webhook: boolean;
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
  const dir = submissionsDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${record.id}.json`), JSON.stringify(record, null, 2), "utf8");
}

function safeAddress(value: string | undefined) {
  if (!value) return undefined;
  const cleaned = value.replace(/[\r\n]/g, "").trim();
  return cleaned.includes("@") ? cleaned : undefined;
}

async function sendSmtp(subject: string, text: string, replyTo?: string) {
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
  });
  return true;
}

async function sendResend(subject: string, text: string, replyTo?: string) {
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

export async function deliverInquiry(
  kind: FormKind,
  fields: Record<string, string>,
): Promise<DeliveryReport> {
  warnIfUnconfigured();
  const id = randomUUID();
  const record = {
    id,
    kind,
    createdAt: new Date().toISOString(),
    fields,
    to: recipient(),
  };
  const subject = inquirySubject(kind, fields).replace(/[\r\n]/g, " ");
  const text = inquiryText(kind, fields);
  const replyTo = safeAddress(fields.email);

  let stored = false;
  let emailed = false;
  let webhook = false;
  const failures: string[] = [];

  try {
    await storeSubmission(record);
    stored = true;
  } catch (error) {
    failures.push(error instanceof Error ? error.message : "Could not store the submission.");
  }

  if (process.env.SMTP_HOST) {
    try {
      emailed = await sendSmtp(subject, text, replyTo);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : "SMTP send failed.");
    }
  } else if (process.env.RESEND_API_KEY) {
    try {
      emailed = await sendResend(subject, text, replyTo);
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
    throw new Error(failures.join(" ") || "No delivery channel succeeded.");
  }

  if (failures.length) {
    console.error(`[inquiries] Partial delivery for ${id}: ${failures.join(" | ")}`);
  }

  return { id, stored, emailed, webhook };
}
