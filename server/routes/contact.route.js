import express from 'express';
import { sendContactEmail } from '../services/email.service.js';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

/**
 * Simple server-side email validation
 */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * POST /api/contact
 * Handles contact form submissions.
 */
router.post('/', async (req, res, next) => {
  const { name, email, contact, message } = req.body;

  // 1️⃣ Validation
  if (!name || !email || !contact || !message) {
    const error = new Error('All fields are required.');
    error.statusCode = 400;
    return next(error);
  }

  if (!isValidEmail(email)) {
    const error = new Error('Invalid email format.');
    error.statusCode = 400;
    return next(error);
  }

  // 2️⃣ Send email
  try {
    const result = await sendContactEmail({ name, email, contact, message });
    console.log(`[API] Email sent: ${result.messageId}`);

    res.status(200).json({
      success: true,
      message: 'Message delivered successfully!',
    });
  } catch (err) {
    console.error('[API] Email send error:', err.message);
    const sendError = new Error('Failed to send your message. Please try again later.');
    sendError.statusCode = 500;
    next(sendError);
  }
});

export default router;