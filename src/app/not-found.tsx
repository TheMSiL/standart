import Link from "next/link";
import { Phone } from "lucide-react";
import { company, telHref } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/data/navigation";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="texture-grain bg-charcoal-950">
      <Container className="py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[0.75rem] font-bold tracking-[0.2em] text-cedar-400 uppercase">
            Error 404
          </p>

          <h1 className="mt-5 text-[2rem] leading-[1.1] text-balance text-white sm:text-[2.75rem]">
            That page is not here
          </h1>

          <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/70">
            The link may be out of date, or the page may have moved. Everything we build is
            reachable from the links below — or call us and we will point you at it.
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="/" size="lg">
              Back to Home
            </Button>
            <Button href={telHref} variant="onDark" size="lg">
              <Phone className="size-4.5" strokeWidth={2.25} />
              {company.phone.display}
            </Button>
          </div>

          <nav aria-label="Site sections" className="mt-12 border-t border-white/12 pt-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-white/65 transition-colors hover:text-cedar-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/free-estimate"
                  className="text-[0.9375rem] text-white/65 transition-colors hover:text-cedar-300"
                >
                  Free Estimate
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
