# Standard Build — Premium Outdoor Construction

Production-ready marketing frontend for **Standard Build**, a Chicago/Illinois outdoor
construction contractor. Built for lead generation first: phone calls, estimate requests
and project enquiries with photo uploads.

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script                 | What it does                                     |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Development server                                |
| `npm run build`        | Production build (prerenders all 30 routes)       |
| `npm start`            | Serve the production build                        |
| `npm run typecheck`    | `tsc --noEmit`                                    |
| `npm run lint`         | ESLint (flat config, `next/core-web-vitals`)      |
| `npm run format`       | Prettier + Tailwind class sorting                 |

Copy `.env.example` to `.env.local` before deploying — see **Configuration** below.

---

## Project structure

```
src/
├── app/                      App Router routes
│   ├── layout.tsx            Fonts, global JSON-LD, header/footer shell
│   ├── page.tsx              Home
│   ├── about/ contact/ reviews/ services/ projects/ free-estimate/
│   ├── services/[slug]/      One page per service (5 today)
│   ├── projects/[slug]/      Project detail + before/after
│   ├── free-estimate/thank-you/
│   ├── privacy-policy/ terms/
│   ├── actions/lead.ts       The single server action behind every form
│   ├── sitemap.ts robots.ts  Generated from the content layer
│   └── globals.css           Design tokens (@theme) + base styles
├── components/
│   ├── layout/               Header, MobileMenu, Footer, MobileActionBar, Breadcrumbs, Logo
│   ├── sections/             Hero, TrustBar, PartnerLogos, ServicesGrid, WhyChooseUs,
│   │                         ProjectsGrid, ProjectFilters, ReviewsCarousel, ProcessSteps,
│   │                         CTASection, AboutPreview, FaqSection, ServiceAreas, PageHero
│   ├── cards/                ServiceCard, ProjectCard, ReviewCard
│   ├── forms/                LeadForm, Field, PhotoUploader
│   ├── media/                BeforeAfterSlider
│   └── ui/                   Button, Container, SectionHeading, Badge, Icon, Rating,
│                             Accordion, Counter, Reveal, Prose, JsonLd
├── data/                     Typed content: services, projects, reviews, locations,
│                             navigation, company (NAP), site-content
├── lib/
│   ├── cms/                  Data layer — ContentSource interface + local implementation
│   ├── seo/                  metadata builder, JSON-LD builders, landing-page architecture
│   ├── leads.ts              Lead delivery pipeline (webhook / email / console)
│   ├── validation.ts         Zod schemas shared by client and server
│   └── utils.ts              cn(), formatters
├── types/content.ts          The content model everything depends on
└── middleware.ts             Geo gating (disabled by default)
```

---

## Content and the CMS-ready data layer

No component imports a data file directly. Everything goes through
`src/lib/cms`, which exposes a small async interface:

```ts
// src/lib/cms/source.ts
export interface ContentSource {
  getServices(): Promise<Service[]>;
  getService(slug: string): Promise<Service | null>;
  getProjects(query?: ProjectQuery): Promise<Project[]>;
  getProject(slug: string): Promise<Project | null>;
  getLocations(): Promise<Location[]>;
  getLocation(slug: string): Promise<Location | null>;
  getReviews(query?: ReviewQuery): Promise<Review[]>;
  getReviewStats(): Promise<ReviewStats>;
}
```

Today it is backed by `local-source.ts`, which reads the typed modules in `src/data`.
To move to Sanity, Payload, Strapi or Supabase, implement the same interface and change
**one line**:

```ts
// src/lib/cms/index.ts
export const content: ContentSource = sanitySource;
```

Every method is already async, so no page or component has to change.

**Adding content requires no code changes:**

- a new service in `src/data/services.ts` → appears in the nav dropdown, the services
  grid, its own `/services/<slug>` page, the project filters, every form's service
  dropdown and the sitemap;
- a new project in `src/data/projects.ts` → appears in the grid, gets `/projects/<slug>`,
  joins the related-projects rails and the sitemap;
- a new town in `src/data/locations.ts` → appears in the footer, the service-area grid,
  the project filters and the `areaServed` structured data.

---

## Lead capture

One server action — `src/app/actions/lead.ts` — sits behind all three forms
(hero, contact, full estimate). The forms are real `<form action={...}>` elements, so
they submit and validate without client JavaScript; the client layer adds inline errors,
a pending state, drag-and-drop uploads and the success panel.

Validation lives in `src/lib/validation.ts` and is shared: the client uses it for field
hints, the server re-runs it as the authority. A honeypot field silently absorbs bots.

`src/lib/leads.ts` fans each lead out to every transport that is configured, independently,
so one failure cannot lose the lead:

| Transport | Enable with                                          |
| --------- | ---------------------------------------------------- |
| Webhook   | `LEADS_WEBHOOK_URL` (Zapier / Make / n8n / CRM)       |
| Email     | `RESEND_API_KEY`, `LEADS_EMAIL_TO`, `LEADS_EMAIL_FROM` |
| Console   | Automatic fallback when nothing else is configured    |

### Photo uploads — one deliberate gap

Photos are validated (type, size, count) and summarised into the lead payload, but the
**files themselves are not yet stored anywhere** — that needs an object store the client
has to choose (Vercel Blob, S3, Cloudinary, UploadThing). The insertion point is marked:

```ts
// src/app/actions/lead.ts
// TODO(storage): upload `files` to object storage and push the resulting
// URLs onto each `photos` entry before delivering the lead.
```

Everything downstream already accepts the richer shape.

---

## SEO

Implemented: semantic HTML with exactly one `<h1>` per page, a contiguous heading
outline, per-route metadata via `buildMetadata()`, canonical URLs, Open Graph and Twitter
cards, generated `sitemap.xml` and `robots.txt` (which blocks indexing entirely on
non-production deployments), clean URLs, alt text on every image, and structured data:

- `LocalBusiness` / `GeneralContractor` with `areaServed`, hours and geo — site-wide
- `WebSite`
- `BreadcrumbList` — emitted by the `<Breadcrumbs>` component, so the markup and the
  visible trail can never disagree
- `Service` + `OfferCatalog` — service pages
- `FAQPage` — home and service pages
- `CreativeWork` — project pages
- `AggregateRating` + `Review` — reviews page

### The 50+ location pages (architecture only, as specified)

Not generated. The structure for them is in `src/lib/seo/landing-pages.ts`, which turns
the existing services and locations into fully formed page definitions — 7 URL patterns ×
8 towns = 56 pages today — without creating any routes. Switching them on is one new file
(`src/app/(landing)/[slug]/page.tsx`, sketched in that module's header comment) plus one
line in `sitemap.ts`. Adding a pattern or a town scales the set automatically.

---

## Performance

Measured against the production build on this codebase:

| | Requests | Transferred | LCP | CLS |
| --- | --- | --- | --- | --- |
| Mobile (390px) | 38 | 185 KB | 314 ms | 0.002 |
| Desktop (1440px) | 41 | 457 KB | 365 ms | 0.003 |

Shared JS across all routes is ~103 KB. Techniques used: `next/image` everywhere with
explicit `sizes` and AVIF/WebP output, `priority` + `fetchPriority="high"` on the LCP hero
only, lazy loading below the fold, `next/font` with `display: swap`, no animation or
carousel libraries (the review rail is CSS scroll-snap; reveals are one
`IntersectionObserver` per element), and server components by default — only the header,
menu, forms, filters, carousel, counter, accordion and slider ship JavaScript.

### If a hero video is added later

`Hero.tsx` uses a static image as the LCP element deliberately. To add video, place a
`<video>` behind the existing `<Image>` and use it as the `poster`, with
`autoPlay muted playsInline preload="none"`. The layout does not change.

---

## Accessibility

Audited with axe-core (WCAG 2.1 A/AA + best practices) across all 17 routes at 1440px and
390px: **0 violations**. Specific measures worth knowing about:

- The muted text colour is a solid token (`--color-charcoal-600`), not an opacity of the
  body colour — the translucent variants measured 3.1–4.3:1 against the light grounds.
- The mobile drawer traps focus, restores it on close, and is portalled to `<body>`
  because the header's `backdrop-filter` would otherwise become the containing block for
  its `position: fixed`.
- `BeforeAfterSlider` is a real ARIA slider: focusable, arrow-key operable, and it works
  with mouse, touch and pen through a single Pointer Events path.
- Horizontal scroll rails carry `tabIndex={0}` so keyboard users can reach off-screen items.
- Scroll-reveal content is visible without JavaScript, via `@media (scripting: none)` plus
  a `<noscript>` override — no content depends on an IntersectionObserver to exist.
- `prefers-reduced-motion` disables reveals, counters and smooth scrolling globally.

---

## Layout guards

Every route is checked for horizontal overflow at 320, 360, 390, 414, 640, 768, 1024,
1280, 1440 and 1920px: **none**. Three rules keep it that way, and each is load-bearing
rather than decorative:

- **`.snap-rail` is `position: relative`.** `overflow` only clips descendants whose
  containing block is the scroll container or inside it. An absolutely positioned
  descendant that resolves against an ancestor escapes the clip and adds its static
  offset — potentially thousands of pixels into the rail's scroll content — to the
  document's scroll width.
- **`.reveal` is `min-width: 0`.** Reveal wrappers are usually grid or flex items, which
  default to `min-width: auto` and refuse to shrink below their content's min-content
  width. One long word then widens a whole grid track.
- **Long unbreakable tokens use `wrap-anywhere`, not `break-words`.**
  `overflow-wrap: break-word` wraps visually but does not reduce min-content sizing, so
  an email address still forces its column wide. `overflow-wrap: anywhere` does both.
- **The header never changes height.** Its credibility bar retracts purely through
  `position: sticky` with a negative `top` equal to the bar's height, so the bar scrolls
  away while the nav pins. Collapsing it from a scroll listener instead — the obvious
  implementation — makes the in-flow header shorter, which shortens the document, which
  makes Chrome's scroll anchoring move `scrollY`, which re-crosses the threshold and
  toggles the bar back: a visible oscillation on every scroll-up, plus a full page reflow
  on each frame of the height animation. The remaining listener only toggles a shadow,
  which is paint-only, coalesced to one update per frame and committed only on change.

---

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and JSON-LD |
| `LEADS_WEBHOOK_URL` | CRM / Zapier / Make endpoint |
| `RESEND_API_KEY`, `LEADS_EMAIL_TO`, `LEADS_EMAIL_FROM` | Transactional email |
| `GEO_RESTRICT_ENABLED`, `GEO_ALLOWED_COUNTRIES` | US-only gating (off by default) |

### Geo gating

Off by default, and not baked into the frontend. The policy lives in `src/middleware.ts`
and reads `x-vercel-ip-country`, `cf-ipcountry` or `x-geo-country` — so Vercel, Cloudflare
or a custom CDN all work with one extra header name rather than a rewrite. It fails
**open**: an undetectable country is allowed through, because silently blocking a real
customer costs far more than serving a page outside the service area.

---

## Before launch — replace these placeholders

1. **Phone, email, address** — all in `src/data/company.ts`. The number is in the
   reserved 555 range and the address is illustrative. Everything user-facing plus the
   `tel:` links and LocalBusiness schema reads from that one file.
2. **License number** — `company.license`.
3. **Photography** — `public/images/**`. All placeholder photos are Unsplash-licensed
   (free for commercial use, no attribution required). Replace the files in place, keeping
   the same paths, and nothing else has to change. Paths are referenced only from
   `src/data/*`.
4. **Partner logos** — rendered as accessible typographic badges rather than unlicensed
   brand artwork. Drop official files into `public/images/partners/` and set `logo` on the
   entry in `src/data/site-content.ts`; `PartnerLogos` switches automatically.
5. **Reviews** — `src/data/reviews.ts` is mock data shaped like the Google Places reviews
   payload, so connecting the live API means implementing `getReviews` in a new content
   source, not touching components.
6. **Social links** — `company.social` currently points at platform homepages.
7. **Contact map** — `/contact` has a styled placeholder sized and rounded to match the
   page; drop an embedded map into it.
8. **Legal pages** — `/privacy-policy` and `/terms` are drafted but should be reviewed by
   the client's counsel.

---

## Design system

Tokens are defined in `src/app/globals.css` under `@theme`, so they are available as
Tailwind utilities (`bg-cedar-600`, `text-charcoal-600`, `shadow-card`, `ease-out-soft`).

**Palette** — warm and natural, no roofing red or blue: cedar (the single CTA accent),
walnut, charcoal, sand, beige, off-white.
**Type** — Archivo for display, Inter for body.
**Motion** — fade-up reveals, hover lifts, image zoom, animated counters, smooth
accordion. No parallax, no WebGL.
