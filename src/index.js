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
import adminUploadsRoutes from './routes/admin-uploads-routes.js';
import { yuklePage } from './views/yukle.js';

const app = new Hono();

// NOT: script-src 'unsafe-inline' agresif refactor olmadan kaldirilamaz —
// auth template'leri, EasyMDE bootstrap, GTM ve Turnstile init inline
// script'lere bagli. Defense-in-depth: object-src 'none', upgrade-insecure,
// frame-ancestors 'none', form-action 'self' ile clickjacking + downgrade
// + form hijack ataclari kapali. Tam koruma icin bkz. SECURITY_AUDIT F7.
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
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

app.use('*', async (c, next) => {
  await next();
  c.header('Content-Security-Policy', CSP);
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  // X-XSS-Protection modern tarayicilarda no-op (Chrome/Edge/Safari kaldirdi),
  // legacy IE'de tehlikeli olabilir; setlemiyoruz.
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Cross-origin isolation: opener / embedder relaxation ile clickjacking +
  // pop-up tab-nabbing savunmasi.
  c.header('Cross-Origin-Opener-Policy', 'same-origin');
  c.header('Cross-Origin-Resource-Policy', 'same-origin');
});

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const CSRF_SKIP = ['/api/stats/ping', '/api/stats/download', '/api/stats/helpful', '/api/role-export/auth/verify'];

// Origin/Referer header'indaki URL'in origin'ini (scheme+host+port) parse et.
// Geçersizse null döner. `startsWith` ile karşılaştırma yapma — saldırgan
// `https://cagri.amator.tr.evil.com` gönderirse prefix-eşleşme bypass olur.
function parseOrigin(value) {
  if (!value) return null;
  try { return new URL(value).origin; } catch { return null; }
}

app.use('*', async (c, next) => {
  if (SAFE_METHODS.has(c.req.method)) return next();
  const expected = c.env.APP_URL || 'https://cagri.amator.tr';
  const allowed = new Set([expected, 'https://amator.tr', 'https://dosyalar.amator.tr']);

  if (CSRF_SKIP.includes(c.req.path)) {
    const rawOrigin = c.req.header('Origin');
    // Same-origin form submit'te bazı tarayıcılar Origin göndermez; cookie'siz
    // public stats endpoint'leri için Origin yoksa serbest bırak.
    if (!rawOrigin) return next();
    const origin = parseOrigin(rawOrigin);
    if (!origin || !allowed.has(origin)) {
      return c.json({ error: 'CSRF kontrol basarisiz' }, 403);
    }
    return next();
  }

  const origin = parseOrigin(c.req.header('Origin')) || parseOrigin(c.req.header('Referer'));
  if (!origin || !allowed.has(origin)) {
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
const FA_CSS = readFileSync(resolve(REPO_ROOT, 'node_modules/font-awesome/css/font-awesome.min.css'), 'utf-8');
const FA_FONTS_DIR = resolve(REPO_ROOT, 'node_modules/font-awesome/fonts');
const FA_MIME = {
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.svg': 'image/svg+xml',
  '.otf': 'font/otf',
};

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
app.get('/admin/assets/fa/css/font-awesome.min.css', (c) => {
  c.header('Content-Type', 'text/css; charset=UTF-8');
  c.header('Cache-Control', 'public, max-age=31536000, immutable');
  return c.body(FA_CSS);
});
app.get('/admin/assets/fa/fonts/:file', (c) => {
  const file = c.req.param('file');
  if (!/^[a-zA-Z0-9._-]+$/.test(file)) return c.text('bad path', 400);
  let buf;
  try { buf = readFileSync(resolve(FA_FONTS_DIR, file)); } catch { return c.text('not found', 404); }
  const ext = file.slice(file.lastIndexOf('.'));
  c.header('Content-Type', FA_MIME[ext] || 'application/octet-stream');
  c.header('Cache-Control', 'public, max-age=31536000, immutable');
  return c.body(buf);
});

app.route('/', statsPublicRoutes);
app.route('/', roleExportRoutes);

app.use('*', authMiddleware(getCookie));

app.route('/', authRoutes);
app.route('/', mainRoutes);
app.route('/', adminRoutes);
app.route('/', adminArticlesRoutes);
app.route('/', adminUploadsRoutes);
app.route('/', qsoRoutes);
app.route('/', morseRoutes);
app.route('/', statsRoutes);

// dosyalar.amator.tr/yukle — admin upload UI. PUBLIC_PATHS'e eklendigi icin
// authMiddleware bypass; auth burada manuel yapilir, login redirect'i absolute
// olarak cagri.amator.tr'ye gonderilir (subdomain'inde /login route yok).
app.get('/yukle', async (c) => {
  const { verifySession } = await import('./auth.js');
  const token = getCookie(c, 'session');
  const session = await verifySession(token, c.env.SESSION_SECRET, c.env.DB);
  if (!session) return c.redirect('https://cagri.amator.tr/login');
  if (session.role !== 'admin') {
    return c.html('<!doctype html><meta charset=utf-8><title>Yetkisiz</title><body style="font-family:system-ui;padding:32px;background:#0a0e14;color:#e6e6e6"><h1>Yetkisiz erisim</h1><p>Bu sayfa sadece adminler icin. <a href="https://cagri.amator.tr/login" style="color:#7c3aed">Giris yap</a></p></body>', 403);
  }
  const user = await c.env.DB.prepare('SELECT id, username, role FROM users WHERE id = ?').bind(session.userId).first();
  if (!user) return c.redirect('https://cagri.amator.tr/login');
  return c.html(yuklePage(user));
});

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
