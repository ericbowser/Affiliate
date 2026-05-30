/**
 * sites.test.js — data integrity tests for rockhoundingSites
 *
 * Pure data validation — no DOM, no React, runs instantly.
 * Run with: npx jest src/__tests__/sites.test.js
 */

import { rockhoundingSites } from "../data/sites.js";

const REQUIRED_FIELDS = [
  "id", "name", "county", "region", "lat", "lng",
  "distanceFromSLC", "difficulty", "season", "access",
  "vehicle", "find", "description", "color",
  "roadWarning",
];

const VALID_DIFFICULTIES = ["Easy", "Moderate", "Moderate–Hard", "Easy–Moderate", "Hard"];
const VALID_COLORS       = ["#d97706", "#92400e"];

describe("rockhoundingSites data integrity", () => {

  test("exports a non-empty array", () => {
    expect(Array.isArray(rockhoundingSites)).toBe(true);
    expect(rockhoundingSites.length).toBeGreaterThan(0);
  });

  test("every site has all required fields", () => {
    rockhoundingSites.forEach((site) => {
      REQUIRED_FIELDS.forEach((field) => {
        expect(site).toHaveProperty(field);
        expect(site[field]).not.toBeUndefined();
        expect(site[field]).not.toBeNull();
      });
    });
  });

  test("all site IDs are unique", () => {
    const ids = rockhoundingSites.map((s) => s.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  test("all IDs are kebab-case strings", () => {
    rockhoundingSites.forEach((site) => {
      expect(typeof site.id).toBe("string");
      expect(site.id).toMatch(/^[a-z0-9-]+$/);
    });
  });

  test("coordinates are valid Utah-region lat/lng", () => {
    rockhoundingSites.forEach((site) => {
      expect(typeof site.lat).toBe("number");
      expect(typeof site.lng).toBe("number");
      // Utah lat range: ~36.9 to ~42.0
      expect(site.lat).toBeGreaterThan(36);
      expect(site.lat).toBeLessThan(43);
      // Utah lng range: ~-114.1 to ~-109.0
      expect(site.lng).toBeGreaterThan(-115);
      expect(site.lng).toBeLessThan(-109);
    });
  });

  test("difficulty is a valid value", () => {
    rockhoundingSites.forEach((site) => {
      expect(VALID_DIFFICULTIES).toContain(site.difficulty);
    });
  });

  test("find is a non-empty array of strings", () => {
    rockhoundingSites.forEach((site) => {
      expect(Array.isArray(site.find)).toBe(true);
      expect(site.find.length).toBeGreaterThan(0);
      site.find.forEach((item) => expect(typeof item).toBe("string"));
    });
  });

  test("color is a valid hex value", () => {
    rockhoundingSites.forEach((site) => {
      expect(VALID_COLORS).toContain(site.color);
    });
  });

  test("blmUrl is either null or a valid BLM URL", () => {
    rockhoundingSites.forEach((site) => {
      if (site.blmUrl !== null) {
        expect(typeof site.blmUrl).toBe("string");
        expect(site.blmUrl).toMatch(/^https:\/\/www\.blm\.gov/);
      }
    });
  });

  test("description is a non-empty string over 20 chars", () => {
    rockhoundingSites.forEach((site) => {
      expect(typeof site.description).toBe("string");
      expect(site.description.length).toBeGreaterThan(20);
    });
  });

  test("roadWarning is a non-empty string", () => {
    rockhoundingSites.forEach((site) => {
      expect(typeof site.roadWarning).toBe("string");
      expect(site.roadWarning.length).toBeGreaterThan(5);
    });
  });

  test("rainWarning is null or a non-empty string", () => {
    rockhoundingSites.forEach((site) => {
      if (site.rainWarning !== null) {
        expect(typeof site.rainWarning).toBe("string");
        expect(site.rainWarning.length).toBeGreaterThan(5);
      }
    });
  });

  test("Topaz Mountain exists and has key minerals", () => {
    const topaz = rockhoundingSites.find((s) => s.id === "topaz-mountain");
    expect(topaz).toBeDefined();
    expect(topaz.find).toContain("Topaz");
    expect(topaz.blmUrl).not.toBeNull();
  });

  test("Dugway has rain warning since road is clay", () => {
    const dugway = rockhoundingSites.find((s) => s.id === "dugway-geode-beds");
    expect(dugway).toBeDefined();
    expect(dugway.rainWarning).not.toBeNull();
    expect(dugway.rainWarning.toLowerCase()).toContain("impassable");
  });
});
