import { Hono } from 'hono';
import { morsePage } from '../views/morse.js';
import { MODELS, DEFAULT_MODEL, getModel, getModelParams, extractResponse, getModelChain } from '../helpers.js';

const morse = new Hono();

// --- Mors Sayfasi ---
morse.get('/mors', async (c) => {
  const userId = c.get('userId');
  const user = await c.env.DB.prepare('SELECT id, username, display_name, role, avatar_url FROM users WHERE id = ?').bind(userId).first();
  return c.html(morsePage({ user }));
});

// --- Mors Ilerleme ---
morse.get('/api/morse/progress', async (c) => {
  const userId = c.get('userId');
  const rows = await c.env.DB.prepare('SELECT * FROM morse_progress WHERE user_id = ? ORDER BY karakter ASC').bind(userId).all();
  return c.json({ progress: rows.results });
});

morse.post('/api/morse/progress', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const updates = body.updates; // [{karakter, dogru, yanlis, hiz}]
  if (!Array.isArray(updates)) return c.json({ error: 'Gecersiz veri' }, 400);

  const stmts = updates.map(u =>
    c.env.DB.prepare(
      `INSERT INTO morse_progress (user_id, karakter, dogru, yanlis, son_hiz, updated_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(user_id, karakter) DO UPDATE SET
         dogru = dogru + excluded.dogru,
         yanlis = yanlis + excluded.yanlis,
         son_hiz = excluded.son_hiz,
         updated_at = datetime('now')`
    ).bind(userId, u.karakter, u.dogru || 0, u.yanlis || 0, u.hiz || 15)
  );

  if (stmts.length) await c.env.DB.batch(stmts);
  return c.json({ ok: true });
});

// --- Mors Oturum Kaydi (kullanici+mod basina tek kayit, sadece high score tutulur) ---
morse.post('/api/morse/session', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const mod = body.mod || 'egitim';
  const puan = body.puan || 0;
  const hiz = body.hiz || 15;
  const dogru = body.dogru || 0;
  const yanlis = body.yanlis || 0;
  const sure = body.sure || 0;

  // Sadece mevcut skordan yuksekse guncelle
  await c.env.DB.prepare(
    `INSERT INTO morse_sessions (user_id, mod, hiz, puan, dogru, yanlis, sure)
     VALUES (?,?,?,?,?,?,?)
     ON CONFLICT(user_id, mod) DO UPDATE SET
       hiz = CASE WHEN excluded.puan > morse_sessions.puan THEN excluded.hiz ELSE morse_sessions.hiz END,
       puan = MAX(morse_sessions.puan, excluded.puan),
       dogru = CASE WHEN excluded.puan > morse_sessions.puan THEN excluded.dogru ELSE morse_sessions.dogru END,
       yanlis = CASE WHEN excluded.puan > morse_sessions.puan THEN excluded.yanlis ELSE morse_sessions.yanlis END,
       sure = CASE WHEN excluded.puan > morse_sessions.puan THEN excluded.sure ELSE morse_sessions.sure END,
       created_at = CASE WHEN excluded.puan > morse_sessions.puan THEN datetime('now') ELSE morse_sessions.created_at END`
  ).bind(userId, mod, hiz, puan, dogru, yanlis, sure).run();
  return c.json({ ok: true });
});

// --- Kullanilan kelimeler API ---
morse.get('/api/morse/used-words', async (c) => {
  const userId = c.get('userId');
  const rows = await c.env.DB.prepare('SELECT kelime FROM morse_used_words WHERE user_id = ? ORDER BY created_at DESC LIMIT 200').bind(userId).all();
  return c.json({ words: rows.results.map(r => r.kelime) });
});

morse.post('/api/morse/used-words', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const kelime = (body.kelime || '').toUpperCase().replace(/[^A-Z]/g, '');
  if (!kelime) return c.json({ ok: true });
  await c.env.DB.prepare('INSERT INTO morse_used_words (user_id, kelime) VALUES (?,?)').bind(userId, kelime).run();
  // 200'den fazlaysa eskileri sil
  await c.env.DB.prepare('DELETE FROM morse_used_words WHERE user_id = ? AND id NOT IN (SELECT id FROM morse_used_words WHERE user_id = ? ORDER BY created_at DESC LIMIT 200)').bind(userId, userId).run();
  return c.json({ ok: true });
});

// --- Mors Kelime Modu (LLM ile kelime uretme) ---
const WORD_POOL = [
  'EL','AT','AL','OL','GEL','GIT','YAP','BUL','KAL','SOR','VER','TUT',
  'SU','GOZ','YOL','GUN','BAS','SON','CAN','YIL','BIR','IKI','DIS',
  'ANA','ARA','ALT','UST','BEN','SEN','BIZ','SIZ','KIM','NE','DE',
  'KOY','DAG','DEN','TAR','TOP','KAR','TAS','YER','KUS','BAL','AY',
  'TELSIZ','RADYO','ANTEN','ROLE','MORS','SINYAL','FREKANS','BANT',
  'CAGRI','YAYIN','ALICI','VERICI','DALGA','KANAL','ROTOR','KABLO',
  'ARABA','KITAP','KALEM','MASA','OKUL','BABA','ANNE','KEDI','KOPEK',
  'YEMEK','EKMEK','SEKER','TATLI','ACIK','GIZLI','HIZLI','YAVAS',
  'DENIZ','BULUT','RUZGAR','YILDIZ','GUMUS','ALTIN','BAKIR','DEMIR',
  'ORMAN','NEHIR','SICAK','SOGUK','BEYAZ','SIYAH','YESIL','MAVI',
  'DUVAR','KAPAK','CANTA','AYAK','PARMAK','SAC','KULAK',
  'PILOT','MOTOR','TEKNE','GEMI','UCAK','TREN','YOLCU','BILET',
  'SABAH','AKSAM','GECE','HAFTA','SAAT','BAYRAK','SINIR',
  'ELMA','ARMUT','UZUM','CILEK','LIMON','KAVUN','KARPUZ',
  'ASLAN','KARTAL','BALIK','TAVUK','HOROZ','KOYUN','INEK','KURT',
  'KALE','SEHIR','KONAK','SARAY','KULE','KOPRU','YAPI','CATI',
  'DUMAN','ALEV','ATES','ISIK','GOLGE','BULUT','SISLI','BERRAK',
  'CESUR','GUZEL','BUYUK','KUCUK','UZUN','KISA','GENIS','DAR'
];

morse.post('/api/morse/words', async (c) => {
  try {
    const userId = c.get('userId');

    // DB'den son 200 kullanilan kelimeyi al
    const usedRows = await c.env.DB.prepare('SELECT kelime FROM morse_used_words WHERE user_id = ? ORDER BY created_at DESC LIMIT 200').bind(userId).all();
    const usedSet = {};
    for (const r of usedRows.results) usedSet[r.kelime] = true;

    // LLM'den kelime dene (5s timeout ile)
    try {
      console.log('[Kelime] LLM cagiriliyor...');
      const aiPromise = c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: 'Sadece JSON array yaz, baska hicbir sey yazma. Turkce ozel karakter kullanma (c,s,g,u,o,i yaz).' },
          { role: 'user', content: '2-6 harf uzunlugunda 25 rastgele basit Turkce kelime uret. Ornek: ["EL","SU","GEL","YOL","RADYO"]. Sadece JSON yaz:' }
        ],
        max_tokens: 200,
        temperature: 0.95,
      });
      const response = await Promise.race([
        aiPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI 5s timeout asildi')), 5000))
      ]);
      const raw = extractResponse(response).trim();
      console.log('[Kelime] LLM ham yanit:', raw.substring(0, 200));
      const arrMatch = raw.match(/\[[\s\S]*?\]/);
      if (!arrMatch) {
        console.warn('[Kelime] LLM yanitinda JSON array bulunamadi, fallback kullaniliyor');
      } else {
        const words = JSON.parse(arrMatch[0]);
        if (Array.isArray(words) && words.length >= 5) {
          const clean = words
            .map(w => String(w).toUpperCase().replace(/[^A-Z]/g, ''))
            .filter(w => w.length >= 2 && w.length <= 7 && !usedSet[w]);
          if (clean.length >= 5) {
            console.log('[Kelime] LLM basarili -', clean.length, 'kelime uretildi');
            return c.json({ ok: true, words: clean, source: 'llm' });
          }
          console.warn('[Kelime] LLM kelime uretti ama yeterli degil (' + clean.length + '/5), fallback kullaniliyor');
        } else {
          console.warn('[Kelime] LLM yaniti gecersiz array (length=' + (words?.length || 0) + '), fallback kullaniliyor');
        }
      }
    } catch (err) {
      console.error('[Kelime] LLM hatasi:', err.message || err);
    }

    // Fallback: havuzdan kullanilmamislari sec
    console.log('[Kelime] Fallback: WORD_POOL kullaniliyor');
    let available = WORD_POOL.filter(w => !usedSet[w]);
    if (available.length < 10) available = WORD_POOL.slice();
    const shuffled = [...available].sort(() => Math.random() - 0.5).slice(0, 20);
    return c.json({ ok: true, words: shuffled, source: 'fallback' });

  } catch (err) {
    console.error('[Kelime] KRITIK HATA (DB veya genel):', err.message || err);
    const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5).slice(0, 20);
    return c.json({ ok: true, words: shuffled, source: 'emergency-fallback' });
  }
});

// --- Mors Skor Tablosu (kullanici basina en yuksek skor) ---
morse.get('/api/morse/leaderboard', async (c) => {
  const mod = c.req.query('mod') || '';
  let query, params;
  if (mod) {
    query = `SELECT ms.*, u.display_name, u.username
      FROM morse_sessions ms
      LEFT JOIN users u ON ms.user_id = u.id
      WHERE ms.mod = ?
      ORDER BY ms.puan DESC LIMIT 20`;
    params = [mod];
  } else {
    // Tum modlar, kullanici basina en yuksek skoru al
    query = `SELECT ms.user_id, MAX(ms.puan) as puan, ms.hiz, ms.dogru, ms.yanlis, ms.mod, ms.sure, u.display_name, u.username
      FROM morse_sessions ms
      LEFT JOIN users u ON ms.user_id = u.id
      GROUP BY ms.user_id
      ORDER BY puan DESC LIMIT 20`;
    params = [];
  }
  const rows = await c.env.DB.prepare(query).bind(...params).all();
  return c.json({ leaderboard: rows.results });
});

export default morse;
