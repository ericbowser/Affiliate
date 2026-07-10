import React from "react";
import { GoogleMapsProvider } from "../context/GoogleMapsContext";
import LandingMap from "./LandingMap";

export default function LandingMapWithProvider(props) {
  return (
    <GoogleMapsProvider>
      <LandingMap {...props} />
    </GoogleMapsProvider>
  );
}
