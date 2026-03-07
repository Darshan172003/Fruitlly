import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpSecure,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

export const sendContactInquiryEmail = async ({
  companyName,
  contactPerson,
  phoneNumber,
  emailAddress,
  city,
  state,
  pinCode,
  message,
}) => {
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: true,
  });

  const messageHtml = escapeHtml(message).replace(/\n/g, '<br/>');

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New B2B Inquiry</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f6fb;padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="680" style="max-width:680px;background:#ffffff;border:1px solid #dbe4f0;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;background:linear-gradient(135deg,#b91c1c,#ef4444);">
                    <p style="margin:0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#fee2e2;font-weight:700;">Fruitlly Website</p>
                    <h1 style="margin:8px 0 0;font-size:24px;line-height:1.2;color:#ffffff;">New B2B Inquiry Received</h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 24px 4px;">
                    <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#334155;">
                      A new business inquiry has been submitted through the contact form.
                      Please review the details below and respond to the sender.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 24px 10px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                      <tr>
                        <td style="padding:10px 12px;width:170px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;">Company Name</td>
                        <td style="padding:10px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(companyName)}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 12px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;">Contact Person</td>
                        <td style="padding:10px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(contactPerson)}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 12px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;">Phone Number</td>
                        <td style="padding:10px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(phoneNumber)}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 12px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;">Email Address</td>
                        <td style="padding:10px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">
                          <a href="mailto:${escapeHtml(emailAddress)}" style="color:#b91c1c;text-decoration:none;">${escapeHtml(emailAddress)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 12px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;">City / State</td>
                        <td style="padding:10px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(city)}, ${escapeHtml(state)}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 12px;font-size:13px;color:#475569;font-weight:700;">Pin Code</td>
                        <td style="padding:10px 12px;font-size:13px;color:#0f172a;">${escapeHtml(pinCode)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:4px 24px 8px;">
                    <h2 style="margin:0 0 10px;font-size:15px;color:#0f172a;">Message</h2>
                    <div style="padding:14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;font-size:13px;line-height:1.7;color:#7c2d12;">${messageHtml}</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 24px 20px;">
                    <a href="mailto:${escapeHtml(emailAddress)}" style="display:inline-block;background:#b91c1c;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:8px;font-size:13px;font-weight:700;">Reply To Sender</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;color:#64748b;">Submitted on: ${escapeHtml(submittedAt)}</p>
                    <p style="margin:6px 0 0;font-size:12px;color:#94a3b8;">This email was generated automatically from the Fruitlly website contact form.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const text = [
    'NEW B2B INQUIRY - FRUITLLY WEBSITE',
    '',
    `Submitted On: ${submittedAt}`,
    `Company Name: ${companyName}`,
    `Contact Person: ${contactPerson}`,
    `Phone Number: ${phoneNumber}`,
    `Email Address: ${emailAddress}`,
    `City: ${city}`,
    `State: ${state}`,
    `Pin Code: ${pinCode}`,
    '',
    'Message:',
    message,
  ].join('\n');

  await transporter.sendMail({
    from: env.smtpFrom,
    to: env.contactReceiverEmail,
    subject: `New B2B Inquiry from ${companyName}`,
    replyTo: emailAddress,
    text,
    html,
  });
};
