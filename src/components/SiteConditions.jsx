import React, { useState, useEffect } from "react";
import { rockhoundingSites } from "../data/sites";

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
  96: { label: "Thunderstorm",    icon: "⛈️",  rain: true,  snow: false },
  99: { label: "Thunderstorm",    icon: "⛈️",  rain: true,  snow: false },
};

const getWmo = (code) => WMO_CODES[code] ?? { label: "Unknown", icon: "🌡️", rain: false, snow: false };

const getStatus = (weather, site) => {
  const wmo     = getWmo(weather.current.weathercode);
  const temp    = weather.current.temperature_2m;
  const precip  = weather.current.precipitation;
  const todayRain     = weather.daily.precipitation_sum[0] ?? 0;
  const yesterdayRain = weather.daily.precipitation_sum[1] ?? 0;
  const maxTemp = weather.daily.temperature_2m_max[0] ?? temp;

  // Active precipitation + dirt road = no-go
  if ((wmo.rain || wmo.snow) && site.rainWarning && precip > 0)
    return { color: "red",   emoji: "🚫", label: "Stay home — active precip" };

  // More than 0.15" today and road warning = caution
  if (todayRain > 0.15 && site.rainWarning)
    return { color: "amber", emoji: "⚠️", label: "Roads likely muddy" };

  // More than 0.3" yesterday = roads still wet
  if (yesterdayRain > 0.30 && site.rainWarning)
    return { color: "amber", emoji: "⚠️", label: "Roads may still be wet" };

  // Extreme heat
  if (maxTemp > 98 && site.heatWarning)
    return { color: "red",   emoji: "🌡️", label: "Dangerous heat today" };
  if (maxTemp > 90 && site.heatWarning)
    return { color: "amber", emoji: "🌡️", label: "Go early — heat advisory" };

  // Snow on access roads
  if (wmo.snow)
    return { color: "amber", emoji: "❄️", label: "Snow — check road access" };

  // Very cold
  if (temp < 15)
    return { color: "amber", emoji: "🥶", label: "Very cold — dress for it" };

  return { color: "green", emoji: "✅", label: "Good to go" };
};

const STATUS_STYLES = {
  green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", badge: "bg-green-100 text-green-800" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-100 text-amber-800" },
  red:   { bg: "bg-red-50",   border: "border-red-200",   text: "text-red-800",   badge: "bg-red-100 text-red-800"   },
};

const getDayLabel = (dateStr, i) => {
  if (i === 0) return "Today";
  if (i === 1) return "Tomorrow";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" });
};

// ─── Single site widget ────────────────────────────────────────────────────────
export const SiteWeather = ({ siteId, compact = false }) => {
  const site = rockhoundingSites.find((s) => s.id === siteId);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    if (!site) return;
    const url = [
      `https://api.open-meteo.com/v1/forecast`,
      `?latitude=${site.lat}&longitude=${site.lng}`,
      `&current=temperature_2m,precipitation,weathercode,windspeed_10m`,
      `&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,weathercode`,
      `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`,
      `&timezone=America%2FDenver&forecast_days=5`,
    ].join("");

    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setWeather)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [site?.id]);

  if (!site)    return null;
  if (loading)  return (
    <div className="flex items-center gap-2 py-2 my-4">
      <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-gray-400">Loading conditions for {site.name}…</span>
    </div>
  );
  if (error || !weather) return null;

  const wmo    = getWmo(weather.current.weathercode);
  const status = getStatus(weather, site);
  const styles = STATUS_STYLES[status.color];

  const activeWarning =
    (wmo.rain && site.rainWarning)                         ? site.rainWarning :
    (weather.current.temperature_2m > 90 && site.heatWarning) ? site.heatWarning :
    site.roadWarning;

  return (
    <div className={`my-5 rounded-xl border ${styles.border} ${styles.bg} overflow-hidden`}>
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{wmo.icon}</span>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Field Conditions</p>
            <p className="text-sm font-semibold text-gray-900">{site.name}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles.badge}`}>
          {status.emoji} {status.label}
        </span>
      </div>

      {/* Current stats */}
      <div className={`flex items-center gap-4 px-4 pb-3 flex-wrap text-sm ${styles.text}`}>
        <span>{wmo.label}</span>
        <span>{Math.round(weather.current.temperature_2m)}°F</span>
        {weather.current.windspeed_10m > 2 && (
          <span>💨 {Math.round(weather.current.windspeed_10m)} mph</span>
        )}
        {weather.current.precipitation > 0 && (
          <span>🌧 {weather.current.precipitation.toFixed(2)}" now</span>
        )}
        <span className="ml-auto text-xs text-gray-400">{site.distanceFromSLC} from SLC</span>
      </div>

      {/* Road/heat advisory */}
      {activeWarning && (
        <div className={`px-4 py-2 border-t ${styles.border} text-xs ${styles.text} leading-relaxed`}>
          ⚠️ {activeWarning}
        </div>
      )}

      {/* 5-day forecast */}
      {!compact && (
        <div className="grid grid-cols-5 gap-px bg-stone-200 border-t border-stone-200">
          {weather.daily.time.slice(0, 5).map((date, i) => {
            const dayWmo = getWmo(weather.daily.weathercode[i]);
            const rain   = weather.daily.precipitation_sum[i] ?? 0;
            const hi     = Math.round(weather.daily.temperature_2m_max[i]);
            const lo     = Math.round(weather.daily.temperature_2m_min[i]);
            return (
              <div key={date} className="bg-white px-1 py-2 text-center">
                <p className="text-xs text-gray-400">{getDayLabel(date, i)}</p>
                <p className="text-lg my-0.5">{dayWmo.icon}</p>
                <p className="text-xs font-medium text-gray-800">{hi}°</p>
                <p className="text-xs text-gray-400">{lo}°</p>
                {rain > 0.01 && (
                  <p className="text-xs text-blue-500 mt-0.5">{rain.toFixed(2)}"</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="px-4 py-1.5 bg-white/50 border-t border-stone-100">
        <p className="text-xs text-gray-400">Live via Open-Meteo · advisory only · always verify locally</p>
      </div>
    </div>
  );
};

// ─── Multi-site block (used at top of articles) ───────────────────────────────
const SiteConditions = ({ siteIds = [] }) => {
  if (!siteIds.length) return null;
  return (
    <div className="my-8 space-y-0">
      {siteIds.map((id) => (
        <SiteWeather key={id} siteId={id} />
      ))}
    </div>
  );
};

export default SiteConditions;
