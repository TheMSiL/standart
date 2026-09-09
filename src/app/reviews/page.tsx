import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { getReviews, getReviewStats } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { reviewsSchema } from "@/lib/seo/schema";

export const metadata = buildMetadata({
  title: "Customer Reviews",
  description:
    "Read what Chicagoland homeowners say about working with Standard Build — rated 4.9 across hundreds of reviews for decks, porches and outdoor living projects.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const [reviews, stats] = await Promise.all([getReviews(), getReviewStats()]);

  // Rating distribution, computed from the reviews actually shown.
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, count, percent: reviews.length ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <>
      <JsonLd data={reviewsSchema(reviews, stats)} />

      <PageHero
        eyebrow="Reviews"
        title="What Chicagoland homeowners say"
        description="We have built this business almost entirely on referrals. These are unedited reviews from real projects — and we will give you references in your own town on request."
        breadcrumbs={[{ name: "Reviews", href: "/reviews" }]}
        image={{
          src: "/images/projects/cedar-deck-arlington-heights/hero.jpg",
          alt: "Finished cedar deck surrounded by mature trees",
        }}
      />

      {/* Aggregate summary */}
      <section className="bg-offwhite">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <div className="grid gap-8 rounded-2xl bg-white p-7 shadow-card ring-1 ring-charcoal-900/8 ring-inset sm:p-9 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-[3.5rem] leading-none font-bold text-charcoal-900">
                    {stats.average}
                  </span>
                  <span className="text-[1rem] text-charcoal-700">out of 5</span>
                </p>
                <Rating value={stats.average} className="mt-3" />
                <p className="mt-3 text-[0.9375rem] text-charcoal-700">
                  Based on {stats.count} reviews on {stats.primarySource}, Houzz and Facebook.
                </p>
              </div>

              <div className="lg:col-span-4">
                <ul className="flex flex-col gap-2">
                  {distribution.map((row) => (
                    <li key={row.star} className="flex items-center gap-3">
                      <span className="flex w-10 shrink-0 items-center gap-1 text-[0.8125rem] font-medium text-charcoal-700">
                        {row.star}
                        <Star
                          className="size-3 fill-cedar-500 text-cedar-500"
                          strokeWidth={0}
                        />
                      </span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-beige">
                        <span
                          className="block h-full rounded-full bg-cedar-500"
                          style={{ width: `${row.percent}%` }}
                        />
                      </span>
                      <span className="w-6 shrink-0 text-right text-[0.8125rem] text-charcoal-700">
                        {row.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-charcoal-900/8 pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <h2 className="text-[1.0625rem]">Leave us a review</h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal-700">
                  If we have built something for you, a few sentences genuinely helps the next
                  homeowner decide.
                </p>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-cedar-700 underline underline-offset-4 hover:text-cedar-800"
                >
                  Review us on Google
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* All reviews */}
      <section className="bg-beige">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="Every review"
            title="In their own words"
            description="Reviews are shown exactly as written, most recent first."
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <Reveal key={review.id} delay={Math.min(index, 3) * 60} as="li">
                <ReviewCard review={review} className="h-full" />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Join a few hundred happy neighbors"
        description="Free on-site estimate, itemized written pricing, and a crew that sweeps the site every evening."
      />
    </>
  );
}
