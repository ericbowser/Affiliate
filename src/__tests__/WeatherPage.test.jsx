/**
 * WeatherPage.test.jsx — component tests for Field Conditions page
 */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import WeatherPage from "../components/WeatherPage";
import { rockhoundingSites } from "../data/sites";

const makeMockWeather = () => ({
  current: { weathercode: 0, temperature_2m: 72, precipitation: 0, windspeed_10m: 8 },
  daily: {
    time: ["2026-05-30","2026-05-31","2026-06-01","2026-06-02","2026-06-03"],
    weathercode:        [0, 0, 1, 2, 1],
    precipitation_sum:  [0, 0, 0, 0, 0],
    temperature_2m_max: [78, 80, 75, 72, 74],
    temperature_2m_min: [55, 56, 52, 50, 53],
  },
});

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(makeMockWeather()) })
  );
});

afterEach(() => jest.restoreAllMocks());

const renderPage = () =>
  render(<MemoryRouter><WeatherPage /></MemoryRouter>);

describe("WeatherPage", () => {
  test("renders page heading immediately", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: /field conditions/i })).toBeInTheDocument();
  });

  test("renders skeleton cards while loading", () => {
    renderPage();
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(rockhoundingSites.length);
  });

  test("renders all 8 site names after fetch resolves", async () => {
    renderPage();
    await waitFor(() => {
      rockhoundingSites.forEach((site) => {
        expect(screen.getByText(site.name)).toBeInTheDocument();
      });
    });
  });

  test("renders good to go status on all cards", async () => {
    renderPage();
    await waitFor(() => {
      const badges = screen.getAllByText(/good to go/i);
      expect(badges.length).toBe(rockhoundingSites.length);
    });
  });

  test("renders Today label in each 5-day forecast", async () => {
    renderPage();
    await waitFor(() => {
      const todayLabels = screen.getAllByText("Today");
      expect(todayLabels.length).toBe(rockhoundingSites.length);
    });
  });

  test("renders road advisory banner", () => {
    renderPage();
    expect(screen.getByText(/road conditions advisory/i)).toBeInTheDocument();
    expect(screen.getByText(/dugway geode beds/i)).toBeInTheDocument();
  });

  test("refresh button appears after data loads", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /↻ refresh/i })).toBeInTheDocument();
    });
  });

  test("refresh button cycles back to loaded state after click", async () => {
    renderPage();
    const btn = await screen.findByRole("button", { name: /↻ refresh/i });
    await userEvent.click(btn);
    // After refresh cycle completes, all site cards should be visible again
    await waitFor(() => {
      expect(screen.getAllByText(/good to go/i).length).toBe(rockhoundingSites.length);
    });
  });

  test("renders Open-Meteo attribution link", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /open-meteo/i })).toBeInTheDocument();
    });
  });

  test("renders breadcrumb link back to home", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });
});
