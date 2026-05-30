/**
 * Navbar.test.jsx — component tests for Navbar
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

const renderNavbar = () =>
  render(<MemoryRouter><Navbar /></MemoryRouter>);

describe("Navbar", () => {
  test("renders brand name", () => {
    renderNavbar();
    expect(screen.getByText("Wasatch")).toBeInTheDocument();
    expect(screen.getByText("Rockhound")).toBeInTheDocument();
  });

  test("renders all desktop nav links", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /blog/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /field conditions/i }).length).toBeGreaterThan(0);
  });

  test("tagline is visible in DOM", () => {
    renderNavbar();
    expect(screen.getByText(/salt lake city/i)).toBeInTheDocument();
  });

  test("gear categories button exists", () => {
    renderNavbar();
    expect(screen.getByRole("button", { name: /gear categories/i })).toBeInTheDocument();
  });

  test("mobile toggle button exists with correct aria-label", () => {
    renderNavbar();
    expect(screen.getByRole("button", { name: /toggle menu/i })).toBeInTheDocument();
  });

  test("clicking mobile toggle button opens mobile menu", () => {
    renderNavbar();
    const toggleBtn = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggleBtn);
    const blogLinks = screen.getAllByRole("link", { name: /blog/i });
    expect(blogLinks.length).toBeGreaterThan(1);
  });
});
