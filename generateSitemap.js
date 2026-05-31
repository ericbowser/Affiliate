/**
 * generateSitemap.js
 * 
 * Run with: npm run sitemap
 * Output:   public/sitemap.xml
 * 
 * Generates a sitemap.xml from products, posts, and static routes.
 * Submit to Google Search Console after deploying.
 */

import { writeFileSync } from "fs";

const SITE_URL = "https://rockhoundutah.com";

// --- Static pages ---
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/tools/detector-match", priority: "0.7", changefreq: "monthly" },
  { path: "/guides/utah-sites-map", priority: "0.7", changefreq: "monthly" },
  { path: "/weather", priority: "0.4", changefreq: "daily" },
];

// --- Categories ---
const categories = [
  "metal-detectors", "rock-hammers", "tumblers-lapidary",
  "field-gear", "gps-navigation", "books-guides",
];

// --- Products ---
const productIds = [
  "nokta-simplex-lite", "garrett-ace-400", "minelab-vanquish-540",
  "garrett-at-max", "garrett-goldmaster-24k", "minelab-equinox-800",
  "minelab-equinox-900", "estwing-rock-hammer", "estwing-prospecting-pick",
  "nicholson-hacksaw-80950", "national-geo-tumbler", "c1-rock-tumbler-kit",
  "vevor-tumbler", "black-diamond-spot", "stanley-classic-bottle",
  "leatherman-signal", "garmin-etrex-32x", "garmin-inreach-mini-2",
  "rockhounding-utah-book", "gem-trails-utah",
];

// --- Blog posts (published) — UPDATE THIS when you publish new articles ---
const blogPosts = [
  { slug: "rockhounding-utah-8-best-sites", date: "2026-05-29" },
  { slug: "best-metal-detectors-rockhounding-2026", date: "2026-06-01" },
  { slug: "garrett-ace-400-vs-minelab-vanquish-540", date: "2026-06-01" },
  { slug: "best-rock-tumblers-beginners-2026", date: "2026-06-01" },
];

// --- Generate XML ---
const today = new Date().toISOString().split("T")[0];

const urls = [
  ...staticPages.map(({ path, priority, changefreq }) => ({
    loc: `${SITE_URL}${path}`,
    lastmod: today,
    changefreq,
    priority,
  })),
  ...categories.map((slug) => ({
    loc: `${SITE_URL}/category/${slug}`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.7",
  })),
  ...productIds.map((id) => ({
    loc: `${SITE_URL}/review/${id}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.6",
  })),
  ...blogPosts.map(({ slug, date }) => ({
    loc: `${SITE_URL}/blog/${slug}`,
    lastmod: date,
    changefreq: "monthly",
    priority: "0.8",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

const outputPath = "public/sitemap.xml";
writeFileSync(outputPath, xml, "utf-8");
console.log(`✅ Sitemap generated: ${outputPath} (${urls.length} URLs)`);
