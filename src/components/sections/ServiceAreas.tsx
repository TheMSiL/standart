import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Location } from "@/types/content";

interface ServiceAreasProps {
  locations: Location[];
  className?: string;
}

/**
 * Service-area coverage.
 *
 * Each town is rendered as a self-contained tile with its own blurb. When the
 * location landing pages are switched on (see src/lib/seo/landing-pages.ts),
 * these become links — the markup already anticipates it.
 */
export function ServiceAreas({ locations, className }: ServiceAreasProps) {
  return (
    <section className={cn("bg-beige", className)}>
      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="Where we work"
          title="Chicago and the surrounding Illinois suburbs"
          description="We are close enough to be on your site the same week, and we file permits in every one of these municipalities regularly."
          align="center"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location, index) => (
            <Reveal key={location.slug} delay={Math.min(index, 4) * 60} as="li">
              <div className="flex h-full flex-col rounded-xl bg-white p-5 shadow-card ring-1 ring-charcoal-900/8 ring-inset">
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-cedar-600" strokeWidth={2.25} />
                  <span className="font-display text-[1.0625rem] font-semibold text-charcoal-900">
                    {location.name}
                  </span>
                </p>
                <p className="mt-1 text-[0.75rem] font-medium tracking-[0.1em] text-charcoal-600 uppercase">
                  {location.county}
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-charcoal-700">
                  {location.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="mt-10 text-center text-[0.9375rem] text-charcoal-700">
          Not on the list? We cover most of Cook, DuPage, Kane and Will counties —{" "}
          <a href="/contact" className="font-semibold text-cedar-700 hover:underline">
            ask about your address
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
