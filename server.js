import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';
import { createEmailTransporter, getEmailConfig } from './emailTransport.js';
import { logger, sanitizeBody } from './logger.js';

dotenv.config();

const app  = express();
const PORT = process.env.API_PORT || 7667;

const emailConfig = getEmailConfig();
const { EMAIL_USER, EMAIL_RECEIVE } = emailConfig;
const { method: authMethod, transporter } = createEmailTransporter(emailConfig);

app.use(cors());
app.use(express.json());

app.use(
  pinoHttp({
    logger,
    customLogLevel(req, res, err) {
      if (err || res.statusCode >= 500) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    },
    customSuccessMessage(req, res) {
      return `${req.method} ${req.url} ${res.statusCode}`;
    },
    customErrorMessage(req, res, err) {
      return `${req.method} ${req.url} ${res.statusCode} — ${err?.message}`;
    },
    customAttributeKeys: {
      req: 'request',
      res: 'response',
      err: 'error',
      responseTime: 'durationMs',
    },
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          body: sanitizeBody(req.body),
          remoteAddress: req.socket?.remoteAddress,
        };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  })
);

if (!emailConfig.configured) {
  logger.warn(
    { emailMode: 'mock' },
    'Email not configured — /api/subscribe will use dev mock mode. Run: npm run email:oauth'
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 'smtp' sends mail; 'mock' logs to console when auth is not set up yet */
let emailMode = transporter ? 'smtp' : 'mock';

async function deliverMail(options, log, meta) {
  log.info(
    {
      ...meta,
      emailMode,
      mail: {
        from: options.from,
        to: options.to,
        replyTo: options.replyTo,
        subject: options.subject,
      },
    },
    'Sending mail'
  );

  if (emailMode === 'mock') {
    const messageId = `mock-${Date.now()}`;
    log.warn({ messageId, to: options.to }, 'Mail mock — SMTP not active');
    return { messageId };
  }

  const info = await transporter.sendMail(options);
  log.info(
    { messageId: info.messageId, to: options.to, accepted: info.accepted, rejected: info.rejected },
    'Mail accepted by SMTP'
  );
  return info;
}

function printOAuthSetupHelp(err) {
  logger.warn(
    {
      err: err.message,
      emailUser: EMAIL_USER || '(empty)',
      authMethod,
      emailMode: 'mock',
    },
    'SMTP not available — emails will be logged locally only'
  );
  logger.warn('OAuth setup: npm run email:oauth → paste GOOGLE_REFRESH_TOKEN → npm run email:test');
}

// ── Verify connection on startup ────────────────────────────────────────────
if (transporter) {
  transporter.verify()
    .then(() => {
      emailMode = 'smtp';
      logger.info({ authMethod, emailUser: EMAIL_USER, emailReceive: EMAIL_RECEIVE }, 'SMTP verified — ready to send');
    })
    .catch(printOAuthSetupHelp);
} else {
  emailMode = 'mock';
  printOAuthSetupHelp({ message: 'No transporter — missing credentials' });
}

// ── POST /api/send-email ────────────────────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const log = req.log;
  const { name, email, subject, message } = req.body;

  log.debug({ name, email, subject, messageLength: message?.length }, 'Contact form payload');

  if (!name || !email || !message) {
    log.warn({ body: sanitizeBody(req.body) }, 'Contact form validation failed');
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const info = await deliverMail(
      {
        from:    `"Wasatch Rockhound" <${EMAIL_USER}>`,
        to:      EMAIL_RECEIVE,
        replyTo: email,
        subject: subject || `New message from ${name} — Wasatch Rockhound`,
        html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || '(none)'}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      },
      log,
      { route: 'contact', senderEmail: email, senderName: name }
    );
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    log.error({ err: err.message, stack: err.stack }, 'Contact email send failed');
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// ── POST /api/subscribe ─────────────────────────────────────────────────────
app.post('/api/subscribe', async (req, res) => {
  const log = req.log;
  const email = (req.body.email || '').trim().toLowerCase();

  log.debug({ subscriber: email, rawBody: sanitizeBody(req.body) }, 'Subscribe payload');

  if (!email) {
    log.warn({ body: sanitizeBody(req.body) }, 'Subscribe validation failed — missing email');
    return res.status(400).json({ error: 'Email is required.' });
  }
  if (!EMAIL_RE.test(email)) {
    log.warn({ subscriber: email }, 'Subscribe validation failed — invalid email');
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const info = await deliverMail(
      {
        from:    `"Wasatch Rockhound" <${EMAIL_USER}>`,
        to:      EMAIL_RECEIVE,
        subject: `New subscriber — Wasatch Rockhound`,
        html:    `<p>New subscriber: <a href="mailto:${email}">${email}</a></p>`,
      },
      log,
      { route: 'subscribe', subscriber: email }
    );
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    log.error({ err: err.message, subscriber: email, stack: err.stack }, 'Subscribe notification failed');
    res.status(500).json({ error: 'Failed to send notification.' });
  }
});

app.get('/api/health', (req, res) => {
  req.log.debug({ emailMode, authMethod }, 'Health check');
  res.json({
    ok: true,
    emailMode,
    authMethod,
    smtpConfigured: emailConfig.configured,
    emailUser: EMAIL_USER,
    emailReceive: EMAIL_RECEIVE,
  });
});

app.listen(PORT, () => {
  logger.info(
    { port: PORT, emailUser: EMAIL_USER, emailReceive: EMAIL_RECEIVE, logLevel: logger.level },
    'Email server started'
  );
});
