import { serve } from '@hono/node-server';
import { getDB } from './db.js';
import { getAI } from './ai.js';
import app from './index.js';

const db = getDB();
const ai = getAI();

const env = {
  DB: db,
  AI: ai,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  TURNSTILE_SECRET: process.env.TURNSTILE_SECRET,
  TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM || 'amator.tr <noreply@amator.tr>',
  APP_URL: process.env.APP_URL || 'https://cagri.amator.tr',
};

const port = parseInt(process.env.PORT || '3000', 10);

serve({ fetch: (req) => app.fetch(req, env), port }, (info) => {
  console.log(`cagri-server listening on http://localhost:${info.port}`);
});
