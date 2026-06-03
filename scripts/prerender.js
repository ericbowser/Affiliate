/**
 * prerender.js — Generates static HTML for every route after vite build
 *
 * How it works:
 *   1. Serves the dist/ folder with SPA fallback (all routes → index.html)
 *   2. Puppeteer visits each route and waits for React to render
 *   3. Captures the fully-rendered DOM and writes it as static HTML
 *   4. Google now sees real content instead of an empty <div id="root">
 *
 * Run:  npm run prerender  (after vite build)
 * Full: npm run build:full (build → prerender → sitemap)
 *
 * SOLID: Single Responsibility — this script only prerenders.
 *        Route data comes from routes.js (Dependency Inversion).
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync, statSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "..", "dist");
const PORT = 4173;
const CONCURRENCY = 3; // how many pages to render at once

// Dynamic import — puppeteer must be installed
let puppeteer;
try {
  puppeteer = await import("puppeteer");
} catch {
  console.error("❌ Puppeteer not installed. Run: npm install -D puppeteer");
  process.exit(1);
}

// Import route registry
import { getAllRoutes } from "./routes.js";

/**
 * Serve dist/ with SPA fallback — any path returns index.html
 * unless the exact file exists on disk.
 */
function startServer() {
  const indexHtml = readFileSync(join(DIST_DIR, "index.html"), "utf-8");
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
  };

  const server = createServer((req, res) => {
    const urlPath = req.url.split("?")[0];
    const filePath = join(DIST_DIR, urlPath);

    // Only serve actual files (not directories)
    if (existsSync(filePath)) {
      try {
        const stat = statSync(filePath);
        if (stat.isFile()) {
          const ext = extname(filePath);
          const contentType = mimeTypes[ext] || "application/octet-stream";
          res.writeHead(200, { "Content-Type": contentType });
          res.end(readFileSync(filePath));
          return;
        }
        // If it's a directory, check for index.html inside it
        if (stat.isDirectory()) {
          const dirIndex = join(filePath, "index.html");
          if (existsSync(dirIndex)) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(readFileSync(dirIndex, "utf-8"));
            return;
          }
        }
      } catch {
        // Fall through to SPA fallback
      }
    }

    // SPA fallback — serve root index.html for all unmatched routes
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(indexHtml);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`🌐 Preview server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

/**
 * Render a single route and save the HTML
 */
async function renderRoute(browser, route) {
  const page = await browser.newPage();

  // Block unnecessary resources to speed up rendering
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const type = req.resourceType();
    if (["image", "font", "media"].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const url = `http://localhost:${PORT}${route}`;

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

    // Wait for React to mount something inside #root
    await page.waitForSelector("#root > *", { timeout: 5000 });

    // Get the fully rendered HTML
    const html = await page.content();

    // Determine output path: /review/garrett-ace-400 → dist/review/garrett-ace-400/index.html
    const outputDir =
      route === "/"
        ? DIST_DIR
        : join(DIST_DIR, ...route.split("/").filter(Boolean));

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = join(outputDir, "index.html");
    writeFileSync(outputFile, html, "utf-8");

    console.log(`  ✅ ${route}`);
  } catch (err) {
    console.error(`  ❌ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

/**
 * Process routes in batches for controlled concurrency
 */
async function renderInBatches(browser, routes, batchSize) {
  for (let i = 0; i < routes.length; i += batchSize) {
    const batch = routes.slice(i, i + batchSize);
    await Promise.all(batch.map((route) => renderRoute(browser, route)));
  }
}

// --- Main ---
async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error("❌ dist/ not found. Run 'npm run build' first.");
    process.exit(1);
  }

  const routes = getAllRoutes();
  console.log(`\n🔨 Prerendering ${routes.length} routes...\n`);

  const server = await startServer();
  const browser = await puppeteer.default.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    await renderInBatches(browser, routes, CONCURRENCY);
    console.log(`\n✅ Prerendered ${routes.length} routes to dist/\n`);
  } catch (err) {
    console.error("\n❌ Prerender failed:", err.message);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
}

main();
