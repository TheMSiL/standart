import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/content";

interface ServiceCardProps {
  service: Service;
  priority?: boolean;
  className?: string;
}

export function ServiceCard({ service, priority = false, className }: ServiceCardProps) {
  const href = `/services/${service.slug}`;
  const visibleSubServices = service.subServices.slice(0, 3);
  const remaining = service.subServices.length - visibleSubServices.length;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-charcoal-900/8 ring-inset",
        "transition-[box-shadow,transform] duration-400 ease-out-soft",
        "hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-beige">
        <Image
          src={service.card.src}
          alt={service.card.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
          className="object-cover transition-transform duration-900 ease-out-soft group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-charcoal-950/45 via-transparent to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-[1.25rem] leading-tight transition-colors group-hover:text-cedar-700">
          {/* Stretched link: the whole card is the hit target, one link in the a11y tree. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {service.name}
          </Link>
        </h3>

        <p className="mt-1.5 text-[0.8125rem] font-medium text-cedar-700">{service.tagline}</p>

        <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-charcoal-700">
          {service.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {visibleSubServices.map((sub) => (
            <li
              key={sub.slug}
              className="rounded-full bg-beige px-2.5 py-1 text-[0.75rem] font-medium text-charcoal-800"
            >
              {sub.name}
            </li>
          ))}
          {remaining > 0 ? (
            <li className="rounded-full px-2.5 py-1 text-[0.75rem] font-medium text-charcoal-600">
              +{remaining} more
            </li>
          ) : null}
        </ul>

        <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-charcoal-900 transition-colors group-hover:text-cedar-700">
          Learn More
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2.25}
          />
        </span>
      </div>
    </article>
  );
}
