/**
 * Blog.test.jsx — component tests for Blog index page
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Blog from "../components/Blog";

const renderBlog = () =>
  render(<MemoryRouter><Blog /></MemoryRouter>);

describe("Blog index page", () => {
  test("renders page heading", () => {
    renderBlog();
    expect(screen.getByRole("heading", { name: /field notes/i })).toBeInTheDocument();
  });

  test("renders page description text", () => {
    renderBlog();
    expect(screen.getByText(/trip planning resources for utah rockhounders/i)).toBeInTheDocument();
  });

  test("renders at least one post title", () => {
    renderBlog();
    expect(screen.getByText(/rockhounding in utah/i)).toBeInTheDocument();
  });

  test("featured post has a read link", () => {
    renderBlog();
    expect(screen.getByText(/read the guide/i)).toBeInTheDocument();
  });

  test("featured post shows map badge when mapSites exists", () => {
    renderBlog();
    expect(screen.getByText(/includes interactive map/i)).toBeInTheDocument();
  });

  test("renders site map CTA button", () => {
    renderBlog();
    expect(screen.getByRole("link", { name: /open site map/i })).toBeInTheDocument();
  });

  test("renders category badge on featured post", () => {
    renderBlog();
    // The badge text is "Site Guides" — use exact match to avoid ambiguity with description text
    expect(screen.getByText("Site Guides")).toBeInTheDocument();
  });

  test("renders empty state when only one post exists", () => {
    renderBlog();
    expect(screen.getByText(/more guides are on the way/i)).toBeInTheDocument();
  });
});
