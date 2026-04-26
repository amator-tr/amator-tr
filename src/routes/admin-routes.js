import { Hono } from 'hono';
import { adminPage } from '../views/admin.js';
import { adminMiddleware, generateSalt, hashPassword, timingSafeEqualHex, CURRENT_ITERATIONS, LEGACY_ITERATIONS } from '../auth.js';
import { validatePassword, logActivity } from '../helpers.js';

// Tehlikeli admin işlemlerinde mevcut şifreyi tekrar iste — çalınmış oturumda
// data exfiltration / wipe riskini düşürür.
async function reauthAdmin(c) {
  let body;
  try { body = await c.req.json(); } catch { return { ok: false, status: 400, err: 'Gecersiz istek' }; }
  const password = body.password || '';
  if (!password) return { ok: false, status: 401, err: 'Mevcut sifre gerekli' };
  const user = await c.env.DB.prepare('SELECT password_hash, password_salt, password_iterations FROM users WHERE id = ?').bind(c.get('userId')).first();
  if (!user) return { ok: false, status: 401, err: 'Kullanici bulunamadi' };
  const iters = user.password_iterations || LEGACY_ITERATIONS;
  const hash = await hashPassword(password, user.password_salt, iters);
  if (!timingSafeEqualHex(hash, user.password_hash)) return { ok: false, status: 401, err: 'Sifre yanlis' };
  return { ok: true, body };
}

const admin = new Hono();

admin.get('/admin', adminMiddleware(), async (c) => {
  const user = await c.env.DB.prepare('SELECT id, username, display_name, role FROM users WHERE id = ?').bind(c.get('userId')).first();
  return c.html(adminPage({ user }));
});

// Admin API: Kullanici listesi
admin.get('/api/admin/users', adminMiddleware(), async (c) => {
  const users = await c.env.DB.prepare(`
    SELECT u.id, u.username, u.display_name, u.role, u.github_id, u.avatar_url, u.last_login, u.created_at,
      (SELECT COUNT(*) FROM operatorler WHERE user_id = u.id) as operator_count
    FROM users u ORDER BY u.id ASC
  `).all();
  return c.json({ users: users.results });
});

// Admin API: Rol degistir
admin.post('/api/admin/users/:id/role', adminMiddleware(), async (c) => {
  const targetId = parseInt(c.req.param('id'));
  if (isNaN(targetId)) return c.json({ error: 'Gecersiz ID' }, 400);
  const body = await c.req.json();
  const newRole = body.role;
  if (!['admin', 'user'].includes(newRole)) return c.json({ error: 'Gecersiz rol' }, 400);
  if (newRole === 'user') {
    const adminCount = await c.env.DB.prepare("SELECT COUNT(*) as cnt FROM users WHERE role = 'admin'").first();
    const target = await c.env.DB.prepare('SELECT role FROM users WHERE id = ?').bind(targetId).first();
    if (target?.role === 'admin' && adminCount.cnt <= 1) {
      return c.json({ error: 'Son admin dusurulemez. Once baska bir admin atanmali.' }, 400);
    }
  }
  await c.env.DB.prepare('UPDATE users SET role = ? WHERE id = ?').bind(newRole, targetId).run();
  return c.json({ ok: true });
});

// Admin API: Kullanici sil
admin.delete('/api/admin/users/:id', adminMiddleware(), async (c) => {
  const targetId = parseInt(c.req.param('id'));
  if (isNaN(targetId)) return c.json({ error: 'Gecersiz ID' }, 400);
  if (targetId === c.get('userId')) return c.json({ error: 'Kendinizi silemezsiniz' }, 400);
  const db = c.env.DB;
  await db.batch([
    db.prepare('DELETE FROM operatorler WHERE user_id = ?').bind(targetId),
    db.prepare('DELETE FROM activity_log WHERE user_id = ?').bind(targetId),
    db.prepare('DELETE FROM users WHERE id = ?').bind(targetId),
  ]);
  return c.json({ ok: true });
});

// Admin API: Ayarlar
admin.get('/api/admin/settings', adminMiddleware(), async (c) => {
  const settings = await c.env.DB.prepare('SELECT * FROM settings').all();
  const obj = {};
  for (const s of settings.results) obj[s.key] = s.value;
  return c.json({ settings: obj });
});

admin.post('/api/admin/settings', adminMiddleware(), async (c) => {
  const body = await c.req.json();
  const stmts = [];
  for (const [key, value] of Object.entries(body)) {
    stmts.push(c.env.DB.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').bind(key, String(value)));
  }
  if (stmts.length) await c.env.DB.batch(stmts);
  return c.json({ ok: true });
});

// Admin API: Giris loglari
admin.get('/api/admin/login-log', adminMiddleware(), async (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = 50;
  const offset = (page - 1) * limit;
  const logs = await c.env.DB.prepare('SELECT * FROM login_log ORDER BY id DESC LIMIT ? OFFSET ?').bind(limit, offset).all();
  const total = await c.env.DB.prepare('SELECT COUNT(*) as n FROM login_log').first();
  return c.json({ logs: logs.results, total: total.n, page, pages: Math.ceil(total.n / limit) });
});

// Admin API: Tum operatorler
admin.get('/api/admin/operators', adminMiddleware(), async (c) => {
  const ops = await c.env.DB.prepare(`
    SELECT o.*, u.username FROM operatorler o
    LEFT JOIN users u ON o.user_id = u.id
    ORDER BY o.id ASC
  `).all();
  return c.json({ operators: ops.results });
});

// Admin API: Kullanici sifre sifirla
admin.post('/api/admin/users/:id/reset-password', adminMiddleware(), async (c) => {
  const targetId = parseInt(c.req.param('id'));
  if (isNaN(targetId)) return c.json({ error: 'Gecersiz ID' }, 400);
  const body = await c.req.json();
  const newPw = body.password || '';
  if (!validatePassword(newPw)) return c.json({ error: 'Sifre en az 8 karakter ve en az 1 rakam/ozel karakter icermeli' }, 400);
  const salt = generateSalt();
  const hash = await hashPassword(newPw, salt);
  await c.env.DB.prepare('UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ? WHERE id = ?').bind(hash, salt, CURRENT_ITERATIONS, targetId).run();
  return c.json({ ok: true });
});

// Admin API: Aktivite loglari
admin.get('/api/admin/activity-log', adminMiddleware(), async (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = 50;
  const offset = (page - 1) * limit;
  const logs = await c.env.DB.prepare(`
    SELECT a.*, u.username FROM activity_log a
    LEFT JOIN users u ON a.user_id = u.id
    ORDER BY a.created_at DESC LIMIT ? OFFSET ?
  `).bind(limit, offset).all();
  const total = await c.env.DB.prepare('SELECT COUNT(*) as n FROM activity_log').first();
  return c.json({ logs: logs.results, total: total.n, page, pages: Math.ceil(total.n / limit) });
});

// Admin API: Duyurular CRUD
admin.get('/api/admin/announcements', adminMiddleware(), async (c) => {
  const anns = await c.env.DB.prepare('SELECT a.*, u.username FROM announcements a LEFT JOIN users u ON a.created_by = u.id ORDER BY a.created_at DESC').all();
  return c.json({ announcements: anns.results });
});

admin.post('/api/admin/announcements', adminMiddleware(), async (c) => {
  const body = await c.req.json();
  const title = (body.title || '').trim();
  const content = (body.content || '').trim();
  const type = ['info', 'warning', 'success'].includes(body.type) ? body.type : 'info';
  if (!title || !content) return c.json({ error: 'Baslik ve icerik gerekli' }, 400);
  await c.env.DB.prepare('INSERT INTO announcements (title, content, type, created_by) VALUES (?,?,?,?)')
    .bind(title, content, type, c.get('userId')).run();
  return c.json({ ok: true });
});

admin.delete('/api/admin/announcements/:id', adminMiddleware(), async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Gecersiz ID' }, 400);
  await c.env.DB.prepare('DELETE FROM announcements WHERE id = ?').bind(id).run();
  return c.json({ ok: true });
});

admin.post('/api/admin/announcements/:id/toggle', adminMiddleware(), async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Gecersiz ID' }, 400);
  await c.env.DB.prepare('UPDATE announcements SET active = CASE WHEN active = 1 THEN 0 ELSE 1 END WHERE id = ?').bind(id).run();
  return c.json({ ok: true });
});

// --- Admin: Backup ---
// POST + re-auth: çalınmış admin oturumu tüm parola hash'lerini one-shot
// indirememesin diye GET yerine mevcut şifreyle korumalı POST.
admin.post('/api/admin/backup', adminMiddleware(), async (c) => {
  const auth = await reauthAdmin(c);
  if (!auth.ok) return c.json({ error: auth.err }, auth.status);

  const db = c.env.DB;
  const [users, operatorler, settings, announcements, loginLog, activityLog] = await Promise.all([
    db.prepare('SELECT id, username, password_hash, password_salt, password_iterations, display_name, role, github_id, avatar_url, last_login, created_at FROM users ORDER BY id').all(),
    db.prepare('SELECT id, user_id, operator, cagri_isareti, qth, hakkinda, created_at, updated_at FROM operatorler ORDER BY id').all(),
    db.prepare('SELECT key, value FROM settings').all(),
    db.prepare('SELECT id, title, content, type, active, created_by, created_at FROM announcements ORDER BY id').all(),
    db.prepare('SELECT id, username, ip, user_agent, success, created_at FROM login_log ORDER BY id DESC LIMIT 1000').all(),
    db.prepare('SELECT id, user_id, action, detail, created_at FROM activity_log ORDER BY id DESC LIMIT 5000').all(),
  ]);
  await logActivity(db, c.get('userId'), 'backup', `Backup indirildi (${users.results.length} kullanici, ${operatorler.results.length} operator)`);

  return c.json({
    version: 1,
    exported_at: new Date().toISOString(),
    exported_by: c.get('userId'),
    users: users.results,
    operatorler: operatorler.results,
    settings: settings.results,
    announcements: announcements.results,
    login_log: loginLog.results,
    activity_log: activityLog.results,
  });
});

// --- Admin: Restore ---
admin.post('/api/admin/restore', adminMiddleware(), async (c) => {
  const auth = await reauthAdmin(c);
  if (!auth.ok) return c.json({ error: auth.err }, auth.status);

  const db = c.env.DB;
  const data = auth.body;

  if (!data.version || !Array.isArray(data.users) || !Array.isArray(data.operatorler)) {
    return c.json({ error: 'Gecersiz yedek formati' }, 400);
  }

  const currentUserId = c.get('userId');

  // Lock-out savunması: backup en az bir admin içermeli ve mevcut admin
  // backup'ta olmalı — yoksa restore sonrası siteye erişim kaybolur.
  const adminsInBackup = data.users.filter((u) => u.role === 'admin').length;
  if (adminsInBackup === 0) {
    return c.json({ error: 'Yedek hiç admin içermiyor — restore reddedildi (lock-out riski)' }, 400);
  }
  const currentAdminInBackup = data.users.some((u) => u.id === currentUserId && u.role === 'admin');
  if (!currentAdminInBackup) {
    return c.json({ error: 'Aktif admin yedekte yok — restore reddedildi (lock-out riski). Önce kendi hesabını yedeğe ekle.' }, 400);
  }

  try {
    await db.batch([
      db.prepare('DELETE FROM activity_log'),
      db.prepare('DELETE FROM login_log'),
      db.prepare('DELETE FROM announcements'),
      db.prepare('DELETE FROM operatorler'),
      db.prepare('DELETE FROM settings'),
      db.prepare('DELETE FROM users'),
    ]);

    for (const u of data.users) {
      await db.prepare('INSERT INTO users (id, username, password_hash, password_salt, password_iterations, display_name, role, github_id, avatar_url, last_login, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)')
        .bind(u.id, u.username, u.password_hash, u.password_salt, u.password_iterations || null, u.display_name || '', u.role || 'user', u.github_id || null, u.avatar_url || '', u.last_login || null, u.created_at || null).run();
    }

    const opStmts = data.operatorler.map(o =>
      db.prepare('INSERT INTO operatorler (id, user_id, operator, cagri_isareti, qth, hakkinda, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)')
        .bind(o.id, o.user_id, o.operator || '', o.cagri_isareti, o.qth || '', o.hakkinda || '', o.created_at || null, o.updated_at || null)
    );
    for (let i = 0; i < opStmts.length; i += 80) {
      await db.batch(opStmts.slice(i, i + 80));
    }

    if (data.settings) {
      for (const s of data.settings) {
        await db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?,?)').bind(s.key, s.value).run();
      }
    }

    if (data.announcements) {
      for (const a of data.announcements) {
        await db.prepare('INSERT INTO announcements (id, title, content, type, active, created_by, created_at) VALUES (?,?,?,?,?,?,?)')
          .bind(a.id, a.title, a.content, a.type || 'info', a.active ?? 1, a.created_by, a.created_at || null).run();
      }
    }

    if (data.login_log) {
      const logStmts = data.login_log.map(l =>
        db.prepare('INSERT INTO login_log (id, username, ip, user_agent, success, created_at) VALUES (?,?,?,?,?,?)')
          .bind(l.id, l.username || '', l.ip || '', l.user_agent || '', l.success || 0, l.created_at || null)
      );
      for (let i = 0; i < logStmts.length; i += 80) {
        await db.batch(logStmts.slice(i, i + 80));
      }
    }

    if (data.activity_log) {
      const actStmts = data.activity_log.map(a =>
        db.prepare('INSERT INTO activity_log (id, user_id, action, detail, created_at) VALUES (?,?,?,?,?)')
          .bind(a.id, a.user_id, a.action, a.detail || '', a.created_at || null)
      );
      for (let i = 0; i < actStmts.length; i += 80) {
        await db.batch(actStmts.slice(i, i + 80));
      }
    }

    await logActivity(db, currentUserId, 'restore', 'Yedekten geri yukleme yapildi');
    return c.json({ ok: true });
  } catch (err) {
    console.error('Restore error:', err);
    return c.json({ error: 'Geri yukleme sirasinda hata olustu' }, 500);
  }
});

export default admin;
