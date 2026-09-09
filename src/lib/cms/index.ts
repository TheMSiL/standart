import { localSource } from "./local-source";
import type { ContentSource } from "./source";

/**
 * The active content source.
 *
 * Swapping the whole site to a headless CMS is a one-line change here:
 *
 *   import { sanitySource } from "./sanity-source";
 *   export const content: ContentSource = sanitySource;
 *
 * Nothing outside src/lib/cms imports a data module directly.
 */
export const content: ContentSource = localSource;

export type { ContentSource, ProjectQuery, ReviewQuery } from "./source";

/* -------------------------------------------------------------------------- *
 * Convenience wrappers.
 *
 * Server Components call these directly. Keeping them as thin named functions
 * (rather than reaching into `content` everywhere) means a caching strategy —
 * React `cache()`, `unstable_cache`, ISR tags — can be introduced in one place
 * when a real CMS is connected.
 * -------------------------------------------------------------------------- */

export const getServices = () => content.getServices();
export const getService = (slug: string) => content.getService(slug);

export const getProjects: ContentSource["getProjects"] = (query) => content.getProjects(query);
export const getProject = (slug: string) => content.getProject(slug);

export const getLocations = () => content.getLocations();
export const getLocation = (slug: string) => content.getLocation(slug);

export const getReviews: ContentSource["getReviews"] = (query) => content.getReviews(query);
export const getReviewStats = () => content.getReviewStats();
