import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Differentiator } from "@/types/content";

interface WhyChooseUsProps {
  items: Differentiator[];
  className?: string;
}

/**
 * Reasons to hire us.
 *
 * Dark section, so it reads as a deliberate pause between the two lightest
 * parts of the page. Counters animate once on scroll and render their final
 * value server-side, so the numbers are never blank or wrong.
 */
export function WhyChooseUs({ items, className }: WhyChooseUsProps) {
  return (
    <section
      className={cn(
        "texture-grain relative isolate overflow-hidden bg-charcoal-950",
        className,
      )}
    >
      {/* Low-contrast photographic ground so the panel is not a flat block */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.16]">
        <Image
          src="/images/about/building-deck.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal-950 via-charcoal-950/70 to-charcoal-950" />
      </div>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading
          tone="dark"
          eyebrow="Why Standard Build"
          title="The reasons homeowners pick us over the cheapest quote"
          description="There is always someone who will do it for less. What follows is what you get instead."
        />

        {/*
          Gapped tiles rather than a hairline-divided slab: the item count is odd,
          so a divided grid would leave visibly empty cells in the last row.
        */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="rounded-2xl bg-white/[0.045] ring-1 ring-white/10 backdrop-blur-sm ring-inset"
            >
              <Reveal
                delay={Math.min(index, 5) * 60}
                className="flex h-full flex-col p-7 sm:p-8"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-cedar-600/15 text-cedar-300 ring-1 ring-cedar-500/25 ring-inset">
                  <Icon name={item.icon} className="size-5" />
                </span>

                {item.counter ? (
                  <p className="mt-5 font-display text-[2.25rem] leading-none font-bold text-white">
                    <Counter
                      value={item.counter.value}
                      suffix={item.counter.suffix}
                      prefix={item.counter.prefix}
                    />
                  </p>
                ) : null}

                <h3
                  className={cn("text-[1.0625rem] text-white", item.counter ? "mt-3" : "mt-5")}
                >
                  {item.title}
                </h3>

                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/60">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
