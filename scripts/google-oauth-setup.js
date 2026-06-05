/**
 * One-time OAuth2 setup — obtains GOOGLE_REFRESH_TOKEN for Gmail SMTP.
 *
 * Prerequisites (Google Cloud Console — can reuse your Maps API project):
 *   1. APIs & Services → Library → enable "Gmail API"
 *   2. APIs & Services → OAuth consent screen → configure (External or Internal)
 *   3. APIs & Services → Credentials → Create OAuth client ID
 *      - Type: Web application
 *      - Authorized redirect URI: http://localhost:3030/oauth2callback
 *   4. Copy Client ID + Client Secret into .env as GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
 *   5. EMAIL_USER=ericbo@execute-engrave.com (sign in as this account when authorizing)
 *
 * Usage: npm run email:oauth
 */
import http from 'http';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import { GMAIL_OAUTH_SCOPE } from '../emailTransport.js';

dotenv.config();

const PORT = 3030;
const REDIRECT_PATH = '/oauth2callback';
const REDIRECT_URI = `http://localhost:${PORT}${REDIRECT_PATH}`;

const clientId = (process.env.GOOGLE_CLIENT_ID || '').trim();
const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || '').trim();
const emailUser = (process.env.EMAIL_USER || '').trim();

function printPrerequisites() {
  console.log(`
Google OAuth setup for Wasatch Rockhound email
==============================================

Before running this script, in Google Cloud Console:

  1. Enable Gmail API
  2. OAuth consent screen → add scope: ${GMAIL_OAUTH_SCOPE}
  3. Credentials → OAuth 2.0 Client ID (Web application)
     Redirect URI: ${REDIRECT_URI}
  4. Add to .env:
       EMAIL_USER=ericbo@execute-engrave.com
       GOOGLE_CLIENT_ID=your_client_id
       GOOGLE_CLIENT_SECRET=your_client_secret

When the browser opens, sign in as ${emailUser || 'EMAIL_USER'} and allow access.
`);
}

if (!clientId || !clientSecret) {
  printPrerequisites();
  console.error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env');
  process.exit(1);
}

if (!emailUser) {
  console.error('Set EMAIL_USER in .env before running (e.g. ericbo@execute-engrave.com)');
  process.exit(1);
}

function openBrowser(url) {
  const cmd =
    process.platform === 'win32'
      ? `start "" "${url}"`
      : process.platform === 'darwin'
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

async function exchangeCode(code) {
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error_description || data.error || res.statusText);
  }
  return data;
}

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', GMAIL_OAUTH_SCOPE);
authUrl.searchParams.set('access_type', 'offline');
authUrl.searchParams.set('prompt', 'consent');
authUrl.searchParams.set('login_hint', emailUser);

console.log('Starting local callback server on', REDIRECT_URI);
console.log('Authorize as:', emailUser);
console.log('');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);

  if (url.pathname !== REDIRECT_PATH) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end(`<h1>Authorization failed</h1><p>${error}</p>`);
    console.error('Authorization denied:', error);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end('<h1>Missing authorization code</h1>');
    return;
  }

  try {
    const tokens = await exchangeCode(code);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
      '<h1>Success</h1><p>You can close this tab and return to the terminal.</p>'
    );

    console.log('\n✅ Authorization successful\n');
    console.log('Add this to your .env:\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);

    if (!tokens.refresh_token) {
      console.warn(
        '⚠️  No refresh_token returned. Revoke app access at',
        'https://myaccount.google.com/permissions',
        'then run npm run email:oauth again with prompt=consent.'
      );
    } else {
      console.log('Then verify: npm run email:test');
    }

    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`<h1>Token exchange failed</h1><p>${err.message}</p>`);
    console.error('Token exchange failed:', err.message);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log('Opening browser for Google sign-in...\n');
  console.log('If it does not open, visit:\n');
  console.log(authUrl.toString());
  console.log('');
  openBrowser(authUrl.toString());
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use. Close the other process or change PORT in this script.`);
  } else {
    console.error(err.message);
  }
  process.exit(1);
});
