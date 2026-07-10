/**
 * Post-build: emit per-route index.html with crawler-visible SEO meta.
 * nginx try_files serves dist/blog/slug/index.html before the SPA fallback.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { buildRouteSeoList, SITE_NAME, SITE_URL, DEFAULT_IMAGE } from "../src/data/routeSeo.js";

const DIST = "dist";
const TEMPLATE_PATH = join(DIST, "index.html");

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function fullTitle(title) {
  return title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Gear Reviews & Field Guides`;
}

function buildMetaBlock({ title, description, path, type, noindex = false }) {
  const pageTitle = fullTitle(title);
  const canonical = `${SITE_URL}${path}`;
  const robots = noindex ? `\n  <meta name="robots" content="noindex, nofollow" />` : "";

  return `
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />${robots}
  <meta property="og:title" content="${esc(pageTitle)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${esc(DEFAULT_IMAGE)}" />
  <meta property="og:site_name" content="${esc(SITE_NAME)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(pageTitle)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(DEFAULT_IMAGE)}" />`;
}

function optimizeForRoute(html, { maps = false }) {
  let out = html;

  if (!maps) {
    out = out.replace(
      /  <link rel="preconnect" href="https:\/\/maps\.googleapis\.com" \/>\n/g,
      ""
    );
    out = out.replace(
      /  <link rel="preconnect" href="https:\/\/maps\.gstatic\.com" crossorigin \/>\n/g,
      ""
    );
    out = out.replace(
      /  <link rel="modulepreload" crossorigin href="\/assets\/vendor-maps-[^"]+\.js">\n/g,
      ""
    );
  }

  return out;
}

function applySeo(template, route) {
  const pageTitle = fullTitle(route.title);
  let html = optimizeForRoute(template, route);

  html = html.replace(
    "<title>Wasatch Rockhound</title>",
    `<title>${esc(pageTitle)}</title>`
  );
  html = html.replace("</head>", `${buildMetaBlock(route)}\n</head>`);

  return html;
}

function writeRouteHtml(route, html) {
  const filePath =
    route.path === "/"
      ? TEMPLATE_PATH
      : join(DIST, route.path.replace(/^\//, ""), "index.html");

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, "utf-8");
}

const template = readFileSync(TEMPLATE_PATH, "utf-8");
const routes = buildRouteSeoList();

for (const route of routes) {
  writeRouteHtml(route, applySeo(template, route));
}

console.log(`✅ Route HTML generated: ${routes.length} pages with crawler-visible SEO`);
