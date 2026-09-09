import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { company, yearsInBusiness } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface AboutPreviewProps {
  className?: string;
}

const points = [
  "The same family has run this company since 2004.",
  "Our own crews — we do not subcontract the build out.",
  "One project manager, from first call to final walkthrough.",
  "Written, itemized pricing before a single board is ordered.",
];

/**
 * Short company story for the home page.
 *
 * Kept to four short claims and three numbers rather than paragraphs of
 * history — the full story lives on /about.
 */
export function AboutPreview({ className }: AboutPreviewProps) {
  const years = yearsInBusiness();

  return (
    <section className={cn("bg-beige", className)}>
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Image collage */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-card sm:aspect-[4/3] lg:aspect-[5/6]">
            <Image
              src="/images/about/team.jpg"
              alt="The Standard Build project team reviewing plans on a job site"
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          </div>

          {/* Overlapping detail shot — hidden on the narrowest screens */}
          <div className="absolute -right-4 -bottom-8 hidden w-44 overflow-hidden rounded-xl shadow-lift ring-4 ring-beige sm:block lg:-right-8 lg:w-56">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/about/nail-gun.jpg"
                alt="Carpenter fastening framing with a nail gun"
                fill
                sizes="14rem"
                className="object-cover"
              />
            </div>
          </div>

          {/* Years badge */}
          <div className="absolute top-6 -left-3 rounded-xl bg-cedar-600 px-4 py-3 text-white shadow-lift lg:-left-6">
            <p className="font-display text-[1.75rem] leading-none font-bold">
              <Counter value={years} suffix="+" />
            </p>
            <p className="mt-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-white/80 uppercase">
              Years building
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="About Standard Build"
            title="A local contractor you can actually get on the phone"
            description={
              <>
                <p>
                  We started in {company.foundedYear} with one crew and a truck, building decks
                  on the northwest side. {years} years later we build across nine communities,
                  and the thing that has not changed is who is accountable: the person who
                  quotes your project is the person who answers when you call about it.
                </p>
              </>
            }
          />

          <ul className="mt-8 flex flex-col gap-3.5">
            {points.map((point, index) => (
              <Reveal key={point} delay={index * 70} as="li" className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cedar-600/12 text-cedar-700">
                  <Check className="size-3.5" strokeWidth={2.75} />
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-charcoal-800">
                  {point}
                </span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/about" variant="secondary" size="lg">
              More About Us
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              See Our Work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
