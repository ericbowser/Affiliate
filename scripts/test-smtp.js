/**
 * Verify Gmail SMTP credentials in .env (OAuth2 preferred, app password fallback).
 * Usage: npm run email:test
 */
import dotenv from 'dotenv';
import { createEmailTransporter, getEmailConfig } from '../emailTransport.js';

dotenv.config();

const config = getEmailConfig();
const { method, transporter } = createEmailTransporter(config);

if (!transporter) {
  console.error('No email credentials configured.');
  console.error('');
  console.error('OAuth (recommended):');
  console.error('  EMAIL_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN');
  console.error('  Run: npm run email:oauth');
  console.error('');
  console.error('Or app password fallback:');
  console.error('  EMAIL_USER, EMAIL_APP_PASSWORD');
  process.exit(1);
}

console.log(`Auth method: ${method}`);
console.log(`Account: ${config.EMAIL_USER}\n`);

try {
  await transporter.verify();
  console.log(`✅ SMTP verified for ${config.EMAIL_USER}`);
  process.exit(0);
} catch (err) {
  console.error(`❌ SMTP failed: ${err.message}`);
  if (method === 'oauth2') {
    console.error('');
    console.error('OAuth fixes:');
    console.error('  • Re-run npm run email:oauth (signed in as', config.EMAIL_USER + ')');
    console.error('  • Consent screen must include scope https://mail.google.com/');
    console.error('  • Redirect URI must be http://localhost:3030/oauth2callback');
    console.error('  • Workspace admin may need to allow the OAuth app');
  }
  process.exit(1);
}
