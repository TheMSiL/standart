/**
 * Single source of truth for NAP (name / address / phone) data.
 *
 * Everything user-facing — header, footer, contact page, `tel:` links,
 * LocalBusiness JSON-LD — reads from here, so a real phone number or address
 * only ever has to be changed once.
 *
 * NOTE: the phone number, email and street address below are placeholders in
 * the reserved 555 range. Replace them before launch.
 */
export const company = {
  name: "Standard Build",
  legalName: "Standard Build LLC",
  tagline: "Premium Outdoor Construction",
  foundedYear: 2004,

  phone: {
    /** Display form. */
    display: "(773) 555-0142",
    /** E.164 — used for `tel:` hrefs and structured data. */
    e164: "+17735550142",
  },
  email: "estimates@standardbuild.com",

  address: {
    street: "4520 N Milwaukee Ave",
    suite: "Suite 200",
    city: "Chicago",
    state: "Illinois",
    stateCode: "IL",
    zip: "60630",
    country: "US",
  },

  /** Approximate office coordinates — used for LocalBusiness geo. */
  geo: { latitude: 41.9631, longitude: -87.7623 },

  hours: [
    { days: "Monday – Friday", opens: "7:00 AM", closes: "6:00 PM" },
    { days: "Saturday", opens: "8:00 AM", closes: "3:00 PM" },
    { days: "Sunday", opens: null, closes: null },
  ],

  /** Machine-readable equivalent of `hours`, for openingHoursSpecification. */
  hoursSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    { days: ["Saturday"], opens: "08:00", closes: "15:00" },
  ],

  social: [
    { name: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { name: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { name: "Houzz", href: "https://www.houzz.com/", icon: "houzz" },
    { name: "Google", href: "https://www.google.com/maps", icon: "google" },
  ],

  license: "IL Roofing & General Contractor Lic. #104.018XXX",
  serviceAreaLabel: "Chicago & the surrounding Illinois suburbs",
} as const;

/** Years in business, computed so the site never goes stale. */
export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - company.foundedYear;
}

export const telHref = `tel:${company.phone.e164}`;
export const mailHref = `mailto:${company.email}`;
