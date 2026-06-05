import React, { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  GOOGLE_MAPS_API_KEY,
  MAPS_LOADER_ID,
  MAPS_LIBRARIES,
} from "../config/maps";

const GoogleMapsContext = createContext({
  isLoaded: false,
  loadError: undefined,
  apiKey: "",
});

/**
 * Single Maps JS loader for the whole app.
 * Multiple useJsApiLoader() calls can leave isLoaded stuck false on mobile/production.
 */
export function GoogleMapsProvider({ children }) {
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

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}
