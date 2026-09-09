import type { MetadataRoute } from "next";
import { getProjects, getServices } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site";

/**
 * XML sitemap, generated from the content layer.
 *
 * Because it reads the same source the pages do, publishing a new service or
 * project adds it to the sitemap automatically. When the location landing
 * pages are switched on, add their generated routes here too — see
 * src/lib/seo/landing-pages.ts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([getServices(), getProjects()]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
      { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/projects"), changeFrequency: "weekly", priority: 0.9 },
      { url: absoluteUrl("/free-estimate"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
      { url: absoluteUrl("/reviews"), changeFrequency: "weekly", priority: 0.7 },
      { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.8 },
      { url: absoluteUrl("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
      { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
