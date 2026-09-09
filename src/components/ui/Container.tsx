import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Renders as <div> by default; pass "section", "header", "footer", … */
  as?: ElementType;
  /** Narrower measure for long-form copy. */
  size?: "default" | "narrow" | "wide";
}

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-[82rem]",
  wide: "max-w-[92rem]",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-6 lg:px-10", sizes[size], className)}>
      {children}
    </Tag>
  );
}
