import { company, mailHref } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses and protects the information you submit through this website.`,
  path: "/privacy-policy",
});

const LAST_UPDATED = "January 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description={`Last updated: ${LAST_UPDATED}`}
        breadcrumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]}
        size="compact"
      />

      <section className="bg-offwhite">
        <Container size="narrow" className="py-16 sm:py-20">
          <Prose>
            <p>
              This policy explains what information {company.legalName} collects through this
              website, why we collect it and what we do with it. It is written to be read, not
              to be impenetrable.
            </p>

            <h2>Information we collect</h2>
            <p>
              We collect only what you choose to give us through the forms on this site: your
              name, phone number, email address, project address or ZIP code, the service you
              are interested in, your budget range and preferred start date where you provide
              them, your description of the project, and any photographs you upload.
            </p>
            <p>
              Our hosting provider also records standard technical information such as IP
              address, browser type and the pages requested. This is used for security and
              aggregate traffic analysis only.
            </p>

            <h2>How we use it</h2>
            <ul>
              <li>To contact you about the estimate or enquiry you submitted.</li>
              <li>To prepare an accurate quotation for the work you described.</li>
              <li>To schedule and carry out an on-site visit.</li>
              <li>To keep records required for warranty, permitting and insurance purposes.</li>
            </ul>
            <p>
              We do not sell your information. We do not share it with other contractors, lead
              brokers or advertising networks.
            </p>

            <h2>Who we share it with</h2>
            <p>
              Your details may be handled by service providers acting on our behalf — for
              example our email provider and our customer management system. These providers
              process the information only to deliver that service to us, and under contract.
            </p>
            <p>
              We may also disclose information where we are legally required to, or where it is
              necessary to establish or defend a legal claim.
            </p>

            <h2>Photographs you upload</h2>
            <p>
              Photographs you send through the site are used to understand and price your
              project. We will never publish a photograph of your property in marketing material
              without asking you first, in writing.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Enquiries that do not become projects are retained for up to 24 months. Records
              relating to completed work are retained for as long as the warranty and our
              insurance and tax obligations require.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us at any time to tell you what information we hold about you, correct
              it, or delete it. Email <a href={mailHref}>{company.email}</a> and we will respond
              within 30 days. You can also ask us to stop contacting you at any point and we
              will.
            </p>

            <h2>Cookies</h2>
            <p>
              This site uses only the cookies necessary to serve pages and remember your form
              progress. If analytics or advertising tools are added in future, this policy will
              be updated and consent obtained where required.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent to <a href={mailHref}>{company.email}</a>,
              or by post to {company.legalName}, {company.address.street},{" "}
              {company.address.suite}, {company.address.city}, {company.address.stateCode}{" "}
              {company.address.zip}.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
