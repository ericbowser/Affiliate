import React, { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { rockhoundingSites } from "../data/sites";
import GemSiteMarkers from "./GemSiteMarkers";
import GemIcon from "./gems/GemIcons";
import { SITE_PRIMARY_GEM, MINERAL_TO_ASSET } from "../assets/gems";
import { useGoogleMaps } from "../context/GoogleMapsContext";
import { MapLoadStatus } from "./MapLoadStatus";
import { fullMapStyle, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../config/mapLayout";
import { getMapOptions } from "../config/mapOptions";
import { useMapResize } from "../hooks/useMapResize";

const MAP_CENTER = DEFAULT_MAP_CENTER;
const MAP_ZOOM = DEFAULT_MAP_ZOOM;

const DIFFICULTY_COLOR = {
  Easy: "bg-green-100 text-green-800",
  Moderate: "bg-amber-100 text-amber-800",
  "Moderate–Hard": "bg-orange-100 text-orange-800",
  "Easy–Moderate": "bg-yellow-100 text-yellow-800",
};

const SiteMap = () => {
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);
  const [markersReady, setMarkersReady] = useState(false);

  const { isLoaded } = useGoogleMaps();

  const onLoad = useCallback((mapInstance) => setMap(mapInstance), []);
  const onUnmount = useCallback(() => setMap(null), []);

  useMapResize(map, isLoaded, markersReady);

  const handleMarkerClick = (site) => {
    setSelected(site);
    if (map) map.panTo({ lat: site.lat, lng: site.lng });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Utah & Nevada Rockhounding Sites</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Utah & Nevada Rockhounding Sites Map</h1>
        <p className="text-gray-500 max-w-2xl">
          The best public-land collecting sites across Utah and Nevada. Click any pin for details on
          what to find, difficulty, and best season.
        </p>
      </div>

      {/* Layout: map + sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 min-w-0">

        {/* Map — lg:flex-1 only so flex-basis doesn't collapse height on mobile */}
        <div
          className="google-map-shell relative w-full min-w-0 shrink-0 lg:shrink lg:flex-1 h-[min(50dvh,400px)] min-h-[320px] sm:min-h-[400px] lg:h-[min(60dvh,540px)] lg:min-h-[540px] rounded-2xl shadow-md border border-stone-200"
        >
          {!isLoaded ? (
            <MapLoadStatus height="100%" />
          ) : (
            <GoogleMap
              mapContainerStyle={fullMapStyle()}
              center={MAP_CENTER}
              zoom={MAP_ZOOM}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={getMapOptions("page")}
            >
              <GemSiteMarkers
                sites={rockhoundingSites}
                selectedId={selected?.id ?? null}
                onSelect={handleMarkerClick}
                mapsReady={isLoaded}
                onMarkersReady={() => setMarkersReady(true)}
              />
            </GoogleMap>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex flex-col gap-3">
          {selected ? (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              {/* Header with gem icon */}
              <div className="bg-gradient-to-r from-stone-800 to-amber-800 px-5 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <GemIcon name={SITE_PRIMARY_GEM[selected.id]} size={36} className="shrink-0 drop-shadow-md" />
                    <div>
                      <h2 className="text-white font-bold text-lg leading-tight">{selected.name}</h2>
                      <p className="text-amber-200 text-sm mt-0.5">{selected.county}, {selected.state || 'UT'} · {selected.region}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-white/60 hover:text-white text-xl leading-none ml-2 mt-0.5"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-stone-50 rounded-lg px-3 py-2">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">From SLC</p>
                    <p className="text-gray-800 font-semibold mt-0.5">{selected.distanceFromSLC}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg px-3 py-2">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Access</p>
                    <p className="text-gray-800 font-semibold mt-0.5">{selected.access}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg px-3 py-2">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Best Season</p>
                    <p className="text-gray-800 font-semibold mt-0.5">{selected.season}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg px-3 py-2">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Difficulty</p>
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${DIFFICULTY_COLOR[selected.difficulty] ?? "bg-gray-100 text-gray-700"}`}>
                      {selected.difficulty}
                    </span>
                  </div>
                </div>

                {/* What you'll find — with gem icons */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">What You'll Find</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.find.map((item) => {
                      const gemKey = MINERAL_TO_ASSET[item];
                      return (
                        <span key={item} className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
                          {gemKey && <GemIcon name={gemKey} size={14} className="shrink-0" />}
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">{selected.description}</p>

                {/* Vehicle */}
                <div className="flex items-start gap-2 text-sm text-gray-500 bg-stone-50 rounded-lg px-3 py-2">
                  <span className="mt-0.5">🚙</span>
                  <span>{selected.vehicle}</span>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2 pt-1">
                  {selected.blmUrl && (
                    <a
                      href={selected.blmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-sm font-medium text-amber-700 hover:text-amber-900 border border-amber-300 hover:border-amber-500 rounded-lg px-4 py-2 transition-colors"
                    >
                      BLM Site Info →
                    </a>
                  )}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4 py-2 transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* Site list — with gem icons */
            <div className="space-y-2">
              <p className="text-sm text-gray-400 mb-3">Click a pin or select a site:</p>
              {rockhoundingSites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => handleMarkerClick(site)}
                  className="w-full text-left bg-white border border-stone-200 hover:border-amber-400 rounded-xl px-4 py-3 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <GemIcon name={SITE_PRIMARY_GEM[site.id]} size={24} className="shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-amber-700 transition-colors">
                          {site.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{site.county}, {site.state || 'UT'} · {site.distanceFromSLC}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[site.difficulty] ?? "bg-gray-100 text-gray-700"}`}>
                      {site.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500" />
          Free · BLM Land
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-900" />
          Fee Site or Mixed Access
        </div>
        <span className="ml-auto">BLM casual collecting limit: 25 lbs/day · personal use only</span>
      </div>
    </div>
  );
};

export default SiteMap;
