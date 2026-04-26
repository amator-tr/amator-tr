import { Hono } from 'hono';
import { mainPage } from '../views/main.js';
import { moderateContent } from '../moderation.js';
import {
  CALLSIGN_RE, MAX_OPERATORS_PER_USER, MODELS, DEFAULT_MODEL,
  getModel, getModelParams, extractResponse, getModelChain, logActivity
} from '../helpers.js';

const main = new Hono();

// --- Ana sayfa ---
main.get('/', async (c) => {
  const userId = c.get('userId');
  const user = await c.env.DB.prepare('SELECT id, username, display_name, role, avatar_url FROM users WHERE id = ?').bind(userId).first();
  const kayitlar = await c.env.DB.prepare('SELECT * FROM operatorler WHERE user_id = ? ORDER BY id ASC').bind(userId).all();
  return c.html(mainPage({ kayitlar: kayitlar.results, total: kayitlar.results.length, user }));
});

// --- API: Tum operatorler (user-scoped) ---
main.get('/api/all', async (c) => {
  const userId = c.get('userId');
  const kayitlar = await c.env.DB.prepare('SELECT * FROM operatorler WHERE user_id = ? ORDER BY id ASC').bind(userId).all();
  return c.json({ kayitlar: kayitlar.results, total: kayitlar.results.length });
});

// --- Ekle / guncelle (user-scoped) ---
main.post('/ekle', async (c) => {
  const db = c.env.DB;
  const userId = c.get('userId');
  const body = await c.req.parseBody();
  let operator = (body.operator || '').trim();
  let cagri_isareti = (body.cagri_isareti || '').trim().toUpperCase();
  let qth = (body.qth || '').trim();
  let hakkinda = (body.hakkinda || '').trim();

  if (!cagri_isareti) return c.json({ error: 'Cagri isareti zorunludur!' }, 400);
  if (operator) operator = operator.toLocaleUpperCase('tr-TR');
  if (!CALLSIGN_RE.test(cagri_isareti))
    return c.json({ error: 'Gecersiz cagri isareti formati!' }, 400);

  const modResult = await moderateContent(c.env.AI, `${operator} ${qth} ${hakkinda}`);
  if (!modResult.safe) {
    await db.prepare('INSERT INTO moderasyon_log (icerik, sonuc) VALUES (?, ?)').bind(`${operator} ${qth} ${hakkinda}`, modResult.reason).run();
    return c.json({ error: 'Icerik uygun degil.' }, 400);
  }

  const existing = await db.prepare('SELECT * FROM operatorler WHERE user_id = ? AND cagri_isareti = ?').bind(userId, cagri_isareti).first();
  if (existing) {
    await db.prepare("UPDATE operatorler SET operator=?, qth=?, hakkinda=?, updated_at=datetime('now') WHERE id=? AND user_id=?")
      .bind(operator || existing.operator, qth || existing.qth, hakkinda || existing.hakkinda, existing.id, userId).run();
    await logActivity(db, userId, 'duzenle', cagri_isareti);
    return c.json({ ok: true, action: 'updated' });
  }
  const count = await db.prepare('SELECT COUNT(*) as n FROM operatorler WHERE user_id = ?').bind(userId).first();
  if (count.n >= MAX_OPERATORS_PER_USER) return c.json({ error: `Maksimum ${MAX_OPERATORS_PER_USER} kayit limitine ulastiniz.` }, 400);
  await db.prepare('INSERT INTO operatorler (user_id, operator, cagri_isareti, qth, hakkinda) VALUES (?,?,?,?,?)')
    .bind(userId, operator, cagri_isareti, qth, hakkinda).run();
  await logActivity(db, userId, 'ekle', cagri_isareti + ' ' + operator);
  return c.json({ ok: true, action: 'created' });
});

// --- Sil (user-scoped) ---
main.post('/sil', async (c) => {
  const userId = c.get('userId');
  const id = parseInt((await c.req.parseBody()).id);
  if (!id || isNaN(id)) return c.json({ error: 'Gecersiz ID' }, 400);
  const op = await c.env.DB.prepare('SELECT cagri_isareti FROM operatorler WHERE id = ? AND user_id = ?').bind(id, userId).first();
  await c.env.DB.prepare('DELETE FROM operatorler WHERE id = ? AND user_id = ?').bind(id, userId).run();
  await logActivity(c.env.DB, userId, 'sil', op?.cagri_isareti || 'ID:' + id);
  return c.json({ ok: true });
});

// --- Duzenle (user-scoped) ---
main.post('/duzenle', async (c) => {
  const db = c.env.DB;
  const userId = c.get('userId');
  const body = await c.req.parseBody();
  const id = parseInt(body.id);
  const operator = (body.operator || '').trim();
  let cagri_isareti = (body.cagri_isareti || '').trim().toUpperCase();
  const qth = (body.qth || '').trim();
  const hakkinda = (body.hakkinda || '').trim();
  if (!id || isNaN(id)) return c.json({ error: 'Gecersiz ID' }, 400);

  if (cagri_isareti) {
    if (!CALLSIGN_RE.test(cagri_isareti))
      return c.json({ error: 'Gecersiz cagri isareti formati!' }, 400);
    const dup = await db.prepare('SELECT id FROM operatorler WHERE user_id=? AND cagri_isareti=? AND id!=?').bind(userId, cagri_isareti, id).first();
    if (dup) return c.json({ error: 'Bu cagri isareti zaten listenizde.' }, 400);
  }

  const modResult = await moderateContent(c.env.AI, `${operator} ${qth} ${hakkinda}`);
  if (!modResult.safe) return c.json({ error: 'Icerik uygun degil.' }, 400);

  if (cagri_isareti) {
    await db.prepare("UPDATE operatorler SET operator=?, cagri_isareti=?, qth=?, hakkinda=?, updated_at=datetime('now') WHERE id=? AND user_id=?")
      .bind(operator, cagri_isareti, qth, hakkinda, id, userId).run();
  } else {
    await db.prepare("UPDATE operatorler SET operator=?, qth=?, hakkinda=?, updated_at=datetime('now') WHERE id=? AND user_id=?")
      .bind(operator, qth, hakkinda, id, userId).run();
  }
  await logActivity(db, userId, 'duzenle', (cagri_isareti || 'ID:' + id));
  return c.json({ ok: true });
});

// --- Dogal dil ile telsizci parse ---
main.post('/api/nl-ekle', async (c) => {
  const body = await c.req.parseBody();
  const metin = (body.metin || '').trim();
  const modelKey = body.model || DEFAULT_MODEL;
  if (!metin) return c.json({ error: 'Metin bos' }, 400);
  if (metin.length > 1000) return c.json({ error: 'Metin 1000 karakteri gecemez' }, 400);

  const sysPrompt = `Sen bir veri cikarma sistemisin. Kullanici sana dogal dilde bir veya birden fazla amator telsiz radyo operatoru hakkinda bilgi verecek. Her operatoru ayri bir JSON objesi olarak cikar.

Cikti SADECE bir JSON dizisi (array) olmali:
[{"operator":"ISIM","cagri_isareti":"CAGRI","qth":"KONUM","hakkinda":"BILGI"}]

Kurallar:
- operator: Kisinin ismi, BUYUK HARF
- cagri_isareti: TA1XXX gibi, BUYUK HARF. Yoksa ""
- qth: Konum. Yoksa ""
- hakkinda: Meslek, yas, bilgi vs. Yoksa ""
- Bilinmeyen alanlari bos birak, uydurma
- Birden fazla kisi varsa dizide birden fazla obje olsun
- SADECE JSON dizisi yaz, baska hicbir sey yazma`;

  const chain = getModelChain(modelKey);

  for (const model of chain) {
    try {
      const response = await c.env.AI.run(model, getModelParams(model, {
        messages: [
          { role: 'system', content: sysPrompt },
          { role: 'user', content: metin }
        ],
        max_tokens: 500,
        temperature: 0,
      }));
      const raw = extractResponse(response).trim();
      const arrMatch = raw.match(/\[[\s\S]*\]/);
      const objMatch = raw.match(/\{[\s\S]*\}/);
      let items;
      if (arrMatch) {
        items = JSON.parse(arrMatch[0]);
      } else if (objMatch) {
        items = [JSON.parse(objMatch[0])];
      } else continue;

      if (!Array.isArray(items)) items = [items];
      const parsed = items.map(p => ({
        operator: (p.operator || '').toLocaleUpperCase('tr-TR'),
        cagri_isareti: (p.cagri_isareti || '').toUpperCase(),
        qth: p.qth || '',
        hakkinda: p.hakkinda || '',
      }));
      return c.json({ ok: true, parsed, model: Object.keys(MODELS).find(k => MODELS[k] === model) || 'unknown' });
    } catch (err) {
      console.error(`NL model ${model}:`, err);
      continue;
    }
  }
  return c.json({ error: 'Metin anlasilamadi.' }, 400);
});

// --- Asistan (user-scoped) ---
main.post('/api/asistan', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.parseBody();
  const soru = (body.soru || '').trim();
  const modelKey = body.model || DEFAULT_MODEL;
  if (!soru) return c.json({ error: 'Soru bos' }, 400);
  if (soru.length > 400) return c.json({ error: 'Soru 400 karakteri gecemez' }, 400);

  const ops = await c.env.DB.prepare('SELECT operator, cagri_isareti, qth, hakkinda FROM operatorler WHERE user_id = ? ORDER BY id ASC').bind(userId).all();
  const opList = ops.results.map(o =>
    `${o.cagri_isareti} - ${o.operator} (${o.qth || '?'})${o.hakkinda ? ' [' + o.hakkinda + ']' : ''}`
  ).join('\n');

  const systemPrompt = `Sen bir amator telsiz toplulugu asistanisin. Turkce cevap ver. Kisa ve net ol (1-3 cumle).

Kayitli operatorler (${ops.results.length} kisi):
${opList}

Yapabileceklerin:
- Kayitli operatorler hakkinda HER TURLU soru cevaplanabilir (meslegi, yasadigi yer, yetenekleri, hobileri vs.)
- "Kim X isi yapar?", "Y sehrinde kim var?", "En genc kim?" gibi operatorler arasi karsilastirma/filtreleme sorulari
- Telsiz, radyo, frekans, ekipman gibi teknik sorular
- Operatorlerin hakkinda alanindaki bilgilere dayanarak genel sorular (orn: "web sitesi yapan var mi?")

Yapamadigin:
- Kayitli olmayan kisiler hakkinda bilgi uydurma
- Tamamen alakasiz konular (siyaset, spor sonuclari, yemek tarifleri vs.) icin kibarca "Bu konuda yardimci olamiyorum, operatorler veya telsiz hakkinda sorabilirsiniz" de`;

  const chain = getModelChain(modelKey);

  for (const model of chain) {
    try {
      const response = await c.env.AI.run(model, getModelParams(model, {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: soru }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }));
      const cevap = extractResponse(response);
      if (cevap.trim().length > 0) {
        return c.json({ ok: true, cevap: cevap.trim(), model: Object.keys(MODELS).find(k => MODELS[k] === model) || 'unknown' });
      }
    } catch (err) {
      console.error(`Asistan model ${model}:`, err);
      continue;
    }
  }
  return c.json({ error: 'Asistan yanitlamiyor.' }, 500);
});

// --- CSV Export (user-scoped) ---
main.get('/export', async (c) => {
  const userId = c.get('userId');
  const ops = await c.env.DB.prepare('SELECT * FROM operatorler WHERE user_id = ? ORDER BY id ASC').bind(userId).all();
  function csvSafe(v) {
    let s = (v || '').toString().replace(/"/g, '""');
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return '"' + s + '"';
  }
  let csv = '\uFEFF' + ['ID','Operator','Cagri Isareti','QTH','Hakkinda'].join(';') + '\n';
  for (const op of ops.results) {
    csv += [op.id, op.operator, op.cagri_isareti, op.qth, op.hakkinda].map(csvSafe).join(';') + '\n';
  }
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename=Operator_Listesi.csv' } });
});

// --- CSV Import (user-scoped) ---
main.post('/import', async (c) => {
  const db = c.env.DB;
  const userId = c.get('userId');
  const body = await c.req.json();
  const records = body.records;
  if (!Array.isArray(records) || !records.length) return c.json({ error: 'Kayit yok' }, 400);
  if (records.length > 500) return c.json({ error: 'Tek seferde en fazla 500 kayit import edilebilir' }, 400);

  const currentCount = await db.prepare('SELECT COUNT(*) as n FROM operatorler WHERE user_id = ?').bind(userId).first();
  const newCount = records.filter(r => r.action === 'new').length;
  if (currentCount.n + newCount > MAX_OPERATORS_PER_USER) {
    return c.json({ error: `Maksimum ${MAX_OPERATORS_PER_USER} kayit limiti. Mevcut: ${currentCount.n}, eklenecek: ${newCount}. Yeterli alan yok.` }, 400);
  }

  const results = { created: 0, updated: 0, skipped: 0, errors: [] };
  const stmts = [];

  for (const rec of records) {
    const cs = (rec.cagri_isareti || '').trim().toUpperCase();
    const op = (rec.operator || '').trim();
    const qth = (rec.qth || '').trim();
    const hak = (rec.hakkinda || '').trim();
    if (!cs) { results.skipped++; continue; }
    if (!CALLSIGN_RE.test(cs)) { results.errors.push(`${cs}: gecersiz format`); continue; }

    const modResult = await moderateContent(c.env.AI, `${op} ${qth} ${hak}`, 'lenient');
    if (!modResult.safe) { results.errors.push(`${cs}: icerik uygun degil`); continue; }

    if (rec.action === 'new') {
      stmts.push(db.prepare('INSERT INTO operatorler (user_id, operator, cagri_isareti, qth, hakkinda) VALUES (?,?,?,?,?)').bind(userId, op, cs, qth, hak));
      results.created++;
    } else if (rec.action === 'update') {
      stmts.push(db.prepare("UPDATE operatorler SET operator=?, qth=?, hakkinda=?, updated_at=datetime('now') WHERE user_id=? AND cagri_isareti=?").bind(op, qth, hak, userId, cs));
      results.updated++;
    } else if (rec.action === 'merge') {
      const sets = [];
      const vals = [];
      if (op) { sets.push('operator=?'); vals.push(op); }
      if (qth) { sets.push('qth=?'); vals.push(qth); }
      if (hak) { sets.push('hakkinda=?'); vals.push(hak); }
      if (sets.length) {
        sets.push("updated_at=datetime('now')");
        vals.push(userId, cs);
        stmts.push(db.prepare(`UPDATE operatorler SET ${sets.join(',')} WHERE user_id=? AND cagri_isareti=?`).bind(...vals));
        results.updated++;
      } else { results.skipped++; }
    } else { results.skipped++; }
  }

  if (stmts.length) {
    try { await db.batch(stmts); } catch (err) {
      console.error('Import batch error:', err);
      return c.json({ error: 'Import hatasi: ' + err.message }, 500);
    }
  }
  return c.json({ ok: true, results });
});

// --- Toplu sil (user-scoped) ---
main.post('/sil-toplu', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const ids = body.ids;
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'ID listesi bos' }, 400);
  if (ids.length > 500) return c.json({ error: 'Tek seferde en fazla 500 kayit silinebilir' }, 400);
  const validIds = ids.map(id => parseInt(id)).filter(id => !isNaN(id) && id > 0);
  if (!validIds.length) return c.json({ error: 'Gecerli ID yok' }, 400);
  const stmts = validIds.map(id => c.env.DB.prepare('DELETE FROM operatorler WHERE id = ? AND user_id = ?').bind(id, userId));
  await c.env.DB.batch(stmts);
  return c.json({ ok: true, deleted: ids.length });
});

// --- Tum verileri sil (user-scoped) ---
main.delete('/api/sil-hepsi', async (c) => {
  const userId = c.get('userId');
  await c.env.DB.prepare('DELETE FROM operatorler WHERE user_id = ?').bind(userId).run();
  return c.json({ ok: true });
});

// --- DB istatistik (user-scoped) ---
main.get('/api/stats', async (c) => {
  const userId = c.get('userId');
  const count = await c.env.DB.prepare('SELECT COUNT(*) as total FROM operatorler WHERE user_id = ?').bind(userId).first();
  const last = await c.env.DB.prepare('SELECT MAX(updated_at) as last_updated FROM operatorler WHERE user_id = ?').bind(userId).first();
  return c.json({ total: count.total, last_updated: last.last_updated });
});

// --- Duyurular (public API) ---
main.get('/api/announcements', async (c) => {
  const anns = await c.env.DB.prepare('SELECT a.*, u.username FROM announcements a LEFT JOIN users u ON a.created_by = u.id WHERE a.active = 1 ORDER BY a.created_at DESC LIMIT 5').all();
  return c.json({ announcements: anns.results });
});

// --- Son aktiviteler (user-scoped) ---
main.get('/api/recent-activity', async (c) => {
  const userId = c.get('userId');
  const acts = await c.env.DB.prepare('SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').bind(userId).all();
  return c.json({ activities: acts.results });
});

export default main;
