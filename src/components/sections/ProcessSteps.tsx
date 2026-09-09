import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types/content";

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
  /** Adds the supporting photo to each step (used on the About page). */
  withImages?: boolean;
}

/**
 * How a project runs, start to finish.
 *
 * A single connecting rule ties the numbered markers together — vertical on
 * mobile, horizontal from `lg` up — so the sequence reads as one process
 * rather than five detached cards.
 */
export function ProcessSteps({ steps, className, withImages = false }: ProcessStepsProps) {
  return (
    <section id="process" className={cn("bg-offwhite", className)}>
      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="Five steps, and you always know which one you are on"
          description="No vanishing crews, no surprise invoices, no wondering whether the permit was ever filed."
          align="center"
        />

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Connecting rule */}
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[1.375rem] w-px bg-linear-to-b from-cedar-300 via-cedar-300/50 to-transparent lg:top-[1.375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-linear-to-r lg:from-transparent lg:via-cedar-300 lg:to-transparent"
          />

          {steps.map((step, index) => (
            <li key={step.step} className="relative">
              <Reveal delay={index * 90} className="flex gap-5 lg:flex-col lg:gap-0">
                <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-cedar-600 font-display text-[1rem] font-bold text-white shadow-[0_8px_20px_-8px_rgba(165,95,42,0.9)] ring-4 ring-offwhite">
                  {step.step}
                </span>

                <div className="lg:mt-6">
                  {withImages && step.image ? (
                    <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-beige">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  <h3 className="text-[1.125rem] leading-tight">{step.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-charcoal-700">
                    {step.description}
                  </p>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-charcoal-600">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
