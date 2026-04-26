import { Hono } from 'hono';
import { CALLSIGN_RE, logActivity } from '../helpers.js';
import { moderateContent } from '../moderation.js';
import { wrapPage } from '../views/components/layout.js';
import { qsoPage } from '../views/qso.js';

const qso = new Hono();

const MAX_QSO_PER_USER = 10000;

// --- QSO Log Sayfasi ---
qso.get('/qso', async (c) => {
  const userId = c.get('userId');
  const user = await c.env.DB.prepare('SELECT id, username, display_name, role, avatar_url FROM users WHERE id = ?').bind(userId).first();
  return c.html(qsoPage({ user }));
});

// --- QSO Listesi (sayfalama + filtreler) ---
qso.get('/api/qso', async (c) => {
  const userId = c.get('userId');
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '50');
  const bant = c.req.query('bant') || '';
  const mod = c.req.query('mod') || '';
  const q = c.req.query('q') || '';
  const tarih_bas = c.req.query('tarih_bas') || '';
  const tarih_son = c.req.query('tarih_son') || '';

  let where = 'WHERE user_id = ?';
  const params = [userId];

  if (bant) { where += ' AND bant = ?'; params.push(bant); }
  if (mod) { where += ' AND mod = ?'; params.push(mod); }
  if (q) { where += ' AND (cagri_isareti LIKE ? OR notlar LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
  if (tarih_bas) { where += ' AND tarih >= ?'; params.push(tarih_bas); }
  if (tarih_son) { where += ' AND tarih <= ?'; params.push(tarih_son); }

  const offset = (page - 1) * limit;
  const total = await c.env.DB.prepare(`SELECT COUNT(*) as n FROM qso_log ${where}`).bind(...params).first();
  params.push(limit, offset);
  const rows = await c.env.DB.prepare(`SELECT * FROM qso_log ${where} ORDER BY tarih DESC, saat DESC LIMIT ? OFFSET ?`).bind(...params).all();

  return c.json({ qsos: rows.results, total: total.n, page, pages: Math.ceil(total.n / limit) });
});

// --- QSO Olustur ---
qso.post('/api/qso', async (c) => {
  const db = c.env.DB;
  const userId = c.get('userId');
  const body = await c.req.json();

  const cs = (body.cagri_isareti || '').trim().toUpperCase();
  if (!cs) return c.json({ error: 'Cagri isareti zorunludur' }, 400);
  if (!CALLSIGN_RE.test(cs)) return c.json({ error: 'Gecersiz cagri isareti formati' }, 400);

  const tarih = body.tarih || new Date().toISOString().split('T')[0];
  const saat = body.saat || new Date().toISOString().split('T')[1].slice(0, 5);
  const frekans = parseFloat(body.frekans) || null;
  const mod = body.mod || '';
  const bant = body.bant || frekansToBant(frekans);
  const rst_gonderilen = body.rst_gonderilen || '59';
  const rst_alinan = body.rst_alinan || '59';
  const guc = parseFloat(body.guc) || null;
  const notlar = (body.notlar || '').trim();

  // Operator baglantisi
  let operator_id = null;
  const op = await db.prepare('SELECT id FROM operatorler WHERE user_id = ? AND cagri_isareti = ?').bind(userId, cs).first();
  if (op) operator_id = op.id;

  // Limit kontrolu
  const count = await db.prepare('SELECT COUNT(*) as n FROM qso_log WHERE user_id = ?').bind(userId).first();
  if (count.n >= MAX_QSO_PER_USER) return c.json({ error: `Maksimum ${MAX_QSO_PER_USER} QSO limitine ulastiniz.` }, 400);

  await db.prepare(
    'INSERT INTO qso_log (user_id, operator_id, cagri_isareti, tarih, saat, frekans, mod, bant, rst_gonderilen, rst_alinan, guc, notlar) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
  ).bind(userId, operator_id, cs, tarih, saat, frekans, mod, bant, rst_gonderilen, rst_alinan, guc, notlar).run();

  await logActivity(db, userId, 'qso_ekle', `${cs} ${tarih} ${saat}`);
  return c.json({ ok: true });
});

// --- QSO Guncelle ---
qso.put('/api/qso/:id', async (c) => {
  const db = c.env.DB;
  const userId = c.get('userId');
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Gecersiz ID' }, 400);

  const existing = await db.prepare('SELECT * FROM qso_log WHERE id = ? AND user_id = ?').bind(id, userId).first();
  if (!existing) return c.json({ error: 'QSO bulunamadi' }, 404);

  const body = await c.req.json();
  const cs = (body.cagri_isareti || existing.cagri_isareti).trim().toUpperCase();
  if (!CALLSIGN_RE.test(cs)) return c.json({ error: 'Gecersiz cagri isareti formati' }, 400);

  const frekans = body.frekans !== undefined ? parseFloat(body.frekans) || null : existing.frekans;

  await db.prepare(
    "UPDATE qso_log SET cagri_isareti=?, tarih=?, saat=?, frekans=?, mod=?, bant=?, rst_gonderilen=?, rst_alinan=?, guc=?, notlar=?, updated_at=datetime('now') WHERE id=? AND user_id=?"
  ).bind(
    cs,
    body.tarih || existing.tarih,
    body.saat || existing.saat,
    frekans,
    body.mod !== undefined ? body.mod : existing.mod,
    body.bant || frekansToBant(frekans) || existing.bant,
    body.rst_gonderilen || existing.rst_gonderilen,
    body.rst_alinan || existing.rst_alinan,
    body.guc !== undefined ? parseFloat(body.guc) || null : existing.guc,
    body.notlar !== undefined ? body.notlar : existing.notlar,
    id, userId
  ).run();

  return c.json({ ok: true });
});

// --- QSO Sil ---
qso.delete('/api/qso/:id', async (c) => {
  const userId = c.get('userId');
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Gecersiz ID' }, 400);
  await c.env.DB.prepare('DELETE FROM qso_log WHERE id = ? AND user_id = ?').bind(id, userId).run();
  await logActivity(c.env.DB, userId, 'qso_sil', 'ID:' + id);
  return c.json({ ok: true });
});

// --- Operator bazli QSO gecmisi ---
qso.get('/api/qso/operator/:callsign', async (c) => {
  const userId = c.get('userId');
  const cs = c.req.param('callsign').toUpperCase();
  const rows = await c.env.DB.prepare('SELECT * FROM qso_log WHERE user_id = ? AND cagri_isareti = ? ORDER BY tarih DESC, saat DESC').bind(userId, cs).all();
  return c.json({ qsos: rows.results });
});

// --- ADIF Export ---
qso.get('/api/qso/export', async (c) => {
  const userId = c.get('userId');
  const rows = await c.env.DB.prepare('SELECT * FROM qso_log WHERE user_id = ? ORDER BY tarih ASC, saat ASC').bind(userId).all();

  let adif = `ADIF Export from Radyo Rehberi
<adif_ver:5>3.1.4
<programid:13>RadyoRehberi
<EOH>\n\n`;

  for (const q of rows.results) {
    let record = '';
    const cs = q.cagri_isareti || '';
    record += `<call:${cs.length}>${cs}`;
    if (q.tarih) {
      const d = q.tarih.replace(/-/g, '');
      record += `<qso_date:${d.length}>${d}`;
    }
    if (q.saat) {
      const t = q.saat.replace(/:/g, '') + '00';
      record += `<time_on:${t.length}>${t}`;
    }
    if (q.frekans) {
      const f = String(q.frekans);
      record += `<freq:${f.length}>${f}`;
    }
    if (q.mod) {
      record += `<mode:${q.mod.length}>${q.mod}`;
    }
    if (q.bant) {
      record += `<band:${q.bant.length}>${q.bant}`;
    }
    if (q.rst_gonderilen) {
      record += `<rst_sent:${q.rst_gonderilen.length}>${q.rst_gonderilen}`;
    }
    if (q.rst_alinan) {
      record += `<rst_rcvd:${q.rst_alinan.length}>${q.rst_alinan}`;
    }
    if (q.guc) {
      const p = String(q.guc);
      record += `<tx_pwr:${p.length}>${p}`;
    }
    if (q.notlar) {
      record += `<comment:${q.notlar.length}>${q.notlar}`;
    }
    record += '<EOR>\n';
    adif += record;
  }

  return new Response(adif, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename=qso_log.adi'
    }
  });
});

// Frekans -> Bant donusumu
function frekansToBant(frekans) {
  if (!frekans) return '';
  if (frekans >= 1.8 && frekans <= 2.0) return '160m';
  if (frekans >= 3.5 && frekans <= 3.8) return '80m';
  if (frekans >= 7.0 && frekans <= 7.2) return '40m';
  if (frekans >= 10.1 && frekans <= 10.15) return '30m';
  if (frekans >= 14.0 && frekans <= 14.35) return '20m';
  if (frekans >= 18.068 && frekans <= 18.168) return '17m';
  if (frekans >= 21.0 && frekans <= 21.45) return '15m';
  if (frekans >= 24.89 && frekans <= 24.99) return '12m';
  if (frekans >= 28.0 && frekans <= 29.7) return '10m';
  if (frekans >= 50.0 && frekans <= 54.0) return '6m';
  if (frekans >= 144.0 && frekans <= 146.0) return '2m';
  if (frekans >= 430.0 && frekans <= 440.0) return '70cm';
  if (frekans >= 1240.0 && frekans <= 1300.0) return '23cm';
  return '';
}

export default qso;
