/**
 * posts.js — Content Registry for Wasatch Rockhound
 *
 * Metadata lives in postRegistry.js (Node-safe for build scripts).
 * This file attaches markdown content by slug.
 */

import rockhoundingUtah from "./posts/rockhounding-utah-8-best-sites.md?raw";
import bestDetectors2026 from "./posts/best-metal-detectors-2026.md?raw";
import aceVsVanquish from "./posts/garrett-ace-400-vs-vanquish-540.md?raw";
import bestTumblers2026 from "./posts/best-rock-tumblers-beginners-2026.md?raw";
import topazMountainGuide from "./posts/topaz-mountain-utah-guide.md?raw";
import gearChecklist from "./posts/rockhounding-gear-checklist.md?raw";
import simplexVsAce400 from "./posts/nokta-simplex-lite-vs-garrett-ace-400.md?raw";
import dugwayGeodeGuide from "./posts/dugway-geode-beds-utah-guide.md?raw";
import uDigFossilsGuide from "./posts/u-dig-fossils-utah-guide.md?raw";
import { postRegistry } from "./postRegistry.js";

const contentBySlug = {
  "rockhounding-utah-8-best-sites": rockhoundingUtah,
  "best-metal-detectors-rockhounding-2026": bestDetectors2026,
  "garrett-ace-400-vs-minelab-vanquish-540": aceVsVanquish,
  "best-rock-tumblers-beginners-2026": bestTumblers2026,
  "topaz-mountain-utah-guide": topazMountainGuide,
  "rockhounding-gear-checklist": gearChecklist,
  "nokta-simplex-lite-vs-garrett-ace-400": simplexVsAce400,
  "dugway-geode-beds-utah-guide": dugwayGeodeGuide,
  "u-dig-fossils-utah-guide": uDigFossilsGuide,
};

export const posts = postRegistry.map((post) => ({
  ...post,
  content: contentBySlug[post.slug],
}));

// --- Helpers ---

export const getPostBySlug = (slug) =>
  posts.find((p) => p.slug === slug && p.status === "published") ?? null;

export const getPublishedPosts = () =>
  posts
    .filter((p) => p.status === "published" && p.content)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPostsByType = (type) =>
  getPublishedPosts().filter((p) => p.type === type);

export const getRelatedPosts = (currentSlug, limit = 3) => {
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  return getPublishedPosts()
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => {
      const sharedProducts = (current.linkedProducts || []).filter((id) =>
        (p.linkedProducts || []).includes(id)
      );
      return sharedProducts.length > 0 || p.category === current.category;
    })
    .slice(0, limit);
};
