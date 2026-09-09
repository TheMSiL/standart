"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2, Phone, ShieldCheck } from "lucide-react";
import { submitLead } from "@/app/actions/lead";
import { initialLeadFormState } from "@/lib/lead-form-state";
import { company, telHref } from "@/data/company";
import { serviceTypeOptions } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { LeadFormVariant } from "@/lib/validation";
import { SelectField, TextAreaField, TextField } from "./Field";
import { PhotoUploader } from "./PhotoUploader";

interface LeadFormProps {
  variant: LeadFormVariant;
  /** Pre-selects the service dropdown, e.g. from a service page CTA. */
  defaultServiceType?: string;
  className?: string;
  /** Compact spacing + condensed labels, used inside the hero card. */
  compact?: boolean;
}

const budgetOptions = [
  { value: "under-15k", label: "Under $15,000" },
  { value: "15k-30k", label: "$15,000 – $30,000" },
  { value: "30k-60k", label: "$30,000 – $60,000" },
  { value: "60k-100k", label: "$60,000 – $100,000" },
  { value: "over-100k", label: "$100,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const startDateOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "next-season", label: "Next season" },
  { value: "planning", label: "Just planning / budgeting" },
];

function SubmitButton({ label, compact }: { label: string; compact?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={compact ? "md" : "lg"}
      fullWidth
      disabled={pending}
      aria-live="polite"
    >
      {pending ? (
        <>
          <Loader2 className="size-4.5 animate-spin" strokeWidth={2.25} />
          Sending…
        </>
      ) : (
        <>
          {label}
          <ArrowRight className="size-4.5" strokeWidth={2.25} />
        </>
      )}
    </Button>
  );
}

/**
 * Every lead form on the site.
 *
 * One component, three field sets, one server action. Progressive enhancement
 * is preserved: the form is a real `<form action={...}>`, so it submits and
 * validates without client JavaScript; the client layer adds inline errors,
 * a pending state, drag-and-drop uploads and the success panel.
 */
export function LeadForm({
  variant,
  defaultServiceType,
  className,
  compact = false,
}: LeadFormProps) {
  const [state, formAction] = useActionState(submitLead, initialLeadFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  const succeeded = state.status === "success";

  useEffect(() => {
    if (!succeeded) return;

    if (variant === "estimate") {
      router.push("/free-estimate/thank-you");
      return;
    }

    formRef.current?.reset();
    setResetSignal((n) => n + 1);
    // Move focus to the confirmation so screen readers announce the outcome.
    successRef.current?.focus();
  }, [succeeded, variant, router]);

  const errors = state.errors;

  if (succeeded && variant !== "estimate") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn(
          "rounded-2xl border border-success/25 bg-white p-7 text-center shadow-card focus:outline-none",
          className,
        )}
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-7" strokeWidth={1.75} />
        </span>
        <h3 className="mt-5 text-[1.25rem]">Request received</h3>
        <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-charcoal-700">
          {state.message}
        </p>
        <a
          href={telHref}
          className="mt-6 inline-flex items-center gap-2 font-display text-[1.0625rem] font-bold text-cedar-700 hover:text-cedar-800"
        >
          <Phone className="size-4.5" strokeWidth={2.25} />
          {company.phone.display}
        </a>
        <p className="mt-2 text-[0.8125rem] text-charcoal-600">
          Need it sooner? Call us and we will pick it up right away.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className={cn("flex flex-col", compact ? "gap-3.5" : "gap-5", className)}
    >
      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="source" value={`${variant}-form`} />
      <input type="hidden" name="pagePath" value={pathname} />

      {/* Honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden="true" className="absolute top-0 left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${variant}-company`}>Company</label>
        <input
          id={`${variant}-company`}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-lg border border-danger/25 bg-danger/6 px-4 py-3 text-[0.875rem] font-medium text-danger"
        >
          {state.message}
        </p>
      ) : null}

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <TextField
          id={`${variant}-name`}
          name="name"
          label="Full name"
          placeholder="Jane Sullivan"
          autoComplete="name"
          required
          error={errors.name}
        />
        <TextField
          id={`${variant}-phone`}
          name="phone"
          type="tel"
          label="Phone"
          placeholder="(312) 555-0142"
          autoComplete="tel"
          inputMode="tel"
          required
          error={errors.phone}
        />
      </div>

      <TextField
        id={`${variant}-email`}
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        inputMode="email"
        required
        error={errors.email}
      />

      {variant === "contact" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="contact-addressOrZip"
            name="addressOrZip"
            label="Address or ZIP"
            placeholder="60540"
            autoComplete="postal-code"
            required
            error={errors.addressOrZip}
          />
          <SelectField
            id="contact-serviceType"
            name="serviceType"
            label="Service type"
            options={serviceTypeOptions}
            placeholder="What can we help with?"
            defaultValue={defaultServiceType}
            required
            error={errors.serviceType}
          />
        </div>
      ) : null}

      {variant === "estimate" ? (
        <>
          <TextField
            id="estimate-address"
            name="address"
            label="Project address"
            placeholder="1420 Oak Street, Naperville"
            autoComplete="street-address"
            required
            error={errors.address}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="estimate-zip"
              name="zip"
              label="ZIP code"
              placeholder="60540"
              autoComplete="postal-code"
              inputMode="numeric"
              required
              error={errors.zip}
            />
            <SelectField
              id="estimate-serviceType"
              name="serviceType"
              label="Service type"
              options={serviceTypeOptions}
              placeholder="What are we building?"
              defaultValue={defaultServiceType}
              required
              error={errors.serviceType}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              id="estimate-budget"
              name="budget"
              label="Approximate budget"
              options={budgetOptions}
              placeholder="Select a range"
              hint="A range is enough — it helps us specify the right materials."
              error={errors.budget}
            />
            <SelectField
              id="estimate-startDate"
              name="startDate"
              label="Preferred start"
              options={startDateOptions}
              placeholder="Select a timeframe"
              error={errors.startDate}
            />
          </div>
        </>
      ) : null}

      <TextAreaField
        id={`${variant}-message`}
        name="message"
        label="Describe your project"
        placeholder="Tell us what you have in mind — size, materials, what the space needs to do, anything that is not working today."
        rows={compact ? 3 : 5}
        required
        error={errors.message}
      />

      <PhotoUploader
        name="photos"
        error={errors.photos}
        resetSignal={resetSignal}
        hint={
          compact
            ? undefined
            : "Photos of the existing space help us give you a far more accurate number."
        }
      />

      <SubmitButton
        label={variant === "estimate" ? "Request My Free Estimate" : "Get My Free Estimate"}
        compact={compact}
      />

      <p className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-charcoal-600">
        <ShieldCheck className="mt-px size-3.5 shrink-0 text-cedar-600" strokeWidth={2} />
        <span>
          No obligation and no pressure. We never share your details. Prefer to talk?{" "}
          <a href={telHref} className="font-semibold text-cedar-700 hover:underline">
            {company.phone.display}
          </a>
        </span>
      </p>
    </form>
  );
}
