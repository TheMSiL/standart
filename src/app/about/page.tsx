import Image from "next/image";
import { Phone } from "lucide-react";
import { company, telHref, yearsInBusiness } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { companyStats, differentiators, partners, processSteps } from "@/data/site-content";
import { getLocations } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About Standard Build",
  description:
    "A family-owned Chicago contractor building premium decks, porches and outdoor living spaces across Illinois since 2004. Licensed, insured and accountable start to finish.",
  path: "/about",
  image: "/images/about/team.jpg",
});

const values = [
  {
    icon: "ruler",
    title: "We specify before we sell",
    body: "The measure comes first, the number comes second. Nobody at this company is paid to close you on the doorstep.",
  },
  {
    icon: "hammer",
    title: "Our own crews build it",
    body: "We do not hand your project to whichever subcontractor is free that week. The same crew starts it and finishes it.",
  },
  {
    icon: "clipboard",
    title: "One person is accountable",
    body: "A named project manager owns your job from the first call to the final walkthrough — and answers their phone.",
  },
  {
    icon: "gem",
    title: "We build for year fifteen",
    body: "Flashed ledgers, taped joists, stainless hardware. The parts you never see are the parts that decide how long it lasts.",
  },
];

export default async function AboutPage() {
  const locations = await getLocations();
  const years = yearsInBusiness();

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A family-owned Chicago contractor, building since 2004"
        description={`${years} years, hundreds of projects and nine communities later, the person who quotes your project is still the person who answers when you call about it.`}
        breadcrumbs={[{ name: "About", href: "/about" }]}
        image={{
          src: "/images/about/team.jpg",
          alt: "The Standard Build team reviewing plans on a job site",
        }}
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

      {/* Numbers */}
      <section className="border-b border-charcoal-900/8 bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-charcoal-900/8 lg:grid-cols-4 lg:divide-x">
            {companyStats.map((stat) => (
              <div key={stat.label} className="px-1 py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <dd className="font-display text-[2.25rem] leading-none font-bold text-charcoal-900 sm:text-[2.75rem]">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? (stat.decimals as number) : 0}
                  />
                </dd>
                <dt className="mt-3 text-[0.8125rem] font-medium text-charcoal-700">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-offwhite">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Our story" title="It started with one crew and a truck" />
            <div className="mt-6 flex flex-col gap-5 text-[1.0625rem] leading-[1.7] text-charcoal-800">
              <Reveal as="p">
                In {company.foundedYear} we were building decks on the northwest side of Chicago
                — one crew, one truck, and a rule that we would not leave a site until it was
                swept. Most of our work that first year came from neighbors who watched a deck
                go up next door and walked over to ask who was building it.
              </Reveal>
              <Reveal as="p" delay={80}>
                That is still, honestly, most of where our work comes from. We have grown into
                porches, pergolas, outdoor kitchens, spa structures and catios, and we now build
                across nine communities — but we have deliberately never grown past the point
                where the owner can walk every active job site in a week.
              </Reveal>
              <Reveal as="p" delay={160}>
                What that means for you is simple. You are not passed from a salesperson to a
                scheduler to whichever subcontractor was free. You get one project manager, one
                crew, one written price, and one phone number that gets answered.
              </Reveal>
            </div>
          </div>

          <Reveal delay={120} className="lg:col-span-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-beige sm:mt-8">
                <Image
                  src="/images/about/building-deck.jpg"
                  alt="Crew assembling deck framing on a residential site"
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-beige">
                <Image
                  src="/images/about/crew-on-site.jpg"
                  alt="Standard Build crew members on site in hard hats"
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-beige">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="How we work"
            title="Four things we will not compromise on"
            align="center"
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 70} as="li">
                <div className="flex h-full gap-4 rounded-2xl bg-white p-6 shadow-card ring-1 ring-charcoal-900/8 ring-inset sm:p-7">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cedar-600/10 text-cedar-700">
                    <Icon name={value.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] leading-tight">{value.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-charcoal-700">
                      {value.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <WhyChooseUs items={differentiators} />

      <ProcessSteps steps={processSteps} withImages />

      <PartnerLogos partners={partners} className="bg-beige" />

      <ServiceAreas locations={locations} className="bg-offwhite" />

      <CTASection
        title="Let's talk about your project"
        description="Free on-site estimate, itemized written pricing, and an honest answer about cost and schedule."
        image="/images/about/suburban-home.jpg"
      />
    </>
  );
}
