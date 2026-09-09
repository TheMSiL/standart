import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/lib/seo/schema";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  image?: { src: string; alt: string };
  /** Extra content under the copy — CTAs, meta rows, chips. */
  children?: ReactNode;
  /** Right-hand slot, e.g. a form card on the estimate page. */
  aside?: ReactNode;
  className?: string;
  size?: "default" | "compact";
}

/**
 * Shared hero for every page other than the home page.
 *
 * Keeps the h1, breadcrumbs, structured data and scrim treatment identical
 * across routes — which is what stops a 12-page site from drifting into
 * twelve slightly different headers.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  children,
  aside,
  className,
  size = "default",
}: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-charcoal-950", className)}>
      <div className="absolute inset-0 -z-10">
        {image ? (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              quality={78}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/50"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-transparent to-charcoal-950/45"
            />
          </>
        ) : (
          <div aria-hidden="true" className="texture-grain absolute inset-0 bg-charcoal-950" />
        )}
      </div>

      <Container
        className={cn(
          aside ? "grid gap-10 lg:grid-cols-12 lg:gap-12" : "",
          size === "compact" ? "py-12 sm:py-14" : "py-14 sm:py-18 lg:py-22",
        )}
      >
        <div className={cn(aside ? "lg:col-span-7" : "max-w-3xl")}>
          <Breadcrumbs items={breadcrumbs} tone="dark" className="mb-7" />

          {eyebrow ? (
            <p className="mb-4 flex items-center gap-2.5 text-[0.6875rem] font-semibold tracking-[0.18em] text-cedar-300 uppercase">
              <span aria-hidden="true" className="h-px w-7 bg-cedar-300/60" />
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-[2rem] leading-[1.08] text-balance text-white sm:text-[2.625rem] lg:text-[3.125rem]">
            {title}
          </h1>

          {description ? (
            <div className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-white/72">
              {description}
            </div>
          ) : null}

          {children}
        </div>

        {aside ? <div className="lg:col-span-5">{aside}</div> : null}
      </Container>
    </section>
  );
}
