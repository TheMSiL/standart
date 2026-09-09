import { z } from "zod";

/**
 * Lead form validation, shared by the client (inline field errors) and the
 * server action (authoritative check). Never trust the client copy.
 */

export const UPLOAD_LIMITS = {
  maxFiles: 8,
  maxFileBytes: 10 * 1024 * 1024, // 10 MB
  accept: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  /** For the file input's `accept` attribute. */
  acceptAttr: "image/jpeg,image/png,image/webp,image/heic,image/heif",
} as const;

/** Accepts (312) 555-0142, 312-555-0142, +1 312 555 0142, etc. */
const phoneRegex = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const requiredString = (field: string, min = 2) =>
  z
    .string({ required_error: `${field} is required` })
    .trim()
    .min(min, `${field} is required`);

const baseFields = {
  name: requiredString("Name").max(120, "Name is too long"),
  phone: requiredString("Phone", 7)
    .max(24, "Phone number is too long")
    .regex(phoneRegex, "Enter a valid US phone number"),
  email: requiredString("Email", 5)
    .max(180, "Email is too long")
    .email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .max(4000, "Please keep the description under 4000 characters")
    .optional()
    .default(""),
  /**
   * Honeypot. Real users never see this field, so any value means a bot.
   * The server silently accepts and discards those submissions.
   */
  company: z.string().max(0).optional().default(""),
  /** Which form produced the lead — useful for CRM routing and reporting. */
  source: z.string().trim().max(60).default("website"),
  /** Page the form was submitted from. */
  pagePath: z.string().trim().max(300).optional().default(""),
};

/** Compact hero form: name, phone, email, description, photos. */
export const heroLeadSchema = z.object({
  ...baseFields,
  message: z
    .string()
    .trim()
    .min(1, "Tell us a little about your project")
    .max(4000, "Please keep the description under 4000 characters"),
});

/** Contact page form: adds address/ZIP and service type. */
export const contactLeadSchema = z.object({
  ...baseFields,
  addressOrZip: requiredString("Address or ZIP", 3).max(180),
  serviceType: requiredString("Service type", 2).max(120),
  message: z
    .string()
    .trim()
    .min(1, "Tell us a little about your project")
    .max(4000, "Please keep the description under 4000 characters"),
});

/** Full estimate request. */
export const estimateLeadSchema = z.object({
  ...baseFields,
  address: requiredString("Address", 4).max(240),
  zip: requiredString("ZIP code", 5)
    .max(10)
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid US ZIP code"),
  serviceType: requiredString("Service type", 2).max(120),
  budget: z.string().trim().max(60).optional().default(""),
  startDate: z.string().trim().max(40).optional().default(""),
  message: z
    .string()
    .trim()
    .min(1, "Tell us a little about your project")
    .max(4000, "Please keep the description under 4000 characters"),
});

export type HeroLead = z.infer<typeof heroLeadSchema>;
export type ContactLead = z.infer<typeof contactLeadSchema>;
export type EstimateLead = z.infer<typeof estimateLeadSchema>;
export type AnyLead = HeroLead | ContactLead | EstimateLead;

export type LeadFormVariant = "hero" | "contact" | "estimate";

export const leadSchemas = {
  hero: heroLeadSchema,
  contact: contactLeadSchema,
  estimate: estimateLeadSchema,
} satisfies Record<LeadFormVariant, z.ZodTypeAny>;

/** Field-level error map returned to the client, keyed by input name. */
export type FieldErrors = Partial<Record<string, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    // Keep the first message per field — showing three at once helps nobody.
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

/** Shared client/server check for a single uploaded photo. */
export function validatePhoto(file: { type: string; size: number; name: string }) {
  if (!UPLOAD_LIMITS.accept.includes(file.type as (typeof UPLOAD_LIMITS.accept)[number])) {
    return `${file.name} is not a supported image (JPG, PNG, WEBP or HEIC).`;
  }
  if (file.size > UPLOAD_LIMITS.maxFileBytes) {
    return `${file.name} is larger than 10 MB.`;
  }
  return null;
}
