import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

interface ProjectsGridProps {
  projects: Project[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showViewAll?: boolean;
  className?: string;
  headingLevel?: "h1" | "h2";
  tone?: "light" | "sand";
  /** Cards per row at the largest breakpoint. */
  columns?: 2 | 3;
}

/**
 * Portfolio grid.
 *
 * Deliberately uniform: identical card proportions keep rows flush and let the
 * photography carry the section, which is what a prospective client is actually
 * scanning for.
 */
export function ProjectsGrid({
  projects,
  eyebrow = "Recent work",
  title = "Projects built across Chicagoland",
  description = "Every project below was designed, permitted and built by our own crews. Open one to see the materials, the schedule and the before and after.",
  showViewAll = true,
  className,
  headingLevel = "h2",
  tone = "sand",
  columns = 3,
}: ProjectsGridProps) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      className={cn(tone === "sand" ? "bg-beige" : "bg-offwhite", className)}
    >
      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading
          as={headingLevel}
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            showViewAll ? (
              <Button href="/projects" variant="outline" size="md">
                View All Projects
                <ArrowRight className="size-4" strokeWidth={2.25} />
              </Button>
            ) : undefined
          }
        />

        <div
          className={cn(
            "mt-12 grid gap-5 sm:grid-cols-2",
            columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
          )}
        >
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index, 3) * 70}>
              <ProjectCard
                project={project}
                size={columns === 2 ? "large" : "default"}
                priority={index < 3}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
