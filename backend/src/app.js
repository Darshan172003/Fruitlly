import cors from 'cors';
import express from 'express';
import { env, getMissingMailEnvKeys } from './config/env.js';
import { sendContactInquiryEmail } from './services/mailer.js';
import { validateContactPayload } from './validators/contact.js';

const app = express();

app.use(cors({ origin: env.frontendOrigin }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const missingEnvKeys = getMissingMailEnvKeys();
  if (missingEnvKeys.length > 0) {
    return res.status(500).json({
      message: `Missing mail configuration: ${missingEnvKeys.join(', ')}`,
    });
  }

  const { data, isValid } = validateContactPayload(req.body);
  if (!isValid) {
    return res.status(400).json({ message: 'All form fields are required.' });
  }

  try {
    await sendContactInquiryEmail(data);
    return res.status(200).json({ message: 'Inquiry submitted successfully.' });
  } catch (error) {
    console.error('Failed to send contact inquiry email:', error);
    return res.status(500).json({ message: 'Failed to send inquiry email.' });
  }
});

export default app;
