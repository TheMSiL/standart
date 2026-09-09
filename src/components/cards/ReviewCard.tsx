import Image from "next/image";
import { Quote } from "lucide-react";
import { GoogleColorMark } from "@/components/ui/BrandIcons";
import { Rating } from "@/components/ui/Rating";
import { cn, formatMonthYear } from "@/lib/utils";
import type { Review } from "@/types/content";

const sourceLabels: Record<Review["source"], string> = {
  google: "Google Review",
  houzz: "Houzz Review",
  facebook: "Facebook Review",
  direct: "Verified Customer",
};

interface ReviewCardProps {
  review: Review;
  className?: string;
  /** Clamps the body so a rail of cards keeps a consistent height. */
  clamp?: boolean;
}

export function ReviewCard({ review, className, clamp = false }: ReviewCardProps) {
  const initials = review.author
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ring-charcoal-900/8 ring-inset sm:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Rating value={review.rating} label={`Rated ${review.rating} out of 5`} />
        <Quote
          className="size-6 shrink-0 text-cedar-200"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </div>

      <blockquote
        className={cn(
          "mt-4 flex-1 text-[0.9375rem] leading-[1.7] text-charcoal-800",
          clamp && "line-clamp-6",
        )}
      >
        {review.body}
      </blockquote>

      {review.image ? (
        <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-beige">
          <Image
            src={review.image.src}
            alt={review.image.alt}
            fill
            sizes="(min-width: 1024px) 24rem, 90vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <figcaption className="mt-6 flex items-center gap-3 border-t border-charcoal-900/8 pt-5">
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-beige font-display text-[0.875rem] font-bold text-cedar-800"
        >
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[0.9375rem] font-semibold text-charcoal-900">
            {review.author}
          </p>
          <p className="mt-0.5 truncate text-[0.8125rem] text-charcoal-700">
            {review.serviceType ? `${review.serviceType} · ` : ""}
            {review.locationName}
          </p>
        </div>
        <div className="flex min-w-0 shrink-0 flex-col items-end gap-1">
          <span className="flex items-center gap-1.5 text-[0.75rem] font-medium text-charcoal-700">
            {review.source === "google" ? <GoogleColorMark className="size-3.5" /> : null}
            <span className="hidden sm:inline">{sourceLabels[review.source]}</span>
          </span>
          <time dateTime={review.date} className="text-[0.6875rem] text-charcoal-600">
            {formatMonthYear(review.date)}
          </time>
        </div>
      </figcaption>
    </figure>
  );
}
