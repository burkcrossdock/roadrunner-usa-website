import { deliverInquiry, rateLimit } from "@/lib/deliver";
import { validateForm } from "@/lib/forms";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, errors: { form: "Send the form again." } },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return Response.json(
      { ok: false, errors: { form: "Send the form again." } },
      { status: 400 },
    );
  }

  const payload = body as { kind?: unknown; fields?: unknown; website?: unknown };
  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (!rateLimit(ip)) {
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

  const result = validateForm(payload.kind, payload.fields);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  try {
    const delivery = await deliverInquiry(result.kind, result.fields);
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
