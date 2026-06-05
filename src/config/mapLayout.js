/** Minimum map width — keeps tiles readable on narrow phones without forcing page scroll */
export const MAP_MIN_WIDTH = 280;

/** Shared inline styles for @react-google-maps/api mapContainerStyle */
export function heroMapStyle() {
  return {
    width: "100%",
    minWidth: MAP_MIN_WIDTH,
    height: "clamp(240px, 42dvh, 460px)",
    minHeight: 240,
  };
}

export function cardMapStyle(heightPx = 340) {
  return {
    width: "100%",
    minWidth: MAP_MIN_WIDTH,
    height: `${heightPx}px`,
    minHeight: 240,
  };
}

export function fullMapStyle() {
  return {
    width: "100%",
    minWidth: MAP_MIN_WIDTH,
    height: "100%",
    minHeight: 280,
  };
}

export function blogMapStyle() {
  return {
    width: "100%",
    minWidth: MAP_MIN_WIDTH,
    height: "clamp(240px, 40dvh, 340px)",
    minHeight: 240,
  };
}
