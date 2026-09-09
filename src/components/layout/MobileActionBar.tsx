"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import { company, telHref } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Sticky bottom action bar for phones.
 *
 * Appears once the visitor has scrolled past the hero, so it never covers the
 * hero form on first paint. Two taps, both conversions: call, or request an
 * estimate.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-charcoal-900/10 bg-offwhite/95 backdrop-blur-md transition-transform duration-300 ease-out-soft sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={telHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-charcoal-900/15 bg-white font-semibold text-charcoal-900"
          aria-label={`Call ${company.phone.display}`}
        >
          <Phone className="size-4.5 text-cedar-600" strokeWidth={2.25} />
          Call Now
        </a>
        <Link
          href="/free-estimate"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-cedar-600 font-semibold text-white"
        >
          <CalendarCheck className="size-4.5" strokeWidth={2.25} />
          Get Estimate
        </Link>
      </div>
    </nav>
  );
}
