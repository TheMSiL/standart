import { company, mailHref } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms that apply to your use of the ${company.name} website.`,
  path: "/terms",
});

const LAST_UPDATED = "January 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        description={`Last updated: ${LAST_UPDATED}`}
        breadcrumbs={[{ name: "Terms of Service", href: "/terms" }]}
        size="compact"
      />

      <section className="bg-offwhite">
        <Container size="narrow" className="py-16 sm:py-20">
          <Prose>
            <p>
              These terms apply to your use of this website. They do not replace the written
              contract for any construction work, which governs the project itself.
            </p>

            <h2>Use of this site</h2>
            <p>
              You may browse this site and submit enquiries for genuine, personal or commercial
              construction purposes. You may not use it to send unsolicited commercial messages,
              to scrape content in bulk, or to attempt to interfere with its operation.
            </p>

            <h2>Estimates and pricing</h2>
            <p>
              Any figures shown on this site — including per-square-foot ranges and indicative
              project costs — are illustrative and are not an offer. A binding price is only
              ever given in a written estimate issued after an on-site measure, and is subject
              to the terms stated in that document.
            </p>
            <p>
              Submitting a form does not create a contract. A contract exists only when a
              written proposal has been signed by both you and {company.legalName}.
            </p>

            <h2>Project photography</h2>
            <p>
              Photographs of completed work shown on this site are of projects we have built, or
              are representative examples where noted. Materials, dimensions and finishes vary
              by project and by site conditions.
            </p>

            <h2>Content and intellectual property</h2>
            <p>
              The text, photographs, graphics and layout of this site are owned by{" "}
              {company.legalName} or used under licence. You may not reproduce them for
              commercial purposes without written permission. Manufacturer names and marks
              referenced on this site are the property of their respective owners and are used
              to identify products we are certified to install.
            </p>

            <h2>Third-party links</h2>
            <p>
              This site links to third-party sites, including manufacturers and review
              platforms. We are not responsible for their content or their privacy practices.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              This site is provided as-is. To the fullest extent permitted by law,{" "}
              {company.legalName} is not liable for any loss arising from reliance on general
              information published here. Nothing in these terms limits liability that cannot
              lawfully be limited.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the State of Illinois, and any dispute
              relating to this website will be subject to the exclusive jurisdiction of the
              courts of Cook County, Illinois.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms from time to time. The version published here at the
              time you use the site is the version that applies.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to <a href={mailHref}>{company.email}</a>.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
