import { locationBySlug, locations } from "@/data/locations";
import { projectBySlug, projects } from "@/data/projects";
import { reviews, reviewStats } from "@/data/reviews";
import { serviceBySlug, services } from "@/data/services";
import type { ContentSource, ProjectQuery, ReviewQuery } from "./source";
import type { ServiceSlug } from "@/types/content";

/**
 * Content source backed by the typed modules in src/data.
 *
 * This is the only file in the codebase that knows those modules exist. Sorting
 * and filtering live here rather than in components so that a future CMS
 * implementation can push the same logic down into a real query.
 */
export const localSource: ContentSource = {
  async getServices() {
    return [...services].sort((a, b) => a.order - b.order);
  },

  async getService(slug) {
    return serviceBySlug.get(slug as ServiceSlug) ?? null;
  },

  async getProjects(query: ProjectQuery = {}) {
    const { serviceSlug, locationSlug, featuredOnly, limit, excludeSlug } = query;

    let result = [...projects];

    if (serviceSlug) result = result.filter((p) => p.serviceSlug === serviceSlug);
    if (locationSlug) result = result.filter((p) => p.locationSlug === locationSlug);
    if (featuredOnly) result = result.filter((p) => p.featured);
    if (excludeSlug) result = result.filter((p) => p.slug !== excludeSlug);

    // Newest first, then alphabetical so ordering is stable across renders.
    result.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

    return typeof limit === "number" ? result.slice(0, limit) : result;
  },

  async getProject(slug) {
    return projectBySlug.get(slug) ?? null;
  },

  async getLocations() {
    return [...locations].sort(
      (a, b) => Number(b.primary) - Number(a.primary) || a.name.localeCompare(b.name),
    );
  },

  async getLocation(slug) {
    return locationBySlug.get(slug) ?? null;
  },

  async getReviews(query: ReviewQuery = {}) {
    const { limit, minRating } = query;

    let result = [...reviews];
    if (typeof minRating === "number") {
      result = result.filter((r) => r.rating >= minRating);
    }

    result.sort((a, b) => b.date.localeCompare(a.date));

    return typeof limit === "number" ? result.slice(0, limit) : result;
  },

  async getReviewStats() {
    return reviewStats;
  },
};
