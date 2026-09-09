"use server";

import { deliverLead, type LeadPhoto } from "@/lib/leads";
import type { LeadFormState } from "@/lib/lead-form-state";
import {
  leadSchemas,
  toFieldErrors,
  UPLOAD_LIMITS,
  validatePhoto,
  type LeadFormVariant,
} from "@/lib/validation";

// NOTE: a "use server" module may only export async functions. The state shape
// and its initial value therefore live in @/lib/lead-form-state.

const VARIANTS: LeadFormVariant[] = ["hero", "contact", "estimate"];

function isVariant(value: unknown): value is LeadFormVariant {
  return typeof value === "string" && VARIANTS.includes(value as LeadFormVariant);
}

/**
 * Single server action behind every lead form on the site.
 *
 * Photos are validated and summarised here. They are deliberately *not*
 * uploaded anywhere yet — that requires a storage bucket (S3, Vercel Blob,
 * UploadThing, Cloudinary). See the marked block below for where to add it;
 * nothing else in the flow has to change.
 */
export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const rawVariant = formData.get("variant");
  const variant: LeadFormVariant = isVariant(rawVariant) ? rawVariant : "contact";

  const values = Object.fromEntries(
    Array.from(formData.entries())
      .filter(([, value]) => typeof value === "string")
      .map(([key, value]) => [key, value as string]),
  );

  // Honeypot: pretend everything worked so bots do not learn anything.
  if (typeof values.company === "string" && values.company.length > 0) {
    return { status: "success", message: successMessage(variant), errors: {} };
  }

  const parsed = leadSchemas[variant].safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors: toFieldErrors(parsed.error),
    };
  }

  /* ---- Photos ---------------------------------------------------------- */
  const files = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length > UPLOAD_LIMITS.maxFiles) {
    return {
      status: "error",
      message: `Please upload no more than ${UPLOAD_LIMITS.maxFiles} photos.`,
      errors: { photos: `Maximum ${UPLOAD_LIMITS.maxFiles} photos.` },
    };
  }

  for (const file of files) {
    const problem = validatePhoto(file);
    if (problem) {
      return { status: "error", message: problem, errors: { photos: problem } };
    }
  }

  const photos: LeadPhoto[] = files.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }));

  // TODO(storage): upload `files` to object storage and push the resulting
  // URLs onto each `photos` entry before delivering the lead. Everything
  // downstream already accepts the richer shape.

  /* ---- Delivery -------------------------------------------------------- */
  try {
    const result = await deliverLead({
      variant,
      submittedAt: new Date().toISOString(),
      fields: parsed.data as Record<string, string>,
      photos,
    });

    if (result.delivered.length === 0) {
      throw new Error("No transport accepted the lead");
    }
  } catch (error) {
    console.error("[submitLead] delivery failed:", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your request. Please call us and we will take the details over the phone.",
      errors: {},
    };
  }

  return { status: "success", message: successMessage(variant), errors: {} };
}

function successMessage(variant: LeadFormVariant): string {
  switch (variant) {
    case "estimate":
      return "Your estimate request is in. A project manager will call you within one business day to schedule the on-site measure.";
    case "hero":
      return "Thanks — we have your details. Expect a call from a project manager within one business day.";
    default:
      return "Thanks for reaching out. We will get back to you within one business day.";
  }
}
