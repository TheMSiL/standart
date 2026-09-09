import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  /** Trail excluding Home, which is prepended automatically. */
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Breadcrumb trail plus its BreadcrumbList structured data, so the two can
 * never disagree about the page hierarchy.
 */
export function Breadcrumbs({ items, tone = "light", className }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ name: "Home", href: "/" }, ...items];
  const dark = tone === "dark";

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          className={cn(
            "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem]",
            dark ? "text-white/60" : "text-charcoal-700",
          )}
        >
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight
                    className={cn("size-3.5", dark ? "text-white/30" : "text-charcoal-900/30")}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : null}
                {isLast ? (
                  <span
                    aria-current="page"
                    className={dark ? "text-white" : "text-charcoal-900"}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors",
                      dark ? "hover:text-white" : "hover:text-cedar-700",
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
