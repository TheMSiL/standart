import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, mailHref, telHref } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { locations } from "@/data/locations";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="texture-grain bg-charcoal-950 text-white/70">
      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
        {/* Brand + contact */}
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed">
            A family-owned Chicago contractor building premium decks, porches and outdoor living
            spaces across Illinois since {company.foundedYear}. Licensed, insured and
            accountable from footing to final walkthrough.
          </p>

          <ul className="mt-7 flex flex-col gap-3.5 text-[0.9375rem]">
            <li>
              <a href={telHref} className="group inline-flex items-center gap-3 text-white">
                <Phone className="size-4 shrink-0 text-cedar-400" strokeWidth={2} />
                <span className="font-display text-[1.125rem] font-bold group-hover:text-cedar-300">
                  {company.phone.display}
                </span>
              </a>
            </li>
            <li>
              <a
                href={mailHref}
                className="inline-flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-cedar-400" strokeWidth={2} />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-cedar-400" strokeWidth={2} />
              <span>
                {company.address.street}, {company.address.suite}
                <br />
                {company.address.city}, {company.address.stateCode} {company.address.zip}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-cedar-400" strokeWidth={2} />
              <span>
                {company.hours
                  .filter((h) => h.opens)
                  .map((h) => `${h.days}: ${h.opens} – ${h.closes}`)
                  .join(" · ")}
              </span>
            </li>
          </ul>

          <ul className="mt-7 flex items-center gap-2.5">
            {company.social.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${company.name} on ${social.name}`}
                  className="grid size-10 place-items-center rounded-lg border border-white/12 bg-white/5 text-white/70 transition-colors hover:border-cedar-500/60 hover:bg-cedar-600 hover:text-white"
                >
                  <Icon name={social.icon} className="size-4.5" strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns */}
        <nav aria-label="Services" className="lg:col-span-3">
          <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-white uppercase">
            Services
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
            {footerNav.services.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-cedar-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-white uppercase">
            Company
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
            {footerNav.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-cedar-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-white uppercase">
            Service Areas
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[0.9375rem] lg:grid-cols-1 lg:gap-y-3">
            {locations.map((location) => (
              <li key={location.slug}>
                {location.name}, {location.stateCode}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.8125rem] leading-relaxed text-white/45">
            Plus the surrounding communities across Cook, DuPage, Kane and Will counties.
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {company.legalName}. All rights reserved. · {company.license}
          </p>
          <ul className="flex items-center gap-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Clearance for the mobile sticky action bar */}
      <div aria-hidden="true" className="h-[4.5rem] sm:hidden" />
    </footer>
  );
}
