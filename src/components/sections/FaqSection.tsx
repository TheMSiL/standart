import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company, telHref } from "@/data/company";
import { faqSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";
import type { Faq } from "@/types/content";

interface FaqSectionProps {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  /** Emits FAQPage structured data. Only one per page should do this. */
  withSchema?: boolean;
}

export function FaqSection({
  faqs,
  eyebrow = "Common questions",
  title = "Answers before you have to ask",
  description,
  className,
  withSchema = true,
}: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className={cn("bg-offwhite", className)}>
      {withSchema ? <JsonLd data={faqSchema(faqs)} /> : null}

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          <Reveal delay={100}>
            {/* White, not beige: this section is rendered on both backgrounds. */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-card ring-1 ring-charcoal-900/8 ring-inset">
              <h3 className="text-[1.0625rem]">Still not sure?</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal-700">
                Call and ask. We would rather talk you out of the wrong project than sell you
                one.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button href={telHref} size="md" fullWidth>
                  Call {company.phone.display}
                </Button>
                <Button href="/contact" variant="outline" size="md" fullWidth>
                  Send a Message
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
