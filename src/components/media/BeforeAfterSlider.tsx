"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ImageRef } from "@/types/content";

interface BeforeAfterSliderProps {
  before: ImageRef;
  after: ImageRef;
  caption?: string;
  /** Starting handle position, 0–100. */
  initial?: number;
  className?: string;
  /** Tailwind aspect ratio class for the frame. */
  aspect?: string;
  priority?: boolean;
}

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Draggable before/after comparison.
 *
 * Uses Pointer Events, so mouse, touch and pen all run through one code path —
 * no separate touch handlers to fall out of sync. `setPointerCapture` keeps the
 * drag alive when the pointer leaves the frame, and `touch-action: none` on the
 * handle stops the browser from stealing the gesture to scroll the page, which
 * is the usual reason these break on phones.
 *
 * The control is a real ARIA slider: focusable, arrow-key operable, and it
 * announces its position.
 */
export function BeforeAfterSlider({
  before,
  after,
  caption,
  initial = 50,
  className,
  aspect = "aspect-[4/3] sm:aspect-[16/10]",
  priority = false,
}: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(clamp(initial));
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    // Ignore secondary mouse buttons.
    if (event.button !== 0 && event.pointerType === "mouse") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setHasInteracted(true);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!dragging) return;
    event.preventDefault();
    updateFromClientX(event.clientX);
  };

  const endDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (!dragging) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 2;
    const moves: Record<string, number> = {
      ArrowLeft: -step,
      ArrowRight: step,
      ArrowDown: -step,
      ArrowUp: step,
    };

    if (event.key in moves) {
      event.preventDefault();
      setHasInteracted(true);
      setPosition((current) => clamp(current + moves[event.key]!));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  // Prevent text/image selection artefacts during a drag.
  useEffect(() => {
    if (!dragging) return;
    const previous = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.userSelect = previous;
    };
  }, [dragging]);

  return (
    <figure className={cn("w-full", className)}>
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "relative w-full cursor-ew-resize overflow-hidden rounded-2xl bg-beige shadow-card select-none",
          aspect,
        )}
        style={{ touchAction: "none" }}
      >
        {/* AFTER — the full-bleed base layer */}
        <Image
          src={after.src}
          alt={after.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 60rem, 100vw"
          className="pointer-events-none object-cover"
          draggable={false}
        />

        {/* BEFORE — clipped to the handle position */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            // Skip the transition mid-drag so the handle tracks the finger exactly.
            transition: dragging ? "none" : "clip-path 220ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Corner labels */}
        <span
          className={cn(
            "pointer-events-none absolute top-4 left-4 rounded-full bg-charcoal-950/70 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-opacity duration-200",
            position < 12 && "opacity-0",
          )}
        >
          Before
        </span>
        <span
          className={cn(
            "pointer-events-none absolute top-4 right-4 rounded-full bg-cedar-600/90 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-opacity duration-200",
            position > 88 && "opacity-0",
          )}
        >
          After
        </span>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0"
          style={{
            left: `${position}%`,
            transition: dragging ? "none" : "left 220ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(23,20,15,0.18)]"
          />

          <button
            type="button"
            role="slider"
            aria-label="Drag to compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            // The frame handles the same events; stop the bubble so pointer
            // capture is only ever claimed once per gesture.
            onPointerDown={(event) => {
              event.stopPropagation();
              onPointerDown(event);
            }}
            onPointerMove={(event) => {
              event.stopPropagation();
              onPointerMove(event);
            }}
            onPointerUp={(event) => {
              event.stopPropagation();
              endDrag(event);
            }}
            onPointerCancel={(event) => {
              event.stopPropagation();
              endDrag(event);
            }}
            className={cn(
              "pointer-events-auto absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize",
              "place-items-center rounded-full bg-white text-charcoal-900 shadow-[0_6px_20px_-6px_rgba(23,20,15,0.5)]",
              "transition-transform duration-200 hover:scale-105 active:scale-95",
              dragging && "scale-105",
            )}
            style={{ touchAction: "none" }}
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none">
              <path
                d="M9.5 7.5 5 12l4.5 4.5M14.5 7.5 19 12l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* First-run affordance */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full bg-charcoal-950/70 px-3.5 py-1.5 text-[0.75rem] font-medium text-white backdrop-blur-sm transition-opacity duration-500",
            hasInteracted ? "opacity-0" : "opacity-100",
          )}
        >
          Drag to compare
        </span>
      </div>

      {caption ? (
        <figcaption className="mt-3 text-[0.8125rem] text-charcoal-700">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
