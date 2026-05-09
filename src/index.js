import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { authMiddleware } from './auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
import statsPublicRoutes from './routes/stats-public-routes.js';
import roleExportRoutes from './routes/role-export-routes.js';
import authRoutes from './routes/auth-routes.js';
import mainRoutes from './routes/main-routes.js';
import adminRoutes from './routes/admin-routes.js';
import qsoRoutes from './routes/qso-routes.js';
import morseRoutes from './routes/morse-routes.js';
import statsRoutes from './routes/stats-routes.js';
import adminArticlesRoutes from './routes/admin-articles-routes.js';

const app = new Hono();

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

app.use('*', async (c, next) => {
  await next();
  c.header('Content-Security-Policy', CSP);
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
});

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const CSRF_SKIP = ['/api/stats/ping', '/api/stats/download', '/api/stats/helpful', '/api/role-export/auth/verify'];
app.use('*', async (c, next) => {
  if (SAFE_METHODS.has(c.req.method)) return next();
  if (CSRF_SKIP.includes(c.req.path)) {
    const origin = c.req.header('Origin') || '';
    if (origin && !origin.startsWith('https://amator.tr')) {
      return c.json({ error: 'CSRF kontrol basarisiz' }, 403);
    }
    return next();
  }
  const origin = c.req.header('Origin') || c.req.header('Referer') || '';
  const expected = c.env.APP_URL || 'https://cagri.amator.tr';
  if (!origin.startsWith(expected)) {
    return c.json({ error: 'CSRF kontrol basarisiz' }, 403);
  }
  return next();
});

app.get('/robots.txt', (c) => {
  c.header('Content-Type', 'text/plain; charset=UTF-8');
  return c.body('User-agent: *\nDisallow: /\n');
});

// EasyMDE bundle — admin makale editorunde kullaniliyor. Auth oncesi servis
// edilmeli ki link/script tag yuklenirken redirect dongusune girmesin.
const EASYMDE_JS = readFileSync(resolve(REPO_ROOT, 'node_modules/easymde/dist/easymde.min.js'), 'utf-8');
const EASYMDE_CSS = readFileSync(resolve(REPO_ROOT, 'node_modules/easymde/dist/easymde.min.css'), 'utf-8');
app.get('/admin/assets/easymde.js', (c) => {
  c.header('Content-Type', 'application/javascript; charset=UTF-8');
  c.header('Cache-Control', 'public, max-age=31536000, immutable');
  return c.body(EASYMDE_JS);
});
app.get('/admin/assets/easymde.css', (c) => {
  c.header('Content-Type', 'text/css; charset=UTF-8');
  c.header('Cache-Control', 'public, max-age=31536000, immutable');
  return c.body(EASYMDE_CSS);
});

app.route('/', statsPublicRoutes);
app.route('/', roleExportRoutes);

app.use('*', authMiddleware(getCookie));

app.route('/', authRoutes);
app.route('/', mainRoutes);
app.route('/', adminRoutes);
app.route('/', adminArticlesRoutes);
app.route('/', qsoRoutes);
app.route('/', morseRoutes);
app.route('/', statsRoutes);

app.get('/manifest.json', (c) => {
  return c.json({
    name: 'amator.tr — Çağrı Defteri',
    short_name: 'Çağrı Defteri',
    description: 'Amatör Telsiz Operatörleri Portali',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#e94560',
    lang: 'tr',
    icons: [
      { src: 'https://amator.tr/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'https://amator.tr/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: 'https://amator.tr/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  });
});

app.get('/sw.js', (c) => {
  const SW_SCRIPT = `
const CACHE_NAME = 'radyo-rehberi-v1';
const STATIC_ASSETS = ['/manifest.json', '/mors', '/frekans'];
const DATA_URLS = ['/api/all', '/api/frekans'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  if (['/login', '/register', '/setup', '/logout'].includes(url.pathname)) return;
  if (STATIC_ASSETS.includes(url.pathname) || url.pathname === '/mors' || url.pathname === '/frekans') {
    event.respondWith(caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => { if (response.ok) { caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone())); } return response; }).catch(() => cached);
      return cached || fetchPromise;
    }));
    return;
  }
  if (DATA_URLS.some((u) => url.pathname.startsWith(u)) || ['/', '/qso', '/panel'].includes(url.pathname)) {
    event.respondWith(fetch(event.request).then((response) => { if (response.ok) { caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone())); } return response; }).catch(() => caches.match(event.request)));
  }
});
`;
  c.header('Content-Type', 'application/javascript');
  return c.body(SW_SCRIPT);
});

export default app;
