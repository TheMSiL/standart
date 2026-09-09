import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Hammer, MapPin, Phone } from "lucide-react";
import { company, telHref } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/media/BeforeAfterSlider";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { getProject, getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";
import { projectSchema } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/projects/${project.slug}`,
    image: project.hero.src,
    imageAlt: project.hero.alt,
    type: "article",
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const related = await getProjects({
    serviceSlug: project.serviceSlug,
    excludeSlug: project.slug,
    limit: 3,
  });

  return (
    <>
      <JsonLd data={projectSchema(project)} />

      <PageHero
        eyebrow={project.serviceType}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { name: "Projects", href: "/projects" },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
        image={project.hero}
      >
        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          <div>
            <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-white/45 uppercase">
              Location
            </dt>
            <dd className="mt-1.5 flex items-center gap-1.5 font-display text-[1rem] font-semibold text-white">
              <MapPin className="size-4 text-cedar-400" strokeWidth={2.25} />
              {project.locationName}
            </dd>
          </div>
          <div>
            <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-white/45 uppercase">
              Service
            </dt>
            <dd className="mt-1.5 flex items-center gap-1.5 font-display text-[1rem] font-semibold text-white">
              <Hammer className="size-4 text-cedar-400" strokeWidth={2.25} />
              {project.serviceType}
            </dd>
          </div>
          <div>
            <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-white/45 uppercase">
              Completed
            </dt>
            <dd className="mt-1.5 flex items-center gap-1.5 font-display text-[1rem] font-semibold text-white">
              <Calendar className="size-4 text-cedar-400" strokeWidth={2.25} />
              {project.year}
            </dd>
          </div>
        </dl>
      </PageHero>

      {/* Stats strip */}
      <section className="border-b border-charcoal-900/8 bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-charcoal-900/8 sm:grid-cols-4 sm:divide-x">
            {project.stats.map((stat) => (
              <div key={stat.label} className="px-1 py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-charcoal-600 uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-[1.375rem] font-bold text-charcoal-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Story + specification */}
      <section className="bg-offwhite">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="The brief" title="What the homeowners were solving" />
            <div className="mt-6 flex flex-col gap-5">
              {project.description.map((paragraph, index) => (
                <Reveal
                  key={index}
                  delay={index * 80}
                  as="p"
                  className="text-[1.0625rem] leading-[1.7] text-charcoal-800"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-beige p-6 sm:p-7">
              <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-charcoal-600 uppercase">
                Materials &amp; specification
              </h2>
              <ul className="mt-5 flex flex-col divide-y divide-charcoal-900/10">
                {project.materials.map((material) => (
                  <li
                    key={material}
                    className="py-3 text-[0.9375rem] text-charcoal-800 first:pt-0 last:pb-0"
                  >
                    {material}
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-charcoal-900/10 pt-6">
                <p className="text-[0.9375rem] leading-relaxed text-charcoal-700">
                  Want something similar? We will price your version of this build after a free
                  on-site measure.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Button href="/free-estimate" size="md" fullWidth>
                    Get Free Estimate
                    <ArrowRight className="size-4" strokeWidth={2.25} />
                  </Button>
                  <Button href={telHref} variant="outline" size="md" fullWidth>
                    <Phone className="size-4" strokeWidth={2.25} />
                    {company.phone.display}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Before / after */}
      {project.beforeAfter ? (
        <section className="bg-beige">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              eyebrow="Before & after"
              title="Drag to see the change"
              description="The same view, before we started and after handover."
              align="center"
            />
            <Reveal className="mx-auto mt-12 max-w-4xl">
              <BeforeAfterSlider
                before={project.beforeAfter.before}
                after={project.beforeAfter.after}
                caption={project.beforeAfter.caption}
              />
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* Gallery */}
      <section className="bg-offwhite">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading eyebrow="Gallery" title="Details from this build" />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((image, index) => (
              <Reveal key={image.src} delay={Math.min(index, 3) * 70} as="li">
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-beige">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-900 ease-out-soft group-hover:scale-[1.05]"
                  />
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Phases */}
      <section className="texture-grain bg-charcoal-950">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            tone="dark"
            eyebrow="How it was built"
            title="Stages of the project"
            description="The same sequence we run on every build, adapted to what this site needed."
          />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.phases.map((phase, index) => (
              <li
                key={phase.title}
                className="rounded-2xl bg-white/[0.045] ring-1 ring-white/10 ring-inset"
              >
                <Reveal delay={Math.min(index, 4) * 70} className="flex h-full flex-col p-7">
                  <span className="font-display text-[0.75rem] font-bold tracking-[0.16em] text-cedar-400 uppercase">
                    Stage {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] text-white">{phase.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/60">
                    {phase.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {related.length > 0 ? (
        <ProjectsGrid
          projects={related}
          eyebrow="More like this"
          title="Other projects in this category"
          description=""
          tone="light"
        />
      ) : null}

      <CTASection image={project.hero.src} />
    </>
  );
}
