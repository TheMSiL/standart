import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Heading level — sections default to h2, keeping one h1 per page. */
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Rendered to the right of the heading on wide screens (e.g. a "view all" link). */
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <p
            className={cn(
              "mb-4 flex items-center gap-2.5 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
              centered && "justify-center",
              tone === "dark" ? "text-cedar-300" : "text-cedar-700",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-px w-7",
                tone === "dark" ? "bg-cedar-300/60" : "bg-cedar-600/45",
              )}
            />
            {eyebrow}
          </p>
        ) : null}

        <Tag
          className={cn(
            "text-[1.75rem] leading-[1.12] text-balance sm:text-[2.125rem] lg:text-[2.625rem]",
            tone === "dark" ? "text-white" : "text-charcoal-900",
          )}
        >
          {title}
        </Tag>

        {description ? (
          <div
            className={cn(
              "mt-5 text-[1.0625rem] leading-[1.65]",
              tone === "dark" ? "text-white/72" : "text-charcoal-700",
            )}
          >
            {description}
          </div>
        ) : null}
      </Reveal>

      {action ? <div className={cn("shrink-0", centered && "mx-auto")}>{action}</div> : null}
    </div>
  );
}
