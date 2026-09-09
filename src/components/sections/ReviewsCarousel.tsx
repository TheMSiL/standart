"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { cn } from "@/lib/utils";
import type { Review, ReviewStats } from "@/types/content";

interface ReviewsCarouselProps {
  reviews: Review[];
  stats: ReviewStats;
  className?: string;
  showViewAll?: boolean;
}

/**
 * Horizontal review rail.
 *
 * Built on native scroll-snap rather than a carousel library: it is keyboard
 * accessible and swipeable for free, degrades to a plain scrollable list
 * without JavaScript, and costs nothing in bundle size. The arrows simply
 * scroll the container by one card.
 */
export function ReviewsCarousel({
  reviews,
  stats,
  className,
  showViewAll = true,
}: ReviewsCarouselProps) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    updateEdges();
    rail.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      rail.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const amount = card ? card.clientWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section id="reviews" className={cn("bg-offwhite", className)}>
      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="What our clients say"
          title={`Rated ${stats.average} across hundreds of Chicagoland homeowners`}
          description="Real reviews from real projects. We will happily give you references in your own town."
          action={
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                aria-label="Previous reviews"
                className="grid size-11 place-items-center rounded-full border border-charcoal-900/15 bg-white text-charcoal-900 transition-colors hover:border-charcoal-900/35 disabled:opacity-35"
              >
                <ChevronLeft className="size-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                aria-label="Next reviews"
                className="grid size-11 place-items-center rounded-full border border-charcoal-900/15 bg-white text-charcoal-900 transition-colors hover:border-charcoal-900/35 disabled:opacity-35"
              >
                <ChevronRight className="size-5" strokeWidth={2} />
              </button>
            </div>
          }
        />

        {/* Aggregate */}
        <Reveal delay={60}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl bg-white px-6 py-5 shadow-card ring-1 ring-charcoal-900/8 ring-inset">
            <div className="flex items-center gap-3">
              <span className="font-display text-[2.5rem] leading-none font-bold text-charcoal-900">
                {stats.average}
              </span>
              <span className="flex flex-col">
                <Rating value={stats.average} />
                <span className="mt-1 text-[0.8125rem] text-charcoal-700">
                  {stats.count} reviews on {stats.primarySource}
                </span>
              </span>
            </div>
            <span aria-hidden="true" className="hidden h-10 w-px bg-charcoal-900/10 sm:block" />
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-charcoal-700">
              Over two decades we have built our business almost entirely on referrals from
              neighbors who saw the work go up next door.
            </p>
          </div>
        </Reveal>

        {/* Rail */}
        <ul
          ref={railRef}
          tabIndex={0}
          aria-label="Customer reviews"
          className="no-scrollbar snap-rail -mx-5 mt-6 flex gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
        >
          {reviews.map((review) => (
            <li key={review.id} className="snap-item w-[min(22rem,84vw)] shrink-0 sm:w-[24rem]">
              <ReviewCard review={review} clamp className="h-full" />
            </li>
          ))}
        </ul>

        {showViewAll ? (
          <div className="mt-10 flex justify-center">
            <Button href="/reviews" variant="outline" size="lg">
              Read More Reviews
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
