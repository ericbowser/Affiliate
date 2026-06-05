import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleMaps } from "../context/GoogleMapsContext";

const LOAD_TIMEOUT_MS = 15000;

/**
 * Loading / error UI for map components.
 * @param {object} props
 * @param {number} props.height — min height in px for the placeholder box
 * @param {boolean} [props.heroMode] — dark hero styling
 * @param {boolean} [props.silent] — no UI on error (blog embeds)
 */
export function MapLoadStatus({ height, heroMode = false, silent = false }) {
  const { isLoaded, loadError, apiKey } = useGoogleMaps();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (isLoaded || loadError) {
      setTimedOut(false);
      return;
    }
    const t = setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [isLoaded, loadError]);

  if (isLoaded) return null;

  if (silent && (loadError || timedOut || !apiKey)) return null;

  const boxClass = heroMode
    ? "bg-slate-800/60 text-slate-300"
    : "bg-stone-100 border border-stone-200 text-stone-600";

  if (!apiKey) {
    return (
      <MapPlaceholder height={height} className={boxClass}>
        <p className="text-sm font-medium">Map unavailable</p>
        <p className="text-xs mt-1 opacity-80">
          Set <code className="text-[11px]">VITE_GOOGLE_MAPS_API_KEY</code> before{" "}
          <code className="text-[11px]">npm run build</code>.
        </p>
      </MapPlaceholder>
    );
  }

  if (loadError || timedOut) {
    return (
      <MapPlaceholder height={height} className={boxClass}>
        <p className="text-sm font-medium">Map couldn&apos;t load</p>
        <p className="text-xs mt-2 leading-relaxed opacity-90 max-w-sm">
          {timedOut && !loadError
            ? "Usually this means your Google Maps API key is restricted to localhost only. In Google Cloud Console, add your live site under HTTP referrers:"
            : "Check that the Maps JavaScript API is enabled and billing is active for this key."}
        </p>
        {timedOut && !loadError && (
          <p className="text-xs mt-2 font-mono opacity-80 break-all">
            https://rockhoundutah.com/*
            <br />
            https://www.rockhoundutah.com/*
          </p>
        )}
        <Link
          to="/guides/utah-sites-map"
          className="inline-block mt-3 text-xs font-medium text-amber-600 hover:text-amber-700"
        >
          View site list without map →
        </Link>
      </MapPlaceholder>
    );
  }

  return (
    <MapPlaceholder height={height} className={boxClass}>
      <div className="w-6 h-6 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      <p className={`text-xs mt-2 ${heroMode ? "text-slate-400" : "text-stone-400"}`}>
        Loading map…
      </p>
    </MapPlaceholder>
  );
}

function MapPlaceholder({ height, className, children }) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center px-4 ${className}`}
      style={{ height, minHeight: height }}
    >
      {children}
    </div>
  );
}
