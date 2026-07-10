/**
 * Fail production builds when Maps key is missing.
 * Vite inlines VITE_* at build time — a Pi build without .env ships an empty key.
 */
import dotenv from "dotenv";

dotenv.config();

const key = (process.env.VITE_GOOGLE_MAPS_API_KEY || "").trim();

if (!key || key === "your_key_here") {
  console.error(
    "\n✗ VITE_GOOGLE_MAPS_API_KEY is missing or still set to the placeholder."
  );
  console.error(
    "  Add your key to .env on the build machine, then run npm run build again."
  );
  console.error("  See .env.example for referrer restrictions.\n");
  process.exit(1);
}

if (!/^AIzaSy[\w-]{33}$/.test(key)) {
  console.error("\n✗ VITE_GOOGLE_MAPS_API_KEY looks malformed.");
  console.error(
    "  Expected format: AIzaSy followed by 33 characters (no trailing = or spaces)."
  );
  console.error(`  Got ${key.length} characters total.\n`);
  process.exit(1);
}

console.log("✓ Google Maps API key present for build");
