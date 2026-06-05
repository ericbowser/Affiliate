/** Trim — stray whitespace in .env breaks the key on deploy */
export const GOOGLE_MAPS_API_KEY = (
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
).trim();

export const MAPS_LOADER_ID = "wasatch-rockhound-maps";

/** Stable reference — do not inline a new array in useJsApiLoader */
export const MAPS_LIBRARIES = ["maps"];
