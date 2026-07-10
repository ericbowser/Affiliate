/**
 * Post-build: emit per-route index.html with crawler-visible SEO meta.
 * nginx try_files serves dist/blog/slug/index.html before the SPA fallback.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { buildRouteSeoList, SITE_NAME, SITE_URL, DEFAULT_IMAGE } from "../src/data/routeSeo.js";

const DIST = "dist";
const TEMPLATE_PATH = join(DIST, "index.html");

/** Instant LCP before JS — match above-fold layout (incl. lg 30/70 grid) to avoid CLS. */
const HOME_SHELL = `
  <style>
    #static-shell .hero-grid { display:grid; grid-template-columns:1fr; gap:2rem; align-items:start; max-width:80rem; margin:0 auto; }
    @media (min-width:1024px) { #static-shell .hero-grid { grid-template-columns:30% 70%; } }
  </style>
  <div id="static-shell" style="background:#0f172a;color:#f1f5f9;font-family:system-ui,-apple-system,sans-serif;min-height:100vh">
    <nav style="height:4rem;border-bottom:1px solid #1e293b;display:flex;align-items:center;padding:0 1rem">
      <span style="font-weight:600">Wasatch <span style="color:#fbbf24">Rockhound</span></span>
    </nav>
    <section style="background:linear-gradient(135deg,#0f172a,#1e293b,#78350f);color:#fff;padding:2.5rem 1rem">
      <div class="hero-grid">
        <div style="padding-top:0">
          <h1 style="font-size:1.875rem;font-weight:600;line-height:1.35;margin:0 0 1rem">
            The Right Gear for Rockhounding in the West
          </h1>
          <p style="color:#cbd5e1;line-height:1.6;margin:0;font-size:1rem">
            Gear picks for metal detectors, rock hammers, GPS units, and field tools —
            chosen for Utah&rsquo;s BLM land, desert terrain, and mineralized soil.
          </p>
        </div>
        <div style="width:100%;min-height:360px;background:rgba(30,41,59,0.6);border-radius:1rem;border:1px solid rgba(255,255,255,0.1)" aria-hidden="true"></div>
      </div>
    </section>
    <section style="background:#1e293b;border-bottom:1px solid #334155;padding:1.25rem 1rem">
      <div style="max-width:80rem;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center">
        <div><div style="font-size:1.5rem;font-weight:600;color:#fbbf24">31+</div><div style="font-size:0.875rem;color:#94a3b8">Products</div></div>
        <div><div style="font-size:1.5rem;font-weight:600;color:#fbbf24">6</div><div style="font-size:0.875rem;color:#94a3b8">Categories</div></div>
        <div><div style="font-size:1.5rem;font-weight:600;color:#fbbf24">Utah</div><div style="font-size:0.875rem;color:#94a3b8">Home Base</div></div>
        <div><div style="font-size:1.5rem;font-weight:600;color:#fbbf24">BLM</div><div style="font-size:0.875rem;color:#94a3b8">Backyard</div></div>
      </div>
    </section>
    <div style="height:380px" aria-hidden="true"></div>
  </div>`;

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

  // Never eager-preload Maps — it loads when map routes mount.
  out = out.replace(
    /  <link rel="modulepreload" crossorigin href="\/assets\/[^"]*maps[^"]*\.js">\n/g,
    ""
  );

  if (!maps) {
    out = out.replace(
      /  <link rel="preconnect" href="https:\/\/maps\.googleapis\.com" \/>\n/g,
      ""
    );
    out = out.replace(
      /  <link rel="preconnect" href="https:\/\/maps\.gstatic\.com" crossorigin \/>\n/g,
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

  if (route.path === "/") {
    html = html.replace('<div id="root"></div>', `<div id="root">${HOME_SHELL}</div>`);
  }

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
