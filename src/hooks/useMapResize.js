import { useEffect } from "react";

/**
 * Google Maps paints at the container's size on first layout. Mobile browsers
 * often report the wrong size until after orientation/layout settles — re-trigger
 * resize when the container or markers change.
 *
 * @param {google.maps.Map|null} map
 * @param {boolean} enabled
 * @param {unknown} bump — change when markers/icons finish loading
 */
export function useMapResize(map, enabled = true, bump = 0) {
  useEffect(() => {
    if (!map || !enabled) return;

    const gmaps = window.google?.maps;
    if (!gmaps) return;

    const trigger = () => {
      gmaps.event.trigger(map, "resize");
      const center = map.getCenter();
      if (center) map.setCenter(center);
    };

    trigger();
    const delays = [50, 150, 400, 800].map((ms) => setTimeout(trigger, ms));

    const onOrientation = () => setTimeout(trigger, 350);
    window.addEventListener("resize", trigger);
    window.addEventListener("orientationchange", onOrientation);

    const div = map.getDiv();
    const parent = div?.parentElement;
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => trigger());
      if (div) ro.observe(div);
      if (parent) ro.observe(parent);
    }

    return () => {
      delays.forEach(clearTimeout);
      window.removeEventListener("resize", trigger);
      window.removeEventListener("orientationchange", onOrientation);
      ro?.disconnect();
    };
  }, [map, enabled, bump]);
}
