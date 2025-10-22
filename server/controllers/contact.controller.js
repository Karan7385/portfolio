import { sendContactEmail } from '../services/email.service.js';

export const sendContactForm = async (req, res, next) => {
  try {
    const { name, email, contact, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      const err = new Error('All fields (name, email, message) are required.');
      err.statusCode = 400;
      throw err;
    }

    // Call the SendGrid email service
    const result = await sendContactEmail({ name, email, contact, message });

    // Success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      info: result,
    });
  } catch (error) {
    console.error('❌ Error in sendContactForm:', error.message);
    next(error);
  }
};
