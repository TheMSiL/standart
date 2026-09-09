"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { company, mailHref, telHref } from "@/data/company";
import { primaryNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

interface MobileMenuProps {
  isActive: (href: string) => boolean;
}

/**
 * Slide-in navigation drawer for small screens.
 *
 * Keeps the phone number and the estimate CTA pinned inside the panel so the
 * two conversion paths are never more than one tap away, and traps focus while
 * open so keyboard and screen-reader users cannot wander into the page behind.
 */
export function MobileMenu({ isActive }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("Services");
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // The drawer is portalled to <body>. It has to be: the header bar uses
  // `backdrop-blur`, and a backdrop-filter establishes a containing block for
  // `position: fixed` descendants — which would pin the drawer and its scrim
  // to the header instead of the viewport.
  useEffect(() => setMounted(true), []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape to close, Tab cycles within the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label="Open menu"
        className="grid size-11 place-items-center rounded-lg border border-charcoal-900/12 bg-white text-charcoal-900 transition-colors hover:border-charcoal-900/28 lg:hidden"
      >
        <Menu className="size-5" strokeWidth={2} />
      </button>

      {mounted
        ? createPortal(
            <>
              {/* Scrim */}
              <div
                onClick={() => setOpen(false)}
                aria-hidden="true"
                className={cn(
                  "fixed inset-0 z-[60] bg-charcoal-950/55 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
                  open ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              />

              {/* Panel */}
              <div
                ref={panelRef}
                id="mobile-navigation"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className={cn(
                  "fixed inset-y-0 right-0 z-[70] flex w-[min(23rem,88vw)] flex-col bg-offwhite shadow-panel transition-transform duration-300 ease-out-soft lg:hidden",
                  open ? "translate-x-0" : "translate-x-full",
                )}
              >
                <div className="flex items-center justify-between border-b border-charcoal-900/10 px-5 py-4">
                  <Logo />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="grid size-10 place-items-center rounded-lg border border-charcoal-900/12 bg-white text-charcoal-900"
                  >
                    <X className="size-5" strokeWidth={2} />
                  </button>
                </div>

                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                  <ul className="flex flex-col gap-0.5">
                    {primaryNav.map((item) => {
                      const active = isActive(item.href);
                      const hasChildren = Boolean(item.children?.length);
                      const isExpanded = expanded === item.label;

                      return (
                        <li key={item.label}>
                          <div className="flex items-center">
                            <Link
                              href={item.href}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex-1 rounded-lg px-3 py-3.5 font-display text-[1.0625rem] font-semibold transition-colors",
                                active ? "text-cedar-700" : "text-charcoal-900",
                              )}
                            >
                              {item.label}
                            </Link>
                            {hasChildren ? (
                              <button
                                type="button"
                                onClick={() => setExpanded(isExpanded ? null : item.label)}
                                aria-expanded={isExpanded}
                                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
                                className="grid size-10 place-items-center rounded-lg text-charcoal-700"
                              >
                                <ChevronDown
                                  className={cn(
                                    "size-5 transition-transform duration-200",
                                    isExpanded && "rotate-180",
                                  )}
                                  strokeWidth={2}
                                />
                              </button>
                            ) : null}
                          </div>

                          {hasChildren ? (
                            <div
                              className={cn(
                                "grid transition-[grid-template-rows] duration-300 ease-out-soft",
                                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                              )}
                            >
                              <div className="overflow-hidden">
                                <ul className="ml-3 flex flex-col gap-0.5 border-l border-charcoal-900/10 pb-2 pl-3">
                                  {item.children?.map((child) => (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        className={cn(
                                          "block rounded-lg px-3 py-2.5 text-[0.9375rem] transition-colors",
                                          isActive(child.href)
                                            ? "text-cedar-700"
                                            : "text-charcoal-700 hover:text-cedar-700",
                                        )}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Always-visible conversion block */}
                <div className="border-t border-charcoal-900/10 bg-white px-5 py-5">
                  <a
                    href={telHref}
                    className="flex items-center gap-3 rounded-xl bg-beige px-4 py-3.5"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cedar-600 text-white">
                      <Phone className="size-4.5" strokeWidth={2.25} />
                    </span>
                    <span className="flex flex-col leading-none">
                      <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-charcoal-600 uppercase">
                        Call us today
                      </span>
                      <span className="mt-1.5 font-display text-[1.1875rem] font-bold text-charcoal-900">
                        {company.phone.display}
                      </span>
                    </span>
                  </a>

                  <Button href="/free-estimate" size="lg" fullWidth className="mt-3">
                    Get Free Estimate
                  </Button>

                  <div className="mt-4 flex flex-col gap-2 text-[0.8125rem] text-charcoal-700">
                    <a href={mailHref} className="inline-flex items-center gap-2">
                      <Mail className="size-4 text-cedar-600" strokeWidth={2} />
                      {company.email}
                    </a>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="size-4 text-cedar-600" strokeWidth={2} />
                      {company.serviceAreaLabel}
                    </span>
                  </div>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
