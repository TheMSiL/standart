/**
 * Content model for Standard Build.
 *
 * These types are the contract between the presentation layer and whatever is
 * feeding it. Today that is the local `src/data/*` modules; tomorrow it can be
 * Sanity, Payload, Strapi or Supabase. Components must only ever depend on the
 * types in this file — never on the shape of a specific data source.
 */

export interface ImageRef {
  /** Path under /public, or an absolute URL once a CMS/CDN serves the assets. */
  src: string;
  /** Always required — alt text is content, not decoration. */
  alt: string;
  width?: number;
  height?: number;
}

export interface SeoFields {
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                    */
/* -------------------------------------------------------------------------- */

export type ServiceSlug = "decks" | "porches" | "outdoor-living" | "spa-wellness" | "catio";

export interface SubService {
  slug: string;
  name: string;
  description: string;
}

export interface ServiceHighlight {
  title: string;
  description: string;
}

export interface Service {
  slug: ServiceSlug;
  /** Full marketing name, e.g. "Custom Decks". */
  name: string;
  /** Short label for nav and breadcrumbs, e.g. "Decks". */
  navLabel: string;
  /** One line under the card title. */
  tagline: string;
  /** 1–2 sentence card / meta summary. */
  summary: string;
  /** Body copy for the service page, one string per paragraph. */
  intro: string[];
  card: ImageRef;
  hero: ImageRef;
  subServices: SubService[];
  materials: string[];
  highlights: ServiceHighlight[];
  faqs: Faq[];
  /** Display order across grids and navigation. */
  order: number;
  seo: SeoFields;
}

/* -------------------------------------------------------------------------- */
/*  Locations                                                                   */
/* -------------------------------------------------------------------------- */

export interface Location {
  slug: string;
  name: string;
  county: string;
  state: string;
  stateCode: string;
  /** Short line used on location chips and future SEO landing pages. */
  blurb: string;
  /** Drives ordering of the service-area lists. */
  primary: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                    */
/* -------------------------------------------------------------------------- */

export interface ProjectPhase {
  title: string;
  description: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface BeforeAfterPair {
  before: ImageRef;
  after: ImageRef;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Card kicker, e.g. "Composite Deck". */
  serviceType: string;
  serviceSlug: ServiceSlug;
  locationSlug: string;
  /** Denormalised for cards so a grid never needs a second lookup. */
  locationName: string;
  /** Headline material, shown on the card. */
  material: string;
  materials: string[];
  year: number;
  summary: string;
  description: string[];
  hero: ImageRef;
  gallery: ImageRef[];
  beforeAfter?: BeforeAfterPair;
  phases: ProjectPhase[];
  stats: ProjectStat[];
  featured: boolean;
  seo: SeoFields;
}

/* -------------------------------------------------------------------------- */
/*  Reviews                                                                     */
/* -------------------------------------------------------------------------- */

export type ReviewSource = "google" | "houzz" | "facebook" | "direct";

export interface Review {
  id: string;
  author: string;
  /** 1–5. */
  rating: number;
  body: string;
  locationName: string;
  source: ReviewSource;
  /** ISO date — rendered with a stable formatter to avoid hydration drift. */
  date: string;
  serviceType?: string;
  /** Optional customer-supplied project photo. */
  image?: ImageRef;
}

export interface ReviewStats {
  average: number;
  count: number;
  /** Where the aggregate is published, e.g. "Google". */
  primarySource: string;
}

/* -------------------------------------------------------------------------- */
/*  Supporting content                                                          */
/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  detail: string;
  image?: ImageRef;
}

export interface Partner {
  name: string;
  /** Short qualifier rendered under the wordmark, e.g. "PRO Contractor". */
  credential: string;
  /**
   * Path to an official logo file once the client supplies one. When absent the
   * UI renders an accessible typographic badge instead.
   */
  logo?: ImageRef;
  featured: boolean;
}

export interface TrustPoint {
  label: string;
  detail: string;
  /** Key into the icon registry in src/components/ui/Icon.tsx. */
  icon: string;
}

export interface Differentiator {
  title: string;
  description: string;
  icon: string;
  /** Optional animated counter, e.g. { value: 20, suffix: "+" }. */
  counter?: { value: number; suffix?: string; prefix?: string };
}
