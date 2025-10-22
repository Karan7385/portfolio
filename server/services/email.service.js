import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import sgMail from '@sendgrid/mail';

// ✅ Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send a contact form email via SendGrid
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.contact
 * @param {string} data.message
 */
export const sendContactEmail = async ({ name, email, contact, message }) => {
  try {
    const msg = {
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // recipient
      from: {
        email: process.env.EMAIL_USER,
        name: `Portfolio Contact | ${name}`,
      },
      subject: `📬 ATTENTION PLEASE! NEW MESSAGE FROM PORTFOLIO BY ${name}`,
      replyTo: email,
      html: `
        <div style="
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f6f8;
          padding: 40px 20px;
        ">
          <div style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
          ">
            <div style="background-color: #2563eb; color: #ffffff; padding: 16px 24px;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 600;">
                📬 New Contact Form Submission
              </h2>
            </div>
            <div style="padding: 24px;">
              <p style="font-size: 16px; color: #111827; margin: 0 0 12px;">
                <strong>Name:</strong> ${name}
              </p>
              <p style="font-size: 16px; color: #111827; margin: 0 0 12px;">
                <strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
              </p>
              <p style="font-size: 16px; color: #111827; margin: 0 0 12px;">
                <strong>Contact:</strong> ${contact}
              </p>
              <div style="
                margin-top: 20px;
                padding: 16px;
                background-color: #f9fafb;
                border-left: 4px solid #2563eb;
                border-radius: 8px;
              ">
                <p style="font-size: 15px; color: #1f2937; margin: 0; white-space: pre-line;">
                  ${message}
                </p>
              </div>
            </div>
            <div style="
              background-color: #f1f5f9;
              padding: 16px 24px;
              text-align: center;
              font-size: 13px;
              color: #6b7280;
            ">
              <p style="margin: 0;">
                This message was sent from your <strong>Portfolio Website</strong>.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const [response] = await sgMail.send(msg);
    console.log('✅ Email sent successfully:', response.statusCode);
    return { success: true, statusCode: response.statusCode };
  } catch (error) {
    console.error('❌ Error sending email:', error.response?.body || error.message);
    throw new Error('Failed to send contact email.');
  }
};