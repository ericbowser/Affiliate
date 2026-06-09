import { NIGHT_MAP_STYLES } from "./mapLayout.js";

/**
 * @param {'embed' | 'page'} mode
 *   embed — map inside a scrollable page (homepage hero, blog); cooperative gestures
 *   page  — dedicated map view; greedy touch handling
 */
export function getMapOptions(mode = "embed") {
  return {
    styles: NIGHT_MAP_STYLES,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: mode === "page",
    clickableIcons: false,
    zoomControl: true,
    zoomControlOptions: { position: 9 },
    gestureHandling: mode === "page" ? "greedy" : "cooperative",
    /* Helps mobile browsers render crisp tiles when pinch-zooming */
    isFractionalZoomEnabled: true,
  };
}
