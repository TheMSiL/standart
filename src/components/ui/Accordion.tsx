"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/types/content";

interface AccordionProps {
  items: Faq[];
  /** Index open on first render. Pass null for all closed. */
  defaultOpen?: number | null;
  className?: string;
}

/**
 * FAQ accordion with a genuinely smooth open/close.
 *
 * Uses `grid-template-rows: 0fr → 1fr`, which animates to the content's natural
 * height without measuring it in JavaScript. The panel stays in the DOM, so the
 * answers remain crawlable for the FAQPage structured data on the same page.
 */
export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div
      className={cn(
        "divide-y divide-charcoal-900/10 border-y border-charcoal-900/10",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-display text-[1.0625rem] leading-snug font-semibold transition-colors sm:text-[1.125rem]",
                    isOpen ? "text-cedar-700" : "text-charcoal-900 group-hover:text-cedar-700",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-cedar-600 bg-cedar-600 text-white"
                      : "border-charcoal-900/15 text-charcoal-700 group-hover:border-cedar-600/50",
                  )}
                >
                  <Plus className="size-4" strokeWidth={2} />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-400 ease-out-soft",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pr-10 pb-7 text-[1rem] leading-[1.7] text-charcoal-700">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
