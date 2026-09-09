import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root: an unrelated lockfile in the user's home directory
  // would otherwise be inferred as the root and widen the build trace.
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  images: {
    // Placeholder photography is served from Unsplash while the client's real
    // project photos are being collected. Swapping to local/CMS assets only
    // requires changing the URLs in `src/data/*` — see src/lib/images.ts.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1600, 1920, 2048],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
