import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { rockhoundingSites } from "../data/sites";
import SEO from "./SEO";

// Module-level cache
const cache = {};
const CACHE_TTL = 30 * 60 * 1000;

const WMO_CODES = {
  0:  { label: "Clear sky",       icon: "☀️",  rain: false, snow: false },
  1:  { label: "Mainly clear",    icon: "🌤️", rain: false, snow: false },
  2:  { label: "Partly cloudy",   icon: "⛅",  rain: false, snow: false },
  3:  { label: "Overcast",        icon: "☁️",  rain: false, snow: false },
  45: { label: "Foggy",           icon: "🌫️", rain: false, snow: false },
  48: { label: "Freezing fog",    icon: "🌫️", rain: false, snow: false },
  51: { label: "Light drizzle",   icon: "🌦️", rain: true,  snow: false },
  53: { label: "Drizzle",         icon: "🌦️", rain: true,  snow: false },
  55: { label: "Heavy drizzle",   icon: "🌧️", rain: true,  snow: false },
  61: { label: "Light rain",      icon: "🌧️", rain: true,  snow: false },
  63: { label: "Rain",            icon: "🌧️", rain: true,  snow: false },
  65: { label: "Heavy rain",      icon: "🌧️", rain: true,  snow: false },
  71: { label: "Light snow",      icon: "🌨️", rain: false, snow: true  },
  73: { label: "Snow",            icon: "❄️",  rain: false, snow: true  },
  75: { label: "Heavy snow",      icon: "❄️",  rain: false, snow: true  },
  77: { label: "Snow grains",     icon: "🌨️", rain: false, snow: true  },
  80: { label: "Rain showers",    icon: "🌦️", rain: true,  snow: false },
  81: { label: "Rain showers",    icon: "🌧️", rain: true,  snow: false },
  82: { label: "Violent showers", icon: "⛈️",  rain: true,  snow: false },
  85: { label: "Snow showers",    icon: "🌨️", rain: false, snow: true  },
  86: { label: "Heavy snow",      icon: "❄️",  rain: false, snow: true  },
  95: { label: "Thunderstorm",    icon: "⛈️",  rain: true,  snow: false },
  99: { label: "Thunderstorm",    icon: "⛈️",  rain: true,  snow: false },
};

const getWmo = (code) => WMO_CODES[code] ?? { label: "Unknown", icon: "🌡️", rain: false, snow: false };

const getStatus = (weather, site) => {
  const wmo           = getWmo(weather.current.weathercode);
  const temp          = weather.current.temperature_2m;
  const precip        = weather.current.precipitation;
  const todayRain     = weather.daily.precipitation_sum[0] ?? 0;
  const yesterdayRain = weather.daily.precipitation_sum[1] ?? 0;
  const maxTemp       = weather.daily.temperature_2m_max[0]  ?? temp;

  if ((wmo.rain || wmo.snow) && site.rainWarning && precip > 0)
    return { color: "red",   emoji: "🚫", label: "Stay home — active precip" };
  if (todayRain > 0.15 && site.rainWarning)
    return { color: "red",   emoji: "🚫", label: "Roads likely impassable" };
  if (yesterdayRain > 0.30 && site.rainWarning)
    return { color: "amber", emoji: "⚠️", label: "Roads may still be wet" };
  if (maxTemp > 98 && site.heatWarning)
    return { color: "red",   emoji: "🌡️", label: "Dangerous heat today" };
  if (maxTemp > 90 && site.heatWarning)
    return { color: "amber", emoji: "🌡️", label: "Go early — heat advisory" };
  if (wmo.snow)
    return { color: "amber", emoji: "❄️", label: "Snow — check road access" };
  if (temp < 15)
    return { color: "amber", emoji: "🥶", label: "Very cold — dress for it" };
  return   { color: "green", emoji: "✅", label: "Good to go" };
};

const STATUS_STYLES = {
  green: { bg: "bg-green-900/30",  border: "border-green-700/50",  text: "text-green-400",  badge: "bg-green-900/30 text-green-400",  bar: "bg-green-500"  },
  amber: { bg: "bg-amber-900/30",  border: "border-amber-700/50",  text: "text-amber-400",  badge: "bg-amber-900/30 text-amber-400",  bar: "bg-amber-500"  },
  red:   { bg: "bg-red-900/30",    border: "border-red-700/50",    text: "text-red-400",    badge: "bg-red-900/30 text-red-400",      bar: "bg-red-500"    },
};

const getDayLabel = (dateStr, i) => {
  if (i === 0) return "Today";
  if (i === 1) return "Tomorrow";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" });
};

const buildUrl = (site) => [
  `https://api.open-meteo.com/v1/forecast`,
  `?latitude=${site.lat}&longitude=${site.lng}`,
  `&current=temperature_2m,precipitation,weathercode,windspeed_10m`,
  `&daily=precipitation_sum,precipitation_probability_max,temperature_2m_max,temperature_2m_min,weathercode`,
  `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`,
  `&timezone=America%2FDenver&forecast_days=5`,
].join("");

const fetchSite = async (site) => {
  const hit = cache[site.id];
  if (hit && Date.now() - hit.ts < CACHE_TTL) return { site, data: hit.data, error: false };
  try {
    const data = await fetch(buildUrl(site)).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });
    cache[site.id] = { data, ts: Date.now() };
    return { site, data, error: false };
  } catch {
    return { site, data: null, error: true };
  }
};

const fetchAll = () => Promise.all(rockhoundingSites.map(fetchSite));

// Skeleton card
const SkeletonCard = () => (
  <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-1 w-full bg-slate-600" />
    <div className="px-5 pt-4 pb-3 flex justify-between items-start">
      <div>
        <div className="h-4 bg-slate-700 rounded w-40 mb-2" />
        <div className="h-3 bg-slate-700/60 rounded w-56" />
      </div>
      <div className="h-6 bg-slate-700 rounded-full w-28" />
    </div>
    <div className="px-5 pb-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-700 rounded-full" />
      <div>
        <div className="h-3 bg-slate-700 rounded w-24 mb-2" />
        <div className="h-3 bg-slate-700/60 rounded w-36" />
      </div>
    </div>
    <div className="grid grid-cols-5 gap-px bg-slate-700 border-t border-slate-700">
      {[0,1,2,3,4].map((i) => (
        <div key={i} className="bg-slate-800 px-1 py-3 flex flex-col items-center gap-1.5">
          <div className="h-2.5 bg-slate-700 rounded w-8" />
          <div className="h-6 w-6 bg-slate-700 rounded-full" />
          <div className="h-2.5 bg-slate-700 rounded w-6" />
          <div className="h-2.5 bg-slate-700/60 rounded w-4" />
        </div>
      ))}
    </div>
  </div>
);

// Weather card
const WeatherCard = ({ site, weather }) => {
  const wmo    = getWmo(weather.current.weathercode);
  const status = getStatus(weather, site);
  const styles = STATUS_STYLES[status.color];

  const activeWarning =
    (wmo.rain && site.rainWarning)                             ? site.rainWarning :
    (weather.current.temperature_2m > 90 && site.heatWarning) ? site.heatWarning :
    site.roadWarning;

  return (
    <div className={`bg-slate-800 border ${styles.border} rounded-2xl overflow-hidden`}>
      <div className={`h-1 w-full ${styles.bar}`} />
      <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="font-semibold text-slate-100 text-base">{site.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{site.county} · {site.distanceFromSLC} from SLC · {site.access}</p>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border ${styles.badge} ${styles.border}`}>
          {status.emoji} {status.label}
        </span>
      </div>

      <div className="px-5 pb-3 flex items-center gap-4 flex-wrap">
        <span className="text-3xl">{wmo.icon}</span>
        <div>
          <p className="text-sm font-medium text-slate-300">{wmo.label}</p>
          <p className="text-xs text-slate-400">
            {Math.round(weather.current.temperature_2m)}°F
            {weather.current.windspeed_10m > 2 && ` · 💨 ${Math.round(weather.current.windspeed_10m)} mph`}
            {weather.current.precipitation > 0 && ` · 🌧 ${weather.current.precipitation.toFixed(2)}" now`}
          </p>
        </div>
      </div>

      {activeWarning && (
        <div className={`mx-5 mb-3 px-3 py-2 rounded-lg text-xs leading-relaxed ${styles.bg} ${styles.text} border ${styles.border}`}>
          ⚠️ {activeWarning}
        </div>
      )}

      <div className="grid grid-cols-5 gap-px bg-slate-700 border-t border-slate-700">
        {weather.daily.time.slice(0, 5).map((date, i) => {
          const dayWmo = getWmo(weather.daily.weathercode[i]);
          const prob   = weather.daily.precipitation_probability_max?.[i] ?? 0;
          const hi     = Math.round(weather.daily.temperature_2m_max[i]);
          const lo     = Math.round(weather.daily.temperature_2m_min[i]);
          return (
            <div key={date} className="bg-slate-800 px-1 py-2.5 text-center">
              <p className="text-xs text-slate-500 font-medium">{getDayLabel(date, i)}</p>
              <p className="text-xl my-1">{dayWmo.icon}</p>
              <p className="text-xs font-semibold text-slate-200">{hi}°</p>
              <p className="text-xs text-slate-500">{lo}°</p>
              {prob > 0 && (
                <p className={`text-xs mt-0.5 font-medium ${prob >= 50 ? "text-red-400" : prob >= 25 ? "text-amber-400" : "text-blue-400"}`}>
                  {prob}%
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 flex items-center justify-between border-t border-slate-700">
        <p className="text-xs text-slate-500">{site.vehicle}</p>
        {site.blmUrl && (
          <a href={site.blmUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors">
            BLM Info &rarr;
          </a>
        )}
      </div>
    </div>
  );
};

const ErrorCard = ({ site }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
    <p className="text-sm font-semibold text-slate-100 mb-1">{site.name}</p>
    <p className="text-xs text-slate-400">Conditions unavailable — try refreshing.</p>
  </div>
);

// Page
const WeatherPage = () => {
  const [results,  setResults]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [refreshN, setRefreshN] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchAll().then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [refreshN]);

  const handleRefresh = () => {
    rockhoundingSites.forEach((s) => delete cache[s.id]);
    setRefreshN((n) => n + 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title="Field Conditions"
        description="Live weather and road advisories for all 8 Utah rockhounding sites — updated hourly, with road impassability warnings for Dugway and San Rafael Swell."
        path="/weather"
      />

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <nav className="text-sm text-slate-400 mb-3">
            <Link to="/" className="hover:text-amber-400">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Field Conditions</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-100 mb-2">Utah Rockhounding Field Conditions</h1>
          <p className="text-base text-slate-400 max-w-2xl">
            Live weather and road advisories for all 8 Utah rockhounding sites — updated hourly.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="shrink-0 text-sm font-medium text-amber-400 hover:text-amber-300 border border-amber-700 hover:border-amber-500 px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Loading…" : "↻ Refresh"}
        </button>
      </div>

      {/* Advisory banner */}
      <div className="bg-slate-800 border border-slate-700 text-white rounded-2xl px-6 py-4 mb-8 flex items-start gap-4">
        <span className="text-2xl mt-0.5">🏜️</span>
        <div>
          <p className="text-sm font-semibold text-slate-100 mb-1">Road conditions advisory</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dugway Geode Beds and San Rafael Swell access roads become impassable after rain — sometimes with no warning.
            Always check conditions the morning of your trip, not the night before.
            This tool is advisory only — always verify locally before heading out.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading || !results
          ? rockhoundingSites.map((s) => <SkeletonCard key={s.id} />)
          : results.map(({ site, data, error }) =>
              error
                ? <ErrorCard key={site.id} site={site} />
                : <WeatherCard key={site.id} site={site} weather={data} />
            )
        }
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500">
          Weather data via{" "}
          <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
            Open-Meteo
          </a>
          {" "}· Free &amp; open-source · No API key required · Cached 30 min
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Road advisories are based on site-specific knowledge — always verify locally before heading out.
        </p>
      </div>
    </div>
  );
};

export default WeatherPage;
