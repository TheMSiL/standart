import { company } from "@/data/company";

/**
 * Site-wide constants that depend on the deployment, not on content.
 */

const FALLBACK_URL = "https://www.standardbuild.com";

/**
 * Canonical origin, no trailing slash.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — the real domain, once there is one. Always wins.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the project's stable production domain.
 *     VERCEL_URL is deliberately not used first: it is unique per deployment,
 *     so canonicals and OG URLs would point at a throwaway host and change with
 *     every release.
 *  3. VERCEL_URL — correct for preview deployments, where the per-deployment
 *     host is exactly what should resolve.
 *  4. A placeholder, so local builds still produce absolute URLs.
 *
 * Only ever read on the server (metadata, sitemap, robots, JSON-LD), so the
 * non-public variables are safe to use here.
 */
export const siteUrl = (() => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

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
