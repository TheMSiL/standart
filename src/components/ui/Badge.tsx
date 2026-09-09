import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "sand" | "cedar" | "dark" | "onDark" | "outline";

const tones: Record<BadgeTone, string> = {
  sand: "bg-beige text-charcoal-800 ring-1 ring-inset ring-charcoal-900/8",
  cedar: "bg-cedar-100 text-cedar-800 ring-1 ring-inset ring-cedar-600/20",
  dark: "bg-charcoal-900 text-offwhite",
  onDark: "bg-white/10 text-white/85 ring-1 ring-inset ring-white/18 backdrop-blur-sm",
  outline: "text-charcoal-700 ring-1 ring-inset ring-charcoal-900/15",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  /** Small uppercase treatment for kickers and eyebrows. */
  uppercase?: boolean;
}

export function Badge({ children, tone = "sand", className, uppercase }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.75rem] leading-5 font-semibold",
        uppercase && "text-[0.6875rem] tracking-[0.12em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
