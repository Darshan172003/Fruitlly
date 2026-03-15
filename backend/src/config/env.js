import dotenv from 'dotenv';
import { pathToFileURL } from 'url';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  frontendOrigin: process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(',').map(o => o.trim()) : ['http://localhost:5173'],
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpFrom: process.env.SMTP_FROM,
  contactReceiverEmail: process.env.CONTACT_RECEIVER_EMAIL,
};

const requiredMailEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'CONTACT_RECEIVER_EMAIL',
];

export const getMissingMailEnvKeys = () => requiredMailEnv.filter((key) => !process.env[key]);

export const isExecutedDirectly = () => {
  if (!process.argv[1]) return false;
  return import.meta.url === pathToFileURL(process.argv[1]).href;
};
