import type { Project } from "@/types/content";

/**
 * Portfolio entries.
 *
 * `featured: true` promotes a project onto the home page grid. Everything else
 * still appears on /projects and gets its own detail page at
 * /projects/[slug] — no route changes needed to publish a new build.
 */
export const projects: Project[] = [
  {
    slug: "composite-deck-naperville",
    title: "Two-Level Composite Deck with Built-In Planters",
    serviceType: "Composite Deck",
    serviceSlug: "decks",
    locationSlug: "naperville",
    locationName: "Naperville, IL",
    material: "TimberTech Composite",
    materials: [
      "TimberTech AZEK",
      "Cedar Framing Skirt",
      "Aluminum Balusters",
      "Hidden Fasteners",
    ],
    year: 2024,
    summary:
      "A walk-out basement and a four-foot grade change turned into two connected outdoor rooms — dining above, lounge below — with cedar planters built into the rail line.",
    description: [
      "The original deck was a small pressure-treated platform that used barely a third of the usable yard and left the walk-out basement door opening onto gravel. The family wanted somewhere to seat twelve for dinner without folding tables into the grass.",
      "We designed two connected levels: an upper dining deck off the kitchen and a lower lounge that solves the grade change and ties into the existing paver patio. Built-in cedar planters run along the rail line so the space feels enclosed without a solid privacy wall, and the stair run was widened to five feet so it reads as an architectural feature rather than an afterthought.",
    ],
    hero: {
      src: "/images/projects/composite-deck-naperville/hero.jpg",
      alt: "Two-level composite deck with cedar planters behind a suburban Naperville home",
    },
    gallery: [
      {
        src: "/images/projects/composite-deck-naperville/01.jpg",
        alt: "Dining table and chairs on the upper composite deck level",
      },
      {
        src: "/images/projects/composite-deck-naperville/02.jpg",
        alt: "Bench seating detail along the composite deck railing",
      },
      {
        src: "/images/projects/composite-deck-naperville/03.jpg",
        alt: "Composite decking boards and hidden fastener detail",
      },
    ],
    beforeAfter: {
      before: {
        src: "/images/projects/composite-deck-naperville/before.jpg",
        alt: "Crew framing the new deck structure before decking was installed",
      },
      after: {
        src: "/images/projects/composite-deck-naperville/hero.jpg",
        alt: "The finished two-level composite deck with planters and railing",
      },
      caption: "Framing to finish — 9 working days on site.",
    },
    phases: [
      {
        title: "Site measure & design",
        description:
          "Laser survey of the grade change, then a 3D layout the homeowners could walk through before anything was ordered.",
      },
      {
        title: "Permit & footings",
        description:
          "DuPage County permit pulled and twelve concrete footings poured to 48 inches, below the frost line.",
      },
      {
        title: "Framing",
        description:
          "Doubled beams, taped joists, flashed ledger and stainless structural screws throughout.",
      },
      {
        title: "Decking & railing",
        description:
          "TimberTech boards installed with hidden fasteners; aluminum balusters with cedar-wrapped posts.",
      },
      {
        title: "Planters & final walkthrough",
        description:
          "Built-in cedar planters, low-voltage stair lighting, then a punch-list walkthrough with the homeowner.",
      },
    ],
    stats: [
      { label: "Deck area", value: "740 sq ft" },
      { label: "Levels", value: "2" },
      { label: "Time on site", value: "9 days" },
      { label: "Warranty", value: "25-year material" },
    ],
    featured: true,
    seo: {
      title: "Two-Level Composite Deck in Naperville, IL",
      description:
        "A 740 sq ft two-level TimberTech composite deck with built-in cedar planters, built in Naperville by Standard Build.",
    },
  },
  {
    slug: "cedar-deck-arlington-heights",
    title: "Western Red Cedar Deck Under an Oak Canopy",
    serviceType: "Cedar Deck",
    serviceSlug: "decks",
    locationSlug: "arlington-heights",
    locationName: "Arlington Heights, IL",
    material: "Western Red Cedar",
    materials: [
      "Western Red Cedar",
      "Stainless Hardware",
      "Cable Railing",
      "Penetrating Oil Finish",
    ],
    year: 2024,
    summary:
      "A clear-grade cedar deck built around three mature oaks, with cable railing kept low and thin so nothing competes with the tree line.",
    description: [
      "The lot backs onto a wooded easement and the homeowners were adamant that nothing could be cut down. Three mature oaks sat exactly where a conventional rectangular deck would have gone.",
      "We laid the deck out around the trees instead, with generous clearance collars for future trunk growth and footings hand-dug to avoid the root plate. Cable railing keeps the sight line to the woods almost uninterrupted, and the clear-grade cedar was finished with a penetrating oil rather than a film-forming stain so it can be refreshed without stripping.",
    ],
    hero: {
      src: "/images/projects/cedar-deck-arlington-heights/hero.jpg",
      alt: "Cedar deck surrounded by mature trees behind an Arlington Heights home",
    },
    gallery: [
      {
        src: "/images/projects/cedar-deck-arlington-heights/01.jpg",
        alt: "Homeowner standing on the cedar deck beside a mature tree",
      },
      {
        src: "/images/projects/cedar-deck-arlington-heights/02.jpg",
        alt: "Covered walkway detail leading onto the cedar deck",
      },
      {
        src: "/images/projects/cedar-deck-arlington-heights/03.jpg",
        alt: "Dappled sunlight across the finished cedar deck boards",
      },
    ],
    beforeAfter: {
      before: {
        src: "/images/projects/cedar-deck-arlington-heights/before.jpg",
        alt: "Crew setting cedar joists during the framing stage",
      },
      after: {
        src: "/images/projects/cedar-deck-arlington-heights/hero.jpg",
        alt: "The completed cedar deck under the oak canopy",
      },
      caption: "Hand-dug footings kept every root plate intact.",
    },
    phases: [
      {
        title: "Tree survey",
        description:
          "An arborist marked root plates and drip lines before a single footing location was fixed.",
      },
      {
        title: "Design around the canopy",
        description:
          "Deck outline drawn to the trees, with 6-inch growth collars at each trunk penetration.",
      },
      {
        title: "Hand-dug footings",
        description: "Every pier excavated by hand to avoid severing structural roots.",
      },
      {
        title: "Cedar decking & cable rail",
        description:
          "Clear-grade cedar laid with stainless fasteners, then a stainless cable railing system.",
      },
      {
        title: "Oil finish",
        description:
          "Two coats of penetrating oil finish, with a maintenance schedule left with the homeowner.",
      },
    ],
    stats: [
      { label: "Deck area", value: "520 sq ft" },
      { label: "Trees preserved", value: "3" },
      { label: "Time on site", value: "11 days" },
      { label: "Railing", value: "Stainless cable" },
    ],
    featured: true,
    seo: {
      title: "Western Red Cedar Deck in Arlington Heights, IL",
      description:
        "A 520 sq ft clear-grade cedar deck built around three mature oaks with stainless cable railing in Arlington Heights, Illinois.",
    },
  },
  {
    slug: "craftsman-porch-elgin",
    title: "Craftsman Front Porch Restoration",
    serviceType: "Front Porch",
    serviceSlug: "porches",
    locationSlug: "elgin",
    locationName: "Elgin, IL",
    material: "Cedar & AZEK Trim",
    materials: ["Cedar", "AZEK Trim", "Tapered Columns", "Tongue & Groove Ceiling"],
    year: 2023,
    summary:
      "A 1912 Craftsman with a failing porch deck and undersized replacement columns, rebuilt to the proportions the house was drawn with.",
    description: [
      "At some point in the 1980s the original tapered columns had been swapped for thin turned posts, and the porch deck had been re-sheeted in plywood over rotted framing. The house had lost the heavy, grounded look that defines the style.",
      "We rebuilt the structure from the piers up, returned to properly tapered columns on full-height piers, and installed a tongue-and-groove ceiling with period-appropriate bead. The deck was rebuilt in cedar with a sloped substrate for drainage, and every exposed trim element was replaced in AZEK so the paint schedule stretches to a decade instead of three years.",
    ],
    hero: {
      src: "/images/projects/craftsman-porch-elgin/hero.jpg",
      alt: "Restored Craftsman front porch in golden evening light",
    },
    gallery: [
      {
        src: "/images/projects/craftsman-porch-elgin/01.jpg",
        alt: "Front elevation of the restored porch and entry",
      },
      {
        src: "/images/projects/craftsman-porch-elgin/02.jpg",
        alt: "Porch column and trim detail on the restored home",
      },
      {
        src: "/images/projects/craftsman-porch-elgin/03.jpg",
        alt: "Porch decking and step detail",
      },
    ],
    phases: [
      {
        title: "Structural assessment",
        description:
          "Selective demolition to expose the pier condition and confirm what could be saved.",
      },
      {
        title: "Pier & framing rebuild",
        description:
          "New footings and framing with a positive slope built into the substrate for drainage.",
      },
      {
        title: "Columns & rail",
        description:
          "Correctly proportioned tapered columns set on full-height piers, with a matching rail profile.",
      },
      {
        title: "Ceiling & trim",
        description:
          "Beaded tongue-and-groove ceiling and AZEK trim throughout the exposed elevation.",
      },
      {
        title: "Paint & handover",
        description:
          "Full prime and finish coat, then a walkthrough covering the maintenance schedule.",
      },
    ],
    stats: [
      { label: "Home built", value: "1912" },
      { label: "Porch area", value: "310 sq ft" },
      { label: "Time on site", value: "16 days" },
      { label: "Columns", value: "4 tapered" },
    ],
    featured: true,
    seo: {
      title: "Craftsman Front Porch Restoration in Elgin, IL",
      description:
        "A 1912 Craftsman front porch rebuilt from the piers up with tapered columns, cedar decking and AZEK trim in Elgin, Illinois.",
    },
  },
  {
    slug: "pergola-outdoor-kitchen-schaumburg",
    title: "Covered Outdoor Kitchen & Entertainment Pavilion",
    serviceType: "Outdoor Kitchen",
    serviceSlug: "outdoor-living",
    locationSlug: "schaumburg",
    locationName: "Schaumburg, IL",
    material: "Cedar & Stone Veneer",
    materials: [
      "Cedar Beams",
      "Stone Veneer",
      "Concrete Counters",
      "Built-In Grill",
      "Low-Voltage LED",
    ],
    year: 2025,
    summary:
      "A full covered pavilion with a 16-foot cooking run, bar seating for six, and gas, water and power roughed in before a single stone went on.",
    description: [
      "The clients entertain constantly and had been running an extension cord and a portable grill onto a patio that flooded twice a year. They wanted a real kitchen outside, usable from April to November.",
      "We built a covered cedar pavilion over a re-graded and re-drained slab, with a 16-foot cooking run: built-in grill, side burner, sink, under-counter refrigeration and concrete counters. Gas, water and dedicated circuits were roughed in first and the water lines are winterizable from a single shut-off inside the garage. Dimmable low-voltage lighting is zoned separately for cooking and for lounging.",
    ],
    hero: {
      src: "/images/projects/pergola-outdoor-kitchen-schaumburg/hero.jpg",
      alt: "Covered outdoor kitchen pavilion with bar seating and warm lighting at dusk",
    },
    gallery: [
      {
        src: "/images/projects/pergola-outdoor-kitchen-schaumburg/01.jpg",
        alt: "Outdoor kitchen bar with stools under the pavilion roof",
      },
      {
        src: "/images/projects/pergola-outdoor-kitchen-schaumburg/02.jpg",
        alt: "Outdoor kitchen island and cooking run",
      },
      {
        src: "/images/projects/pergola-outdoor-kitchen-schaumburg/03.jpg",
        alt: "Built-in grill and counter detail",
      },
    ],
    beforeAfter: {
      before: {
        src: "/images/projects/pergola-outdoor-kitchen-schaumburg/before.jpg",
        alt: "Crew framing the pavilion structure before finishes were applied",
      },
      after: {
        src: "/images/projects/pergola-outdoor-kitchen-schaumburg/hero.jpg",
        alt: "The finished covered outdoor kitchen at dusk",
      },
      caption: "Rough-ins first, finishes last — nothing was cut open twice.",
    },
    phases: [
      {
        title: "Design & trade coordination",
        description:
          "Layout drawn with the gas fitter and electrician in the room, so rough-in locations were fixed before framing.",
      },
      {
        title: "Drainage & slab",
        description:
          "Existing patio re-graded and a new drain line run to daylight, ending the seasonal flooding.",
      },
      {
        title: "Pavilion framing",
        description:
          "Cedar posts and beams on engineered footings, with a standing-seam roof and finished ceiling.",
      },
      {
        title: "Kitchen build-out",
        description:
          "Stone veneer base, concrete counters, built-in grill, sink and refrigeration set and connected.",
      },
      {
        title: "Lighting & commissioning",
        description:
          "Zoned dimmable lighting, then a full commissioning of gas, water and electrical with the homeowner.",
      },
    ],
    stats: [
      { label: "Pavilion", value: "480 sq ft" },
      { label: "Cooking run", value: "16 ft" },
      { label: "Bar seating", value: "6" },
      { label: "Time on site", value: "5 weeks" },
    ],
    featured: true,
    seo: {
      title: "Covered Outdoor Kitchen & Pavilion in Schaumburg, IL",
      description:
        "A 480 sq ft covered cedar pavilion with a 16-foot outdoor kitchen run, bar seating and zoned lighting built in Schaumburg, Illinois.",
    },
  },
  {
    slug: "hot-tub-deck-plainfield",
    title: "Engineered Hot Tub Deck & Privacy Screen",
    serviceType: "Hot Tub Deck",
    serviceSlug: "spa-wellness",
    locationSlug: "plainfield",
    locationName: "Plainfield, IL",
    material: "Thermally Modified Ash",
    materials: [
      "Thermally Modified Ash",
      "Slatted Cedar Screen",
      "Non-Slip Surface",
      "Step Lighting",
    ],
    year: 2024,
    summary:
      "A spa platform framed for the filled-and-occupied load, with removable access panels and a slatted screen that blocks the neighbors but not the sky.",
    description: [
      "The homeowners had already had one deck fail under a hot tub. The replacement needed to be engineered properly and it needed to be serviceable, because the last one had to be partially demolished to reach a failed pump.",
      "We poured dedicated footings under the spa footprint and framed that bay at 12 inches on center with tripled beams, calculated for the tub filled and occupied. Three removable panels give full access to the equipment bay. A slatted cedar screen sits at exactly the height that blocks seated sight lines from the two neighboring yards while leaving the sky open, and the thermally modified ash surface stays grippy when wet.",
    ],
    hero: {
      src: "/images/projects/hot-tub-deck-plainfield/hero.jpg",
      alt: "Hot tub set into a timber deck platform with an open view",
    },
    gallery: [
      {
        src: "/images/projects/hot-tub-deck-plainfield/01.jpg",
        alt: "Hot tub on the finished deck platform in winter conditions",
      },
      {
        src: "/images/projects/hot-tub-deck-plainfield/02.jpg",
        alt: "Spa surround and decking detail",
      },
      {
        src: "/images/projects/hot-tub-deck-plainfield/03.jpg",
        alt: "Deck steps and privacy screening beside the spa",
      },
    ],
    phases: [
      {
        title: "Load calculation",
        description:
          "Filled and occupied spa weight calculated, then the framing plan drawn to suit it.",
      },
      {
        title: "Dedicated footings",
        description:
          "Independent footings poured under the spa footprint, isolated from the main deck structure.",
      },
      {
        title: "Reinforced framing",
        description: "Tripled beams and 12-inch on-center joists through the spa bay.",
      },
      {
        title: "Access panels",
        description:
          "Three removable deck panels sized for full service access to pumps and heater.",
      },
      {
        title: "Screen & lighting",
        description: "Slatted cedar privacy screen and recessed step lighting for winter use.",
      },
    ],
    stats: [
      { label: "Spa capacity", value: "6 person" },
      { label: "Design load", value: "150 lb/sq ft" },
      { label: "Access panels", value: "3" },
      { label: "Time on site", value: "12 days" },
    ],
    featured: true,
    seo: {
      title: "Engineered Hot Tub Deck in Plainfield, IL",
      description:
        "A load-engineered hot tub deck with dedicated footings, removable service panels and a slatted cedar privacy screen in Plainfield, Illinois.",
    },
  },
  {
    slug: "ipe-rooftop-deck-chicago",
    title: "IPE Rooftop Deck in Lincoln Park",
    serviceType: "IPE Deck",
    serviceSlug: "decks",
    locationSlug: "chicago",
    locationName: "Chicago, IL",
    material: "IPE Hardwood",
    materials: [
      "IPE Hardwood",
      "Adjustable Pedestals",
      "Steel Planters",
      "Wind-Rated Screening",
    ],
    year: 2025,
    summary:
      "A garage-top deck on a tight city lot, built on adjustable pedestals so the roof membrane stays fully accessible and fully warrantied.",
    description: [
      "Chicago rooftop decks live or die on two details: whether the roof membrane can still be inspected and repaired, and whether the assembly can take the wind load four storeys up on an open lot.",
      "This IPE deck floats on adjustable pedestals over the existing membrane — no penetrations, no voided roof warranty, and any section can be lifted by hand. The IPE was pre-oiled on all six faces before installation, the steel planters are ballasted rather than fixed, and the perimeter screening is rated for city wind exposure. Access is via the existing interior stair, so the whole assembly reads as an outdoor room rather than a platform bolted to a garage.",
    ],
    hero: {
      src: "/images/projects/ipe-rooftop-deck-chicago/hero.jpg",
      alt: "IPE hardwood rooftop terrace outside full-height glass doors",
    },
    gallery: [
      {
        src: "/images/projects/ipe-rooftop-deck-chicago/01.jpg",
        alt: "Rooftop deck seating against an open sky",
      },
      {
        src: "/images/projects/ipe-rooftop-deck-chicago/02.jpg",
        alt: "Outdoor furniture arranged on the rooftop terrace",
      },
      {
        src: "/images/projects/ipe-rooftop-deck-chicago/03.jpg",
        alt: "Evening view across the finished rooftop deck",
      },
    ],
    beforeAfter: {
      before: {
        src: "/images/projects/ipe-rooftop-deck-chicago/before.jpg",
        alt: "Crew setting pedestals and framing on the garage roof",
      },
      after: {
        src: "/images/projects/ipe-rooftop-deck-chicago/hero.jpg",
        alt: "The finished IPE rooftop deck",
      },
      caption: "Zero roof penetrations — the membrane warranty stayed intact.",
    },
    phases: [
      {
        title: "Roof & structural review",
        description:
          "Membrane condition and garage structure reviewed with a structural engineer before design.",
      },
      {
        title: "Pedestal layout",
        description:
          "Adjustable pedestals set and levelled across the existing slope with no fixings into the roof.",
      },
      {
        title: "IPE installation",
        description:
          "Hardwood pre-oiled on all six faces, then installed in liftable modular sections.",
      },
      {
        title: "Planters & screening",
        description:
          "Ballasted steel planters and wind-rated perimeter screening set to the engineer's spec.",
      },
      {
        title: "Final inspection",
        description:
          "City inspection closed out and a membrane access map left with the owner.",
      },
    ],
    stats: [
      { label: "Deck area", value: "410 sq ft" },
      { label: "Roof penetrations", value: "0" },
      { label: "Time on site", value: "14 days" },
      { label: "Surface", value: "IPE hardwood" },
    ],
    featured: true,
    seo: {
      title: "IPE Rooftop Deck in Lincoln Park, Chicago",
      description:
        "A 410 sq ft IPE hardwood rooftop deck built on adjustable pedestals with zero roof penetrations in Lincoln Park, Chicago.",
    },
  },
  {
    slug: "poolside-deck-aurora",
    title: "Poolside Composite Deck & Lounge",
    serviceType: "Composite Deck",
    serviceSlug: "decks",
    locationSlug: "aurora",
    locationName: "Aurora, IL",
    material: "Deckorators Composite",
    materials: [
      "Deckorators Composite",
      "Cool-Touch Surface",
      "Aluminum Rail",
      "Pool-Code Gates",
    ],
    year: 2024,
    summary:
      "A wrap-around pool surround in a cool-touch composite that stays walkable barefoot in August, with code-compliant self-closing gates.",
    description: [
      "The old pool surround was pressure-treated timber that had gone grey, splintered at the edges and got hot enough in full sun that nobody used it without sandals.",
      "We replaced it with a cool-touch mineral-based composite that runs measurably cooler underfoot, laid on a re-levelled frame with proper drainage away from the pool shell. Every gate is self-closing and self-latching to Illinois pool barrier code, and the lounge zone was widened by four feet so furniture no longer blocks the walking path around the water.",
    ],
    hero: {
      src: "/images/projects/poolside-deck-aurora/hero.jpg",
      alt: "Composite pool deck wrapping a backyard swimming pool in Aurora",
    },
    gallery: [
      {
        src: "/images/projects/poolside-deck-aurora/01.jpg",
        alt: "Lounge chairs on the composite pool deck",
      },
      {
        src: "/images/projects/poolside-deck-aurora/02.jpg",
        alt: "Poolside seating and umbrella on the finished deck",
      },
      {
        src: "/images/projects/poolside-deck-aurora/03.jpg",
        alt: "Deck and planting detail at the pool edge",
      },
    ],
    phases: [
      {
        title: "Tear-off & assessment",
        description:
          "Old timber surround removed and the substructure surveyed for level and rot.",
      },
      {
        title: "Drainage correction",
        description: "Frame re-levelled with positive fall away from the pool shell.",
      },
      {
        title: "Cool-touch decking",
        description:
          "Mineral-based composite installed with hidden fasteners and picture-frame borders.",
      },
      {
        title: "Barrier compliance",
        description:
          "Self-closing, self-latching gates and rail heights set to Illinois pool barrier code.",
      },
      {
        title: "Final walkthrough",
        description: "Inspection sign-off and a care sheet for the composite surface.",
      },
    ],
    stats: [
      { label: "Deck area", value: "960 sq ft" },
      { label: "Surface temp", value: "Cool-touch" },
      { label: "Gates", value: "3 code-compliant" },
      { label: "Time on site", value: "13 days" },
    ],
    featured: true,
    seo: {
      title: "Poolside Composite Deck in Aurora, IL",
      description:
        "A 960 sq ft cool-touch composite pool surround with code-compliant barrier gates, built in Aurora, Illinois.",
    },
  },
  {
    slug: "covered-porch-joliet",
    title: "Full-Width Covered Porch",
    serviceType: "Covered Porch",
    serviceSlug: "porches",
    locationSlug: "joliet",
    locationName: "Joliet, IL",
    material: "Cedar & Composite",
    materials: ["Cedar Posts", "Composite Decking", "Beadboard Ceiling", "Ceiling Fans"],
    year: 2023,
    summary:
      "A 34-foot covered porch across the front elevation, engineered for Will County snow load and wired for fans and recessed lighting from day one.",
    description: [
      "The house had a narrow concrete stoop and a front elevation that felt flat and unwelcoming. The owners wanted somewhere they could sit out of the rain and still see the street.",
      "The new porch runs the full 34-foot width of the house with a roofline tied into the existing structure and flashed rather than caulked. Framing is engineered for Will County snow load, the beadboard ceiling hides all the wiring, and two fans plus zoned recessed lighting were roughed in before the ceiling closed up.",
    ],
    hero: {
      src: "/images/projects/covered-porch-joliet/hero.jpg",
      alt: "Full-width covered front porch on a suburban Joliet home",
    },
    gallery: [
      {
        src: "/images/projects/covered-porch-joliet/01.jpg",
        alt: "Covered porch seating area with a view to the street",
      },
      {
        src: "/images/projects/covered-porch-joliet/02.jpg",
        alt: "Porch roof and column detail",
      },
      {
        src: "/images/projects/covered-porch-joliet/03.jpg",
        alt: "Front elevation of the home with its new covered porch",
      },
    ],
    phases: [
      {
        title: "Structural design",
        description:
          "Snow-load calculations and stamped drawings prepared for the Will County permit.",
      },
      {
        title: "Footings & posts",
        description: "Frost-depth footings poured and cedar-wrapped structural posts set.",
      },
      {
        title: "Roof tie-in",
        description:
          "New roof structure framed into the existing rafters and step-flashed to the wall.",
      },
      {
        title: "Electrical rough-in",
        description:
          "Fan blocking, fan circuits and zoned recessed lighting run before the ceiling closed.",
      },
      {
        title: "Ceiling & finish",
        description:
          "Beadboard ceiling, composite decking and a full paint and stain schedule.",
      },
    ],
    stats: [
      { label: "Porch width", value: "34 ft" },
      { label: "Porch area", value: "420 sq ft" },
      { label: "Ceiling fans", value: "2" },
      { label: "Time on site", value: "3 weeks" },
    ],
    featured: true,
    seo: {
      title: "Full-Width Covered Front Porch in Joliet, IL",
      description:
        "A 34-foot covered front porch engineered for Will County snow load with a beadboard ceiling and zoned lighting, built in Joliet, Illinois.",
    },
  },
  {
    slug: "gazebo-retreat-naperville",
    title: "Cedar Gazebo Garden Retreat",
    serviceType: "Gazebo",
    serviceSlug: "outdoor-living",
    locationSlug: "naperville",
    locationName: "Naperville, IL",
    material: "Western Red Cedar",
    materials: [
      "Western Red Cedar",
      "Cedar Shingle Roof",
      "Screened Panels",
      "Integrated Lighting",
    ],
    year: 2023,
    summary:
      "A freestanding screened gazebo at the far end of the garden, sited so it catches the evening light and reads as a destination from the back door.",
    description: [
      "The clients wanted somewhere to read and eat outside without mosquitoes, far enough from the house to feel like a separate place rather than an extension of the patio.",
      "We sited the gazebo at the end of an existing garden path where it catches the last two hours of evening sun, and built it in western red cedar with a cedar shingle roof. Removable screened panels convert it from a screened room in summer to an open pavilion in autumn, and the integrated ceiling lighting is on the same low-voltage circuit as the path lights.",
    ],
    hero: {
      src: "/images/projects/gazebo-retreat-naperville/hero.jpg",
      alt: "White gazebo set among trees at the end of a garden",
    },
    gallery: [
      {
        src: "/images/projects/gazebo-retreat-naperville/01.jpg",
        alt: "Gazebo interior with seating and string lighting",
      },
      {
        src: "/images/projects/gazebo-retreat-naperville/02.jpg",
        alt: "Gazebo roof structure and glazing detail",
      },
      {
        src: "/images/projects/gazebo-retreat-naperville/03.jpg",
        alt: "Gazebo with a table and bench seating on the lawn",
      },
    ],
    phases: [
      {
        title: "Siting",
        description:
          "Sun path mapped across the garden to place the structure in the evening light.",
      },
      {
        title: "Footings & platform",
        description:
          "Frost-depth piers and a level cedar platform set clear of the lawn grade.",
      },
      {
        title: "Frame & roof",
        description:
          "Cedar frame raised and finished with a cedar shingle roof and lined ceiling.",
      },
      {
        title: "Screened panels",
        description: "Removable screened panels built to drop into the bays without tools.",
      },
      {
        title: "Lighting",
        description:
          "Low-voltage ceiling and path lighting tied into the existing garden circuit.",
      },
    ],
    stats: [
      { label: "Footprint", value: "12 x 14 ft" },
      { label: "Roof", value: "Cedar shingle" },
      { label: "Panels", value: "Removable screens" },
      { label: "Time on site", value: "10 days" },
    ],
    featured: false,
    seo: {
      title: "Cedar Screened Gazebo in Naperville, IL",
      description:
        "A 12 x 14 ft western red cedar gazebo with a shingle roof, removable screened panels and integrated lighting, built in Naperville, Illinois.",
    },
  },
  {
    slug: "custom-catio-chicago",
    title: "Walk-In Catio Off the Kitchen",
    serviceType: "Custom Catio",
    serviceSlug: "catio",
    locationSlug: "chicago",
    locationName: "Chicago, IL",
    material: "Cedar & Welded Wire",
    materials: [
      "Western Red Cedar",
      "Black-Coated Welded Wire",
      "Polycarbonate Roof",
      "Sealed Composite Floor",
    ],
    year: 2025,
    summary:
      "A human-height enclosure off the kitchen window with climbing shelves, a sealed floor you can hose down, and a transition tunnel the cats learned in a day.",
    description: [
      "Two indoor cats, a small city side yard, and owners who wanted them outside safely without turning the yard into a cage.",
      "We built a walk-in cedar enclosure off the kitchen window with a weather-sealed tunnel transition so the cats come and go on their own. Every mesh edge is captured in a cedar frame — nothing sharp is reachable — and the floor is sealed composite with a slight fall to one corner so the whole thing can be hosed out. Climbing shelves step up to a covered perch under the polycarbonate roof section, and the trim and stain match the existing rear elevation.",
    ],
    hero: {
      src: "/images/projects/custom-catio-chicago/hero.jpg",
      alt: "Enclosed cedar structure with decorative screening beside a home",
    },
    gallery: [
      {
        src: "/images/projects/custom-catio-chicago/01.jpg",
        alt: "Cat inside the finished mesh enclosure",
      },
      {
        src: "/images/projects/custom-catio-chicago/02.jpg",
        alt: "Cedar screen panel detail on the catio",
      },
      {
        src: "/images/projects/custom-catio-chicago/03.jpg",
        alt: "Enclosure framing and fence detail",
      },
    ],
    phases: [
      {
        title: "Measure & window survey",
        description:
          "Window transition point chosen and the enclosure footprint set against the side-yard setback.",
      },
      {
        title: "Platform & frame",
        description:
          "Sealed composite floor laid to fall, on a cedar frame clear of the grade.",
      },
      {
        title: "Mesh & framing",
        description:
          "Black-coated welded wire installed with every edge captured in cedar trim.",
      },
      {
        title: "Tunnel & shelves",
        description:
          "Weather-sealed window tunnel fitted and climbing shelves stepped to the covered perch.",
      },
      {
        title: "Finish",
        description:
          "Stain matched to the rear elevation, then a joint inspection for any reachable gap.",
      },
    ],
    stats: [
      { label: "Footprint", value: "6 x 10 ft" },
      { label: "Height", value: "Walk-in" },
      { label: "Cats", value: "2 very pleased" },
      { label: "Time on site", value: "6 days" },
    ],
    featured: false,
    seo: {
      title: "Custom Walk-In Catio in Chicago, IL",
      description:
        "A 6 x 10 ft walk-in cedar catio with a sealed floor, climbing shelves and a weather-sealed window tunnel, built in Chicago.",
    },
  },
];

export const projectBySlug = new Map(projects.map((p) => [p.slug, p]));
