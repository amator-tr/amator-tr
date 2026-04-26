/**
 * Auth modulu - PBKDF2 hashing, session token, middleware
 */

// OWASP 2024: PBKDF2-SHA256 için minimum 600000 iter.
// Eski hesaplar 100000 ile hashlandı; users.password_iterations kolonundan
// okunup login sırasında lazy rehash ile yükseltilir.
export const CURRENT_ITERATIONS = 600000;
export const LEGACY_ITERATIONS = 100000;
const KEY_LENGTH = 32;

export function generateSalt() {
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  return [...buf].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashPassword(password, salt, iterations = CURRENT_ITERATIONS) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations, hash: 'SHA-256' },
    keyMaterial,
    KEY_LENGTH * 8
  );
  return [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Constant-time hex string compare — timing leak savunması.
export function timingSafeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function createSessionToken(secret, userId, role) {
  const payload = { userId, role, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
  const data = btoa(JSON.stringify(payload));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return `${data}.${[...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')}`;
}

export async function verifySession(token, secret) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  try {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const sigBytes = new Uint8Array(parts[1].match(/.{2}/g).map(b => parseInt(b, 16)));
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(parts[0]));
    if (!valid) return null;
    const payload = JSON.parse(atob(parts[0]));
    if (!payload.userId || payload.exp <= Date.now()) return null;
    return { userId: payload.userId, role: payload.role || 'user' };
  } catch { return null; }
}

export function getClientIP(c) {
  return c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
}

// Public paths that don't require auth
const PUBLIC_PATHS = [
  '/login', '/register', '/setup',
  '/auth/github', '/auth/github/callback',
  '/manifest.json', '/sw.js', '/robots.txt',
  '/verify-resend', '/sifre-sifirla',
];
const PUBLIC_PREFIXES = ['/verify/', '/sifre-sifirla/'];

export function authMiddleware(getCookieFn) {
  return async (c, next) => {
    const p = c.req.path;
    if (PUBLIC_PATHS.includes(p)) return next();
    if (PUBLIC_PREFIXES.some((pre) => p.startsWith(pre))) return next();

    const token = getCookieFn(c, 'session');
    const session = await verifySession(token, c.env.SESSION_SECRET);

    if (!session) return c.redirect('/login');

    c.set('userId', session.userId);
    c.set('role', session.role);
    return next();
  };
}

export function adminMiddleware() {
  return async (c, next) => {
    if (c.get('role') !== 'admin') {
      return c.json({ error: 'Yetkisiz erisim' }, 403);
    }
    return next();
  };
}
