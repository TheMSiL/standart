"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";
import type { Location, Project, Service } from "@/types/content";

interface ProjectFiltersProps {
  projects: Project[];
  services: Service[];
  locations: Location[];
  className?: string;
}

const ALL = "all";

/**
 * Filterable portfolio grid.
 *
 * Filtering happens client-side over an already-rendered list: the full set of
 * projects is in the initial HTML, so every card is crawlable and the page is
 * useful before hydration. The filters are progressive enhancement, not the
 * mechanism that puts content on the page.
 */
export function ProjectFilters({
  projects,
  services,
  locations,
  className,
}: ProjectFiltersProps) {
  const [service, setService] = useState<string>(ALL);
  const [location, setLocation] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (service === ALL || project.serviceSlug === service) &&
          (location === ALL || project.locationSlug === location),
      ),
    [projects, service, location],
  );

  const reset = () => {
    setService(ALL);
    setLocation(ALL);
  };

  return (
    <section className={cn("bg-offwhite", className)}>
      <Container className="py-12 sm:py-16 lg:py-20">
        {/*
          The grid sits directly under the page h1 with no visible section
          heading, and each card is an h3 — this keeps the outline contiguous
          without adding visual noise.
        */}
        <h2 className="sr-only">All projects</h2>

        {/* Filter rails */}
        <div className="flex flex-col gap-5">
          <FilterRow
            label="Service"
            options={[
              { value: ALL, label: "All services" },
              ...services.map((s) => ({ value: s.slug, label: s.navLabel })),
            ]}
            value={service}
            onChange={setService}
          />
          <FilterRow
            label="Location"
            options={[
              { value: ALL, label: "All locations" },
              ...locations.map((l) => ({ value: l.slug, label: l.name })),
            ]}
            value={location}
            onChange={setLocation}
          />
        </div>

        <p
          aria-live="polite"
          className="mt-7 flex items-center gap-2 text-[0.875rem] text-charcoal-700"
        >
          <SlidersHorizontal className="size-4 text-cedar-600" strokeWidth={2} />
          Showing <strong className="font-semibold text-charcoal-900">{filtered.length}</strong>
          {filtered.length === 1 ? " project" : " projects"}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <Reveal key={project.slug} delay={Math.min(index, 3) * 60}>
                <ProjectCard project={project} priority={index < 3} className="h-full" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-charcoal-900/20 bg-white p-12 text-center">
            <h2 className="text-[1.125rem]">Nothing matches that combination yet</h2>
            <p className="mx-auto mt-2 max-w-md text-[0.9375rem] text-charcoal-700">
              We have almost certainly built something close — the portfolio here is a
              selection, not the whole archive.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 font-semibold text-cedar-700 underline underline-offset-4 hover:text-cedar-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <span className="shrink-0 text-[0.6875rem] font-semibold tracking-[0.16em] text-charcoal-600 uppercase sm:w-20">
        {label}
      </span>
      <div
        role="group"
        aria-label={`Filter by ${label.toLowerCase()}`}
        className="no-scrollbar snap-rail -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={cn(
                "snap-item shrink-0 rounded-full px-4 py-2 text-[0.875rem] font-medium transition-colors",
                active
                  ? "bg-charcoal-900 text-offwhite"
                  : "bg-white text-charcoal-800 ring-1 ring-charcoal-900/12 ring-inset hover:ring-charcoal-900/30",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
