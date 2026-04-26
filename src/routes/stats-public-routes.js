import { Hono } from 'hono';
import { VALID_TUTORIAL_SLUGS } from '../valid-slugs.js';

const stats = new Hono();

const DEVICES = [
  'quansheng-uv-k5-f4hwn',
  'quansheng-uv-k5v3-uv-k1-f4hwn',
  'baofeng-k5-plus',
  'opengd77',
  'tyt-md-uv390-plus',
  'tyt-md-uv390',
];
const KNOWN_DEVICE_SET = new Set(DEVICES);

const VISITS_IP_TTL = 2 * 365 * 86400;
const HELPFUL_IP_TTL = 365 * 86400;

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function nowEpoch() {
  return Math.floor(Date.now() / 1000);
}

function kvGet(db, key) {
  const row = db.prepare('SELECT value, expires_at FROM stats_kv WHERE key = ?').get(key);
  if (!row) return null;
  if (row.expires_at && row.expires_at < nowEpoch()) {
    db.prepare('DELETE FROM stats_kv WHERE key = ?').run(key);
    return null;
  }
  return row.value;
}

function kvPut(db, key, value, ttl) {
  const expires = ttl ? nowEpoch() + ttl : null;
  db.prepare('INSERT OR REPLACE INTO stats_kv (key, value, expires_at) VALUES (?, ?, ?)').run(key, String(value), expires);
}

function getNum(db, key) {
  const v = kvGet(db, key);
  const n = v === null ? 0 : parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
}

function incr(db, key) {
  const next = getNum(db, key) + 1;
  kvPut(db, key, next);
  return next;
}

async function hashIp(ip, salt) {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function getOrCreateSalt(db) {
  let salt = kvGet(db, 'site:statsSalt');
  if (!salt) {
    salt = crypto.randomUUID();
    kvPut(db, 'site:statsSalt', salt);
  }
  return salt;
}

function isValidSlug(s) {
  if (typeof s !== 'string' || !/^[a-z0-9-]{1,80}$/.test(s)) return false;
  return VALID_TUTORIAL_SLUGS.has(s);
}

function corsHeaders(method) {
  const h = {
    'Access-Control-Allow-Origin': 'https://amator.tr',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (method === 'GET') h['Access-Control-Allow-Origin'] = '*';
  return h;
}

stats.options('/api/stats/*', (c) => {
  return c.body(null, 204, corsHeaders('OPTIONS'));
});

stats.post('/api/stats/ping', async (c) => {
  const db = c.env.DB._db;
  let firstLaunch = kvGet(db, 'site:firstLaunch');
  if (!firstLaunch) {
    firstLaunch = new Date().toISOString();
    kvPut(db, 'site:firstLaunch', firstLaunch);
  }

  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-real-ip') || '';
  const today = todayIso();
  let visitorNumber = getNum(db, 'site:visits:total');

  if (ip) {
    const salt = getOrCreateSalt(db);
    const hash = await hashIp(ip, salt);
    const seenEver = kvGet(db, `site:visits:ip:${hash}`);
    const seenToday = kvGet(db, `site:visits:ip:${today}:${hash}`);

    if (!seenEver) {
      visitorNumber = incr(db, 'site:visits:total');
      kvPut(db, `site:visits:ip:${hash}`, '1', VISITS_IP_TTL);
    }
    if (!seenToday) {
      incr(db, `site:visits:day:${today}`);
      kvPut(db, `site:visits:ip:${today}:${hash}`, '1', 25 * 3600);
    }
  } else {
    visitorNumber = incr(db, 'site:visits:total');
    incr(db, `site:visits:day:${today}`);
  }

  return c.json({ visitorNumber, firstLaunch }, 200, corsHeaders('POST'));
});

stats.post('/api/stats/download', async (c) => {
  const db = c.env.DB._db;
  let cihaz = null;
  try {
    const body = await c.req.json();
    cihaz = typeof body?.cihaz === 'string' ? body.cihaz : null;
  } catch {}

  incr(db, 'site:downloads:total');
  incr(db, `site:downloads:day:${todayIso()}`);
  if (cihaz && KNOWN_DEVICE_SET.has(cihaz)) {
    incr(db, `site:downloads:device:${cihaz}`);
  }
  return c.json({ ok: true }, 200, corsHeaders('POST'));
});

stats.get('/api/stats', (c) => {
  const db = c.env.DB._db;
  const today = todayIso();
  const firstLaunch = kvGet(db, 'site:firstLaunch');
  const totalVisits = getNum(db, 'site:visits:total');
  const todayVisits = getNum(db, `site:visits:day:${today}`);
  const totalDownloads = getNum(db, 'site:downloads:total');
  const todayDownloads = getNum(db, `site:downloads:day:${today}`);

  const byDevice = {};
  for (const d of DEVICES) {
    byDevice[d] = getNum(db, `site:downloads:device:${d}`);
  }

  let daysActive = 1;
  if (firstLaunch) {
    const diffMs = Date.now() - new Date(firstLaunch).getTime();
    daysActive = Math.max(1, Math.floor(diffMs / 86400000) + 1);
  }

  return c.json({
    firstLaunch: firstLaunch || null,
    daysActive,
    visits: { total: totalVisits, today: todayVisits },
    downloads: { total: totalDownloads, today: todayDownloads, byDevice },
  }, 200, corsHeaders('GET'));
});

stats.get('/api/stats/helpful', (c) => {
  const db = c.env.DB._db;
  const slug = c.req.query('slug') || '';
  if (!isValidSlug(slug)) return c.json({ hata: 'Geçersiz slug' }, 400, corsHeaders('GET'));
  const count = getNum(db, `site:helpful:slug:${slug}`);
  return c.json({ slug, count }, 200, corsHeaders('GET'));
});

stats.post('/api/stats/helpful', async (c) => {
  const db = c.env.DB._db;
  let slug = null;
  try {
    const body = await c.req.json();
    slug = typeof body?.slug === 'string' ? body.slug : null;
  } catch {}
  if (!isValidSlug(slug)) return c.json({ hata: 'Geçersiz slug' }, 400, corsHeaders('POST'));

  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-real-ip') || '';
  if (ip) {
    const salt = getOrCreateSalt(db);
    const hash = await hashIp(ip, salt);
    const dedupKey = `site:helpful:ip:${slug}:${hash}`;
    if (kvGet(db, dedupKey)) {
      const count = getNum(db, `site:helpful:slug:${slug}`);
      return c.json({ slug, count, voted: false, alreadyVoted: true }, 200, corsHeaders('POST'));
    }
    kvPut(db, dedupKey, '1', HELPFUL_IP_TTL);
  }
  const count = incr(db, `site:helpful:slug:${slug}`);
  return c.json({ slug, count, voted: true }, 200, corsHeaders('POST'));
});

export default stats;
