import { AboutPreview } from "@/components/sections/AboutPreview";
import { CTASection } from "@/components/sections/CTASection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { differentiators, partners, processSteps, trustPoints } from "@/data/site-content";
import { getLocations, getProjects, getReviews, getReviewStats, getServices } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  // The home page uses the untemplated site title rather than "Home | …".
  title: site.title,
  description: site.description,
  path: "/",
  imageAlt: "Composite deck built by Standard Build in the Chicago suburbs",
});

/** A short, home-page-appropriate cross-section of the service FAQs. */
const homeFaqs = [
  {
    question: "How much does a new deck cost in the Chicago area?",
    answer:
      "Most of the decks we build land between $55 and $110 per square foot installed. Pressure-treated framing with cedar decking sits at the lower end; capped composite with hidden fasteners, custom railing and lighting sits at the upper end. After the on-site measure you get a written, itemized number — not a range to guess inside of.",
  },
  {
    question: "Do you handle permits and inspections?",
    answer:
      "Yes, on every project. We prepare the drawings, submit the application, respond to plan review comments and meet the inspector. Permitting is included in the contract price and you never have to call the village yourself.",
  },
  {
    question: "How far out are you booking?",
    answer:
      "It varies with the season. Spring and early summer are the busiest, and permitting adds two to four weeks depending on the municipality. Call and we will tell you honestly where you would land in the schedule.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Fully licensed in Illinois, bonded, and carrying both general liability and workers compensation. We provide current certificates before work starts on every job, without being asked.",
  },
  {
    question: "Do you offer any warranty?",
    answer:
      "Yes. Manufacturer warranties on materials — up to 50 years on some composite lines — plus our own written workmanship warranty on the structure and installation. Both are handed over at the final walkthrough.",
  },
  {
    question: "Which towns do you serve?",
    answer:
      "Chicago plus Naperville, Aurora, Joliet, Schaumburg, Arlington Heights, Elgin and Plainfield, and most of the surrounding communities in Cook, DuPage, Kane and Will counties.",
  },
];

export default async function HomePage() {
  // Fetched in parallel — these are independent reads from the content layer.
  const [services, featuredProjects, reviews, reviewStats, locations] = await Promise.all([
    getServices(),
    getProjects({ featuredOnly: true, limit: 6 }),
    getReviews({ limit: 8 }),
    getReviewStats(),
    getLocations(),
  ]);

  return (
    <>
      <Hero trustPoints={trustPoints} reviewStats={reviewStats} />

      <TrustBar points={trustPoints} />

      {/*
        Section order alternates tone — offwhite, beige, dark — so no two
        adjacent bands share a background and the page reads as distinct
        chapters rather than one long scroll.
      */}
      <ServicesGrid services={services} />

      <PartnerLogos partners={partners} className="bg-beige" />

      <ProjectsGrid projects={featuredProjects} tone="light" />

      <WhyChooseUs items={differentiators} />

      <ProcessSteps steps={processSteps} />

      <CTASection
        title="Ready to build your outdoor space?"
        description="Tell us about your project and we will come measure it. Free estimate, itemized written pricing, and an honest answer about what it will cost and how long it will take."
      />

      <ReviewsCarousel reviews={reviews} stats={reviewStats} />

      <AboutPreview />

      <ServiceAreas locations={locations} className="bg-offwhite" />

      <FaqSection
        faqs={homeFaqs}
        description="The questions we get asked on almost every first phone call."
        className="bg-beige"
      />

      <CTASection
        title="Tell us about your project"
        description="Send photos of the space and a few details. A project manager will call you within one business day."
        primaryLabel="Start My Free Estimate"
        image="/images/misc/evening-patio.jpg"
      />
    </>
  );
}
