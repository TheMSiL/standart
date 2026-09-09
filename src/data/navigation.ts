export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/**
 * Primary navigation. `children` render as a desktop mega-menu column and as an
 * expandable group inside the mobile drawer.
 */
export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Decks",
        href: "/services/decks",
        description: "Wood, cedar, IPE, composite & PVC",
      },
      {
        label: "Porches",
        href: "/services/porches",
        description: "Front, covered & multi-level",
      },
      {
        label: "Outdoor Living",
        href: "/services/outdoor-living",
        description: "Pergolas, gazebos & kitchens",
      },
      {
        label: "Spa & Wellness",
        href: "/services/spa-wellness",
        description: "Hot tub decks & sauna structures",
      },
      {
        label: "Catio",
        href: "/services/catio",
        description: "Enclosed pet-friendly structures",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Projects", href: "/projects" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
    { label: "Free Estimate", href: "/free-estimate" },
  ],
  services: [
    { label: "Custom Decks", href: "/services/decks" },
    { label: "Porches", href: "/services/porches" },
    { label: "Outdoor Living", href: "/services/outdoor-living" },
    { label: "Spa & Wellness", href: "/services/spa-wellness" },
    { label: "Catio & Pet Structures", href: "/services/catio" },
    { label: "All Services", href: "/services" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
