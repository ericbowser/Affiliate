import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7666;

app.use(cors());
app.use(express.json());

// ── Nodemailer transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// ── POST /api/send-email ────────────────────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"Western Rockhound" <info@execute-engrave.com>`,
      to: 'info@execute-engrave.com',
      replyTo: email,
      subject: subject || `New message from ${name} — Western Rockhound`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || '(none)'}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email. Check server logs.' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});
