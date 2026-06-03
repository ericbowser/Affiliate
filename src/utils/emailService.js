/**
 * emailService.js
 * Posts to the local Express server via Vite's proxy (/api → localhost:7666).
 * Uses the Gmail app password configured in .env — no third-party service needed.
 */

async function post(endpoint, body) {
  const res = await fetch(endpoint, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const sendContactEmail = (formData) =>
  post('/api/send-email', formData);

export const sendSubscribeNotification = (email) =>
  post('/api/subscribe', { email });
