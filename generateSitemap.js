/**
 * generateSitemap.js
 *
 * Run with: npm run sitemap
 * Output:   dist/sitemap.xml  (alongside prerendered HTML)
 *
 * Reads routes from scripts/routes.js (shared with prerender.js).
 * Submit to Google Search Console after deploying.
 *
 * SOLID: Uses routes.js as its data source (Dependency Inversion).
 *        Single Responsibility — only generates sitemap XML.
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { getSitemapEntries } from "./scripts/routes.js";

const SITE_URL = "https://rockhoundutah.com";

const urls = getSitemapEntries(SITE_URL);

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

// Write to both public/ (for dev) and dist/ (for production)
const targets = ["public/sitemap.xml"];

// Also write to dist/ if it exists (post-build)
if (existsSync("dist")) {
  targets.push("dist/sitemap.xml");
}

targets.forEach((path) => {
  writeFileSync(path, xml, "utf-8");
  console.log(`✅ Sitemap: ${path} (${urls.length} URLs)`);
});
