/**
 * Posts to the Express email server at /api/*.
 * Dev: Vite proxies /api → http://localhost:7667 (see vite.config.js).
 * Prod: nginx must proxy /api to the Node server, or set VITE_API_URL at build time.
 */

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export const EmailError = {
  NETWORK: "NETWORK",
  API_UNAVAILABLE: "API_UNAVAILABLE",
  REQUEST_FAILED: "REQUEST_FAILED",
};

function devLog(label, data) {
  if (import.meta.env.DEV) {
    console.debug(`[emailService] ${label}`, data);
  }
}

async function post(endpoint, body) {
  const url = `${API_BASE}${endpoint}`;
  const started = performance.now();

  devLog("request", { method: "POST", url, body });

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    devLog("network error", { url, message: err?.message });
    const err = new Error("Cannot reach the email server.");
    err.code = EmailError.NETWORK;
    throw err;
  }

  const text = await res.text();
  const durationMs = Math.round(performance.now() - started);

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    devLog("response parse error", { url, status: res.status, durationMs, text: text.slice(0, 200) });
    const err = new Error(
      res.status === 405 || res.status === 404
        ? "Email API is not running on this server."
        : "Unexpected response from email server."
    );
    err.code =
      res.status === 405 || res.status === 404
        ? EmailError.API_UNAVAILABLE
        : EmailError.REQUEST_FAILED;
    throw err;
  }

  if (!res.ok) {
    devLog("api error", { url, status: res.status, durationMs, data });
    const err = new Error(data.error || "Request failed");
    err.code = EmailError.REQUEST_FAILED;
    throw err;
  }

  devLog("success", { url, status: res.status, durationMs, data });
  return data;
}

export const sendContactEmail = (formData) =>
  post("/api/send-email", formData);

export const sendSubscribeNotification = (email) =>
  post("/api/subscribe", { email });
