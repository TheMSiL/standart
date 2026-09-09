import { Clock, FileText, Phone, Ruler, ShieldCheck } from "lucide-react";
import { company, telHref } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/sections/PageHero";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { partners, processSteps } from "@/data/site-content";
import { getReviewStats } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Get a Free Estimate",
  description:
    "Request a free on-site estimate for your deck, porch, pergola or outdoor living project anywhere in Chicago and the Illinois suburbs. Itemized written pricing, no obligation.",
  path: "/free-estimate",
});

const promises = [
  {
    icon: Ruler,
    title: "We measure on site",
    body: "No phone quotes and no square-foot guesses. We come out, measure the space and check the existing structure.",
  },
  {
    icon: FileText,
    title: "Itemized written pricing",
    body: "Materials, hardware, labor and permits, listed line by line. You can see exactly what each choice costs.",
  },
  {
    icon: Clock,
    title: "One business day",
    body: "A project manager calls you back within one business day to book a time that suits you.",
  },
  {
    icon: ShieldCheck,
    title: "No obligation",
    body: "The estimate is genuinely free and yours to keep. Nobody will chase you.",
  },
];

export default async function FreeEstimatePage() {
  const stats = await getReviewStats();

  return (
    <>
      <PageHero
        eyebrow="Free estimate"
        title="Get a free estimate for your project"
        description="Fill this in once and we will handle the rest — a project manager calls you within one business day to book the on-site measure."
        breadcrumbs={[{ name: "Free Estimate", href: "/free-estimate" }]}
        image={{
          src: "/images/projects/pergola-outdoor-kitchen-schaumburg/hero.jpg",
          alt: "Covered outdoor kitchen pavilion lit at dusk",
        }}
        aside={
          <Reveal>
            <div className="rounded-2xl bg-offwhite p-6 shadow-panel sm:p-7">
              <h2 className="text-[1.375rem] leading-tight">Request your estimate</h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-charcoal-700">
                Takes about two minutes. Photos are optional but they make the first answer far
                more useful.
              </p>
              <div className="mt-6">
                <LeadForm variant="estimate" />
              </div>
            </div>
          </Reveal>
        }
      >
        <ul className="mt-8 flex flex-col gap-4">
          {promises.map((promise) => (
            <li key={promise.title} className="flex items-start gap-3.5">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-white/8 text-cedar-300 ring-1 ring-white/15 ring-inset">
                <promise.icon className="size-4.5" strokeWidth={2} />
              </span>
              <span>
                <span className="block font-display text-[0.9375rem] font-semibold text-white">
                  {promise.title}
                </span>
                <span className="mt-1 block text-[0.875rem] leading-relaxed text-white/60">
                  {promise.body}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/12 pt-7">
          <span className="flex items-center gap-2.5">
            <Rating value={stats.average} />
            <span className="text-[0.875rem] text-white/70">
              {stats.average} from {stats.count} reviews
            </span>
          </span>
          <Button href={telHref} variant="onDark" size="sm">
            <Phone className="size-4" strokeWidth={2.25} />
            Prefer to call? {company.phone.display}
          </Button>
        </div>
      </PageHero>

      <ProcessSteps steps={processSteps} />

      <PartnerLogos partners={partners} className="bg-beige" />

      {/* Reassurance */}
      <section className="bg-offwhite">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="What happens next"
            title="Three steps between here and a written price"
            align="center"
          />

          <ol className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "We call you",
                body: "Within one business day, to understand the project and book a time.",
              },
              {
                step: "02",
                title: "We measure",
                body: "A project manager visits, measures and photographs the space.",
              },
              {
                step: "03",
                title: "You get a price",
                body: "An itemized written estimate, usually within 3–5 business days.",
              },
            ].map((item, index) => (
              <Reveal key={item.step} delay={index * 80} as="li">
                <div className="h-full rounded-2xl bg-white p-6 shadow-card ring-1 ring-charcoal-900/8 ring-inset">
                  <span className="font-display text-[0.75rem] font-bold tracking-[0.16em] text-cedar-700 uppercase">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem]">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal-700">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
