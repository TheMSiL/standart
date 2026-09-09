import { yearsInBusiness } from "@/data/company";
import type { Differentiator, Partner, ProcessStep, TrustPoint } from "@/types/content";

/**
 * Supporting content blocks: trust bar, partner badges, process timeline and
 * the "why choose us" grid. Kept out of JSX so copy can be edited (or moved to
 * a CMS) without touching a component.
 */

/**
 * Computed from the founding year so the figures never quietly go stale. The
 * rounded "20+" phrasing stays on the trust bar because that is how the
 * business markets itself; the animated counters show the exact number.
 */
const years = yearsInBusiness();

export const trustPoints: TrustPoint[] = [
  { label: "Licensed & Insured", detail: "Fully bonded, IL licensed", icon: "shield" },
  { label: "20+ Years Experience", detail: "Building since 2004", icon: "hammer" },
  { label: "Hundreds of Projects", detail: "Across Chicagoland", icon: "layers" },
  { label: "Family-Owned", detail: "Two generations", icon: "users" },
  { label: "Local Contractor", detail: "Chicago based, not a franchise", icon: "map-pin" },
];

/**
 * Manufacturer credentials. `featured` brands render larger and first —
 * Trex PRO and TimberTech PRO carry the most weight with homeowners.
 *
 * `logo` is intentionally undefined: until the client supplies official brand
 * artwork we render an accessible typographic badge instead of an unlicensed
 * logo file. Dropping a real file in /public/images/partners and setting
 * `logo` here is all that is needed to switch.
 */
export const partners: Partner[] = [
  { name: "Trex", credential: "PRO Platinum Contractor", featured: true },
  { name: "TimberTech", credential: "PRO Registered Contractor", featured: true },
  { name: "Deckorators", credential: "Certified Pro", featured: false },
  { name: "Wolf", credential: "Home Products Partner", featured: false },
  { name: "Backyard Discovery", credential: "Installation Partner", featured: false },
  { name: "The Home Depot", credential: "Pro Xtra Member", featured: false },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Consultation",
    description:
      "We come to you, measure the space and listen to how you actually want to use it.",
    detail:
      "A real project manager walks the site, takes measurements and photographs, checks grade, access and existing structure, and talks through budget honestly before anyone draws anything.",
    image: {
      src: "/images/process/consultation.jpg",
      alt: "Project manager reviewing plans with a homeowner",
    },
  },
  {
    step: 2,
    title: "Design & Planning",
    description: "You get a layout, a material specification and one itemized price.",
    detail:
      "We produce a scaled layout and, where it helps, a 3D view you can walk through. Materials, hardware and finish are specified line by line so you can see exactly what you are paying for.",
    image: {
      src: "/images/process/design.jpg",
      alt: "Timber framing laid out at a construction site",
    },
  },
  {
    step: 3,
    title: "Permits & Approvals",
    description: "We prepare the drawings, submit the application and meet the inspector.",
    detail:
      "Permitting is where most residential projects stall. We handle the submission, respond to plan review comments and schedule every inspection, so you never have to call the village yourself.",
    image: {
      src: "/images/process/permits.jpg",
      alt: "Contractors reviewing project documents on site",
    },
  },
  {
    step: 4,
    title: "Construction",
    description: "One dedicated crew, a fixed schedule and a clean site every evening.",
    detail:
      "The same crew stays on your project start to finish. You get a written schedule, a single point of contact, and a site that is swept and secured before they leave each day.",
    image: {
      src: "/images/process/construction.jpg",
      alt: "Crew assembling a wooden deck structure",
    },
  },
  {
    step: 5,
    title: "Final Walkthrough",
    description: "We walk it together, fix the punch list, and hand over the warranty.",
    detail:
      "Nothing is called finished until you have walked it with us. We complete the punch list, hand over manufacturer warranties and a care schedule, and close the permit file.",
    image: {
      src: "/images/process/walkthrough.jpg",
      alt: "Crew completing work on a finished wooden structure",
    },
  },
];

export const differentiators: Differentiator[] = [
  {
    title: "Licensed & Insured",
    description:
      "Fully licensed in Illinois, bonded and carrying general liability plus workers compensation. Certificates provided before work starts, every time.",
    icon: "shield",
  },
  {
    title: "Years of Experience",
    description:
      "Two decades of building outdoor structures in the Chicago climate — which is to say, two decades of learning what fails here and why.",
    icon: "hammer",
    counter: { value: years },
  },
  {
    title: "Hundreds of Completed Projects",
    description:
      "Decks, porches, pergolas and pavilions across the city and eight surrounding suburbs, with references in every one of them.",
    icon: "layers",
    counter: { value: 800, suffix: "+" },
  },
  {
    title: "Family-Owned Business",
    description:
      "Founded in 2004 and still run by the same family. The person who quotes your project is the person accountable for it.",
    icon: "users",
  },
  // "Local Chicago Contractor" was removed from this grid: the trust bar states
  // it directly under the hero and the Service Areas section covers it in full,
  // town by town. Six items also fill the three-column grid exactly, instead of
  // leaving a seventh tile stranded on its own row.
  {
    title: "Premium Materials Only",
    description:
      "Trex, TimberTech, Deckorators, clear-grade cedar and tropical hardwoods, with stainless and hot-dip hardware throughout.",
    icon: "gem",
  },
  {
    title: "Professional Project Management",
    description:
      "One dedicated manager, a written schedule and a single phone number. No subcontractor roulette, no guessing who shows up.",
    icon: "clipboard",
  },
];

/** Headline numbers used in the About section and hero trust strip. */
export const companyStats = [
  { value: years, suffix: "", label: "Years in business" },
  { value: 800, suffix: "+", label: "Projects completed" },
  { value: 9, suffix: "", label: "Communities served" },
  { value: 4.9, suffix: "", label: "Average review rating", decimals: 1 },
];
