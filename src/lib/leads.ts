import "server-only";

import { company } from "@/data/company";

/**
 * Lead delivery pipeline.
 *
 * A submitted lead is fanned out to every transport that is configured. Each
 * transport is independent: if the webhook is down the email still goes, and a
 * failure is logged rather than thrown, so the visitor always sees a success
 * state for a lead we have durably received.
 *
 * Configure via environment (see .env.example):
 *   LEADS_WEBHOOK_URL   — Zapier / Make / n8n / custom CRM endpoint
 *   RESEND_API_KEY      — transactional email
 *
 * With nothing configured the lead is logged to the server console, which is
 * what happens in local development.
 */

export interface LeadPhoto {
  name: string;
  size: number;
  type: string;
}

export interface LeadPayload {
  /** Which form produced it: hero | contact | estimate. */
  variant: string;
  submittedAt: string;
  fields: Record<string, string>;
  photos: LeadPhoto[];
}

export interface LeadDeliveryResult {
  delivered: string[];
  failed: string[];
}

async function sendToWebhook(lead: LeadPayload): Promise<void> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) throw new Error("skip");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    // A lead should never hold the response open for long.
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}

async function sendEmail(lead: LeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_EMAIL_TO;
  const from = process.env.LEADS_EMAIL_FROM;
  if (!apiKey || !to || !from) throw new Error("skip");

  const rows = Object.entries(lead.fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<tr><td><strong>${key}</strong></td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const photoList = lead.photos.length
    ? `<p>${lead.photos.length} photo(s) attached by the customer: ${lead.photos
        .map((p) => escapeHtml(p.name))
        .join(", ")}</p>`
    : "<p>No photos uploaded.</p>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.fields.email,
      subject: `New ${lead.variant} lead — ${lead.fields.name ?? "Website"}`,
      html: `<h2>New lead from ${company.name} website</h2><table>${rows}</table>${photoList}`,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Email API responded ${response.status}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const transports: Array<{ name: string; send: (lead: LeadPayload) => Promise<void> }> = [
  { name: "webhook", send: sendToWebhook },
  { name: "email", send: sendEmail },
];

export async function deliverLead(lead: LeadPayload): Promise<LeadDeliveryResult> {
  const delivered: string[] = [];
  const failed: string[] = [];

  const results = await Promise.allSettled(
    transports.map(async (transport) => {
      try {
        await transport.send(lead);
        return transport.name;
      } catch (error) {
        // "skip" means the transport simply is not configured.
        if (error instanceof Error && error.message === "skip") return null;
        throw error;
      }
    }),
  );

  results.forEach((result, index) => {
    const name = transports[index]?.name ?? "unknown";
    if (result.status === "fulfilled") {
      if (result.value) delivered.push(name);
    } else {
      failed.push(name);
      console.error(`[leads] ${name} transport failed:`, result.reason);
    }
  });

  if (delivered.length === 0 && failed.length === 0) {
    // Development fallback so nothing is silently lost before launch.
    console.info(
      "[leads] No transport configured. Lead payload:",
      JSON.stringify(lead, null, 2),
    );
    delivered.push("console");
  }

  return { delivered, failed };
}
