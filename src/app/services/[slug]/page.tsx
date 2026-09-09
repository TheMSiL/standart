import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { company, telHref } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { LeadForm } from "@/components/forms/LeadForm";
import { processSteps } from "@/data/site-content";
import { getLocations, getProjects, getService, getServices } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Static params for the five service pages. Adding a service to
 * `src/data/services.ts` publishes its page — no route changes required.
 */
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    image: service.hero.src,
    imageAlt: service.hero.alt,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [relatedProjects, locations] = await Promise.all([
    getProjects({ serviceSlug: service.slug, limit: 3 }),
    getLocations(),
  ]);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      <PageHero
        eyebrow={service.tagline}
        title={service.name}
        description={service.summary}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.navLabel, href: `/services/${service.slug}` },
        ]}
        image={service.hero}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/free-estimate" size="lg">
            Get Free Estimate
          </Button>
          <Button href={telHref} variant="onDark" size="lg">
            <Phone className="size-4.5" strokeWidth={2.25} />
            {company.phone.display}
          </Button>
        </div>
      </PageHero>

      {/* Intro + materials */}
      <section className="bg-offwhite">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The approach"
              title={`How we build ${service.navLabel.toLowerCase()}`}
            />
            <div className="mt-6 flex flex-col gap-5">
              {service.intro.map((paragraph, index) => (
                <Reveal
                  key={index}
                  delay={index * 80}
                  as="p"
                  className="text-[1.0625rem] leading-[1.7] text-charcoal-800"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-charcoal-600 uppercase">
                Materials we work with
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.materials.map((material) => (
                  <li
                    key={material}
                    className="rounded-full bg-beige px-3.5 py-1.5 text-[0.8125rem] font-medium text-charcoal-800"
                  >
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky quote card */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-charcoal-900/8 ring-inset">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.card.src}
                    alt={service.card.alt}
                    fill
                    sizes="(min-width: 1024px) 34vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[1.125rem]">
                    Get a price for your {service.navLabel.toLowerCase()}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal-700">
                    Free on-site measure, itemized written pricing, no obligation.
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <Button href="/free-estimate" size="md" fullWidth>
                      Get Free Estimate
                      <ArrowRight className="size-4" strokeWidth={2.25} />
                    </Button>
                    <Button href={telHref} variant="outline" size="md" fullWidth>
                      <Phone className="size-4" strokeWidth={2.25} />
                      {company.phone.display}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sub-services */}
      <section className="bg-beige">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="What's included"
            title={`${service.navLabel} we build`}
            description="Every option below is something we install regularly — not a list copied from a supplier catalog."
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.subServices.map((sub, index) => (
              <li
                key={sub.slug}
                className="rounded-2xl bg-white shadow-card ring-1 ring-charcoal-900/8 ring-inset"
              >
                <Reveal
                  delay={Math.min(index, 5) * 60}
                  className="flex h-full flex-col p-6 sm:p-7"
                >
                  <h3 className="text-[1.0625rem] leading-tight">{sub.name}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-charcoal-700">
                    {sub.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Highlights */}
      <section className="texture-grain bg-charcoal-950">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            tone="dark"
            eyebrow="Details that matter"
            title="What separates our work from the cheapest quote"
          />

          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {service.highlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={index * 70} as="li" className="flex gap-4">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-cedar-600/15 text-cedar-300 ring-1 ring-cedar-500/25 ring-inset">
                  <Check className="size-4.5" strokeWidth={2.5} />
                </span>
                <span>
                  <h3 className="text-[1.0625rem] text-white">{highlight.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/60">
                    {highlight.description}
                  </p>
                </span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {relatedProjects.length > 0 ? (
        <ProjectsGrid
          projects={relatedProjects}
          eyebrow="Recent builds"
          title={`${service.navLabel} we have built recently`}
          description="Open any project for materials, schedule and before-and-after photos."
          tone="light"
        />
      ) : null}

      <ProcessSteps steps={processSteps} />

      <FaqSection
        faqs={service.faqs}
        eyebrow={`${service.navLabel} FAQ`}
        title={`Questions we get about ${service.navLabel.toLowerCase()}`}
      />

      {/* Inline estimate form — the page's own conversion point */}
      <section className="bg-beige">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Start here"
              title={`Get a free ${service.navLabel.toLowerCase()} estimate`}
              description="Send a few details and photos of the space. A project manager will call you within one business day."
            />
            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Free on-site measure",
                "Itemized written pricing",
                "Permits handled by us",
                "No obligation, no pressure",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[0.9375rem] text-charcoal-800"
                >
                  <Icon name="badge-check" className="size-4.5 shrink-0 text-cedar-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-charcoal-900/8 ring-inset sm:p-8">
              <LeadForm variant="contact" defaultServiceType={service.slug} />
            </div>
          </div>
        </Container>
      </section>

      <ServiceAreas locations={locations} className="bg-offwhite" />

      <CTASection image={service.hero.src} />
    </>
  );
}
