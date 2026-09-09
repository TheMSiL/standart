import type { Metadata } from "next";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/decks". Drives canonical + OG url. */
  path: string;
  /** Site-relative or absolute image used for OG / Twitter cards. */
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

const DEFAULT_OG_IMAGE = "/images/hero/main.jpg";

/**
 * Single helper every page uses to build its metadata, so canonical URLs,
 * Open Graph and Twitter cards can never drift apart between routes.
 *
 * The page title is composed by the `title.template` set in the root layout,
 * so pass the bare page title here — not "… | Standard Build".
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noIndex = false,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: site.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    metadataBase: new URL(siteUrl),
  };
}
