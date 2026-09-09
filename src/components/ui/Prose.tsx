import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Long-form text wrapper for legal and editorial pages.
 *
 * Styles descendants via arbitrary variants rather than pulling in the
 * typography plugin — this site only needs a handful of elements, and the
 * scale should match the design tokens rather than a plugin's defaults.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-none text-[1rem] leading-[1.75] text-charcoal-800",
        "[&_h2]:mt-12 [&_h2]:text-[1.375rem] [&_h2]:leading-tight",
        "[&_h3]:mt-8 [&_h3]:text-[1.125rem] [&_h3]:leading-tight",
        "[&_p]:mt-5",
        "[&_ul]:mt-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5 [&_ul]:pl-5",
        "[&_li]:list-disc [&_li]:marker:text-cedar-600",
        "[&_a]:font-medium [&_a]:text-cedar-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-cedar-800",
        "[&_strong]:font-semibold [&_strong]:text-charcoal-900",
        "[&>*:first-child]:mt-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
