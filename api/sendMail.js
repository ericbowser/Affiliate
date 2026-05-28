/**
 * sendMail.js
 * Client-side mailer — POSTs form data to the Express email server.
 * Server handles Nodemailer + Gmail credentials (never exposed to the browser).
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7666';

export default async function sendMail(formData) {
  const response = await fetch(`${API_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to send email.');
  }

  return data;
}
