import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectFilters } from "@/components/sections/ProjectFilters";
import { getLocations, getProjects, getServices } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Our Projects",
  description:
    "Decks, porches, pergolas, outdoor kitchens and spa structures built by Standard Build across Chicago, Naperville, Aurora, Joliet, Schaumburg and the surrounding Illinois suburbs.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [projects, services, locations] = await Promise.all([
    getProjects(),
    getServices(),
    getLocations(),
  ]);

  // Only offer filters that would actually return something.
  const usedServiceSlugs = new Set(projects.map((p) => p.serviceSlug));
  const usedLocationSlugs = new Set(projects.map((p) => p.locationSlug));

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects built across Chicagoland"
        description="Every project here was designed, permitted and built by our own crews. Open one to see the materials, the schedule, and what it looked like before we started."
        breadcrumbs={[{ name: "Projects", href: "/projects" }]}
        image={{
          src: "/images/projects/composite-deck-naperville/hero.jpg",
          alt: "Two-level composite deck behind a suburban Naperville home",
        }}
      />

      <ProjectFilters
        projects={projects}
        services={services.filter((s) => usedServiceSlugs.has(s.slug))}
        locations={locations.filter((l) => usedLocationSlugs.has(l.slug))}
      />

      <CTASection
        title="Want something like this in your yard?"
        description="Send us photos of the space and we will tell you what is possible, what it costs, and how long it takes."
      />
    </>
  );
}
