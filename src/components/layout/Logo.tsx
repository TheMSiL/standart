import Link from "next/link";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "light" | "dark";
  /** Hides the wordmark, leaving only the mark (used in tight mobile bars). */
  markOnly?: boolean;
}

/**
 * Wordmark + mark.
 *
 * Drawn inline as SVG so it stays crisp at any size, inherits colour from the
 * surrounding theme, and costs no extra request. Swap the <svg> for the
 * client's supplied logo file when one exists — the layout around it is
 * unaffected.
 */
export function Logo({ className, tone = "light", markOnly = false }: LogoProps) {
  const dark = tone === "dark";

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${company.name} — home`}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-[9px] transition-colors",
          dark ? "bg-white/12 ring-1 ring-white/20 ring-inset" : "bg-charcoal-900",
        )}
      >
        {/*
          Deck plane in perspective: three boards receding to a vanishing point,
          with the leading edge picked out in cedar. Stacked equal-length bars
          read as a hamburger icon at this size, which is why the boards taper.
        */}
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M2.6 19.4h18.8L16.9 9.6H7.1L2.6 19.4Z"
            fill="currentColor"
            className={dark ? "text-white/90" : "text-offwhite"}
          />
          <path
            d="M6.2 16.6h11.6M7.8 13.6h8.4"
            stroke="var(--color-charcoal-900)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path d="M9.4 4.6h5.2l1.4 3.1H8L9.4 4.6Z" fill="var(--color-cedar-400)" />
        </svg>
      </span>

      {markOnly ? null : (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.0625rem] font-extrabold tracking-[0.06em] uppercase",
              dark ? "text-white" : "text-charcoal-900",
            )}
          >
            Standard<span className="text-cedar-600">Build</span>
          </span>
          <span
            className={cn(
              "mt-1 text-[0.5625rem] font-semibold tracking-[0.22em] uppercase",
              dark ? "text-white/55" : "text-charcoal-600",
            )}
          >
            Outdoor Construction
          </span>
        </span>
      )}
    </Link>
  );
}
