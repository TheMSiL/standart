interface BrandIconProps {
  className?: string;
}

/**
 * Third-party brand glyphs.
 *
 * lucide-react dropped its brand icons, so the marks we genuinely need are
 * drawn here. The monochrome versions inherit `currentColor` so they sit in the
 * same icon system as the lucide set (footer, contact page), while the
 * full-colour Google mark is reserved for review attribution, where the
 * recognisable four-colour logo is the point.
 */

/** Google "G", single colour. */
export function GoogleIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989h-11.33Z" />
    </svg>
  );
}

/** Google "G", four-colour — used to attribute a review to its source. */
export function GoogleColorMark({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.27a12 12 0 0 0 0 10.74l4.01-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.63l4.01 3.09C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

/**
 * Houzz mark — the stylised lowercase "h" built from two offset stems.
 *
 * A simplified rendition, in keeping with how the manufacturer credentials are
 * handled: replace it with the official asset when the client supplies one.
 */
export function HouzzIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.7 2 8.4 4.62v4.55L4 11.35V22h6.6v-5.32h2.8V22H20V9.17l-6.3-3.05V2Z" />
    </svg>
  );
}
