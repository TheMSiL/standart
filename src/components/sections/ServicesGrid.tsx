import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { company, telHref } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/content";

interface ServicesGridProps {
  services: Service[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showViewAll?: boolean;
  className?: string;
  headingLevel?: "h1" | "h2";
  /**
   * Adds a "not sure which you need" tile after the last card. With five
   * services this also squares off the 3-column grid instead of leaving a hole.
   */
  withHelpTile?: boolean;
}

export function ServicesGrid({
  services,
  eyebrow = "What we build",
  title = "Outdoor construction, done properly",
  description = "Five things we do, and nothing we do not. Every project is built by our own crews, under one project manager, with materials we are certified to install.",
  showViewAll = true,
  className,
  headingLevel = "h2",
  withHelpTile = true,
}: ServicesGridProps) {
  return (
    <section id="services" className={cn("bg-offwhite", className)}>
      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading
          as={headingLevel}
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            showViewAll ? (
              <Button href="/services" variant="outline" size="md">
                All Services
                <ArrowRight className="size-4" strokeWidth={2.25} />
              </Button>
            ) : undefined
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={Math.min(index, 3) * 80}>
              <ServiceCard service={service} priority={index < 3} className="h-full" />
            </Reveal>
          ))}

          {withHelpTile ? (
            <Reveal delay={Math.min(services.length, 3) * 80}>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-charcoal-900 p-7 text-white sm:p-8">
                <div>
                  <h3 className="text-[1.25rem] leading-tight text-white">
                    Not sure which one you need?
                  </h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-white/65">
                    Most projects cross two or three of these. Describe what you want the space
                    to do and we will tell you what it actually takes to build it.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-2.5">
                  <Button href="/free-estimate" size="md" fullWidth>
                    Get Free Estimate
                    <ArrowRight className="size-4" strokeWidth={2.25} />
                  </Button>
                  <Link
                    href={telHref}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/25 px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/10"
                  >
                    <Phone className="size-4" strokeWidth={2.25} />
                    {company.phone.display}
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
