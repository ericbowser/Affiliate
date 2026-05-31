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
    amazon: "https://amzn.to/43iswmN",
    kellyco: null,   // TODO: Apply & add KellyCo link
    rei: null,
  },
  "garrett-ace-400": {
    amazon: "https://amzn.to/4dyU6Sx",
    kellyco: null,
    rei: null,
  },
  "minelab-vanquish-540": {
    amazon: "https://amzn.to/4a6IXWL",
    kellyco: null,
    rei: null,
  },
  "garrett-at-max": {
    amazon: "https://amzn.to/42Uv2iO",
    kellyco: null,
    rei: null,
  },
  "garrett-goldmaster-24k": {
    amazon: "https://amzn.to/49jGJ6k",
    kellyco: null,
    highplains: null,
  },
  "minelab-equinox-800": {
    amazon: "https://amzn.to/3RwArdq",
    kellyco: null,
    rei: null,
  },
  "minelab-equinox-900": {
    amazon: "https://amzn.to/4fJbR2R",
    kellyco: null,
    rei: null,
  },

  // --- ROCK HAMMERS & HAND TOOLS ---
  "estwing-rock-hammer": {
    amazon: "https://amzn.to/3PDmlX7",
    rei: null,
  },
  "estwing-prospecting-pick": {
    amazon: "https://amzn.to/42TPJvj",
    rei: null,
  },
  "nicholson-hacksaw-80950": {
    amazon: "https://amzn.to/4wYquWy",
  },

  // --- TUMBLERS & LAPIDARY ---
  "national-geo-tumbler": {
    amazon: "https://amzn.to/4vfVFuL",
  },
  "c1-rock-tumbler-kit": {
    amazon: "https://amzn.to/4dQ63lE",
  },
  "vevor-tumbler": {
    amazon: "https://amzn.to/4vivx2p",
  },

  // --- FIELD GEAR ---
  "black-diamond-spot": {
    amazon: "https://amzn.to/4wRB8yb",
    rei: null,
  },
  "stanley-classic-bottle": {
    amazon: "https://amzn.to/4dA1NIh",
    rei: null,
  },
  "leatherman-signal": {
    amazon: "https://amzn.to/4nSxM9P",
    rei: null,
  },

  // --- GPS & NAVIGATION ---
  "garmin-etrex-32x": {
    amazon: "https://amzn.to/49Ui3kU",
    rei: null,
  },
  "garmin-inreach-mini-2": {
    amazon: "https://amzn.to/3POuVSN",
    rei: null,
  },

  // --- BOOKS ---
  "rockhounding-utah-book": {
    amazon: "https://amzn.to/4fdSjn9",
  },
  "gem-trails-utah": {
    amazon: "https://amzn.to/4fLlEW9",
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
