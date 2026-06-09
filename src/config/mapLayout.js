/** Wrapper min-width; avoid inline minWidth on map div (can cause horizontal scroll on phones) */
export const MAP_SHELL_MIN_WIDTH = 0;

/** Night-mode map styles shared across all map components */
export const NIGHT_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a9a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f0f1e" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2a2a4a" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#4a4a6a" }] },
  { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#3a3a5a" }, { weight: 1.5 }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#16213e" }] },
  { featureType: "landscape.natural.terrain", elementType: "geometry", stylers: [{ color: "#1a2744" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1e2d4a" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6a6a7a" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1a3328" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a4a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#6a6a7a" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#b45309" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#92400e" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#2a3050" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#1e1e3a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0c1929" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3a5a7a" }] },
];

/** Two-state map viewport */
export const DEFAULT_MAP_CENTER = { lat: 39.5, lng: -114.0 };
export const DEFAULT_MAP_ZOOM = 6;

/** Shared inline styles for @react-google-maps/api mapContainerStyle */
export function heroMapStyle() {
  return {
    width: "100%",
    height: "clamp(260px, 45dvh, 460px)",
    minHeight: 260,
  };
}

export function cardMapStyle(heightPx = 340) {
  return {
    width: "100%",
    height: `${heightPx}px`,
    minHeight: 260,
  };
}

export function fullMapStyle() {
  return {
    width: "100%",
    height: "100%",
    minHeight: 280,
  };
}

export function blogMapStyle() {
  return {
    width: "100%",
    height: "clamp(260px, 42dvh, 340px)",
    minHeight: 260,
  };
}
