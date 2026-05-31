/**
 * posts.js — Content Registry for Wasatch Rockhound
 * 
 * Single Responsibility: maps slugs to post metadata.
 * Open/Closed: add new posts by appending to the array.
 * 
 * Content types: pillar, comparison, site-guide, how-to, gear-list
 * Status: published | draft
 */

import rockhoundingUtah from "./posts/rockhounding-utah-8-best-sites.md?raw";
import bestDetectors2026 from "./posts/best-metal-detectors-2026.md?raw";
import aceVsVanquish from "./posts/garrett-ace-400-vs-vanquish-540.md?raw";
import bestTumblers2026 from "./posts/best-rock-tumblers-beginners-2026.md?raw";

export const posts = [
  // --- PUBLISHED ---
  {
    slug: "rockhounding-utah-8-best-sites",
    title: "Rockhounding in Utah: 8 Best Sites + What You'll Find",
    description:
      "The eight best public-land rockhounding sites in Utah — ranked by beginner-friendliness, with honest notes on access, what to find, and what to bring.",
    date: "2026-05-29",
    category: "Site Guides",
    type: "site-guide",
    status: "published",
    readTime: "9 min read",
    keywords: [
      "rockhounding in utah",
      "best rockhounding sites utah",
      "rockhounding near salt lake city",
    ],
    linkedProducts: [],
    mapSites: [
      "topaz-mountain", "dugway-geode-beds", "u-dig-fossils",
      "tintic-mountains", "san-rafael-swell", "marysvale",
      "sunstone-knoll", "comb-ridge",
    ],
    content: rockhoundingUtah,
  },
  {
    slug: "best-metal-detectors-rockhounding-2026",
    title: "Best Metal Detectors for Rockhounding in 2026",
    description:
      "Every detector evaluated for rockhounding-specific use — mineralized soil, gold, meteorites, and creek terrain. Not another coin-shooter list.",
    date: "2026-06-01",
    category: "Gear Reviews",
    type: "pillar",
    status: "published",
    readTime: "11 min read",
    keywords: [
      "best metal detector for rockhounding",
      "metal detector for gold",
      "best metal detector 2026",
    ],
    linkedProducts: [
      "nokta-simplex-lite", "garrett-ace-400", "minelab-vanquish-540",
      "garrett-at-max", "garrett-goldmaster-24k",
      "minelab-equinox-800", "minelab-equinox-900",
    ],
    content: bestDetectors2026,
  },
  {
    slug: "garrett-ace-400-vs-minelab-vanquish-540",
    title: "Garrett Ace 400 vs Minelab Vanquish 540: Which Should You Buy?",
    description:
      "Head-to-head comparison for rockhounding in mineralized Western terrain. Single-frequency simplicity vs multi-IQ technology at a similar price.",
    date: "2026-06-01",
    category: "Comparisons",
    type: "comparison",
    status: "published",
    readTime: "7 min read",
    keywords: [
      "garrett ace 400 vs minelab vanquish 540",
      "ace 400 vs vanquish",
      "best beginner metal detector comparison",
    ],
    linkedProducts: ["garrett-ace-400", "minelab-vanquish-540"],
    content: aceVsVanquish,
  },

  {
    slug: "best-rock-tumblers-beginners-2026",
    title: "Best Rock Tumblers for Beginners in 2026",
    description:
      "The three best beginner rock tumblers compared — what actually matters at this price range, common mistakes that ruin your first batch, and which Utah stones tumble best.",
    date: "2026-06-01",
    category: "Gear Reviews",
    type: "pillar",
    status: "published",
    readTime: "8 min read",
    keywords: [
      "best rock tumbler",
      "rock tumbler for beginners",
      "best rock tumbler 2026",
      "how to tumble rocks",
    ],
    linkedProducts: ["national-geo-tumbler", "c1-rock-tumbler-kit", "vevor-tumbler"],
    content: bestTumblers2026,
  },

  // --- PLANNED (uncomment and add import as each is written) ---
  //
  // {
  //   slug: "rockhounding-gear-checklist",
  //   title: "Rockhounding Gear Checklist: Everything You Actually Need",
  //   type: "gear-list",
  //   status: "draft",
  //   keywords: ["rockhounding gear list", "rockhounding equipment", "what to bring rockhounding"],
  //   linkedProducts: ["estwing-rock-hammer", "black-diamond-spot", "garmin-etrex-32x", "stanley-classic-bottle", "leatherman-signal", "rockhounding-utah-book"],
  // },
  // {
  //   slug: "best-rock-tumblers-beginners-2026",
  //   title: "Best Rock Tumblers for Beginners 2026",
  //   type: "pillar",
  //   status: "draft",
  //   keywords: ["best rock tumbler", "rock tumbler for beginners", "best rock tumbler 2026"],
  //   linkedProducts: ["national-geo-tumbler", "c1-rock-tumbler-kit", "vevor-tumbler"],
  // },
  // {
  //   slug: "topaz-mountain-utah-guide",
  //   title: "Topaz Mountain Utah: Complete Collecting Guide",
  //   type: "site-guide",
  //   status: "draft",
  //   keywords: ["topaz mountain utah", "topaz mountain rockhounding", "where to find topaz in utah"],
  // },
  // {
  //   slug: "nokta-simplex-lite-vs-garrett-ace-400",
  //   title: "Nokta Simplex Lite vs Garrett Ace 400: Budget Detector Showdown",
  //   type: "comparison",
  //   status: "draft",
  //   keywords: ["nokta simplex vs garrett ace", "best budget metal detector"],
  //   linkedProducts: ["nokta-simplex-lite", "garrett-ace-400"],
  // },
];

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
      // Related if they share linked products or same category
      const sharedProducts = (current.linkedProducts || []).filter((id) =>
        (p.linkedProducts || []).includes(id)
      );
      return sharedProducts.length > 0 || p.category === current.category;
    })
    .slice(0, limit);
};
