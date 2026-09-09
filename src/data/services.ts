import type { Service } from "@/types/content";

/**
 * The five service pillars. Each entry drives:
 *  - the Services grid on the home page
 *  - /services
 *  - /services/[slug]
 *  - the service filter on /projects
 *  - the Service dropdown on every lead form
 *  - Service + FAQPage JSON-LD
 */
export const services: Service[] = [
  {
    slug: "decks",
    name: "Custom Decks",
    navLabel: "Decks",
    tagline: "Cedar, composite, PVC & tropical hardwood",
    summary:
      "Multi-level decks engineered for Illinois freeze-thaw cycles and finished with materials that still look right in twenty years.",
    intro: [
      "A deck is the single largest outdoor investment most homeowners make, and in the Chicago climate it is also the one that takes the most abuse. Freeze-thaw cycles heave footings, road salt attacks fasteners, and full sun bleaches anything that was not specified properly.",
      "We build decks the way they should be built: footings below the frost line, joists flashed and taped, stainless or coated hardware throughout, and hidden fasteners so the surface stays clean. Whether you want the warmth of western red cedar, the durability of Trex or TimberTech composite, or the density of IPE, we will walk you through the trade-offs honestly — including cost over the life of the deck, not just the day it is built.",
    ],
    card: {
      src: "/images/services/decks-card.jpg",
      alt: "Wood deck with dining table and grill overlooking mature trees",
    },
    hero: {
      src: "/images/services/decks-hero.jpg",
      alt: "Newly built composite deck wrapping a modern cedar-clad home",
    },
    subServices: [
      {
        slug: "wood-decks",
        name: "Wood Decks",
        description:
          "Pressure-treated and premium softwood decks built for value and longevity.",
      },
      {
        slug: "cedar-decks",
        name: "Cedar Decks",
        description:
          "Western red cedar — naturally rot-resistant, warm underfoot and beautiful when stained.",
      },
      {
        slug: "ipe-decks",
        name: "IPE Decks",
        description:
          "Tropical hardwood with exceptional density, hardness and a 40+ year service life.",
      },
      {
        slug: "composite-decks",
        name: "Composite Decks",
        description:
          "Trex, TimberTech and Deckorators capped composite — no sanding, no staining, no splinters.",
      },
      {
        slug: "pvc-decks",
        name: "PVC Decks",
        description: "Fully synthetic boards that shrug off moisture, mold and pool chemicals.",
      },
      {
        slug: "deck-replacement",
        name: "Deck Replacement",
        description: "Full tear-off and rebuild, including framing that no longer meets code.",
      },
      {
        slug: "deck-repairs",
        name: "Deck Repairs",
        description: "Structural repairs, board replacement, railing upgrades and re-staining.",
      },
    ],
    materials: [
      "Trex",
      "TimberTech",
      "Deckorators",
      "Western Red Cedar",
      "IPE",
      "PVC",
      "Pressure-Treated Pine",
    ],
    highlights: [
      {
        title: "Frost-depth footings",
        description:
          "Every post bears on a poured footing below the 42-inch Illinois frost line — no floating deck blocks.",
      },
      {
        title: "Framing that outlives the boards",
        description:
          "Joist tape, flashed ledgers and hot-dip or stainless hardware, so the structure never becomes the weak point.",
      },
      {
        title: "Hidden fastening",
        description:
          "Clean board faces with no exposed screw heads on composite and hardwood surfaces.",
      },
      {
        title: "Permit handled",
        description:
          "We pull the permit, meet the inspector and close out the file. You never chase the village.",
      },
    ],
    faqs: [
      {
        question: "How much does a new deck cost in the Chicago area?",
        answer:
          "Most of the decks we build land between $55 and $110 per square foot installed. Pressure-treated framing with cedar decking sits at the lower end; capped composite with hidden fasteners, custom railing and lighting sits at the upper end. We give you a written, itemized number after the on-site measure — never a range you have to guess inside of.",
      },
      {
        question: "Composite or cedar — which should I choose?",
        answer:
          "Cedar costs less up front, feels warmer underfoot and can be stained any color, but it needs cleaning and re-sealing every two to three years. Composite costs roughly 25-40% more initially and needs nothing but soap and water. If you plan to stay in the home more than seven years, composite is usually the cheaper option over the life of the deck.",
      },
      {
        question: "Do I need a permit for a deck in Illinois?",
        answer:
          "Almost always, yes — nearly every municipality we work in requires a permit for any deck attached to the house or over 30 inches off grade. We prepare the drawings, submit the application and handle the inspections as part of the contract.",
      },
      {
        question: "How long does a deck take to build?",
        answer:
          "A typical 400-600 sq ft deck takes 5 to 10 working days on site once materials are delivered. Permitting adds two to four weeks depending on the municipality, so plan for four to eight weeks from signed contract to finished deck.",
      },
    ],
    order: 1,
    seo: {
      title: "Custom Deck Builder in Chicago & Illinois",
      description:
        "Cedar, composite, PVC and IPE decks built by a licensed Chicago deck contractor. Frost-depth footings, hidden fasteners, permits handled. Free estimate.",
    },
  },
  {
    slug: "porches",
    name: "Porches",
    navLabel: "Porches",
    tagline: "Front, covered and multi-level porches",
    summary:
      "Porches that read as original to the house — correct column proportions, real trim details and a roofline that ties in cleanly.",
    intro: [
      "A porch is the first thing anyone sees. Get the proportions wrong — columns too thin, roof pitch off by a few degrees, trim that does not match the house — and it looks bolted on forever.",
      "We design porches around the architecture that is already there. That means matching soffit and fascia details, sizing columns to the load and the elevation, and tying new framing into existing structure properly rather than hanging it off the siding. The result is a porch that adds curb appeal and resale value instead of looking like an add-on.",
    ],
    card: {
      src: "/images/services/porches-card.jpg",
      alt: "Covered front porch with white columns on a green clapboard home",
    },
    hero: {
      src: "/images/services/porches-hero.jpg",
      alt: "Traditional covered front porch with a swing and blooming magnolia",
    },
    subServices: [
      {
        slug: "front-porches",
        name: "Front Porches",
        description:
          "Curb-appeal porches designed to match the period and proportions of your home.",
      },
      {
        slug: "covered-porches",
        name: "Covered Porches",
        description:
          "Roofed structures with finished ceilings, lighting and fans for three-season use.",
      },
      {
        slug: "multi-level-porches",
        name: "Multi-Level Porches",
        description: "Stepped porch and deck combinations that solve difficult grade changes.",
      },
      {
        slug: "custom-porches",
        name: "Custom Porches",
        description: "Screened rooms, wrap-arounds and one-off designs drawn for your lot.",
      },
    ],
    materials: [
      "Cedar",
      "AZEK Trim",
      "Composite Decking",
      "Fiberglass Columns",
      "Tongue & Groove Ceilings",
    ],
    highlights: [
      {
        title: "Rooflines that tie in",
        description:
          "New framing is integrated into the existing roof structure and flashed properly — not caulked to the siding.",
      },
      {
        title: "Period-correct detailing",
        description:
          "Column proportions, beam depths and trim profiles matched to the age and style of your home.",
      },
      {
        title: "Finished ceilings",
        description:
          "Tongue-and-groove or beadboard ceilings with recessed lighting and fan blocking installed from day one.",
      },
      {
        title: "Engineered where required",
        description:
          "Stamped drawings when the municipality asks for them, included in the contract.",
      },
    ],
    faqs: [
      {
        question: "Can you add a roof to my existing porch or deck?",
        answer:
          "Usually yes, but the existing structure has to be evaluated first. Most decks were never framed to carry a roof and snow load, so footings and posts often need to be upgraded. We assess that at the site visit and tell you honestly what is reusable.",
      },
      {
        question: "How long does a covered porch take?",
        answer:
          "Two to four weeks on site for most projects, plus permitting. Covered structures require more inspections than an open deck — footing, framing and final — which is the main driver of schedule.",
      },
      {
        question: "Will a new front porch add value to my home?",
        answer:
          "Front porches consistently rank among the highest-return exterior projects in the Midwest, largely because they change the first impression of the entire property. We are happy to share comparable projects in your area.",
      },
    ],
    order: 2,
    seo: {
      title: "Front & Covered Porch Builder | Chicago, IL",
      description:
        "Custom front porches, covered porches and multi-level porch builds across Chicago and the Illinois suburbs. Licensed, insured, permits included.",
    },
  },
  {
    slug: "outdoor-living",
    name: "Outdoor Living",
    navLabel: "Outdoor Living",
    tagline: "Pergolas, gazebos, kitchens & entertainment areas",
    summary:
      "Complete backyard environments — shade structures, cooking, seating and lighting designed together rather than added one season at a time.",
    intro: [
      "The best backyards are planned as one space. When the pergola, the kitchen run, the seating area and the lighting are designed together, everything lines up: sight lines work, the grill is not in the traffic path, and the electrical and gas are roughed in before anything is finished.",
      "We handle the full outdoor living build — shade structures, built-in cooking, counters, seating walls, low-voltage lighting and the coordination with electricians and gas fitters that most homeowners would otherwise manage themselves.",
    ],
    card: {
      src: "/images/services/outdoor-living-card.jpg",
      alt: "Covered outdoor lounge area with sofa seating under a modern pergola",
    },
    hero: {
      src: "/images/services/outdoor-living-hero.jpg",
      alt: "Modern louvered pergola over a paved patio with lounge furniture",
    },
    subServices: [
      {
        slug: "pergolas",
        name: "Pergolas",
        description:
          "Cedar, composite-wrapped and louvered aluminum pergolas sized to the space.",
      },
      {
        slug: "gazebos",
        name: "Gazebos",
        description:
          "Freestanding roofed structures with finished ceilings and integrated lighting.",
      },
      {
        slug: "outdoor-kitchens",
        name: "Outdoor Kitchens",
        description:
          "Built-in grills, counters, sinks and refrigeration with gas and electrical roughed in.",
      },
      {
        slug: "entertainment-areas",
        name: "Entertainment Areas",
        description: "Fire features, seating walls, TV walls and low-voltage lighting design.",
      },
    ],
    materials: [
      "Western Red Cedar",
      "Powder-Coated Aluminum",
      "Stone Veneer",
      "Granite & Concrete Counters",
      "Low-Voltage LED",
    ],
    highlights: [
      {
        title: "One plan, one crew",
        description:
          "Structure, surfaces, gas, electrical and lighting coordinated under a single contract.",
      },
      {
        title: "Rough-ins done first",
        description:
          "Gas, water and conduit go in before hardscape, so nothing gets cut open later.",
      },
      {
        title: "Shade that actually works",
        description:
          "Louver direction and beam spacing calculated for the sun angles in your yard, not copied from a catalog.",
      },
      {
        title: "Four-season detailing",
        description:
          "Drainage, frost protection and winterizable plumbing so nothing splits in January.",
      },
    ],
    faqs: [
      {
        question: "Do you build outdoor kitchens with gas and water?",
        answer:
          "Yes. We coordinate licensed gas fitters and plumbers as part of the project, rough everything in before the finishes go on, and pull the associated permits. Winterizable shut-offs are standard on every water line we run.",
      },
      {
        question: "Cedar or aluminum pergola?",
        answer:
          "Cedar is warmer and more traditional and can be stained to match a deck; it needs re-sealing every few years. Powder-coated aluminum — especially motorized louvered systems — is maintenance-free and gives you adjustable shade and rain protection at a higher price point.",
      },
      {
        question: "Can you work with my landscaper or pool contractor?",
        answer:
          "Regularly. We are happy to sequence around a pool build or landscape plan, and we will coordinate directly with the other trades so you are not relaying messages between contractors.",
      },
    ],
    order: 3,
    seo: {
      title: "Outdoor Living Spaces, Pergolas & Outdoor Kitchens | Chicago",
      description:
        "Pergolas, gazebos, outdoor kitchens and entertainment areas designed and built as one project across Chicagoland. Free on-site estimate.",
    },
  },
  {
    slug: "spa-wellness",
    name: "Spa & Wellness",
    navLabel: "Spa & Wellness",
    tagline: "Hot tub decks, sauna structures & privacy screens",
    summary:
      "Structures engineered for the real load of a filled spa, with the privacy and access details that make one pleasant to actually use in February.",
    intro: [
      "A filled six-person hot tub weighs over 4,000 pounds. Dropping one onto a standard deck frame is the single most common structural failure we are called out to repair.",
      "We engineer spa decks for the actual load — doubled or tripled joists, dedicated footings under the spa footprint, and access panels so equipment can be serviced without cutting the deck apart. Add a sauna structure, a screened privacy wall and lit paths, and you get a wellness area that gets used all twelve months of the year rather than three.",
    ],
    card: {
      src: "/images/services/spa-wellness-card.jpg",
      alt: "Outdoor hot tub set into a timber surround overlooking open water",
    },
    hero: {
      src: "/images/services/spa-wellness-hero.jpg",
      alt: "Timber spa deck platform overlooking a wooded ravine",
    },
    subServices: [
      {
        slug: "hot-tub-decks",
        name: "Hot Tub Decks",
        description:
          "Load-engineered platforms with dedicated footings and serviceable access panels.",
      },
      {
        slug: "sauna-structures",
        name: "Sauna Structures",
        description:
          "Barrel and cabin sauna enclosures, decking and the electrical coordination they need.",
      },
      {
        slug: "privacy-screens",
        name: "Privacy Screens",
        description:
          "Slatted cedar and composite screens that block sight lines without blocking light.",
      },
    ],
    materials: [
      "Western Red Cedar",
      "Thermally Modified Ash",
      "Composite Decking",
      "Powder-Coated Steel",
      "Slatted Screening",
    ],
    highlights: [
      {
        title: "Engineered for the filled weight",
        description:
          "Spa loads are calculated wet and occupied, then framed accordingly — not assumed.",
      },
      {
        title: "Serviceable by design",
        description:
          "Removable access panels at every equipment bay, so a pump swap does not mean demolition.",
      },
      {
        title: "Privacy without a fortress",
        description:
          "Slat spacing tuned to block neighbor sight lines at seated height while keeping the space open.",
      },
      {
        title: "Winter-ready access",
        description:
          "Non-slip surfaces, step lighting and a clear path from the door so the spa gets used year-round.",
      },
    ],
    faqs: [
      {
        question: "Can my existing deck hold a hot tub?",
        answer:
          "Rarely without modification. A standard residential deck is framed for 40 lb/sq ft; a filled spa concentrates roughly 100-150 lb/sq ft. We inspect the framing and footings and tell you whether it can be reinforced or needs a dedicated structure.",
      },
      {
        question: "Do you install the hot tub itself?",
        answer:
          "We build and prepare the structure, coordinate the licensed electrician for the dedicated circuit and disconnect, and work alongside your spa dealer on placement day. We do not sell spas, which means we have no incentive to steer you toward a particular brand.",
      },
      {
        question: "Is a sauna practical in the Chicago climate?",
        answer:
          "Very — the cold months are exactly when they get used. The details that matter are a short, sheltered, well-lit path from the house, proper drainage away from the structure, and a correctly sized electrical feed. We handle all three.",
      },
    ],
    order: 4,
    seo: {
      title: "Hot Tub Decks & Sauna Structures | Chicago, IL",
      description:
        "Load-engineered hot tub decks, sauna structures and privacy screens built across Chicagoland by a licensed contractor. Request a free estimate.",
    },
  },
  {
    slug: "catio",
    name: "Catio & Pet Structures",
    navLabel: "Catio",
    tagline: "Enclosed outdoor spaces for pets",
    summary:
      "Secure, escape-proof outdoor enclosures that let cats and dogs be outside safely — built to the same standard as everything else we do.",
    intro: [
      "A catio is a small structure that gets judged up close, every single day, by someone standing three feet away from it. That is why the details matter so much: no exposed fastener heads, no sharp mesh edges, no gaps a determined cat can widen.",
      "We build fully enclosed catios, screened porch conversions and pet-friendly outdoor structures using the same cedar, composite and hardware we use on a $90,000 deck. They are weather-sealed, escape-proof, easy to clean, and designed to look like part of the house rather than a wire cage on the patio.",
    ],
    card: {
      src: "/images/services/catio-card.jpg",
      alt: "Long-haired cat resting behind the mesh of a garden enclosure",
    },
    hero: {
      src: "/images/services/catio-hero.jpg",
      alt: "Covered outdoor structure attached to a home, enclosed for pets",
    },
    subServices: [
      {
        slug: "custom-catios",
        name: "Custom Catios",
        description:
          "Window-access, freestanding and wrap-around enclosures sized to your cats and your yard.",
      },
      {
        slug: "enclosed-outdoor-spaces",
        name: "Enclosed Outdoor Spaces",
        description: "Screened porch conversions and fully enclosed patio rooms.",
      },
      {
        slug: "pet-friendly-structures",
        name: "Pet-Friendly Outdoor Structures",
        description: "Shaded runs, ramps, shelves and secure gates for dogs and cats alike.",
      },
    ],
    materials: [
      "Western Red Cedar",
      "Black-Coated Welded Wire",
      "Composite Decking",
      "Stainless Hardware",
      "Polycarbonate Roofing",
    ],
    highlights: [
      {
        title: "Genuinely escape-proof",
        description:
          "Welded wire — not staple-gunned screen — with framed edges and no accessible fastener heads.",
      },
      {
        title: "Safe to touch",
        description:
          "Every mesh edge captured in a cedar frame. Nothing sharp anywhere a paw or a hand can reach.",
      },
      {
        title: "Easy to clean",
        description:
          "Sealed decking, removable shelf panels and a door sized for a human with a hose.",
      },
      {
        title: "Looks like part of the house",
        description:
          "Trim, stain and rooflines matched to your home — not a wire box on the lawn.",
      },
    ],
    faqs: [
      {
        question: "How much does a custom catio cost?",
        answer:
          "Small window-box style enclosures start around $2,500. A walk-in catio with a finished deck floor, roof and human-height door typically runs $7,000 to $18,000 depending on size and finish level.",
      },
      {
        question: "Can you connect it to a window or cat door?",
        answer:
          "Yes — that is the most popular configuration. We build a weather-sealed tunnel or a framed window transition so your cats come and go on their own without you opening a door.",
      },
      {
        question: "Will it hold up to Chicago winters?",
        answer:
          "Yes. We use the same cedar, stainless hardware and roofing details as on our decks and porches, and we detail the roof and drainage so snow load and meltwater are handled properly.",
      },
    ],
    order: 5,
    seo: {
      title: "Custom Catios & Pet Enclosures | Chicago, IL",
      description:
        "Custom-built catios, screened enclosures and pet-friendly outdoor structures in Chicago and the Illinois suburbs. Secure, weatherproof, built to last.",
    },
  },
];

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));

/** Grouped options used to populate the Service Type select on every lead form. */
export const serviceTypeOptions = [
  ...services.flatMap((service) => [
    { value: service.slug, label: service.name, group: service.name },
    ...service.subServices.map((sub) => ({
      value: `${service.slug}/${sub.slug}`,
      label: sub.name,
      group: service.name,
    })),
  ]),
  { value: "other", label: "Something else / not sure yet", group: "Other" },
];
