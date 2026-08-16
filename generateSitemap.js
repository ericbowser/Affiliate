/**
 * generateSitemap.js
 *
 * Run with: npm run sitemap
 * Output:   public/sitemap.xml
 *
 * Generates sitemap.xml from src/data/routeSeo.js — the same route
 * registry that drives canonical tags (SEO.jsx, generateRouteHtml.js).
 * One source of truth: publish a post in postRegistry.js or add a
 * product in products.js and it appears here automatically, with the
 * trailing-slash URL form that matches what nginx actually serves.
 * Submit to Google Search Console after deploying.
 */

import { writeFileSync } from "fs";
import { buildRouteSeoList, SITE_URL } from "./src/data/routeSeo.js";

// --- Generate XML ---
const today = new Date().toISOString().split("T")[0];

const urls = buildRouteSeoList().map((route) => ({
  loc: `${SITE_URL}${route.path}`,
  lastmod: route.lastmod || today,
  changefreq: route.changefreq || "monthly",
  priority: route.priority || "0.6",
}));

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
