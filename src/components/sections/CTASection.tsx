import Image from "next/image";
import { Phone } from "lucide-react";
import { company, telHref } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** Background photo. Heavily scrimmed, so almost any project shot works. */
  image?: string;
  imageAlt?: string;
  variant?: "image" | "solid";
  className?: string;
}

/**
 * Repeatable closing CTA.
 *
 * Dropped in after each major section so a visitor is never more than one
 * screen away from a way to act. Two paths, always: call now, or request the
 * estimate.
 */
export function CTASection({
  title = "Ready to build your outdoor space?",
  description = "Book a free on-site estimate. We measure, talk through materials and budget honestly, and leave you with an itemized written price — no obligation.",
  primaryLabel = "Get Free Estimate",
  primaryHref = "/free-estimate",
  image = "/images/misc/cta-evening.jpg",
  imageAlt = "",
  variant = "image",
  className,
}: CTASectionProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-charcoal-950", className)}>
      {variant === "image" ? (
        <div aria-hidden={imageAlt ? undefined : "true"} className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            quality={70}
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/80 to-charcoal-950/55" />
        </div>
      ) : (
        <div aria-hidden="true" className="texture-grain absolute inset-0 -z-10" />
      )}

      <Container className="py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[1.875rem] leading-[1.12] text-balance text-white sm:text-[2.375rem] lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
            {description}
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href={primaryHref} size="lg">
              {primaryLabel}
            </Button>
            <Button href={telHref} variant="onDark" size="lg">
              <Phone className="size-4.5" strokeWidth={2.25} />
              Call {company.phone.display}
            </Button>
          </div>

          <p className="mt-6 text-[0.8125rem] text-white/45">
            Licensed &amp; insured · Free estimates · Serving {company.serviceAreaLabel}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
