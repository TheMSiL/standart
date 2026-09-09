import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, mailHref, telHref } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { getLocations } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Call Standard Build or send us your project details and photos. Serving Chicago, Naperville, Aurora, Joliet, Schaumburg, Arlington Heights, Elgin and Plainfield.",
  path: "/contact",
});

export default async function ContactPage() {
  const locations = await getLocations();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a real project manager"
        description="Not a call center and not a lead broker. Call us during business hours and you will speak to someone who has actually built a deck."
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
        size="compact"
      />

      {/* Contact details + form */}
      <section className="bg-offwhite">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          {/* Details */}
          <div className="min-w-0 lg:col-span-5">
            <SectionHeading eyebrow="Get in touch" title="How to reach us" />

            <ul className="mt-8 flex flex-col gap-5">
              <li>
                <a
                  href={telHref}
                  className="group flex items-start gap-4 rounded-xl bg-white p-5 shadow-card ring-1 ring-charcoal-900/8 transition-colors ring-inset hover:ring-cedar-600/35"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cedar-600 text-white">
                    <Phone className="size-5" strokeWidth={2.25} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6875rem] font-semibold tracking-[0.14em] text-charcoal-600 uppercase">
                      Call us
                    </span>
                    <span className="mt-1.5 block font-display text-[1.375rem] font-bold text-charcoal-900 group-hover:text-cedar-700">
                      {company.phone.display}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-charcoal-700">
                      Fastest way to get an answer
                    </span>
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-card ring-1 ring-charcoal-900/8 ring-inset">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-beige text-cedar-700">
                  <Mail className="size-5" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6875rem] font-semibold tracking-[0.14em] text-charcoal-600 uppercase">
                    Email
                  </span>
                  <a
                    href={mailHref}
                    className="mt-1.5 block font-display text-[1.0625rem] font-semibold wrap-anywhere text-charcoal-900 hover:text-cedar-700"
                  >
                    {company.email}
                  </a>
                  <span className="mt-1 block text-[0.8125rem] text-charcoal-700">
                    We reply within one business day
                  </span>
                </span>
              </li>

              <li className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-card ring-1 ring-charcoal-900/8 ring-inset">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-beige text-cedar-700">
                  <MapPin className="size-5" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6875rem] font-semibold tracking-[0.14em] text-charcoal-600 uppercase">
                    Office
                  </span>
                  <address className="mt-1.5 text-[0.9375rem] leading-relaxed text-charcoal-800 not-italic">
                    {company.address.street}, {company.address.suite}
                    <br />
                    {company.address.city}, {company.address.stateCode} {company.address.zip}
                  </address>
                  <span className="mt-1 block text-[0.8125rem] text-charcoal-700">
                    By appointment — we come to you for estimates
                  </span>
                </span>
              </li>

              <li className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-card ring-1 ring-charcoal-900/8 ring-inset">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-beige text-cedar-700">
                  <Clock className="size-5" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.6875rem] font-semibold tracking-[0.14em] text-charcoal-600 uppercase">
                    Hours
                  </span>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {company.hours.map((slot) => (
                      <li
                        key={slot.days}
                        className="flex justify-between gap-4 text-[0.9375rem] text-charcoal-800"
                      >
                        <span>{slot.days}</span>
                        <span className="text-charcoal-700">
                          {slot.opens ? `${slot.opens} – ${slot.closes}` : "Closed"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-8">
              <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-charcoal-600 uppercase">
                Follow our work
              </h2>
              <ul className="mt-4 flex items-center gap-2.5">
                {company.social.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${company.name} on ${social.name}`}
                      className="grid size-11 place-items-center rounded-xl bg-white text-charcoal-800 shadow-card ring-1 ring-charcoal-900/8 transition-colors ring-inset hover:bg-cedar-600 hover:text-white"
                    >
                      <Icon name={social.icon} className="size-5" strokeWidth={2} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-charcoal-900/8 ring-inset sm:p-8">
              <h2 className="text-[1.375rem]">Send us your project</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal-700">
                Include photos if you have them — it lets us give you a far more useful first
                answer.
              </p>
              <div className="mt-7">
                <LeadForm variant="contact" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Service area map placeholder */}
      <section className="bg-beige">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Service area"
            title="Where you will find our trucks"
            description="We work across Cook, DuPage, Kane and Will counties."
            align="center"
          />

          <Reveal className="mt-12">
            {/*
              Map placeholder. Drop an embedded Google Map (or a Mapbox canvas)
              in here — the aspect ratio and rounding already match the rest of
              the page, so nothing else has to change.
            */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-charcoal-900 sm:aspect-[21/9]">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(227,213,190,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(227,213,190,0.35) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <div>
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-cedar-600 text-white">
                    <MapPin className="size-6" strokeWidth={2} />
                  </span>
                  <p className="mt-4 font-display text-[1.125rem] font-semibold text-white">
                    {company.address.city}, {company.address.stateCode}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] text-white/60">
                    Serving {company.serviceAreaLabel}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ServiceAreas locations={locations} className="bg-offwhite" />

      <CTASection />
    </>
  );
}
