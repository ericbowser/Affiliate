import { siteConfig } from "./config.js";
import { products } from "./products.js";
import { postRegistry } from "./postRegistry.js";

const SITE_NAME = "Wasatch Rockhound";
const SITE_URL = "https://rockhoundutah.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/** All indexable routes with SEO props matching src/components/SEO.jsx */
export function buildRouteSeoList() {
  const routes = [
    {
      path: "/",
      title: null,
      description:
        "Honest gear reviews, site guides, and beginner resources for rockhounding across Utah and the American West. Find what to buy, where to go, and what to bring.",
      type: "website",
      maps: true,
    },
    {
      path: "/about",
      title: "About",
      description:
        "Wasatch Rockhound is an independent gear site built by a Salt Lake City-based developer for people who actually get out and dig on Utah BLM land.",
      type: "website",
    },
    {
      path: "/blog",
      title: "Field Notes & Site Guides",
      description:
        "Trip planning resources, site guides, and gear breakdowns for rockhounding in Utah and the American West.",
      type: "website",
    },
    {
      path: "/tools/detector-match",
      title: "Metal Detector Match Quiz",
      description:
        "Answer a few questions and get a personalized metal detector recommendation matched to your budget, terrain, and rockhounding goals.",
      type: "website",
    },
    {
      path: "/guides/utah-sites-map",
      title: "Utah & Nevada Rockhounding Sites Map",
      description:
        "Interactive map of the best public-land rockhounding sites across Utah and Nevada — click any pin for difficulty, season, and what you'll find.",
      type: "website",
      maps: true,
    },
    {
      path: "/weather",
      title: "Field Conditions",
      description:
        "Live weather and road advisories for all 8 Utah rockhounding sites — updated hourly, with road impassability warnings for Dugway and San Rafael Swell.",
      type: "website",
    },
  ];

  for (const [slug, category] of Object.entries(siteConfig.categories)) {
    routes.push({
      path: `/category/${slug}`,
      title: category.name,
      description: category.description,
      type: "website",
    });
  }

  for (const product of products) {
    const desc = `${product.tagline}${product.bestFor ? ` Best for: ${product.bestFor}.` : ""}`.trim();
    routes.push({
      path: `/review/${product.id}`,
      title: `${product.name} Review`,
      description: desc,
      type: "product",
    });
  }

  for (const post of postRegistry.filter((p) => p.status === "published")) {
    routes.push({
      path: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      type: "article",
      maps: Boolean(post.mapSites?.length),
    });
  }

  return routes;
}

export { SITE_NAME, SITE_URL, DEFAULT_IMAGE };
