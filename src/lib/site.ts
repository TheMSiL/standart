import { company } from "@/data/company";

/**
 * Site-wide constants that depend on the deployment, not on content.
 */

const FALLBACK_URL = "https://www.standardbuild.com";

/**
 * Canonical origin, no trailing slash.
 *
 * Set NEXT_PUBLIC_SITE_URL in the environment. On Vercel preview deployments we
 * fall back to VERCEL_URL so canonicals and OG images still resolve.
 */
export const siteUrl = (() => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return FALLBACK_URL;
})();

export const site = {
  name: company.name,
  title: `${company.name} | Premium Outdoor Construction in Chicago & Illinois`,
  description:
    "Custom decks, porches, pergolas and outdoor living spaces built across Chicago and the Illinois suburbs. Licensed and insured, 20+ years, free on-site estimates.",
  locale: "en_US",
  twitter: "@standardbuild",
} as const;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
