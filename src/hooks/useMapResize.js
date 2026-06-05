import { useEffect } from "react";

/**
 * Google Maps renders at the container size on first paint. Re-trigger resize when
 * the wrapper changes (mobile orientation, flex layout, lazy load).
 */
export function useMapResize(map, enabled = true) {
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

    window.addEventListener("resize", trigger);
    window.addEventListener("orientationchange", trigger);

    const el = map.getDiv()?.parentElement;
    let ro;
    if (el && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => trigger());
      ro.observe(el);
    }

    return () => {
      window.removeEventListener("resize", trigger);
      window.removeEventListener("orientationchange", trigger);
      ro?.disconnect();
    };
  }, [map, enabled]);
}
