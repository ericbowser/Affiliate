import React, { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  GOOGLE_MAPS_API_KEY,
  MAPS_LOADER_ID,
  MAPS_LIBRARIES,
} from "../config/maps";
import { isPrerender } from "../utils/prerender.js";

const GoogleMapsContext = createContext({
  isLoaded: false,
  loadError: undefined,
  apiKey: "",
});

const SNAP_VALUE = { isLoaded: false, loadError: undefined, apiKey: "" };

function GoogleMapsProviderInner({ children }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: MAPS_LOADER_ID,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: MAPS_LIBRARIES,
  });

  return (
    <GoogleMapsContext.Provider
      value={{ isLoaded, loadError, apiKey: GOOGLE_MAPS_API_KEY }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
}

/**
 * Single Maps JS loader for the whole app.
 * Skips loading during react-snap so prerendered HTML stays clean for SEO.
 */
export function GoogleMapsProvider({ children }) {
  if (isPrerender()) {
    return (
      <GoogleMapsContext.Provider value={SNAP_VALUE}>
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  return <GoogleMapsProviderInner>{children}</GoogleMapsProviderInner>;
}

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}
