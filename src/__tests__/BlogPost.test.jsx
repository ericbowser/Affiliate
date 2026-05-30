/**
 * BlogPost.test.jsx — component tests for individual blog post page
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// react-markdown is ESM-only — mock it so Jest can parse BlogPost
jest.mock("react-markdown", () => {
  return function ReactMarkdown({ children }) {
    return <div data-testid="markdown-content">{children}</div>;
  };
});
jest.mock("remark-gfm", () => () => {});

import BlogPost from "../components/BlogPost";

const renderWithSlug = (slug) =>
  render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/404" element={<div>Not Found</div>} />
      </Routes>
    </MemoryRouter>
  );

describe("BlogPost", () => {
  test("renders post title for valid slug", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByRole("heading", { name: /rockhounding in utah/i })).toBeInTheDocument();
  });

  test("renders post category badge", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByText("Site Guides")).toBeInTheDocument();
  });

  test("renders breadcrumb Home link", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });

  test("renders breadcrumb Blog link", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByRole("link", { name: /^blog$/i })).toBeInTheDocument();
  });

  test("renders check field conditions link when post has mapSites", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByRole("link", { name: /check field conditions/i })).toBeInTheDocument();
  });

  test("renders footer CTA with Field Conditions link", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    const links = screen.getAllByRole("link", { name: /field conditions/i });
    expect(links.length).toBeGreaterThan(0);
  });

  test("renders footer CTA with Browse Gear link", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByRole("link", { name: /browse gear/i })).toBeInTheDocument();
  });

  test("renders footer CTA with Site Map link", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByRole("link", { name: /site map/i })).toBeInTheDocument();
  });

  test("renders post date", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  test("renders read time", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByText(/min read/i)).toBeInTheDocument();
  });

  test("redirects to 404 for unknown slug", () => {
    renderWithSlug("not-a-real-post");
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  test("renders markdown content area", () => {
    renderWithSlug("rockhounding-utah-8-best-sites");
    expect(screen.getByTestId("markdown-content")).toBeInTheDocument();
  });
});
