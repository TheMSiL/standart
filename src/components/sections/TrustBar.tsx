import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { TrustPoint } from "@/types/content";

interface TrustBarProps {
  points: TrustPoint[];
  className?: string;
}

/**
 * Compact credibility strip directly under the hero.
 *
 * Scrolls horizontally on phones rather than wrapping into a tall stack, so it
 * never pushes the first real content section below the fold.
 */
export function TrustBar({ points, className }: TrustBarProps) {
  return (
    <section
      aria-label="Why homeowners trust us"
      className={cn("border-b border-charcoal-900/8 bg-white", className)}
    >
      <Container className="py-0">
        {/*
          tabIndex 0: the rail scrolls horizontally on phones but holds no
          focusable children, so without it keyboard users cannot reach the
          off-screen items (WCAG 2.1.1).
        */}
        <ul
          tabIndex={0}
          aria-label="Credentials"
          className="no-scrollbar snap-rail -mx-5 flex gap-0 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-5"
        >
          {points.map((point) => (
            <li
              key={point.label}
              // Vertical rules between columns, suppressed at the start of each
              // row — the row length changes from 3 to 5 at the lg breakpoint.
              className={cn(
                "snap-item flex min-w-60 shrink-0 items-center gap-3 py-5 sm:min-w-0 sm:px-5",
                "border-charcoal-900/8 sm:border-l",
                "sm:nth-[3n+1]:border-l-0",
                "lg:first:border-l-0 lg:nth-[3n+1]:border-l",
              )}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-beige text-cedar-700">
                <Icon name={point.icon} className="size-4.5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-display text-[0.875rem] leading-tight font-semibold text-charcoal-900">
                  {point.label}
                </span>
                <span className="mt-0.5 truncate text-[0.75rem] text-charcoal-700">
                  {point.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
