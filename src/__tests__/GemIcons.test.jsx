/**
 * GemIcons.test.jsx — component tests for custom SVG gem icons
 * Run with: npx jest --config jest.config.cjs src/__tests__/GemIcons.test.jsx
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import GemIcon, {
  Topaz,
  Amethyst,
  Opal,
  RedBeryl,
  Garnet,
  Pseudobrookite,
} from "../components/gems/GemIcons";

const renderGem = (Component, props = {}) => render(<Component {...props} />);

describe("Individual gem components", () => {
  test("Topaz renders an SVG", () => {
    const { container } = renderGem(Topaz);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("Amethyst renders an SVG", () => {
    const { container } = renderGem(Amethyst);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("Opal renders an SVG", () => {
    const { container } = renderGem(Opal);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("RedBeryl renders an SVG", () => {
    const { container } = renderGem(RedBeryl);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("Garnet renders an SVG", () => {
    const { container } = renderGem(Garnet);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("Pseudobrookite renders an SVG", () => {
    const { container } = renderGem(Pseudobrookite);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("each gem has an aria-label for accessibility", () => {
    [Topaz, Amethyst, Opal, RedBeryl, Garnet, Pseudobrookite].forEach((Gem) => {
      const { container } = render(<Gem />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-label");
      expect(svg.getAttribute("aria-label").length).toBeGreaterThan(0);
    });
  });

  test("size prop scales the SVG width", () => {
    const { container } = renderGem(Topaz, { size: 48 });
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "48");
  });
});

describe("GemIcon router", () => {
  test("renders Topaz by name", () => {
    const { container } = render(<GemIcon name="topaz" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("renders Opal by name", () => {
    const { container } = render(<GemIcon name="opal" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("renders Red Beryl by name", () => {
    const { container } = render(<GemIcon name="red-beryl" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("renders Pseudobrookite by name", () => {
    const { container } = render(<GemIcon name="pseudobrookite" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("returns null for unknown gem name", () => {
    const { container } = render(<GemIcon name="unknown-gem" />);
    expect(container.querySelector("svg")).toBeNull();
  });

  test("returns null when no name provided", () => {
    const { container } = render(<GemIcon />);
    expect(container.querySelector("svg")).toBeNull();
  });

  test("size prop is passed through to gem", () => {
    const { container } = render(<GemIcon name="garnet" size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
  });
});
