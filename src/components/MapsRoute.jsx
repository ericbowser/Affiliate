import React from "react";
import { GoogleMapsProvider } from "../context/GoogleMapsContext";

/** Lazy-loaded wrapper — keeps vendor-maps out of the main entry chunk. */
export default function MapsRoute({ children }) {
  return <GoogleMapsProvider>{children}</GoogleMapsProvider>;
}
