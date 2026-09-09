import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Partner } from "@/types/content";

interface PartnerLogosProps {
  partners: Partner[];
  title?: string;
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Manufacturer credential badges.
 *
 * Featured partners (Trex PRO, TimberTech PRO) get the large treatment because
 * they carry the most weight with homeowners comparing contractors.
 *
 * Each badge renders the partner's official logo when `partner.logo` is set,
 * and falls back to an accessible typographic wordmark otherwise — so the
 * section looks intentional before the client supplies licensed brand artwork,
 * and needs no layout changes once they do.
 */
export function PartnerLogos({
  partners,
  title = "Certified installer for the materials we recommend",
  className,
  tone = "light",
}: PartnerLogosProps) {
  const featured = partners.filter((p) => p.featured);
  const rest = partners.filter((p) => !p.featured);
  const dark = tone === "dark";

  return (
    <section
      aria-label="Manufacturer certifications"
      className={cn(dark ? "bg-charcoal-900" : "bg-offwhite", className)}
    >
      <Container className="py-14 sm:py-16">
        <Reveal>
          <p
            className={cn(
              "text-center text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
              dark ? "text-white/50" : "text-charcoal-600",
            )}
          >
            {title}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
            {featured.map((partner) => (
              <PartnerBadge key={partner.name} partner={partner} dark={dark} featured />
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-3 flex flex-wrap items-stretch justify-center gap-3 sm:mt-4 sm:gap-4">
            {rest.map((partner) => (
              <PartnerBadge key={partner.name} partner={partner} dark={dark} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function PartnerBadge({
  partner,
  dark,
  featured = false,
}: {
  partner: Partner;
  dark: boolean;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors sm:px-5",
        featured ? "sm:py-4" : "sm:py-3",
        dark
          ? "bg-white/6 ring-1 ring-white/12 ring-inset"
          : "bg-white shadow-card ring-1 ring-charcoal-900/8 ring-inset",
      )}
    >
      {partner.logo ? (
        <Image
          src={partner.logo.src}
          alt={partner.logo.alt}
          width={featured ? 132 : 104}
          height={featured ? 36 : 28}
          className={cn("h-auto w-auto object-contain", featured ? "max-h-9" : "max-h-7")}
        />
      ) : (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-extrabold tracking-[0.04em] uppercase",
              featured ? "text-[1.0625rem] sm:text-[1.1875rem]" : "text-[0.9375rem]",
              dark ? "text-white" : "text-charcoal-900",
            )}
          >
            {partner.name}
          </span>
          <span
            className={cn(
              "mt-1.5 text-[0.625rem] font-semibold tracking-[0.12em] uppercase",
              dark ? "text-white/45" : "text-charcoal-600",
            )}
          >
            {partner.credential}
          </span>
        </span>
      )}

      {featured ? (
        <BadgeCheck
          className={cn("size-5 shrink-0", dark ? "text-cedar-400" : "text-cedar-600")}
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
