"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone, ShieldCheck } from "lucide-react";
import { company, telHref } from "@/data/company";
import { primaryNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky site header.
 *
 * Two tiers on desktop: a slim credibility bar (license, service area, hours)
 * and the main navigation. The phone number is treated as a primary action at
 * every breakpoint — it is the single highest-converting element on a
 * contractor site.
 *
 * The credibility bar retracts with pure CSS: the header is `sticky` with a
 * negative `top` equal to the bar's height, so the bar scrolls away while the
 * main bar pins at the top.
 *
 * This used to collapse the bar by animating its height from a scroll listener,
 * which jittered badly. The header sits in normal flow, so shrinking it made
 * the document 40px shorter; Chrome's scroll anchoring compensated by moving
 * `scrollY`, that re-crossed the single 40px-wide threshold, and the bar
 * toggled back — an oscillation, on top of a full page reflow every frame of
 * the animation. Letting the bar scroll changes no layout at all, so there is
 * nothing left to feed back.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Drives the main bar's shadow only — a paint-level change with no layout
  // effect, so it cannot feed back into scroll position. Coalesced to one
  // update per frame, and committed only when the value actually flips.
  useEffect(() => {
    let frame = 0;
    let current = false;

    const update = () => {
      frame = 0;
      const next = window.scrollY > 8;
      if (next !== current) {
        current = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Close any open dropdown on navigation.
  useEffect(() => setOpenMenu(null), [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  /** Small delay on close so the pointer can cross the gap into the panel. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    // -top-10 matches the credibility bar's h-10: the bar scrolls out of view
    // and the main bar pins at the viewport top. Below lg the bar is hidden, so
    // the header pins flush at 0 instead.
    <header className="sticky top-0 z-50 lg:-top-10">
      {/* Credibility bar — scrolls away under the pinned main bar */}
      <div className="hidden h-10 bg-charcoal-950 text-white/70 lg:block">
        <Container className="flex h-10 items-center justify-between text-[0.75rem]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-cedar-400" strokeWidth={2} />
              Licensed &amp; Insured in Illinois
            </span>
            <span className="text-white/25">|</span>
            <span>Serving {company.serviceAreaLabel}</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Mon–Fri 7:00–18:00 · Sat 8:00–15:00</span>
            <span className="text-white/25">|</span>
            <a href={`mailto:${company.email}`} className="transition-colors hover:text-white">
              {company.email}
            </a>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b bg-offwhite/92 backdrop-blur-md transition-shadow duration-300",
          scrolled
            ? "border-charcoal-900/10 shadow-[0_8px_28px_-20px_rgba(36,31,27,0.55)]"
            : "border-charcoal-900/8",
        )}
      >
        <Container className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5rem]">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                const hasChildren = Boolean(item.children?.length);
                const open = openMenu === item.label;

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose();
                      if (hasChildren) setOpenMenu(item.label);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={hasChildren ? open : undefined}
                      className={cn(
                        "relative flex items-center gap-1 rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors xl:px-3.5",
                        active ? "text-cedar-700" : "text-charcoal-800 hover:text-cedar-700",
                      )}
                    >
                      {item.label}
                      {hasChildren ? (
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-200",
                            open && "rotate-180",
                          )}
                          strokeWidth={2.25}
                        />
                      ) : null}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-cedar-600 transition-transform duration-300 xl:inset-x-3.5",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>

                    {hasChildren ? (
                      <div
                        className={cn(
                          "absolute top-full left-0 pt-3 transition-all duration-200",
                          open
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-1 opacity-0",
                        )}
                      >
                        <div className="w-[22rem] overflow-hidden rounded-xl border border-charcoal-900/10 bg-white p-2 shadow-[0_28px_60px_-24px_rgba(36,31,27,0.35)]">
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group flex flex-col gap-0.5 rounded-lg px-3.5 py-3 transition-colors hover:bg-beige"
                            >
                              <span className="font-display text-[0.9375rem] font-semibold text-charcoal-900 group-hover:text-cedar-700">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="text-[0.8125rem] leading-snug text-charcoal-700">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telHref}
              className="group hidden items-center gap-2.5 rounded-lg px-2 py-1.5 md:flex"
              aria-label={`Call ${company.name} at ${company.phone.display}`}
            >
              <span className="grid size-9 place-items-center rounded-full bg-cedar-100 text-cedar-700 transition-colors group-hover:bg-cedar-600 group-hover:text-white">
                <Phone className="size-4" strokeWidth={2.25} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[0.625rem] font-semibold tracking-[0.14em] text-charcoal-600 uppercase">
                  Call us today
                </span>
                <span className="mt-1 font-display text-[1.0625rem] font-bold text-charcoal-900 transition-colors group-hover:text-cedar-700">
                  {company.phone.display}
                </span>
              </span>
            </a>

            <Button href="/free-estimate" size="md" className="hidden sm:inline-flex">
              Get Free Estimate
            </Button>

            <MobileMenu isActive={isActive} />
          </div>
        </Container>
      </div>
    </header>
  );
}
