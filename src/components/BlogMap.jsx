import React, { useState, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { rockhoundingSites } from "../data/sites";
import { Link } from "react-router-dom";
import { useGoogleMaps } from "../context/GoogleMapsContext";
import { MapLoadStatus } from "./MapLoadStatus";

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f5f0e8" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#57534e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fafaf9" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c6b89a" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#e8dfc8" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#ddd0b4" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f0c070" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#b8d4e8" }] },
];

const DIFFICULTY_COLOR = {
  Easy: "bg-green-100 text-green-800",
  Moderate: "bg-amber-100 text-amber-800",
  "Moderate–Hard": "bg-orange-100 text-orange-800",
  "Easy–Moderate": "bg-yellow-100 text-yellow-800",
};

// Compute center from a list of sites
const getCenter = (sites) => {
  if (!sites.length) return { lat: 39.2, lng: -111.5 };
  const lat = sites.reduce((sum, s) => sum + s.lat, 0) / sites.length;
  const lng = sites.reduce((sum, s) => sum + s.lng, 0) / sites.length;
  return { lat, lng };
};

// Compute zoom based on lat/lng spread
const getZoom = (sites) => {
  if (sites.length <= 1) return 10;
  const lats = sites.map((s) => s.lat);
  const lngs = sites.map((s) => s.lng);
  const spread = Math.max(
    Math.abs(Math.max(...lats) - Math.min(...lats)),
    Math.abs(Math.max(...lngs) - Math.min(...lngs))
  );
  if (spread > 6) return 6;
  if (spread > 3) return 7;
  if (spread > 1) return 8;
  return 10;
};

const BlogMap = ({ siteIds = [] }) => {
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);

  const sites = rockhoundingSites.filter((s) => siteIds.includes(s.id));
  const center = getCenter(sites);
  const zoom = getZoom(sites);

  const { isLoaded } = useGoogleMaps();

  const onLoad = useCallback((m) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const handleMarkerClick = (site) => {
    setSelected(selected?.id === site.id ? null : site);
    if (map) map.panTo({ lat: site.lat, lng: site.lng });
  };

  if (!isLoaded) {
    return <MapLoadStatus height={256} silent />;
  }

  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
      {/* Map */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "340px" }}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: MAP_STYLES,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControlOptions: { position: 9 },
        }}
      >
        {sites.map((site) => (
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

      {/* Info card — shown when a pin is selected */}
      {selected ? (
        <div className="bg-white px-5 py-4 border-t border-stone-100">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-gray-900">{selected.name}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[selected.difficulty] ?? "bg-gray-100 text-gray-700"}`}>
                  {selected.difficulty}
                </span>
                <span className="text-xs text-gray-400">{selected.distanceFromSLC} from SLC</span>
                <span className="text-xs text-gray-400">· {selected.access}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selected.find.slice(0, 4).map((item) => (
                  <span key={item} className="bg-amber-50 text-amber-800 text-xs px-2 py-0.5 rounded-full border border-amber-100">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                {selected.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Directions →
              </a>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-gray-400 hover:text-gray-600 text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white px-5 py-3 border-t border-stone-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {sites.length} sites · Click a pin for details
          </p>
          <Link
            to="/guides/utah-sites-map"
            className="text-xs font-medium text-amber-700 hover:text-amber-900"
          >
            Open full map →
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogMap;
