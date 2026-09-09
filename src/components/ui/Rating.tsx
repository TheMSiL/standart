import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  /** 0–5, fractional values render a partially filled star. */
  value: number;
  className?: string;
  starClassName?: string;
  /** Overrides the generated screen-reader label. */
  label?: string;
}

/**
 * Five-star display.
 *
 * The rating is announced once, through `role="img"` + `aria-label` on the
 * wrapper, rather than by a visually hidden child. That keeps five decorative
 * stars out of the accessibility tree and, just as importantly, avoids an
 * absolutely positioned `.sr-only` node: inside a horizontally scrolling rail
 * such a node resolves its containing block against an ancestor, escapes the
 * rail's overflow clip, and adds its offset to the document's scroll width.
 */
export function Rating({ value, className, starClassName, label }: RatingProps) {
  const clamped = Math.max(0, Math.min(5, value));

  return (
    <span
      role="img"
      aria-label={label ?? `Rated ${clamped} out of 5`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, clamped - index));
        return (
          <span key={index} className="relative inline-block" aria-hidden="true">
            <Star className={cn("size-4 text-cedar-600/25", starClassName)} strokeWidth={1.5} />
            {fill > 0 ? (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className={cn("size-4 fill-cedar-500 text-cedar-500", starClassName)}
                  strokeWidth={1.5}
                />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}
