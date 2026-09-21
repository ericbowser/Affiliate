/**
 * affiliateLinks.js
 * 
 * Centralized affiliate URL registry for Wasatch Rockhound.
 * Single Responsibility: manages retailer links per product.
 * Open/Closed: add new retailers without modifying existing entries.
 * 
 * Usage:
 *   import { getProductLinks, getPrimaryLink } from './affiliateLinks';
 *   const links = getProductLinks("garrett-ace-400");
 *   // [{ retailer: "Amazon", url: "https://amzn.to/...", label: "Buy on Amazon" }, ...]
 */

const RETAILERS = {
  amazon: { name: "Amazon", label: "Buy on Amazon", priority: 2 },
  kellyco: { name: "KellyCo", label: "Buy from KellyCo", priority: 1 },
  rei: { name: "REI Co-op", label: "Buy at REI", priority: 1 },
  shareasale: { name: "ShareASale", label: "Buy Direct", priority: 3 },
  highplains: { name: "High Plains Prospectors", label: "Buy from High Plains", priority: 1 },
  serious: { name: "Serious Detecting", label: "Buy from Serious Detecting", priority: 1 },
};

/**
 * Link registry — keyed by product ID.
 * Set a retailer to null until you're approved / have the link.
 * Once approved, paste the tagged URL and it's live immediately.
 */
const affiliateLinks = {
  // --- METAL DETECTORS ---
  "nokta-simplex-lite": {
    amazon: "https://link.amazon/B066azA49",
    kellyco: null,   // TODO: Apply & add KellyCo link
    rei: null,
  },
  "garrett-ace-400": {
    amazon: "https://link.amazon/B08TFqFQD",
    kellyco: null,
    rei: null,
  },
  "minelab-vanquish-540": {
    amazon: "https://link.amazon/B0j3Q8ut6",
    kellyco: null,
    rei: null,
  },
  "garrett-at-max": {
    amazon: "https://link.amazon/B0gRMM48q",
    kellyco: null,
    rei: null,
  },
  "garrett-goldmaster-24k": {
    amazon: "https://link.amazon/B02fFp7zN",
    kellyco: null,
    highplains: null,
  },
  "minelab-equinox-800": {
    amazon: "https://link.amazon/B00Jr6MOi",
    kellyco: null,
    rei: null,
  },
  "minelab-equinox-900": {
    amazon: "https://link.amazon/B04scIeN3",
    kellyco: null,
    rei: null,
  },

  // --- ROCK HAMMERS & HAND TOOLS ---
  "estwing-rock-hammer": {
    amazon: "https://link.amazon/B0eGjcnxc",
    rei: null,
  },
  "estwing-prospecting-pick": {
    amazon: "https://www.amazon.com/dp/B004F7JCBC?tag=rock0e7-20",
    rei: null,
  },
  "nicholson-hacksaw-80950": {
    amazon: "https://link.amazon/B0dYtfIGL",
  },
  "dewalt-safety-glasses": {
    amazon: "https://link.amazon/B0fkqIQwW",
  },
  "cold-chisel-set": {
    amazon: "https://link.amazon/B0eoahl7Y",
  },
  "classifier-screen-18": {
    amazon: "https://link.amazon/B00SF0dGA",
    highplains: null,
  },
  "collapsible-field-shovel": {
    amazon: "https://link.amazon/B0bad8xPS",
    rei: null,
  },
  "jewelers-loupe-10x": {
    amazon: "https://link.amazon/B0iK6KqS7",
  },
  "adventure-medical-ultralight": {
    amazon: "https://link.amazon/B021S7VOe",
    rei: null,
  },
  "mechanix-original-gloves": {
    amazon: "https://link.amazon/B087Ngyka",
    rei: null,
  },
  "nokta-pinpointer": {
    amazon: "https://link.amazon/B09mpaug9",
    kellyco: null,
    serious: null,
  },
  "tumbler-grit-refill": {
    amazon: "https://link.amazon/B0itv4Gb3",
  },
  "sunday-afternoons-hat": {
    amazon: "https://link.amazon/B0eJrpZuc",
    rei: null,
  },
  "viair-88p-compressor": {
    amazon: "https://www.amazon.com/dp/B0F3FTX6XQ?tag=rock0e7-20",
  },

  // --- TUMBLERS & LAPIDARY ---
  "national-geo-tumbler": {
    amazon: "https://link.amazon/B0eDbsffd",
  },
  "c1-rock-tumbler-kit": {
    amazon: "https://link.amazon/B0icdCzby",
  },
  "vevor-tumbler": {
    amazon: "https://www.amazon.com/dp/B0GS1GP54N?tag=rock0e7-20",
  },

  // --- FIELD GEAR ---
  "black-diamond-spot": {
    amazon: "https://link.amazon/B0ahxJfmU",
    rei: null,
  },
  "stanley-classic-bottle": {
    amazon: "https://link.amazon/B07tyCxhg",
    rei: null,
  },
  "leatherman-signal": {
    amazon: "https://link.amazon/B0hyDedcf",
    rei: null,
  },

  // --- GPS & NAVIGATION ---
  "garmin-etrex-32x": {
    amazon: "https://link.amazon/B0f7pQgtI",
    rei: null,
  },
  "garmin-inreach-mini-2": {
    amazon: "https://link.amazon/B00N1ToVI",
    rei: null,
  },

  // --- BOOKS ---
  "rockhounding-utah-book": {
    amazon: "https://link.amazon/B01amSota",
  },
  "gem-trails-utah": {
    amazon: "https://link.amazon/B05KQx75h",
  },
};

/**
 * Get all active affiliate links for a product.
 * Returns array sorted by retailer priority (specialty > Amazon > generic).
 */
export const getProductLinks = (productId) => {
  const links = affiliateLinks[productId];
  if (!links) return [];

  return Object.entries(links)
    .filter(([_, url]) => url !== null)
    .map(([key, url]) => {
      const retailer = RETAILERS[key] || { name: key, label: `Buy from ${key}`, priority: 9 };
      return {
        retailer: retailer.name,
        label: retailer.label,
        url,
        priority: retailer.priority,
      };
    })
    .sort((a, b) => a.priority - b.priority);
};

/**
 * Get the single best link for a product (specialty retailer > Amazon).
 */
export const getPrimaryLink = (productId) => {
  const links = getProductLinks(productId);
  return links.length > 0 ? links[0] : null;
};

/**
 * Get total count of products with at least one active link.
 * Useful for affiliate disclosure accuracy.
 */
export const getLinkedProductCount = () => {
  return Object.keys(affiliateLinks).filter(
    (id) => getProductLinks(id).length > 0
  ).length;
};

export default affiliateLinks;
