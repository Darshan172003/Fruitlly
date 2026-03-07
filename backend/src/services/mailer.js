import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
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

const emailLogoPath = fileURLToPath(
  new URL('../assets/email/Logo.png', import.meta.url),
);

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
      <body style="margin:0;padding:0;background-color:#f2f5f9;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
          New B2B inquiry from ${escapeHtml(companyName)} received on Fruitlly website.
        </span>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f2f5f9;padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="680" style="max-width:680px;">
                <tr>
                  <td style="padding-bottom:14px;text-align:left;">
                    <img src="cid:fruitlly-logo" alt="Fruitlly" width="140" style="display:block;max-width:140px;height:auto;border:0;outline:none;text-decoration:none;" />
                  </td>
                </tr>
                <tr>
                  <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:22px 24px;background:#b91c1c;background-image:linear-gradient(140deg,#991b1b,#dc2626);">
                          <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#fee2e2;font-weight:700;">Fruitlly B2B Inbox</p>
                          <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;color:#ffffff;">New Inquiry Received</h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:22px 24px 10px;">
                          <p style="margin:0;font-size:14px;line-height:1.65;color:#374151;">
                            A business lead submitted the contact form. Please review details and reply to the sender.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 24px 10px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                            <tr>
                              <td style="padding:11px 12px;width:170px;font-size:13px;color:#4b5563;font-weight:700;border-bottom:1px solid #e5e7eb;">Company Name</td>
                              <td style="padding:11px 12px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${escapeHtml(companyName)}</td>
                            </tr>
                            <tr>
                              <td style="padding:11px 12px;font-size:13px;color:#4b5563;font-weight:700;border-bottom:1px solid #e5e7eb;">Contact Person</td>
                              <td style="padding:11px 12px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${escapeHtml(contactPerson)}</td>
                            </tr>
                            <tr>
                              <td style="padding:11px 12px;font-size:13px;color:#4b5563;font-weight:700;border-bottom:1px solid #e5e7eb;">Phone Number</td>
                              <td style="padding:11px 12px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${escapeHtml(phoneNumber)}</td>
                            </tr>
                            <tr>
                              <td style="padding:11px 12px;font-size:13px;color:#4b5563;font-weight:700;border-bottom:1px solid #e5e7eb;">Email Address</td>
                              <td style="padding:11px 12px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">
                                <a href="mailto:${escapeHtml(emailAddress)}" style="color:#b91c1c;text-decoration:none;font-weight:700;">${escapeHtml(emailAddress)}</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:11px 12px;font-size:13px;color:#4b5563;font-weight:700;border-bottom:1px solid #e5e7eb;">City / State</td>
                              <td style="padding:11px 12px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${escapeHtml(city)}, ${escapeHtml(state)}</td>
                            </tr>
                            <tr>
                              <td style="padding:11px 12px;font-size:13px;color:#4b5563;font-weight:700;">Pin Code</td>
                              <td style="padding:11px 12px;font-size:13px;color:#111827;">${escapeHtml(pinCode)}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 24px 6px;">
                          <h2 style="margin:0 0 10px;font-size:15px;line-height:1.4;color:#111827;">Message</h2>
                          <div style="padding:14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;font-size:13px;line-height:1.7;color:#7c2d12;">${messageHtml}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 24px 22px;">
                          <a href="mailto:${escapeHtml(emailAddress)}" style="display:inline-block;background:#b91c1c;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-size:13px;font-weight:700;">Reply To Sender</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                          <p style="margin:0;font-size:12px;color:#4b5563;">Submitted on: ${escapeHtml(submittedAt)}</p>
                          <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">This email was generated automatically from the Fruitlly website contact form.</p>
                        </td>
                      </tr>
                    </table>
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
    attachments: [
      {
        filename: 'Logo.png',
        path: emailLogoPath,
        cid: 'fruitlly-logo',
      },
    ],
  });
};
