import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { partners, processSteps } from "@/data/site-content";
import { getServices } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Outdoor Construction Services",
  description:
    "Custom decks, porches, pergolas, outdoor kitchens, hot tub decks and catios built across Chicago and the Illinois suburbs by a licensed, insured contractor.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything we build, and nothing we don't"
        description="Five service lines, all of them outdoor structures, all of them built by our own crews. We would rather be the best in Chicagoland at a short list than average at a long one."
        breadcrumbs={[{ name: "Services", href: "/services" }]}
        image={{
          src: "/images/services/decks-hero.jpg",
          alt: "Composite deck wrapping a modern cedar-clad home",
        }}
      />

      <ServicesGrid
        services={services}
        eyebrow="Choose a service"
        title="Pick where your project fits"
        description="Not sure which one you need? Call us — describing it out loud usually sorts it in about two minutes."
        showViewAll={false}
      />

      <PartnerLogos partners={partners} />

      <ProcessSteps steps={processSteps} />

      <CTASection />
    </>
  );
}
