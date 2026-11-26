import { deliverInquiry, rateLimit, type InquiryAttachment } from "@/lib/deliver";
import {
  CDL_MAX_BYTES,
  cdlContentType,
  cdlFileError,
  safeCdlFilename,
  validateForm,
  type FormKind,
} from "@/lib/forms";

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function tooMany() {
  return Response.json(
    {
      ok: false,
      errors: {
        form: "Too many requests just now. Call the office or wait a few minutes.",
      },
    },
    { status: 429 },
  );
}

function invalidBody() {
  return Response.json(
    { ok: false, errors: { form: "Send the form again." } },
    { status: 400 },
  );
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("multipart/form-data")) {
    return postMultipart(request);
  }
  return postJson(request);
}

async function postJson(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalidBody();
  }

  if (!body || typeof body !== "object") return invalidBody();

  const payload = body as { kind?: unknown; fields?: unknown; website?: unknown };
  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  if (!rateLimit(clientIp(request))) return tooMany();

  const result = validateForm(payload.kind, payload.fields);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  if (result.kind === "career") {
    return Response.json(
      { ok: false, errors: { cdl: "Add a copy of your CDL." } },
      { status: 400 },
    );
  }

  return finish(result.kind, result.fields);
}

async function postMultipart(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > CDL_MAX_BYTES + 256 * 1024) {
    return Response.json(
      { ok: false, errors: { cdl: "That file is over 25MB. Choose a smaller copy." } },
      { status: 413 },
    );
  }

  if (!rateLimit(clientIp(request))) return tooMany();

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return invalidBody();
  }

  const website = form.get("website");
  if (typeof website === "string" && website.trim()) {
    return Response.json({ ok: true });
  }

  const fieldsRaw = form.get("fields");
  let fields: unknown = {};
  if (typeof fieldsRaw === "string") {
    try {
      fields = JSON.parse(fieldsRaw);
    } catch {
      fields = {};
    }
  }

  const result = validateForm(form.get("kind"), fields);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const upload = form.get("cdl");
  if (result.kind !== "career") {
    return finish(result.kind, result.fields);
  }

  if (!(upload instanceof File)) {
    return Response.json(
      { ok: false, errors: { cdl: "Add a copy of your CDL." } },
      { status: 400 },
    );
  }

  const fileError = cdlFileError({ name: upload.name, size: upload.size, type: upload.type });
  if (fileError) {
    return Response.json({ ok: false, errors: { cdl: fileError } }, { status: 400 });
  }

  const data = Buffer.from(await upload.arrayBuffer());
  if (data.byteLength > CDL_MAX_BYTES) {
    return Response.json(
      { ok: false, errors: { cdl: "That file is over 25MB. Choose a smaller copy." } },
      { status: 413 },
    );
  }

  const filename = safeCdlFilename(upload.name);
  const attachment: InquiryAttachment = {
    filename,
    contentType: cdlContentType(filename, upload.type),
    data,
  };

  return finish(result.kind, result.fields, attachment);
}

async function finish(
  kind: FormKind,
  fields: Record<string, string>,
  attachment?: InquiryAttachment,
) {
  try {
    const delivery = await deliverInquiry(kind, fields, attachment);
    return Response.json({ ok: true, id: delivery.id });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        ok: false,
        errors: {
          form: "We could not save that request. Call (413) 539-7319 or email info@rdrunnerusa.com.",
        },
      },
      { status: 500 },
    );
  }
}
