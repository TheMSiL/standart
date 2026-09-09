import { company } from "@/data/company";
import { locations } from "@/data/locations";
import { absoluteUrl, site, siteUrl } from "@/lib/site";
import type { Faq, Project, Review, ReviewStats, Service } from "@/types/content";

/**
 * JSON-LD builders.
 *
 * Every builder returns a plain object; the <JsonLd> component serialises it.
 * Keeping them pure makes them trivially testable and keeps schema markup out
 * of the page components.
 */

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

/** LocalBusiness — emitted once, in the root layout. */
export function localBusinessSchema(stats?: ReviewStats) {
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": ORG_ID,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    telephone: company.phone.e164,
    email: company.email,
    image: absoluteUrl("/images/hero/main.jpg"),
    logo: absoluteUrl("/images/hero/main.jpg"),
    description: site.description,
    foundingDate: String(company.foundedYear),
    priceRange: "$$-$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.street}, ${company.address.suite}`,
      addressLocality: company.address.city,
      addressRegion: company.address.stateCode,
      postalCode: company.address.zip,
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    areaServed: locations.map((location) => ({
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "State",
        name: location.state,
      },
    })),
    openingHoursSpecification: company.hoursSpec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    sameAs: company.social.map((s) => s.href),
    ...(stats
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: stats.average,
            reviewCount: stats.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/** WebSite — enables the sitelinks search box if a search route is added. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: site.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: locations.map((location) => ({
      "@type": "City",
      name: location.name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} options`,
      itemListElement: service.subServices.map((sub) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: sub.name,
          description: sub.description,
        },
      })),
    },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Project detail pages are published as CreativeWork with images. */
export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    dateCreated: String(project.year),
    creator: { "@id": ORG_ID },
    locationCreated: {
      "@type": "Place",
      name: project.locationName,
    },
    material: project.materials,
    image: [project.hero, ...project.gallery].map((img) => absoluteUrl(img.src)),
  };
}

export function reviewsSchema(reviews: Review[], stats: ReviewStats) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": ORG_ID,
    name: company.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.average,
      reviewCount: stats.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      datePublished: review.date,
      reviewBody: review.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };
}
