import rockhoundingUtah from "./posts/rockhounding-utah-8-best-sites.md?raw";

export const posts = [
  {
    slug: "rockhounding-utah-8-best-sites",
    title: "Rockhounding in Utah: 8 Best Sites + What You'll Find",
    description:
      "The eight best public-land rockhounding sites in Utah — ranked by beginner-friendliness, with honest notes on access, what to find, and what to bring.",
    date: "2026-05-29",
    category: "Site Guides",
    readTime: "9 min read",
    mapSites: [
      "topaz-mountain",
      "dugway-geode-beds",
      "u-dig-fossils",
      "tintic-mountains",
      "san-rafael-swell",
      "marysvale",
      "sunstone-knoll",
      "comb-ridge",
    ],
    content: rockhoundingUtah,
  },
];

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug) ?? null;
