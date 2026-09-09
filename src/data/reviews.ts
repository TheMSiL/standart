import type { Review, ReviewStats } from "@/types/content";

/**
 * Mock review data.
 *
 * The shape mirrors what the Google Places "reviews" payload gives you
 * (author, rating, text, relative time), so swapping this file for a live
 * fetch in src/lib/cms/local-source.ts is a drop-in change — no component
 * needs to know where reviews came from.
 */
export const reviews: Review[] = [
  {
    id: "rev-001",
    author: "Michael R.",
    rating: 5,
    body: "We got four quotes for a two-level composite deck and Standard Build was the only one who actually measured the grade instead of eyeballing it. The number they gave us was the number we paid. Crew showed up at seven every morning, cleaned up every evening, and the deck has been through two winters now without a single popped fastener.",
    locationName: "Naperville, IL",
    source: "google",
    date: "2025-06-14",
    serviceType: "Composite Deck",
  },
  {
    id: "rev-002",
    author: "Danielle K.",
    rating: 5,
    body: "Our 1912 house needed the front porch rebuilt and I was terrified someone would make it look like a strip mall. They matched the original column proportions from a photograph and the result looks like it has always been there. Neighbors keep asking who did it.",
    locationName: "Elgin, IL",
    source: "google",
    date: "2025-04-02",
    serviceType: "Front Porch",
    image: {
      src: "/images/projects/craftsman-porch-elgin/hero.jpg",
      alt: "Restored Craftsman porch photographed by the homeowner",
    },
  },
  {
    id: "rev-003",
    author: "Tom & Sandra P.",
    rating: 5,
    body: "Second deck we have had built at this house. The first one failed under a hot tub after six years. These guys engineered the framing for the filled weight, poured separate footings under the tub and put in access panels so the pump can be serviced. Should have called them the first time.",
    locationName: "Plainfield, IL",
    source: "google",
    date: "2025-08-21",
    serviceType: "Hot Tub Deck",
  },
  {
    id: "rev-004",
    author: "Priya S.",
    rating: 5,
    body: "The outdoor kitchen took five weeks and they told us it would take five weeks. Everything was roughed in before the stone went on so nothing had to be opened up again. Genuinely the smoothest contractor experience we have had on this house.",
    locationName: "Schaumburg, IL",
    source: "houzz",
    date: "2025-07-09",
    serviceType: "Outdoor Kitchen",
  },
  {
    id: "rev-005",
    author: "Jim H.",
    rating: 5,
    body: "Rooftop deck on the garage in Lincoln Park. They would not do it in a way that penetrated the roof membrane, which meant the pedestal system cost a bit more, and they explained exactly why. My roof warranty is intact and I can lift a panel to check underneath. That is the right kind of stubborn.",
    locationName: "Chicago, IL",
    source: "google",
    date: "2025-05-30",
    serviceType: "IPE Deck",
  },
  {
    id: "rev-006",
    author: "Angela M.",
    rating: 5,
    body: "Three oak trees we refused to cut down, and they designed the whole deck around them with an arborist. Hand-dug every footing. It took longer and they told us up front it would. Worth every day.",
    locationName: "Arlington Heights, IL",
    source: "google",
    date: "2025-03-18",
    serviceType: "Cedar Deck",
  },
  {
    id: "rev-007",
    author: "Robert C.",
    rating: 4,
    body: "Excellent work on our covered porch and the roof tie-in is flawless. Only reason this is four stars and not five is that the permit took three weeks longer than estimated, though to be fair that was the village and not them. They kept us updated the whole time.",
    locationName: "Joliet, IL",
    source: "google",
    date: "2025-02-11",
    serviceType: "Covered Porch",
  },
  {
    id: "rev-008",
    author: "Lauren T.",
    rating: 5,
    body: "They built us a walk-in catio and treated it with exactly the same seriousness as a deck three times the price. Every wire edge is wrapped in cedar trim, the floor drains, and the cats figured out the window tunnel in about a day. Cannot recommend them enough.",
    locationName: "Chicago, IL",
    source: "facebook",
    date: "2025-09-05",
    serviceType: "Custom Catio",
  },
  {
    id: "rev-009",
    author: "Greg W.",
    rating: 5,
    body: "Pool deck replacement in Aurora. The old timber was splintering and too hot to walk on. They specified a cool-touch composite, sorted the drainage that had been wrong since the pool went in, and brought the gates up to code without me having to ask.",
    locationName: "Aurora, IL",
    source: "google",
    date: "2024-09-27",
    serviceType: "Composite Deck",
  },
];

/**
 * Aggregate rating shown next to the reviews and published as AggregateRating
 * structured data. When a live review API is connected this should be computed
 * from the provider payload rather than hardcoded.
 */
export const reviewStats: ReviewStats = {
  average: 4.9,
  count: 217,
  primarySource: "Google",
};
