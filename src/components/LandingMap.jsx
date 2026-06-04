import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { rockhoundingSites } from "../data/sites";
import GemSiteMarkers from "./GemSiteMarkers";

const MAP_CENTER = { lat: 39.2, lng: -111.5 };
const MAP_ZOOM   = 7;

const MAP_STYLES = [
  { elementType: "geometry",           stylers: [{ color: "#f5f0e8" }] },
  { elementType: "labels.text.fill",   stylers: [{ color: "#57534e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fafaf9" }] },
  { featureType: "administrative",     elementType: "geometry.stroke", stylers: [{ color: "#c6b89a" }] },
  { featureType: "landscape.natural",  elementType: "geometry",        stylers: [{ color: "#e8dfc8" }] },
  { featureType: "poi",                elementType: "geometry",        stylers: [{ color: "#ddd0b4" }] },
  { featureType: "road",               elementType: "geometry",        stylers: [{ color: "#ffffff" }] },
  { featureType: "road.highway",       elementType: "geometry",        stylers: [{ color: "#f0c070" }] },
  { featureType: "water",              elementType: "geometry",        stylers: [{ color: "#b8d4e8" }] },
];

const DIFFICULTY_COLOR = {
  Easy:            "bg-green-100 text-green-800",
  Moderate:        "bg-amber-100 text-amber-800",
  "Moderate–Hard": "bg-orange-100 text-orange-800",
  "Easy–Moderate": "bg-yellow-100 text-yellow-800",
};

/**
 * LandingMap — compact gem-marker map for the landing page.
 *
 * Props:
 *   heroMode  {boolean}  When true: taller canvas, dark info strip that
 *                        blends with the hero banner background.
 */
const LandingMap = ({ heroMode = false }) => {
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);

  const mapHeight = heroMode ? 460 : 340;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onLoad    = useCallback((m) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const handlePin = (site) => {
    const next = selected?.id === site.id ? null : site;
    setSelected(next);
    if (map && next) map.panTo({ lat: site.lat, lng: site.lng });
  };

  // Hard fail — render nothing rather than an error in the hero
  if (loadError) return null;

  // Loading skeleton — same footprint as the loaded map
  if (!isLoaded) {
    return (
      <div
        className={`w-full flex items-center justify-center flex-col gap-2 ${heroMode ? "bg-slate-800/60" : "bg-stone-100 border border-stone-200 rounded-2xl"}`}
        style={{ height: mapHeight }}
      >
        <div className="w-6 h-6 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className={`text-xs ${heroMode ? "text-slate-400" : "text-stone-400"}`}>Loading map…</p>
      </div>
    );
  }

  /* ── Info strip styles ───────────────────────────────────────────── */
  const stripBase    = heroMode
    ? "bg-slate-900/90 backdrop-blur-sm border-t border-white/10 px-4 py-3"
    : "bg-white border-t border-stone-100 px-4 py-3";
  const textPrimary  = heroMode ? "text-white"       : "text-gray-900";
  const textSecond   = heroMode ? "text-slate-400"   : "text-gray-500";
  const textMuted    = heroMode ? "text-slate-500"   : "text-gray-400";
  const findChip     = heroMode
    ? "bg-amber-900/60 text-amber-300 border border-amber-700/50"
    : "bg-amber-50 text-amber-800 border border-amber-100";
  const ctaClass     = "text-xs font-medium bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap text-center";
  const closeClass   = heroMode ? "text-xs text-slate-500 hover:text-slate-300 text-center" : "text-xs text-gray-400 hover:text-gray-600 text-center";
  const fullMapClass = heroMode ? "text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors" : "text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors";

  return (
    <div className={heroMode ? "w-full" : "rounded-2xl overflow-hidden border border-stone-200 shadow-md"}>

      {/* Map canvas */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: `${mapHeight}px` }}
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: MAP_STYLES,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          zoomControlOptions: { position: 9 },
        }}
      >
        <GemSiteMarkers
          sites={rockhoundingSites}
          selectedId={selected?.id ?? null}
          onSelect={handlePin}
          mapsReady={isLoaded}
        />
      </GoogleMap>

      {/* Info strip */}
      {selected ? (
        <div className={`flex items-start justify-between gap-4 ${stripBase}`}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={`font-semibold text-sm ${textPrimary}`}>{selected.name}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[selected.difficulty] ?? "bg-gray-100 text-gray-700"}`}>
                {selected.difficulty}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${textSecond}`}>
              {selected.distanceFromSLC} · {selected.access}
            </p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {selected.find.slice(0, 3).map((item) => (
                <span key={item} className={`text-xs px-2 py-0.5 rounded-full ${findChip}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            <Link to="/guides/utah-sites-map" className={ctaClass}>
              Full Map →
            </Link>
            <button onClick={() => setSelected(null)} className={closeClass}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className={`flex items-center justify-between ${stripBase}`}>
          <p className={`text-xs ${textMuted}`}>
            {rockhoundingSites.length} sites · Click a gem pin for details
          </p>
          <Link to="/guides/utah-sites-map" className={fullMapClass}>
            Open full map →
          </Link>
        </div>
      )}
    </div>
  );
};

export default LandingMap;
