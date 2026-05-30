/**
 * weather.test.js — unit tests for weather status logic
 *
 * Extracts and tests the getStatus and getWmo logic independently
 * so we can verify go/caution/no-go decisions without hitting the API.
 *
 * Run with: npx jest src/__tests__/weather.test.js
 */

// ─── Inline the logic (mirrors WeatherPage.jsx) ───────────────────────────────
const WMO_CODES = {
  0:  { label: "Clear sky",     rain: false, snow: false },
  1:  { label: "Mainly clear",  rain: false, snow: false },
  2:  { label: "Partly cloudy", rain: false, snow: false },
  3:  { label: "Overcast",      rain: false, snow: false },
  61: { label: "Light rain",    rain: true,  snow: false },
  63: { label: "Rain",          rain: true,  snow: false },
  65: { label: "Heavy rain",    rain: true,  snow: false },
  71: { label: "Light snow",    rain: false, snow: true  },
  73: { label: "Snow",          rain: false, snow: true  },
  95: { label: "Thunderstorm",  rain: true,  snow: false },
};

const getWmo = (code) => WMO_CODES[code] ?? { label: "Unknown", rain: false, snow: false };

const getStatus = (weather, site) => {
  const wmo           = getWmo(weather.current.weathercode);
  const temp          = weather.current.temperature_2m;
  const precip        = weather.current.precipitation;
  const todayRain     = weather.daily.precipitation_sum[0] ?? 0;
  const yesterdayRain = weather.daily.precipitation_sum[1] ?? 0;
  const maxTemp       = weather.daily.temperature_2m_max[0]  ?? temp;

  if ((wmo.rain || wmo.snow) && site.rainWarning && precip > 0)
    return { color: "red",   label: "Stay home — active precip" };
  if (todayRain > 0.15 && site.rainWarning)
    return { color: "red",   label: "Roads likely impassable" };
  if (yesterdayRain > 0.30 && site.rainWarning)
    return { color: "amber", label: "Roads may still be wet" };
  if (maxTemp > 98 && site.heatWarning)
    return { color: "red",   label: "Dangerous heat today" };
  if (maxTemp > 90 && site.heatWarning)
    return { color: "amber", label: "Go early — heat advisory" };
  if (wmo.snow)
    return { color: "amber", label: "Snow — check road access" };
  if (temp < 15)
    return { color: "amber", label: "Very cold — dress for it" };
  return   { color: "green", label: "Good to go" };
};

// ─── Fixtures ─────────────────────────────────────────────────────────────────
const clayRoadSite = {
  id: "dugway-geode-beds",
  rainWarning: "Clay soil becomes completely impassable after rain.",
  heatWarning: "No shade anywhere on site. Go early morning in summer.",
};

const pavedSite = {
  id: "u-dig-fossils",
  rainWarning: null,
  heatWarning: "Exposed quarry — bring sunscreen and a hat.",
};

const makeWeather = ({ code = 0, temp = 72, precip = 0, todayRain = 0, yesterdayRain = 0, maxTemp = 80 } = {}) => ({
  current: { weathercode: code, temperature_2m: temp, precipitation: precip, windspeed_10m: 5 },
  daily: {
    time: ["2026-05-30", "2026-05-31", "2026-06-01", "2026-06-02", "2026-06-03"],
    weathercode:        [code, 0, 0, 0, 0],
    precipitation_sum:  [todayRain, yesterdayRain, 0, 0, 0],
    temperature_2m_max: [maxTemp, 78, 76, 74, 72],
    temperature_2m_min: [55, 54, 53, 52, 51],
  },
});

// ─── getWmo ───────────────────────────────────────────────────────────────────
describe("getWmo", () => {
  test("returns correct data for clear sky (code 0)", () => {
    const wmo = getWmo(0);
    expect(wmo.rain).toBe(false);
    expect(wmo.snow).toBe(false);
    expect(wmo.label).toBe("Clear sky");
  });

  test("rain is true for rain codes", () => {
    [61, 63, 65, 95].forEach((code) => {
      expect(getWmo(code).rain).toBe(true);
    });
  });

  test("snow is true for snow codes", () => {
    [71, 73].forEach((code) => {
      expect(getWmo(code).snow).toBe(true);
    });
  });

  test("returns unknown for unrecognised code", () => {
    expect(getWmo(999).label).toBe("Unknown");
    expect(getWmo(999).rain).toBe(false);
  });
});

// ─── getStatus ────────────────────────────────────────────────────────────────
describe("getStatus — clear conditions", () => {
  test("returns green for a clear warm day", () => {
    const status = getStatus(makeWeather(), clayRoadSite);
    expect(status.color).toBe("green");
    expect(status.label).toBe("Good to go");
  });

  test("paved site is green even with light rain", () => {
    const status = getStatus(makeWeather({ code: 61, precip: 0.1, todayRain: 0.1 }), pavedSite);
    expect(status.color).toBe("green");
  });
});

describe("getStatus — active rain on dirt road", () => {
  test("returns red when it is actively raining on a clay road site", () => {
    const status = getStatus(makeWeather({ code: 63, precip: 0.2, todayRain: 0.2 }), clayRoadSite);
    expect(status.color).toBe("red");
    expect(status.label).toBe("Stay home — active precip");
  });

  test("returns red when today's total rain exceeds threshold on dirt road", () => {
    const status = getStatus(makeWeather({ todayRain: 0.4 }), clayRoadSite);
    expect(status.color).toBe("red");
    expect(status.label).toBe("Roads likely impassable");
  });
});

describe("getStatus — yesterday's rain", () => {
  test("returns amber when yesterday had significant rain on dirt road", () => {
    const status = getStatus(makeWeather({ yesterdayRain: 0.5 }), clayRoadSite);
    expect(status.color).toBe("amber");
    expect(status.label).toBe("Roads may still be wet");
  });

  test("does not trigger amber for small yesterday rain", () => {
    const status = getStatus(makeWeather({ yesterdayRain: 0.1 }), clayRoadSite);
    expect(status.color).toBe("green");
  });
});

describe("getStatus — heat warnings", () => {
  test("returns red for dangerous heat (>98°F) on exposed site", () => {
    const status = getStatus(makeWeather({ maxTemp: 102 }), clayRoadSite);
    expect(status.color).toBe("red");
    expect(status.label).toBe("Dangerous heat today");
  });

  test("returns amber for high heat (>90°F) on exposed site", () => {
    const status = getStatus(makeWeather({ maxTemp: 93 }), clayRoadSite);
    expect(status.color).toBe("amber");
    expect(status.label).toBe("Go early — heat advisory");
  });

  test("no heat warning for paved site with no heatWarning", () => {
    const noHeatSite = { ...clayRoadSite, heatWarning: null };
    const status = getStatus(makeWeather({ maxTemp: 102 }), noHeatSite);
    expect(status.color).toBe("green");
  });
});

describe("getStatus — cold and snow", () => {
  test("returns amber for very cold temperatures (<15°F)", () => {
    const status = getStatus(makeWeather({ temp: 10 }), clayRoadSite);
    expect(status.color).toBe("amber");
    expect(status.label).toBe("Very cold — dress for it");
  });

  test("returns amber for snow conditions", () => {
    const status = getStatus(makeWeather({ code: 73 }), clayRoadSite);
    expect(status.color).toBe("amber");
    expect(status.label).toBe("Snow — check road access");
  });

  test("green at borderline cold (15°F exactly is fine)", () => {
    const status = getStatus(makeWeather({ temp: 15 }), clayRoadSite);
    expect(status.color).toBe("green");
  });
});
