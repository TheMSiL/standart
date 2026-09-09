"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: ElementType;
  /** How far into the viewport the element must come before revealing. */
  rootMargin?: string;
}

/**
 * Fade-and-lift on scroll.
 *
 * Deliberately minimal: one IntersectionObserver per element, disconnected on
 * first reveal, and no animation library. The visible styles live in
 * globals.css so `prefers-reduced-motion` can switch the whole system off in a
 * single place.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  rootMargin = "0px 0px -12% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Without IntersectionObserver support, show the content immediately.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
