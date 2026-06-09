import React, { useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import { useGemMarkerIcons } from "../hooks/useGemMarkerIcons";

/**
 * Gem pin markers for rockhounding site maps.
 * SVG assets are rasterized to PNG because legacy google.maps.Marker
 * does not render SVG icon URLs (Maps falls back to transparent.png).
 */
const GemSiteMarkers = ({ sites, selectedId, onSelect, mapsReady, onMarkersReady }) => {
  const { icons, ready } = useGemMarkerIcons(mapsReady, sites, selectedId);

  useEffect(() => {
    if (ready) onMarkersReady?.();
  }, [ready, onMarkersReady]);

  if (!ready) return null;

  return sites.map((site) => (
    <Marker
      key={site.id}
      position={{ lat: site.lat, lng: site.lng }}
      onClick={() => onSelect(site)}
      icon={icons[site.id]}
      zIndex={selectedId === site.id ? 10 : 1}
    />
  ));
};

export default GemSiteMarkers;
