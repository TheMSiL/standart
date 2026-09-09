import { locations } from "@/data/locations";
import { services } from "@/data/services";
import type { Location, SeoFields, Service, SubService } from "@/types/content";

/**
 * Architecture for the future service + location landing pages.
 *
 * The brief is explicit that the 50+ SEO pages are NOT to be generated yet —
 * only that the structure must be ready for them. This module is that
 * structure: it turns the existing services and locations data into fully
 * formed page definitions, without creating any routes.
 *
 * Switching them on later is one file:
 *
 *   // src/app/(landing)/[slug]/page.tsx
 *   import { landingPages, landingPageBySlug } from "@/lib/seo/landing-pages";
 *
 *   export function generateStaticParams() {
 *     return landingPages().map(({ slug }) => ({ slug }));
 *   }
 *
 *   export default async function LandingPage({ params }) {
 *     const page = landingPageBySlug((await params).slug);
 *     if (!page) notFound();
 *     // Reuse PageHero / ServicesGrid / ProjectsGrid / FaqSection / LeadForm.
 *   }
 *
 * Then add `landingPages()` to src/app/sitemap.ts.
 *
 * Because every page pulls its imagery, FAQs, sub-services and copy from the
 * same typed content the main pages use, the set stays consistent as the
 * content grows — and none of it is duplicated by hand.
 */

export interface LandingPageDefinition {
  /** Route segment, e.g. "deck-builder-naperville". */
  slug: string;
  service: Service;
  location: Location;
  /** Optional narrower focus, e.g. the "composite-decks" sub-service. */
  subService?: SubService;
  h1: string;
  intro: string;
  seo: SeoFields;
}

/**
 * URL patterns to generate.
 *
 * `label` is the noun used in the slug and the H1. Add a pattern here and every
 * location gets a page for it — that is how the set grows from 8 to 50+ without
 * writing more code.
 */
export const LANDING_PATTERNS: Array<{
  id: string;
  serviceSlug: Service["slug"];
  subServiceSlug?: string;
  /** Produces the slug: `${label}-${location.slug}`. */
  label: string;
  noun: string;
}> = [
  { id: "deck-builder", serviceSlug: "decks", label: "deck-builder", noun: "Deck Builder" },
  {
    id: "composite-decks",
    serviceSlug: "decks",
    subServiceSlug: "composite-decks",
    label: "composite-decks",
    noun: "Composite Decks",
  },
  {
    id: "cedar-decks",
    serviceSlug: "decks",
    subServiceSlug: "cedar-decks",
    label: "cedar-decks",
    noun: "Cedar Decks",
  },
  {
    id: "porch-builder",
    serviceSlug: "porches",
    label: "porch-builder",
    noun: "Porch Builder",
  },
  {
    id: "pergola-builder",
    serviceSlug: "outdoor-living",
    subServiceSlug: "pergolas",
    label: "pergola-builder",
    noun: "Pergola Builder",
  },
  {
    id: "outdoor-kitchens",
    serviceSlug: "outdoor-living",
    subServiceSlug: "outdoor-kitchens",
    label: "outdoor-kitchens",
    noun: "Outdoor Kitchens",
  },
  {
    id: "hot-tub-decks",
    serviceSlug: "spa-wellness",
    subServiceSlug: "hot-tub-decks",
    label: "hot-tub-decks",
    noun: "Hot Tub Decks",
  },
];

/**
 * Every service × location page definition.
 *
 * Currently unused by any route — deliberately. Call it from a route when the
 * SEO expansion is approved.
 */
export function landingPages(): LandingPageDefinition[] {
  const pages: LandingPageDefinition[] = [];

  for (const pattern of LANDING_PATTERNS) {
    const service = services.find((s) => s.slug === pattern.serviceSlug);
    if (!service) continue;

    const subService = pattern.subServiceSlug
      ? service.subServices.find((sub) => sub.slug === pattern.subServiceSlug)
      : undefined;

    for (const location of locations) {
      pages.push({
        slug: `${pattern.label}-${location.slug}`,
        service,
        location,
        subService,
        h1: `${pattern.noun} in ${location.name}, ${location.stateCode}`,
        intro: `${subService?.description ?? service.summary} ${location.blurb}`,
        seo: {
          title: `${pattern.noun} in ${location.name}, ${location.stateCode}`,
          description: `Licensed ${pattern.noun.toLowerCase()} serving ${location.name} and ${location.county}. ${service.summary} Free on-site estimates.`,
        },
      });
    }
  }

  return pages;
}

export function landingPageBySlug(slug: string): LandingPageDefinition | null {
  return landingPages().find((page) => page.slug === slug) ?? null;
}

/** How many pages the current patterns would produce — 7 × 8 = 56 today. */
export function landingPageCount(): number {
  return LANDING_PATTERNS.length * locations.length;
}
