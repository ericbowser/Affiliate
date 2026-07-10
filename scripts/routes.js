/**
 * routes.js — Single source of truth for all prerenderable routes
 * 
 * Used by:
 *   - scripts/prerender.js  (generates static HTML)
 *   - generateSitemap.js    (generates sitemap.xml)
 * 
 * SOLID: Single Responsibility — this module only defines routes.
 * Open/Closed: add new routes by appending to arrays, never modify existing logic.
 * 
 * When you add a product to products.js or publish a post in posts.js,
 * add the corresponding ID/slug here and re-run: npm run build:full
 */

// --- Static pages (manually maintained) ---
export const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/tools/detector-match", priority: "0.7", changefreq: "monthly" },
  { path: "/guides/utah-sites-map", priority: "0.7", changefreq: "monthly" },
  { path: "/weather", priority: "0.4", changefreq: "daily" },
];

// --- Categories (mirrors config.js keys) ---
export const categories = [
  "metal-detectors",
  "rock-hammers",
  "tumblers-lapidary",
  "field-gear",
  "gps-navigation",
  "books-guides",
];

// --- Product IDs (mirrors products.js id fields) ---
export const productIds = [
  "nokta-simplex-lite",
  "garrett-ace-400",
  "minelab-vanquish-540",
  "garrett-at-max",
  "garrett-goldmaster-24k",
  "minelab-equinox-800",
  "minelab-equinox-900",
  "estwing-rock-hammer",
  "estwing-prospecting-pick",
  "nicholson-hacksaw-80950",
  "dewalt-safety-glasses",
  "cold-chisel-set",
  "classifier-screen-18",
  "collapsible-field-shovel",
  "national-geo-tumbler",
  "c1-rock-tumbler-kit",
  "vevor-tumbler",
  "tumbler-grit-refill",
  "black-diamond-spot",
  "stanley-classic-bottle",
  "leatherman-signal",
  "jewelers-loupe-10x",
  "adventure-medical-ultralight",
  "mechanix-original-gloves",
  "sunday-afternoons-hat",
  "viair-88p-compressor",
  "nokta-pinpointer",
  "garmin-etrex-32x",
  "garmin-inreach-mini-2",
  "rockhounding-utah-book",
  "gem-trails-utah",
];

// --- Published blog posts ---
export const blogPosts = [
  { slug: "rockhounding-utah-8-best-sites", date: "2026-05-29" },
  { slug: "best-metal-detectors-rockhounding-2026", date: "2026-06-01" },
  { slug: "garrett-ace-400-vs-minelab-vanquish-540", date: "2026-06-01" },
  { slug: "best-rock-tumblers-beginners-2026", date: "2026-06-01" },
  { slug: "topaz-mountain-utah-guide", date: "2026-06-26" },
  { slug: "rockhounding-gear-checklist", date: "2026-06-26" },
  { slug: "nokta-simplex-lite-vs-garrett-ace-400", date: "2026-06-30" },
];

// --- Aggregate all paths for prerendering ---
export function getAllRoutes() {
  return [
    ...staticRoutes.map((r) => r.path),
    ...categories.map((slug) => `/category/${slug}`),
    ...productIds.map((id) => `/review/${id}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ];
}

// --- Aggregate with sitemap metadata ---
export function getSitemapEntries(siteUrl) {
  const today = new Date().toISOString().split("T")[0];

  return [
    ...staticRoutes.map(({ path, priority, changefreq }) => ({
      loc: `${siteUrl}${path}`,
      lastmod: today,
      changefreq,
      priority,
    })),
    ...categories.map((slug) => ({
      loc: `${siteUrl}/category/${slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.7",
    })),
    ...productIds.map((id) => ({
      loc: `${siteUrl}/review/${id}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.6",
    })),
    ...blogPosts.map(({ slug, date }) => ({
      loc: `${siteUrl}/blog/${slug}`,
      lastmod: date,
      changefreq: "monthly",
      priority: "0.8",
    })),
  ];
}
