import Image from "next/image";
import { Phone, ShieldCheck, Star } from "lucide-react";
import { company, telHref } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/forms/LeadForm";
import type { ReviewStats, TrustPoint } from "@/types/content";

interface HeroProps {
  trustPoints: TrustPoint[];
  reviewStats: ReviewStats;
}

/**
 * Home page hero.
 *
 * Two columns on desktop: the promise on the left, a working lead form on the
 * right. Everything a first-time visitor needs in order to act — what we do,
 * where we work, why we are credible, the phone number and the form — is above
 * the fold without scrolling.
 *
 * The background is a static image rather than video: it is the LCP element, so
 * it is served through next/image with `priority` and a high fetch priority.
 * If the client supplies a hero video later, drop a <video> behind this image
 * with the image as its `poster` — the layout does not change.
 */
export function Hero({ trustPoints, reviewStats }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal-950">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/main.jpg"
          alt="Newly built composite deck wrapping a modern cedar-clad home in the Chicago suburbs"
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="100vw"
          className="object-cover object-[62%_58%]"
        />
        {/*
          Left-weighted scrim: dense enough behind the headline to clear WCAG AA,
          then released across the right half so the deck itself still reads as
          a photograph rather than a dark texture.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/72 to-charcoal-950/10 lg:via-charcoal-950/60 lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-charcoal-950/85 via-transparent to-charcoal-950/45"
        />
      </div>

      <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        {/* Promise */}
        <div className="lg:col-span-7 xl:col-span-6">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-semibold tracking-[0.16em] text-cedar-300 uppercase">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur-sm ring-inset">
              <ShieldCheck className="size-3.5" strokeWidth={2.25} />
              Licensed &amp; Insured
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur-sm ring-inset">
              <Star className="size-3.5 fill-cedar-400 text-cedar-400" strokeWidth={2} />
              {reviewStats.average} · {reviewStats.count} reviews
            </span>
          </p>

          <h1 className="mt-6 text-[2.125rem] leading-[1.06] text-balance text-white sm:text-[3rem] lg:text-[3.5rem] xl:text-[3.875rem]">
            Premium Outdoor Construction in{" "}
            <span className="text-cedar-300">Chicago &amp; Illinois</span>
          </h1>

          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-white/75 sm:text-[1.125rem]">
            Custom decks, porches, pergolas and outdoor living spaces built with quality
            materials and expert craftsmanship — by a family-owned local contractor with over 20
            years on Chicagoland job sites.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/free-estimate" size="lg" className="sm:w-auto">
              Get Free Estimate
            </Button>
            <Button href={telHref} variant="onDark" size="lg">
              <Phone className="size-4.5" strokeWidth={2.25} />
              {company.phone.display}
            </Button>
          </div>

          {/* Trust indicators */}
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/12 pt-8 sm:grid-cols-3">
            {trustPoints.slice(0, 3).map((point) => (
              <li key={point.label} className="flex items-start gap-2.5">
                <Icon name={point.icon} className="mt-0.5 size-4.5 shrink-0 text-cedar-400" />
                <span className="flex flex-col">
                  <span className="font-display text-[0.875rem] font-semibold text-white">
                    {point.label}
                  </span>
                  <span className="mt-0.5 text-[0.75rem] text-white/55">{point.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lead form */}
        <div className="lg:col-span-5 xl:col-span-5 xl:col-start-8">
          <div className="rounded-2xl bg-offwhite p-6 shadow-panel ring-1 ring-white/10 ring-inset sm:p-7">
            <div className="mb-5">
              <h2 className="text-[1.375rem] leading-tight">Tell us how we can help you</h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-charcoal-700">
                Send a few details and photos. A project manager will call you within one
                business day to book your free on-site estimate.
              </p>
            </div>

            <LeadForm variant="hero" compact />
          </div>
        </div>
      </Container>
    </section>
  );
}
