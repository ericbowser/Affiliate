import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app  = express();
const PORT = process.env.API_PORT || 7666;

app.use(cors());
app.use(express.json());

// ── Nodemailer transporter — explicit SMTP (matches CloudPrepper pattern) ───
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// ── Verify connection on startup ────────────────────────────────────────────
transporter.verify()
  .then(() => console.log('✅ SMTP connection verified — ready to send'))
  .catch((err) => {
    console.error('❌ SMTP connection FAILED:', err.message);
    console.error('   Check EMAIL_USER and EMAIL_APP_PASSWORD in .env');
    console.error('   EMAIL_USER is currently:', process.env.EMAIL_USER || '(empty)');
  });

// ── POST /api/send-email ────────────────────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const info = await transporter.sendMail({
      from:    `"Wasatch Rockhound" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_RECEIVE || process.env.EMAIL_USER,
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
    });
    console.log('Message sent:', info.messageId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err.message);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// ── POST /api/subscribe ─────────────────────────────────────────────────────
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const info = await transporter.sendMail({
      from:    `"Wasatch Rockhound" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_RECEIVE || process.env.EMAIL_USER,
      subject: `New subscriber — Wasatch Rockhound`,
      html:    `<p>New subscriber: <a href="mailto:${email}">${email}</a></p>`,
    });
    console.log('Subscribe notification sent:', info.messageId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err.message);
    res.status(500).json({ error: 'Failed to send notification.' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});
