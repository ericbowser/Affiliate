/**
 * posts.test.js — data integrity tests for the blog post registry
 *
 * Pure data validation — no DOM, no React, runs instantly.
 * Run with: npx jest src/__tests__/posts.test.js
 */

import { posts, getPostBySlug } from "../data/posts.js";

const REQUIRED_FIELDS = ["slug", "title", "description", "date", "category", "readTime", "content"];

describe("posts registry", () => {

  test("exports a non-empty array", () => {
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  test("every post has all required fields", () => {
    posts.forEach((post) => {
      REQUIRED_FIELDS.forEach((field) => {
        expect(post).toHaveProperty(field);
        expect(post[field]).not.toBeUndefined();
        expect(post[field]).not.toBeNull();
        expect(post[field]).not.toBe("");
      });
    });
  });

  test("all slugs are unique", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("all slugs are kebab-case", () => {
    posts.forEach((post) => {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  test("dates are valid ISO date strings", () => {
    posts.forEach((post) => {
      const d = new Date(post.date);
      expect(d instanceof Date).toBe(true);
      expect(isNaN(d.getTime())).toBe(false);
    });
  });

  test("readTime follows expected format", () => {
    posts.forEach((post) => {
      expect(post.readTime).toMatch(/^\d+ min read$/);
    });
  });

  test("content is a non-empty markdown string", () => {
    posts.forEach((post) => {
      expect(typeof post.content).toBe("string");
      expect(post.content.length).toBeGreaterThan(20);
      // Should start with a markdown heading
      expect(post.content.trim()).toMatch(/^#/);
    });
  });

  test("mapSites, if present, is a non-empty array of strings", () => {
    posts.forEach((post) => {
      if (post.mapSites !== undefined) {
        expect(Array.isArray(post.mapSites)).toBe(true);
        expect(post.mapSites.length).toBeGreaterThan(0);
        post.mapSites.forEach((id) => {
          expect(typeof id).toBe("string");
          expect(id).toMatch(/^[a-z0-9-]+$/);
        });
      }
    });
  });

  test("description is between 50 and 300 characters", () => {
    posts.forEach((post) => {
      expect(post.description.length).toBeGreaterThan(50);
      expect(post.description.length).toBeLessThan(300);
    });
  });
});

describe("getPostBySlug", () => {

  test("returns the correct post for a valid slug", () => {
    const post = posts[0];
    const result = getPostBySlug(post.slug);
    expect(result).toBeDefined();
    expect(result.slug).toBe(post.slug);
    expect(result.title).toBe(post.title);
  });

  test("returns null for an unknown slug", () => {
    expect(getPostBySlug("not-a-real-slug")).toBeNull();
  });

  test("returns null for empty string", () => {
    expect(getPostBySlug("")).toBeNull();
  });

  test("returns null for undefined", () => {
    expect(getPostBySlug(undefined)).toBeNull();
  });

  test("rockhounding Utah post exists and has mapSites", () => {
    const post = getPostBySlug("rockhounding-utah-8-best-sites");
    expect(post).not.toBeNull();
    expect(post.mapSites).toBeDefined();
    expect(post.mapSites.length).toBe(8);
  });
});
