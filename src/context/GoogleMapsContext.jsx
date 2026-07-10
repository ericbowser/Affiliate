import React, { createContext, useContext, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  GOOGLE_MAPS_API_KEY,
  MAPS_LOADER_ID,
  MAPS_LIBRARIES,
} from "../config/maps";

function useMapsPreconnect() {
  useEffect(() => {
    const origins = [
      "https://maps.googleapis.com",
      "https://maps.gstatic.com",
    ];
    const links = origins.map((href) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      if (href.includes("gstatic")) link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((link) => link.remove());
  }, []);
}

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
  useMapsPreconnect();
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
