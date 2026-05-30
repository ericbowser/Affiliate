/**
 * Footer.test.jsx — component tests for Footer
 * Run with: npx jest --config jest.config.cjs src/__tests__/Footer.test.jsx
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer";

const renderFooter = () =>
  render(<MemoryRouter><Footer /></MemoryRouter>);

describe("Footer", () => {
  test("renders brand name", () => {
    renderFooter();
    expect(screen.getByText("Wasatch")).toBeInTheDocument();
  });

  test("renders gear category links", () => {
    renderFooter();
    expect(screen.getByText(/metal detectors/i)).toBeInTheDocument();
    expect(screen.getByText(/rock hammers/i)).toBeInTheDocument();
  });

  test("renders site navigation links", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });

  test("renders affiliate disclosure", () => {
    renderFooter();
    expect(screen.getByText(/commission/i)).toBeInTheDocument();
  });

  test("renders Flaticon attribution link", () => {
    renderFooter();
    const attrLink = screen.getByRole("link", { name: /flaticon/i });
    expect(attrLink).toBeInTheDocument();
    expect(attrLink).toHaveAttribute("href", "https://www.flaticon.com/free-icons/gem");
  });

  test("renders copyright notice with current year", () => {
    renderFooter();
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  test("renders newsletter email input", () => {
    renderFooter();
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
  });

  test("renders BLM external link", () => {
    renderFooter();
    const blmLink = screen.getByRole("link", { name: /blm recreation/i });
    expect(blmLink).toBeInTheDocument();
    expect(blmLink).toHaveAttribute("target", "_blank");
  });

  test("renders Execute & Engrave LLC attribution", () => {
    renderFooter();
    expect(screen.getByText(/execute & engrave/i)).toBeInTheDocument();
  });
});
