import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { rockhoundingSites } from "../data/sites";

const MAP_CENTER = { lat: 39.2, lng: -111.5 };
const MAP_ZOOM = 7;

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f5f0e8" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#57534e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fafaf9" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#c6b89a" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#e8dfc8" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#ddd0b4" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#f0c070" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#b8d4e8" }],
  },
];

const DIFFICULTY_COLOR = {
  Easy: "bg-green-100 text-green-800",
  Moderate: "bg-amber-100 text-amber-800",
  "Moderate–Hard": "bg-orange-100 text-orange-800",
  "Easy–Moderate": "bg-yellow-100 text-yellow-800",
};

const SiteMap = () => {
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((mapInstance) => setMap(mapInstance), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const handleMarkerClick = (site) => {
    setSelected(site);
    if (map) {
      map.panTo({ lat: site.lat, lng: site.lng });
    }
  };

  if (loadError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-red-600 font-medium">Failed to load Google Maps.</p>
        <p className="text-gray-500 text-sm mt-2">Check that your API key is set correctly in .env</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 mt-4 text-sm">Loading map…</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Utah Rockhounding Sites</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Utah Rockhounding Sites Map</h1>
        <p className="text-gray-500 max-w-2xl">
          Eight of the best public-land collecting sites in Utah. Click any pin for details on
          what to find, difficulty, and best season.
        </p>
      </div>

      {/* Layout: map + sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-stone-200" style={{ minHeight: "540px" }}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%", minHeight: "540px" }}
            center={MAP_CENTER}
            zoom={MAP_ZOOM}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              styles: MAP_STYLES,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
              zoomControlOptions: { position: 9 },
            }}
          >
            {rockhoundingSites.map((site) => (
              <Marker
                key={site.id}
                position={{ lat: site.lat, lng: site.lng }}
                onClick={() => handleMarkerClick(site)}
                icon={{
                  path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                  fillColor: selected?.id === site.id ? "#92400e" : "#d97706",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 1.5,
                  scale: selected?.id === site.id ? 2 : 1.6,
                  anchor: { x: 12, y: 24 },
                }}
              />
            ))}
          </GoogleMap>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex flex-col gap-3">
          {selected ? (
            /* Selected site detail card */
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-stone-800 to-amber-800 px-5 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">{selected.name}</h2>
                    <p className="text-amber-200 text-sm mt-0.5">{selected.county} · {selected.region}</p>
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

                {/* What you'll find */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">What You'll Find</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.find.map((item) => (
                      <span key={item} className="bg-amber-50 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
                        {item}
                      </span>
                    ))}
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
            /* Site list when nothing selected */
            <div className="space-y-2">
              <p className="text-sm text-gray-400 mb-3">Click a pin or select a site:</p>
              {rockhoundingSites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => handleMarkerClick(site)}
                  className="w-full text-left bg-white border border-stone-200 hover:border-amber-400 rounded-xl px-4 py-3 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-amber-700 transition-colors">
                        {site.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{site.county} · {site.distanceFromSLC}</p>
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
