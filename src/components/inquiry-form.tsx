"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { site } from "@/config/site";
import { formSpecs, type FormKind, validateForm } from "@/lib/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const controlClass =
  "h-12 rounded-md border-input bg-white px-3.5 text-base text-ink shadow-none placeholder:text-muted-foreground md:text-base";

export function InquiryForm({ kind }: { kind: FormKind }) {
  const spec = formSpecs[kind];
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [website, setWebsite] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateForm(kind, values);
    if (!result.ok) {
      setErrors(result.errors);
      setDone(false);
      return;
    }
    setPending(true);
    setErrors({});
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, fields: result.fields, website }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
      };
      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? { form: "Send the form again in a moment." });
        return;
      }
      setDone(true);
    } catch {
      setErrors({
        form: `The form did not send. Call ${site.phone} or email ${site.email}.`,
      });
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-line bg-paper p-6 md:p-8" role="status">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-signal text-white">
          <Check aria-hidden />
        </span>
        <h2 className="mt-5 text-2xl font-extrabold tracking-tight">{spec.title}</h2>
        <p className="mt-3 max-w-lg text-base leading-7 text-muted-foreground">{spec.success}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 h-11 bg-white px-4"
          onClick={() => {
            setDone(false);
            setValues({});
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-2xl border border-line bg-paper p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {spec.fields.map((field) => {
          const error = errors[field.name];
          const id = `${kind}-${field.name}`;
          const wide = field.span === "full" || field.type === "textarea";
          return (
            <div key={field.name} className={cn("grid gap-2", wide && "sm:col-span-2")}>
              <Label htmlFor={id}>
                {field.label}
                {field.required ? (
                  <span className="text-signal" aria-hidden>
                    *
                  </span>
                ) : (
                  <span className="font-normal text-muted-foreground">(optional)</span>
                )}
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={id}
                  name={field.name}
                  required={field.required}
                  value={values[field.name] ?? ""}
                  placeholder={field.placeholder}
                  maxLength={field.maxLength}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : field.help ? `${id}-help` : undefined}
                  className="min-h-32 rounded-md border-input bg-white px-3.5 py-3 text-base text-ink md:text-base"
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                />
              ) : (
                <Input
                  id={id}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  value={values[field.name] ?? ""}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  maxLength={field.maxLength}
                  min={field.min}
                  max={field.max}
                  inputMode={field.type === "tel" ? "tel" : field.type === "number" ? "numeric" : undefined}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : field.help ? `${id}-help` : undefined}
                  className={controlClass}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                />
              )}
              {field.help && !error ? (
                <p id={`${id}-help`} className="text-sm text-muted-foreground">
                  {field.help}
                </p>
              ) : null}
              {error ? (
                <p id={`${id}-error`} className="text-sm text-signal">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
      {errors.reply ? (
        <p className="mt-4 text-sm text-signal" role="alert">
          {errors.reply}
        </p>
      ) : null}
      {errors.form ? (
        <p className="mt-4 rounded-md border border-signal/30 bg-accent px-3 py-2 text-sm text-ink" role="alert">
          {errors.form}
        </p>
      ) : null}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${kind}-website`}>Website</label>
        <input
          id={`${kind}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending} className="h-12 px-6 text-base font-semibold">
          {pending ? "Sending…" : spec.submit}
        </Button>
        <p className="text-sm text-muted-foreground">
          Goes to the Matthews office at {site.email}.
        </p>
      </div>
    </form>
  );
}
