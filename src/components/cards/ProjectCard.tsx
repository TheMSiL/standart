import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  /** Taller image for the lead card in a grid. */
  size?: "default" | "large";
  className?: string;
}

export function ProjectCard({
  project,
  priority = false,
  size = "default",
  className,
}: ProjectCardProps) {
  const large = size === "large";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-charcoal-950 shadow-card",
        "transition-[box-shadow,transform] duration-400 ease-out-soft",
        "hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", large ? "aspect-[4/3]" : "aspect-[3/2]")}>
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          priority={priority}
          sizes={
            large
              ? "(min-width: 1024px) 50vw, (min-width: 640px) 92vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 100vw"
          }
          className="object-cover transition-transform duration-900 ease-out-soft group-hover:scale-[1.06]"
        />

        {/* Legibility scrim for the overlaid text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/25 to-transparent opacity-90"
        />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal-950/65 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-white uppercase backdrop-blur-sm">
            {project.serviceType}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-cedar-300">
            <MapPin className="size-3.5" strokeWidth={2.25} />
            {project.locationName}
          </p>

          <h3
            className={cn(
              "mt-2 text-balance text-white",
              large
                ? "text-[1.375rem] sm:text-[1.625rem]"
                : "text-[1.125rem] sm:text-[1.25rem]",
            )}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </h3>

          <div className="mt-3.5 flex items-center justify-between gap-4">
            <p className="text-[0.8125rem] text-white/65">{project.material}</p>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-white">
              View Project
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.25}
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
