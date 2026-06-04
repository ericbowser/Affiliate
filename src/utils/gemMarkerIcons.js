import { GEM_MARKERS } from "../data/gemMarkers";

/** Raster size — Google Maps legacy Marker icons need PNG/JPEG, not SVG URLs. */
const RASTER_W = 44;
const RASTER_H = 54;

const pngCache = new Map();
let preloadPromise = null;

function absoluteUrl(path) {
  if (path.startsWith("http")) return path;
  return `${window.location.origin}${path}`;
}

/**
 * Draw an SVG onto a canvas and return a PNG data URL for use as Marker.icon.url.
 */
function rasterizeSvgToPng(svgPath) {
  const cached = pngCache.get(svgPath);
  if (cached) return cached;

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = RASTER_W;
      canvas.height = RASTER_H;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, RASTER_W, RASTER_H);
      ctx.drawImage(img, 0, 0, RASTER_W, RASTER_H);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error(`Failed to load marker SVG: ${svgPath}`));
    img.src = absoluteUrl(svgPath);
  });

  pngCache.set(svgPath, promise);
  return promise;
}

/** Preload all gem marker PNGs (call once after Maps JS API is ready). */
export function preloadGemMarkerIcons() {
  if (!preloadPromise) {
    const paths = [...new Set(Object.values(GEM_MARKERS))];
    preloadPromise = Promise.all(paths.map(rasterizeSvgToPng)).then(() => true);
  }
  return preloadPromise;
}

/**
 * Build a google.maps.Marker icon config for a site.
 * @param {string} siteId
 * @param {string|null} selectedId
 */
export async function getGemMarkerIcon(siteId, selectedId = null) {
  const svgPath = GEM_MARKERS[siteId];
  if (!svgPath || typeof window.google === "undefined") return undefined;

  const selected = selectedId === siteId;
  const w = selected ? 44 : 36;
  const h = selected ? 54 : 44;
  const url = await rasterizeSvgToPng(svgPath);

  return {
    url,
    scaledSize: new window.google.maps.Size(w, h),
    anchor: new window.google.maps.Point(w / 2, h),
    optimized: false,
  };
}
