import type { Location } from "@/types/content";

/**
 * Service-area towns.
 *
 * This list is deliberately the seed for the future SEO landing pages
 * (`/deck-builder-naperville`, `/composite-decks-chicago`, …). Adding a town
 * here is all that is needed for it to appear in the footer, the project
 * filters and — once the landing route is switched on — its own page.
 * See src/lib/seo/landing-pages.ts.
 */
export const locations: Location[] = [
  {
    slug: "chicago",
    name: "Chicago",
    county: "Cook County",
    state: "Illinois",
    stateCode: "IL",
    blurb:
      "City lots, rooftop decks and tight-access backyards — we handle Chicago permitting and inspections every week.",
    primary: true,
  },
  {
    slug: "naperville",
    name: "Naperville",
    county: "DuPage County",
    state: "Illinois",
    stateCode: "IL",
    blurb:
      "Large suburban lots and multi-level composite decks built to Naperville's residential code.",
    primary: true,
  },
  {
    slug: "aurora",
    name: "Aurora",
    county: "Kane County",
    state: "Illinois",
    stateCode: "IL",
    blurb: "Deck replacements and poolside builds across Aurora's established neighborhoods.",
    primary: true,
  },
  {
    slug: "joliet",
    name: "Joliet",
    county: "Will County",
    state: "Illinois",
    stateCode: "IL",
    blurb:
      "Covered porches and screened outdoor rooms engineered for Will County wind and snow loads.",
    primary: true,
  },
  {
    slug: "schaumburg",
    name: "Schaumburg",
    county: "Cook County",
    state: "Illinois",
    stateCode: "IL",
    blurb: "Pergolas, outdoor kitchens and full entertainment areas for Schaumburg homeowners.",
    primary: true,
  },
  {
    slug: "arlington-heights",
    name: "Arlington Heights",
    county: "Cook County",
    state: "Illinois",
    stateCode: "IL",
    blurb: "Cedar and hardwood decking on mature lots, matched to existing architecture.",
    primary: true,
  },
  {
    slug: "elgin",
    name: "Elgin",
    county: "Kane County",
    state: "Illinois",
    stateCode: "IL",
    blurb: "Front porch rebuilds and historic-home restorations throughout Elgin.",
    primary: true,
  },
  {
    slug: "plainfield",
    name: "Plainfield",
    county: "Will County",
    state: "Illinois",
    stateCode: "IL",
    blurb: "Hot tub decks, privacy screens and spa structures built for year-round use.",
    primary: true,
  },
];

export const locationBySlug = new Map(locations.map((l) => [l.slug, l]));
