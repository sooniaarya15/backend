const nodemailer = require('nodemailer');
const pool = require('../config/db');

// POST /contact
async function submitContact(req, res) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, subject || null, message]
    );

    // Try to send an email notification. If SMTP isn't configured yet
    // (Day 1-10), we just skip this step rather than failing the request.
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
          replyTo: email,
          subject: `New contact form message: ${subject || 'No subject'}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        });
      } catch (mailErr) {
        console.error('Email sending failed (message was still saved):', mailErr);
      }
    }

    res.status(201).json({ message: 'Message received, thank you!', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit contact message' });
  }
}

module.exports = { submitContact };