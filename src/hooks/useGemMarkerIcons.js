import { useState, useEffect } from "react";
import { GEM_MARKERS } from "../data/gemMarkers";
import { preloadGemMarkerIcons, getGemMarkerIcon } from "../utils/gemMarkerIcons";

/**
 * Preloads gem SVGs as PNG data URLs and exposes per-site Marker icon configs.
 * @param {boolean} mapsReady - true when useJsApiLoader reports isLoaded
 * @param {Array<{id: string}>} sites
 * @param {string|null} selectedId
 */
export function useGemMarkerIcons(mapsReady, sites, selectedId) {
  const [icons, setIcons] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mapsReady) {
      setIcons(null);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await preloadGemMarkerIcons();
        const entries = await Promise.all(
          sites.map(async (site) => {
            if (!GEM_MARKERS[site.id]) return [site.id, undefined];
            const icon = await getGemMarkerIcon(site.id, selectedId);
            return [site.id, icon];
          })
        );
        if (!cancelled) {
          setIcons(Object.fromEntries(entries));
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setIcons(null);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mapsReady, sites, selectedId]);

  return { icons, error, ready: Boolean(icons) };
}
