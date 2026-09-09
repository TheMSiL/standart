import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { reviewStats } from "@/data/reviews";
import { localBusinessSchema, webSiteSchema } from "@/lib/seo/schema";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

/**
 * Body face. `display: "swap"` plus a matching fallback keeps text painted on
 * the first frame — a font that blocks rendering is the most common avoidable
 * LCP regression on a photo-led site.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

/** Display face — a confident American grotesque for headings and numbers. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    // Page components pass a bare title; the suffix is added here so it can
    // never drift between routes.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  category: "Construction",
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: siteUrl,
    title: site.title,
    description: site.description,
    images: [{ url: "/images/hero/main.jpg", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/hero/main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#17140f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${archivo.variable}`}>
      <head>
        {/*
          Belt and braces for the scroll-reveal system: without JavaScript the
          IntersectionObserver never runs, so every `.reveal` section would stay
          at opacity 0. `@media (scripting: none)` in globals.css covers modern
          browsers; this covers the rest.
        */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        {/* Site-wide structured data — emitted once, referenced by @id elsewhere */}
        <JsonLd id="ld-local-business" data={localBusinessSchema(reviewStats)} />
        <JsonLd id="ld-website" data={webSiteSchema()} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-charcoal-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-offwhite"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main">{children}</main>

        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
