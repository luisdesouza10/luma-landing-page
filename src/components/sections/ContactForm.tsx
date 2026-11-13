"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import type { SiteContent } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { validateContact, type ContactErrors, type ContactValues } from "@/lib/validateContact";

type ContactFormProps = {
  copy: SiteContent["contact"]["form"];
  /** Simulated network latency; there is no backend in this exercise. */
  submitDelayMs?: number;
  onSubmitted?: (values: ContactValues) => void;
};

type Field = keyof ContactValues;
type Status = "idle" | "submitting" | "success";

const EMPTY: ContactValues = { name: "", email: "", message: "" };
const FIELD_ORDER: Field[] = ["name", "email", "message"];

export function ContactForm({ copy, submitDelayMs = 800, onSubmitted }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const focusNameOnReset = useRef(false);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
    if (status === "idle" && focusNameOnReset.current) {
      focusNameOnReset.current = false;
      fieldRefs.current.name?.focus();
    }
  }, [status]);

  const validateField = (field: Field, next: ContactValues) => {
    const fieldError = validateContact(next)[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field;
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    // Only re-validate fields the user has already left once, so errors don't appear mid-typing.
    if (touched[field]) validateField(field, next);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field;
    // Don't flag an untouched empty field just because focus passed through it.
    if (!touched[field] && values[field].trim() === "") return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, values);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, submitDelayMs));
    onSubmitted?.({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
    setStatus("success");
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    focusNameOnReset.current = true;
    setStatus("idle");
  };

  return (
    <div className="w-full rounded-2xl border border-line bg-white px-5 py-6 shadow-card md:p-10">
      {status === "success" ? (
        <div role="status" className="flex flex-col items-start gap-4 py-6 motion-safe:animate-fade-up">
          <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-brand-soft">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#3157F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="font-display text-h5 font-bold text-ink outline-none"
          >
            {copy.success.title}
          </h3>
          <p className="text-body text-ink-muted">{copy.success.description}</p>
          <Button variant="secondary" onClick={reset}>
            {copy.success.reset}
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} aria-labelledby="contact-form-title" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 id="contact-form-title" className="font-display text-h5 font-bold text-ink">
              {copy.title}
            </h3>
            <p className="text-body text-ink-muted">{copy.description}</p>
          </div>

          <div className="flex flex-col gap-5">
            <FormField
              ref={(el) => {
                fieldRefs.current.name = el;
              }}
              id="contact-name"
              name="name"
              label={copy.name.label}
              placeholder={copy.name.placeholder}
              autoComplete="name"
              required
              value={values.name}
              error={errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              ref={(el) => {
                fieldRefs.current.email = el;
              }}
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              label={copy.email.label}
              placeholder={copy.email.placeholder}
              autoComplete="email"
              required
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              ref={(el) => {
                fieldRefs.current.message = el;
              }}
              multiline
              id="contact-message"
              name="message"
              label={copy.message.label}
              placeholder={copy.message.placeholder}
              required
              value={values.message}
              error={errors.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <Button type="submit" fullWidth disabled={status === "submitting"} aria-disabled={status === "submitting"}>
            {status === "submitting" ? copy.submitting : copy.submit}
          </Button>
        </form>
      )}
    </div>
  );
}
