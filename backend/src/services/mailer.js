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
  const submittedAt = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(new Date());

  const messageHtml = escapeHtml(message).replace(/\n/g, '<br/>');

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New B2B Inquiry</title>
      </head>
      <body style="margin:0;padding:0;background-color:#edf1f6;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
        <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
          New B2B inquiry submitted by ${escapeHtml(companyName)}.
        </span>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#edf1f6;padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="680" style="max-width:680px;background:#ffffff;border:1px solid #d9e1ec;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="padding:22px 24px;background:#b91c1c;background-image:linear-gradient(145deg,#991b1b,#dc2626);">
                    <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#fee2e2;font-weight:700;">Fruitlly Business Desk</p>
                    <h1 style="margin:8px 0 0;font-size:25px;line-height:1.25;color:#ffffff;">New B2B Inquiry Received</h1>
                    <p style="margin:10px 0 0;font-size:13px;line-height:1.55;color:#ffe4e6;">
                      A new lead has been generated from the website contact form.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 24px 8px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0;background:#f8fafd;border:1px solid #e2e8f0;border-radius:10px;">
                      <tr>
                        <td style="padding:10px 12px;font-size:12px;color:#475569;">
                          <strong style="color:#0f172a;">Submitted:</strong> ${escapeHtml(submittedAt)}
                        </td>
                        <td align="right" style="padding:10px 12px;font-size:12px;color:#475569;">
                          <strong style="color:#0f172a;">Priority:</strong> New Lead
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 24px 10px;">
                    <h2 style="margin:0 0 10px;font-size:15px;color:#0f172a;">Contact Details</h2>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                      <tr>
                        <td style="padding:11px 12px;width:180px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;background:#f8fafc;">Company Name</td>
                        <td style="padding:11px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(companyName)}</td>
                      </tr>
                      <tr>
                        <td style="padding:11px 12px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;background:#f8fafc;">Contact Person</td>
                        <td style="padding:11px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(contactPerson)}</td>
                      </tr>
                      <tr>
                        <td style="padding:11px 12px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;background:#f8fafc;">Phone Number</td>
                        <td style="padding:11px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(phoneNumber)}</td>
                      </tr>
                      <tr>
                        <td style="padding:11px 12px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;background:#f8fafc;">Email Address</td>
                        <td style="padding:11px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">
                          <a href="mailto:${escapeHtml(emailAddress)}" style="color:#b91c1c;text-decoration:none;font-weight:700;">${escapeHtml(emailAddress)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:11px 12px;font-size:13px;color:#475569;font-weight:700;border-bottom:1px solid #e2e8f0;background:#f8fafc;">City / State</td>
                        <td style="padding:11px 12px;font-size:13px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(city)}, ${escapeHtml(state)}</td>
                      </tr>
                      <tr>
                        <td style="padding:11px 12px;font-size:13px;color:#475569;font-weight:700;background:#f8fafc;">Pin Code</td>
                        <td style="padding:11px 12px;font-size:13px;color:#0f172a;">${escapeHtml(pinCode)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:4px 24px 12px;">
                    <h2 style="margin:0 0 10px;font-size:15px;color:#0f172a;">Inquiry Message</h2>
                    <div style="padding:15px;background:#fff8f1;border:1px solid #fed7aa;border-radius:10px;font-size:13px;line-height:1.75;color:#7c2d12;">
                      ${messageHtml}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:4px 24px 24px;">
                    <a href="mailto:${escapeHtml(emailAddress)}" style="display:inline-block;background:#b91c1c;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-size:13px;font-weight:700;">
                      Reply To Sender
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;color:#64748b;">This message was generated automatically from the Fruitlly website contact form.</p>
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
