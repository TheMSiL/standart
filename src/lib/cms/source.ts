import type {
  Location,
  Project,
  Review,
  ReviewStats,
  Service,
  ServiceSlug,
} from "@/types/content";

export interface ProjectQuery {
  serviceSlug?: ServiceSlug;
  locationSlug?: string;
  featuredOnly?: boolean;
  limit?: number;
  /** Exclude a slug — used for "more projects" rails on a detail page. */
  excludeSlug?: string;
}

export interface ReviewQuery {
  limit?: number;
  minRating?: number;
}

/**
 * The contract every content source must satisfy.
 *
 * Pages and components depend only on this interface, never on the local data
 * modules. To move to Sanity / Payload / Strapi / Supabase, add a new file that
 * implements `ContentSource` and point `src/lib/cms/index.ts` at it — no page or
 * component changes required.
 *
 * Every method is async on purpose: the local implementation resolves
 * immediately, but the signature already matches a network-backed CMS.
 */
export interface ContentSource {
  getServices(): Promise<Service[]>;
  getService(slug: string): Promise<Service | null>;

  getProjects(query?: ProjectQuery): Promise<Project[]>;
  getProject(slug: string): Promise<Project | null>;

  getLocations(): Promise<Location[]>;
  getLocation(slug: string): Promise<Location | null>;

  getReviews(query?: ReviewQuery): Promise<Review[]>;
  getReviewStats(): Promise<ReviewStats>;
}
