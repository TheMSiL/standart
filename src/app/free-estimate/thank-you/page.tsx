import { CheckCircle2, Phone } from "lucide-react";
import { company, telHref } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Thank You",
  description:
    "Your estimate request has been received. A project manager will be in touch within one business day.",
  path: "/free-estimate/thank-you",
  // A confirmation page has no search value and should never rank.
  noIndex: true,
});

const nextSteps = [
  {
    step: "01",
    title: "We review your details",
    body: "A project manager reads through what you sent, including any photos, before calling.",
  },
  {
    step: "02",
    title: "We call you within one business day",
    body: `From ${company.phone.display}. If you miss it we will leave a message and email you.`,
  },
  {
    step: "03",
    title: "We book the on-site measure",
    body: "Usually within the same week, at a time that works around your schedule.",
  },
];

export default async function ThankYouPage() {
  const projects = await getProjects({ featuredOnly: true, limit: 3 });

  return (
    <>
      <section className="texture-grain bg-charcoal-950">
        <Container className="py-20 sm:py-24 lg:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success ring-1 ring-success/30 ring-inset">
              <CheckCircle2 className="size-8" strokeWidth={1.75} />
            </span>

            <h1 className="mt-7 text-[2rem] leading-[1.1] text-balance text-white sm:text-[2.625rem]">
              Thank you — your request is in
            </h1>

            <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/70">
              A project manager will call you within one business day to talk through the
              project and book your free on-site estimate. If it is urgent, call us directly and
              we will pick it up right away.
            </p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button href={telHref} size="lg">
                <Phone className="size-4.5" strokeWidth={2.25} />
                Call {company.phone.display}
              </Button>
              <Button href="/projects" variant="onDark" size="lg">
                Back to Projects
              </Button>
            </div>
          </Reveal>

          <ol className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
            {nextSteps.map((item, index) => (
              <li
                key={item.step}
                className="rounded-2xl bg-white/[0.045] ring-1 ring-white/10 ring-inset"
              >
                <Reveal delay={index * 80} className="flex h-full flex-col p-6 sm:p-7">
                  <span className="font-display text-[0.75rem] font-bold tracking-[0.16em] text-cedar-400 uppercase">
                    {item.step}
                  </span>
                  <h2 className="mt-3 text-[1rem] text-white">{item.title}</h2>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-white/60">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ProjectsGrid
        projects={projects}
        eyebrow="While you wait"
        title="Have a look at what we have been building"
        description="A few recent projects across Chicagoland."
        tone="light"
      />
    </>
  );
}
