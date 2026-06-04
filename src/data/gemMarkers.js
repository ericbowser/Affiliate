import { rockhoundingSites } from "./sites.js";

/**
 * Map pin SVGs under /public/gem-markers/.
 * Keys come from each site's markerKey (iconic find for that location).
 * Rasterized to PNG before use with google.maps.Marker.
 */
export const GEM_MARKERS = Object.fromEntries(
  rockhoundingSites.map((site) => [site.id, `/gem-markers/${site.markerKey}.svg`])
);

/** markerKey → pin asset path (for lookups by mineral type) */
export const MARKER_BY_KEY = Object.fromEntries(
  [...new Set(rockhoundingSites.map((s) => s.markerKey))].map((key) => [
    key,
    `/gem-markers/${key}.svg`,
  ])
);
