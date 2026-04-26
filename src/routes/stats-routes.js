import { Hono } from 'hono';
import { dashboardPage } from '../views/dashboard.js';
import { frequencyGuidePage } from '../views/frequency-guide.js';

const stats = new Hono();

// --- Dashboard Sayfasi ---
stats.get('/panel', async (c) => {
  const userId = c.get('userId');
  const user = await c.env.DB.prepare('SELECT id, username, display_name, role, avatar_url FROM users WHERE id = ?').bind(userId).first();
  return c.html(dashboardPage({ user }));
});

// --- Frekans Rehberi Sayfasi ---
stats.get('/frekans', async (c) => {
  const userId = c.get('userId');
  const user = await c.env.DB.prepare('SELECT id, username, display_name, role, avatar_url FROM users WHERE id = ?').bind(userId).first();
  return c.html(frequencyGuidePage({ user }));
});

// --- Dashboard Istatistikleri ---
stats.get('/api/dashboard/stats', async (c) => {
  const userId = c.get('userId');
  const db = c.env.DB;

  const [totalQso, uniqueOps, totalOps, thisMonth, lastQso, topBand] = await Promise.all([
    db.prepare('SELECT COUNT(*) as n FROM qso_log WHERE user_id = ?').bind(userId).first(),
    db.prepare('SELECT COUNT(DISTINCT cagri_isareti) as n FROM qso_log WHERE user_id = ?').bind(userId).first(),
    db.prepare('SELECT COUNT(*) as n FROM operatorler WHERE user_id = ?').bind(userId).first(),
    db.prepare("SELECT COUNT(*) as n FROM qso_log WHERE user_id = ? AND tarih >= date('now', 'start of month')").bind(userId).first(),
    db.prepare('SELECT tarih, saat, cagri_isareti FROM qso_log WHERE user_id = ? ORDER BY tarih DESC, saat DESC LIMIT 1').bind(userId).first(),
    db.prepare('SELECT bant, COUNT(*) as cnt FROM qso_log WHERE user_id = ? AND bant != "" GROUP BY bant ORDER BY cnt DESC LIMIT 1').bind(userId).first(),
  ]);

  return c.json({
    toplam_qso: totalQso.n,
    benzersiz_operator: uniqueOps.n,
    toplam_operator: totalOps.n,
    bu_ay_qso: thisMonth.n,
    son_qso: lastQso || null,
    en_aktif_bant: topBand?.bant || '-',
  });
});

// --- Dashboard Aktivite (son 30 gun) ---
stats.get('/api/dashboard/activity', async (c) => {
  const userId = c.get('userId');
  const raw = parseInt(c.req.query('days') || '30', 10);
  const days = Number.isFinite(raw) ? Math.min(Math.max(raw, 1), 365) : 30;
  const rows = await c.env.DB.prepare(
    "SELECT tarih, COUNT(*) as cnt FROM qso_log WHERE user_id = ? AND tarih >= date('now', ?) GROUP BY tarih ORDER BY tarih ASC"
  ).bind(userId, `-${days} days`).all();
  return c.json({ activity: rows.results });
});

// --- Dashboard Bant Dagilimi ---
stats.get('/api/dashboard/bands', async (c) => {
  const userId = c.get('userId');
  const rows = await c.env.DB.prepare(
    'SELECT bant, COUNT(*) as cnt FROM qso_log WHERE user_id = ? AND bant != "" GROUP BY bant ORDER BY cnt DESC'
  ).bind(userId).all();
  return c.json({ bands: rows.results });
});

// --- Dashboard Mod Dagilimi ---
stats.get('/api/dashboard/modes', async (c) => {
  const userId = c.get('userId');
  const rows = await c.env.DB.prepare(
    'SELECT mod, COUNT(*) as cnt FROM qso_log WHERE user_id = ? AND mod != "" GROUP BY mod ORDER BY cnt DESC'
  ).bind(userId).all();
  return c.json({ modes: rows.results });
});

// --- Frekans Rehberi API ---
stats.get('/api/frekans', async (c) => {
  const rows = await c.env.DB.prepare('SELECT * FROM frekans_rehberi ORDER BY baslangic ASC').all();
  return c.json({ frekanslar: rows.results });
});

export default stats;
