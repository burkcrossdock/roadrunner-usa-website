export const formKinds = ["quote", "tracking", "career", "contact"] as const;

export type FormKind = (typeof formKinds)[number];

export type FieldType = "text" | "email" | "tel" | "date" | "textarea" | "number";

export type FieldSpec = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  span?: "half" | "full";
  help?: string;
};

export type FormSpec = {
  kind: FormKind;
  title: string;
  lede: string;
  submit: string;
  success: string;
  fields: FieldSpec[];
};

const quoteFields: FieldSpec[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    autoComplete: "name",
    placeholder: "Jordan Hale",
    maxLength: 120,
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    required: true,
    autoComplete: "organization",
    placeholder: "Company name",
    maxLength: 160,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    required: true,
    autoComplete: "tel",
    placeholder: "(555) 010-0142",
    maxLength: 30,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "you@company.com",
    maxLength: 160,
  },
  {
    name: "pickupCity",
    label: "Pickup city",
    type: "text",
    required: true,
    autoComplete: "address-level2",
    placeholder: "Ontario, CA",
    maxLength: 120,
  },
  {
    name: "deliveryCity",
    label: "Delivery city",
    type: "text",
    required: true,
    autoComplete: "address-level2",
    placeholder: "Dallas, TX",
    maxLength: 120,
  },
  {
    name: "shipDate",
    label: "Ship date",
    type: "date",
    required: true,
    span: "half",
  },
  {
    name: "freightDetails",
    label: "Freight details",
    type: "textarea",
    required: true,
    span: "full",
    placeholder: "Weight, piece count, commodity, and anything the driver needs to know.",
    maxLength: 4000,
    help: "A few sentences is enough. Include weight and what is shipping.",
  },
];

export const formSpecs: Record<FormKind, FormSpec> = {
  quote: {
    kind: "quote",
    title: "Request a freight quote",
    lede: "Send the lane, the date, and what is shipping.",
    submit: "Request a quote",
    success:
      "Quote request received. A dispatcher will follow up at the phone or email you listed.",
    fields: quoteFields,
  },
  tracking: {
    kind: "tracking",
    title: "Send your load number",
    lede: "Include your name and the best way to reach you.",
    submit: "Request update",
    success:
      "Request received. Dispatch will reply with a live tracking link or a current location update.",
    fields: [
      {
        name: "loadNumber",
        label: "Load number",
        type: "text",
        required: true,
        placeholder: "Load number from your rate confirmation",
        maxLength: 40,
        span: "full",
      },
      {
        name: "name",
        label: "Your name",
        type: "text",
        required: true,
        autoComplete: "name",
        placeholder: "Jordan Hale",
        maxLength: 120,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        autoComplete: "email",
        placeholder: "you@company.com",
        maxLength: 160,
        help: "Add an email or a phone number so dispatch can reply.",
      },
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        autoComplete: "tel",
        placeholder: "(555) 010-0142",
        maxLength: 30,
      },
    ],
  },
  career: {
    kind: "career",
    title: "Driver application",
    lede: "Dry van work on the Southern California–Dallas round trip. Tell us how to reach you and how long you have held a CDL.",
    submit: "Submit application",
    success:
      "Application received. The office will be in touch.",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        autoComplete: "name",
        placeholder: "Your name",
        maxLength: 120,
      },
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        required: true,
        autoComplete: "tel",
        placeholder: "(555) 010-0142",
        maxLength: 30,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        autoComplete: "email",
        placeholder: "you@email.com",
        maxLength: 160,
        span: "full",
      },
      {
        name: "cdlYears",
        label: "Years with a CDL",
        type: "number",
        required: true,
        min: 0,
        max: 60,
        placeholder: "5",
        span: "half",
      },
      {
        name: "licenseNumber",
        label: "Driver's license number",
        type: "text",
        required: true,
        autoComplete: "off",
        placeholder: "License number",
        maxLength: 40,
        span: "half",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        span: "full",
        placeholder: "Where you are based and the kind of driving you want.",
        maxLength: 4000,
      },
    ],
  },
  contact: {
    kind: "contact",
    title: "Write the office",
    lede: "Send a note to the office.",
    submit: "Send message",
    success:
      "Message received. The office will reply.",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        autoComplete: "name",
        placeholder: "Your name",
        maxLength: 120,
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        autoComplete: "organization",
        placeholder: "Company name",
        maxLength: 160,
      },
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        required: true,
        autoComplete: "tel",
        placeholder: "(555) 010-0142",
        maxLength: 30,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        autoComplete: "email",
        placeholder: "you@company.com",
        maxLength: 160,
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        span: "full",
        placeholder: "How can the office help?",
        maxLength: 4000,
      },
    ],
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CDL_MAX_BYTES = 25 * 1024 * 1024;

const CDL_EXTENSIONS = new Set(["jpg", "jpeg", "png", "heic", "heif", "pdf"]);

const CDL_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
  "application/pdf",
]);

export function cdlFileError(file: { name: string; size: number; type: string }) {
  if (file.size <= 0) return "That file is empty. Choose a JPG, PNG, HEIC, or PDF.";
  if (file.size > CDL_MAX_BYTES) return "That file is over 25MB. Choose a smaller copy.";
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const type = file.type.toLowerCase();
  const extensionOk = CDL_EXTENSIONS.has(extension);
  const typeOk = !type || type === "application/octet-stream" || CDL_MIME_TYPES.has(type);
  if (!extensionOk || !typeOk) return "Use a JPG, PNG, HEIC, or PDF.";
  return null;
}

export function safeCdlFilename(name: string) {
  const base = name.split(/[/\\]/).pop() ?? "cdl";
  const cleaned = base.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+/, "").slice(0, 80);
  const extension = cleaned.split(".").pop()?.toLowerCase() ?? "";
  if (!CDL_EXTENSIONS.has(extension)) return "cdl.pdf";
  return cleaned || `cdl.${extension}`;
}

export function cdlContentType(name: string, type: string) {
  const normalized = type.toLowerCase();
  if (normalized === "image/jpg") return "image/jpeg";
  if (CDL_MIME_TYPES.has(normalized)) return normalized;
  const extension = name.split(".").pop()?.toLowerCase();
  if (extension === "png") return "image/png";
  if (extension === "pdf") return "application/pdf";
  if (extension === "heic") return "image/heic";
  if (extension === "heif") return "image/heif";
  return "image/jpeg";
}

export type ValidationResult =
  | { ok: true; kind: FormKind; fields: Record<string, string> }
  | { ok: false; errors: Record<string, string> };

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export function validateForm(kind: unknown, raw: unknown): ValidationResult {
  if (typeof kind !== "string" || !formKinds.includes(kind as FormKind)) {
    return { ok: false, errors: { form: "Choose a valid form." } };
  }

  const spec = formSpecs[kind as FormKind];
  const source =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const fields: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const field of spec.fields) {
    const max = field.maxLength ?? (field.type === "textarea" ? 4000 : 200);
    const rawValue = source[field.name];
    let value = clean(rawValue, max);
    if (field.type === "textarea") {
      value = typeof rawValue === "string" ? rawValue.trim().slice(0, max) : "";
    }
    fields[field.name] = value;

    if (field.required && !value) {
      errors[field.name] = `Enter your ${field.label.toLowerCase()}.`;
      continue;
    }
    if (!value) continue;

    if (field.type === "email" && !emailPattern.test(value)) {
      errors[field.name] = "Enter a valid email address.";
    }
    if (field.type === "tel") {
      const count = digits(value).length;
      if (count < 10 || count > 15) {
        errors[field.name] = "Enter a phone number with area code.";
      }
    }
    if (field.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      errors[field.name] = "Choose a ship date.";
    }
    if (field.type === "number") {
      const numeric = Number(value);
      if (!Number.isInteger(numeric) || numeric < (field.min ?? 0) || numeric > (field.max ?? 60)) {
        errors[field.name] = `Enter a whole number from ${field.min ?? 0} to ${field.max ?? 60}.`;
      }
    }
    if ((field.name === "freightDetails" || field.name === "message") && value.length < 8) {
      errors[field.name] = "Add a few more words so the office knows what you need.";
    }
    if (field.name === "licenseNumber" && !/^[A-Za-z0-9][A-Za-z0-9 -]{3,39}$/.test(value)) {
      errors[field.name] = "Use the number printed on your license.";
    }
  }

  if (kind === "tracking" && fields.loadNumber) {
    if (!/^[A-Za-z0-9][A-Za-z0-9\- ]{1,39}$/.test(fields.loadNumber)) {
      errors.loadNumber = "Use the load number from your paperwork (letters, numbers, and dashes).";
    }
    if (!fields.email && !fields.phone) {
      errors.reply = "Add an email or a phone number so a dispatcher can reply.";
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, kind: kind as FormKind, fields };
}

export function inquirySubject(kind: FormKind, fields: Record<string, string>) {
  switch (kind) {
    case "quote":
      return `Quote request: ${fields.pickupCity} to ${fields.deliveryCity}`;
    case "tracking":
      return `Tracking request: load ${fields.loadNumber}`;
    case "career":
      return `Driver application: ${fields.name}`;
    case "contact":
      return `Website message: ${fields.name}`;
  }
}

export function inquiryText(kind: FormKind, fields: Record<string, string>) {
  const spec = formSpecs[kind];
  const lines = [
    `${spec.title}`,
    `Sent from the RoadRunner USA website.`,
    "",
    ...spec.fields
      .filter((field) => fields[field.name])
      .map((field) => `${field.label}: ${fields[field.name]}`),
  ];
  return lines.join("\n");
}
