import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "onDark";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold tracking-[-0.01em] " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55 " +
  "whitespace-nowrap text-center";

const variants: Record<ButtonVariant, string> = {
  // The one CTA colour on the site. Used sparingly so it always means "act".
  primary:
    "bg-cedar-600 text-white shadow-[0_1px_0_rgba(255,255,255,0.16)_inset,0_10px_24px_-12px_rgba(165,95,42,0.85)] " +
    "hover:bg-cedar-700 hover:shadow-[0_1px_0_rgba(255,255,255,0.16)_inset,0_14px_30px_-12px_rgba(165,95,42,0.9)]",
  secondary:
    "bg-charcoal-900 text-offwhite hover:bg-charcoal-800 " +
    "shadow-[0_10px_24px_-14px_rgba(36,31,27,0.9)]",
  outline:
    "border border-charcoal-900/18 bg-white/70 text-charcoal-900 backdrop-blur-sm " +
    "hover:border-charcoal-900/35 hover:bg-white",
  ghost: "text-charcoal-900 hover:bg-charcoal-900/6",
  onDark:
    "border border-white/25 bg-white/8 text-white backdrop-blur-sm " +
    "hover:border-white/45 hover:bg-white/16",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.875rem]",
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

type AnchorProps = CommonProps & {
  href: string;
  /** Set for tel:/mailto: and external links. */
  external?: boolean;
  type?: never;
};

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, fullWidth } = props;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    const isExternal =
      external ?? (/^(https?:)?\/\//.test(href) || /^(tel|mailto):/.test(href));

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    fullWidth: _f,
    ...rest
  } = props as NativeButtonProps;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
