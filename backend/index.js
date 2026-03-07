import app from './src/app.js';
import { onRequest } from 'firebase-functions/v2/https';
import { env, isExecutedDirectly } from './src/config/env.js';

export const api = onRequest({ region: 'asia-south1' }, app);

if (isExecutedDirectly()) {
  app.listen(env.port, () => {
    console.log(`Backend server listening on port ${env.port}`);
  });
}

export default app;
