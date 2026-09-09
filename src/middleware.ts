import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware — geo gating, currently OFF.
 *
 * The brief calls for the *ability* to restrict the site to US visitors later,
 * without that decision being baked into the frontend. So the policy lives
 * here, at the edge, behind an environment flag:
 *
 *   GEO_RESTRICT_ENABLED=true
 *   GEO_ALLOWED_COUNTRIES=US
 *
 * With the flag unset (the default) this middleware does nothing but forward
 * the request, and no component anywhere in the app knows geo gating exists.
 *
 * Country detection reads, in order:
 *   1. `x-vercel-ip-country`  — Vercel
 *   2. `cf-ipcountry`         — Cloudflare
 *   3. `x-geo-country`        — generic upstream proxy / custom CDN
 *
 * Swapping hosts therefore means adding one header name, not rewriting the
 * logic. When the country cannot be determined the request is allowed through:
 * for a lead-generation site, silently blocking a real customer is far more
 * costly than serving a page to someone outside the service area.
 */

const GEO_HEADERS = ["x-vercel-ip-country", "cf-ipcountry", "x-geo-country"] as const;

function detectCountry(request: NextRequest): string | null {
  for (const header of GEO_HEADERS) {
    const value = request.headers.get(header);
    if (value && value !== "XX") return value.toUpperCase();
  }
  return null;
}

export function middleware(request: NextRequest) {
  if (process.env.GEO_RESTRICT_ENABLED !== "true") {
    return NextResponse.next();
  }

  const allowed = (process.env.GEO_ALLOWED_COUNTRIES ?? "US")
    .split(",")
    .map((code) => code.trim().toUpperCase())
    .filter(Boolean);

  const country = detectCountry(request);

  // Unknown origin: allow. See the note above about failing open.
  if (!country || allowed.includes(country)) {
    const response = NextResponse.next();
    if (country) response.headers.set("x-geo-country", country);
    return response;
  }

  return new NextResponse("This website is available to visitors in the United States only.", {
    status: 451,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  /**
   * Skip static assets and image optimisation so the middleware never runs on
   * requests that cannot benefit from it.
   */
  matcher: ["/((?!_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)"],
};
