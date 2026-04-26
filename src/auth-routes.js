import { Hono } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { loginPage } from '../views/login.js';
import { registerPage } from '../views/register.js';
import { profilePage } from '../views/profile.js';
import {
  generateSalt, hashPassword, createSessionToken, verifySession, getClientIP,
  timingSafeEqualHex, CURRENT_ITERATIONS, LEGACY_ITERATIONS
} from '../auth.js';
import { validatePassword, validateUsername, logActivity } from '../helpers.js';
import { checkTurnstile } from '../turnstile.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../email.js';

const auth = new Hono();

// --- Email verification helpers ---
function genToken() {
  return [...crypto.getRandomValues(new Uint8Array(32))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function genCode() {
  // 8-haneli numerik kod (10000000-99999999) — brute-force ekonomisini 100x bozar
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return String(10000000 + (buf[0] % 90000000));
}

function expiresIn(hours) {
  const d = new Date(Date.now() + hours * 3600 * 1000);
  return d.toISOString();
}

function isValidEmail(s) {
  if (!s || typeof s !== 'string') return false;
  if (s.length > 120) return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s);
}

function statusPage({ title, heading, body, kind = 'info' }) {
  const color = kind === 'success' ? '#2dd4bf' : kind === 'error' ? '#ef4444' : '#8b5cf6';
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>${title} — amator.tr</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>(function(){var t=localStorage.getItem('theme');if(t==='cengiz'){t='vanta-black';localStorage.setItem('theme',t)}if(!t||t==='auto'){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)})()</script>
<style>*{box-sizing:border-box;margin:0;padding:0}body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#06080f;color:#eaf0f6}html[data-theme="light"] body{background:#f0f2f5;color:#0f172a}.c{max-width:480px;padding:32px 28px;background:rgba(30,41,59,.8);border:1px solid rgba(255,255,255,.08);border-radius:16px;text-align:center}html[data-theme="light"] .c{background:#fff;border-color:rgba(0,0,0,.08)}html[data-theme="vanta-black"] body{background:#000;color:#c8c8c8}html[data-theme="vanta-black"] .c{background:rgba(8,8,8,.9);border-color:rgba(255,255,255,.04)}html[data-theme="vanta-black"] .b{color:#808080}.ico{font-size:48px;margin-bottom:16px}.h{font-size:22px;font-weight:700;color:${color};margin-bottom:12px}.b{font-size:15px;line-height:1.6;color:#94a3b8;margin-bottom:24px}.btn{display:inline-block;padding:12px 24px;background:#8b5cf6;color:#fff;text-decoration:none;border-radius:8px;font-weight:600}</style>
</head><body><div class="c"><div class="h">${heading}</div><div class="b">${body}</div><a href="/login" class="btn">Giriş sayfası</a></div></body></html>`;
}

// --- Setup (ilk kullanici olusturma) ---
auth.get('/setup', async (c) => {
  const count = await c.env.DB.prepare('SELECT COUNT(*) as n FROM users').first();
  if (count.n > 0) return c.redirect('/login');
  return c.html(`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kurulum</title>
<script>(function(){var t=localStorage.getItem('theme');if(t==='cengiz'){t='vanta-black';localStorage.setItem('theme',t)}if(!t||t==='auto'){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)})()</script>
<style>*{margin:0;padding:0;box-sizing:border-box}:root,html[data-theme="dark"]{--bg:#06080f;--t1:#eaf0f6;--t2:#94a3b8;--t3:#475569;--p:#8b5cf6;--p2:#a78bfa;--b1:rgba(255,255,255,.08);--card-bg:rgba(30,41,59,0.8);--input-bg:rgba(15,23,42,0.6);--grad1:#0f172a;--grad2:#1e293b}html[data-theme="light"]{--bg:#f0f2f5;--t1:#0f172a;--t2:#475569;--t3:#94a3b8;--p:#7c3aed;--p2:#6d28d9;--b1:rgba(0,0,0,.08);--card-bg:rgba(255,255,255,0.9);--input-bg:rgba(241,245,249,0.8);--grad1:#e2e8f0;--grad2:#f1f5f9}html[data-theme="vanta-black"]{--bg:#000;--t1:#c8c8c8;--t2:#808080;--t3:#505050;--p:#8b5cf6;--p2:#a78bfa;--b1:rgba(255,255,255,.04);--card-bg:rgba(8,8,8,0.9);--input-bg:rgba(0,0,0,0.6);--grad1:#000;--grad2:#080808}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--grad1),var(--grad2),var(--grad1));font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:var(--t1)}.c{width:100%;max-width:420px;padding:20px}.card{background:var(--card-bg);backdrop-filter:blur(20px);border:1px solid var(--b1);border-radius:16px;padding:48px 40px;box-shadow:0 25px 50px rgba(0,0,0,.2)}.t{text-align:center;margin-bottom:32px}.t h1{font-size:22px;font-weight:700}.t p{font-size:14px;color:var(--t2);margin-top:6px}.fg{margin-bottom:20px}.fg label{display:block;font-size:13px;font-weight:600;color:var(--t2);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}.fg input{width:100%;padding:14px 16px;background:var(--input-bg);border:1px solid var(--b1);border-radius:10px;color:var(--t1);font-size:16px;outline:none}.fg input:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(139,92,246,.15)}.btn{width:100%;padding:14px;background:linear-gradient(135deg,var(--p),var(--p2));border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:600;cursor:pointer}.btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(139,92,246,.35)}</style></head>
<body><div class="c"><div class="card"><div class="t"><h1>Ilk Kurulum</h1><p>Admin hesabinizi olusturun</p></div>
<form method="POST" action="/setup">
<div class="fg"><label>Kullanici Adi</label><input type="text" name="username" value="kaandikec" required></div>
<div class="fg"><label>Sifre</label><input type="password" name="password" required minlength="8"><div style="font-size:10px;color:var(--t3);margin-top:4px">En az 8 karakter, 1 rakam veya ozel karakter</div></div>
<button type="submit" class="btn">Admin Hesabi Olustur</button></form></div></div></body></html>`);
});

auth.post('/setup', async (c) => {
  const db = c.env.DB;
  const count = await db.prepare('SELECT COUNT(*) as n FROM users').first();
  if (count.n > 0) return c.redirect('/login');

  const body = await c.req.parseBody();
  const username = (body.username || '').trim().toLowerCase();
  const password = body.password || '';

  if (!validateUsername(username)) return c.text('Gecersiz kullanici adi', 400);
  if (!validatePassword(password)) return c.text('Sifre en az 8 karakter ve en az 1 rakam/ozel karakter icermeli', 400);

  const salt = generateSalt();
  const hash = await hashPassword(password, salt);

  await db.prepare('INSERT INTO users (username, password_hash, password_salt, password_iterations, display_name, role) VALUES (?,?,?,?,?,?)')
    .bind(username, hash, salt, CURRENT_ITERATIONS, username, 'admin').run();

  return c.redirect('/login');
});

// --- Login ---
auth.get('/login', async (c) => {
  const token = getCookie(c, 'session');
  const session = await verifySession(token, c.env.SESSION_SECRET);
  if (session) return c.redirect('/');
  const sk = c.env.TURNSTILE_SITE_KEY || '';
  return c.html(loginPage('', '', sk));
});

auth.post('/login', async (c) => {
  const db = c.env.DB;
  const body = await c.req.parseBody();
  const username = (body.username || '').trim().toLowerCase();
  const password = body.password || '';
  const ip = getClientIP(c);
  const ua = c.req.header('user-agent') || '';
  const sk = c.env.TURNSTILE_SITE_KEY || '';

  if (!username || !password) return c.html(loginPage('Kullanici adi ve sifre gerekli.', '', sk));

  // Turnstile (CAPTCHA)
  const ok = await checkTurnstile(c, body);
  if (!ok) return c.html(loginPage('Güvenlik doğrulaması başarısız. Sayfayı yenile, "Ben robot değilim" kutusunu işaretle.', '', sk));

  const recentFails = await db.prepare(
    "SELECT COUNT(*) as cnt FROM login_log WHERE ip = ? AND success = 0 AND created_at > datetime('now', '-15 minutes')"
  ).bind(ip).first();
  if (recentFails && recentFails.cnt >= 5) {
    return c.html(loginPage('Cok fazla basarisiz deneme. 15 dakika sonra tekrar deneyin.', '', sk));
  }

  const user = await db.prepare('SELECT * FROM users WHERE username = ?').bind(username).first();

  if (!user) {
    await db.prepare('INSERT INTO login_log (username, ip, user_agent, success) VALUES (?,?,?,0)').bind(username, ip, ua).run();
    return c.html(loginPage('Kullanici adi veya sifre hatali.', '', sk));
  }

  const userIters = user.password_iterations || LEGACY_ITERATIONS;
  const hash = await hashPassword(password, user.password_salt, userIters);
  if (!timingSafeEqualHex(hash, user.password_hash)) {
    await db.prepare('INSERT INTO login_log (username, ip, user_agent, success) VALUES (?,?,?,0)').bind(username, ip, ua).run();
    return c.html(loginPage('Kullanici adi veya sifre hatali.', '', sk));
  }

  // Email verification gate (yeni kayitlar icin; eski hesaplarda email_verified=1 zaten)
  if (user.email && user.email_verified === 0) {
    return c.html(loginPage('Email adresin henüz doğrulanmamış. Gelen kutunu kontrol et veya <a href="/verify-resend" style="color:#a78bfa;">yeni link iste</a>.', '', sk));
  }

  // Lazy rehash: iterasyon hedefin altındaysa parolayı yeni iter ile yeniden hashla.
  // Plaintext parola sadece bu istek scope'unda var; rehash arka plana atılır.
  if (userIters < CURRENT_ITERATIONS) {
    (async () => {
      try {
        const newSalt = generateSalt();
        const newHash = await hashPassword(password, newSalt, CURRENT_ITERATIONS);
        await db.prepare('UPDATE users SET password_hash=?, password_salt=?, password_iterations=? WHERE id=?')
          .bind(newHash, newSalt, CURRENT_ITERATIONS, user.id).run();
      } catch (e) { console.error('lazy rehash error:', e); }
    })();
  }

  await db.batch([
    db.prepare('INSERT INTO login_log (username, ip, user_agent, success) VALUES (?,?,?,1)').bind(username, ip, ua),
    db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").bind(user.id),
  ]);

  const tok = await createSessionToken(c.env.SESSION_SECRET, user.id, user.role);
  setCookie(c, 'session', tok, { httpOnly: true, secure: true, sameSite: 'Strict', path: '/', maxAge: 7 * 86400 });
  return c.redirect('/');
});

// --- Register ---
auth.get('/register', async (c) => {
  const db = c.env.DB;
  const setting = await db.prepare("SELECT value FROM settings WHERE key = 'registration_open'").first();
  const open = setting?.value === 'true';
  const sk = c.env.TURNSTILE_SITE_KEY || '';
  if (!open) return c.html(registerPage('', true, sk));
  return c.html(registerPage('', false, sk));
});

auth.post('/register', async (c) => {
  const db = c.env.DB;
  const setting = await db.prepare("SELECT value FROM settings WHERE key = 'registration_open'").first();
  const sk = c.env.TURNSTILE_SITE_KEY || '';
  if (setting?.value !== 'true') return c.html(registerPage('', true, sk));

  const body = await c.req.parseBody();
  const username = (body.username || '').trim().toLowerCase();
  const email = (body.email || '').trim().toLowerCase();
  const display_name = (body.display_name || '').trim();
  const password = body.password || '';
  const password2 = body.password2 || '';
  const formData = { username, email, display_name };

  if (!validateUsername(username))
    return c.html(registerPage('Kullanici adi 3-20 karakter, harf/rakam/alt cizgi olmali.', false, sk, formData));
  if (!isValidEmail(email))
    return c.html(registerPage('Geçerli bir email adresi gir.', false, sk, formData));
  if (!validatePassword(password))
    return c.html(registerPage('Sifre en az 8 karakter ve en az 1 rakam/ozel karakter icermeli.', false, sk, formData));
  if (password !== password2)
    return c.html(registerPage('Sifreler eslesmiyor.', false, sk, formData));

  // Turnstile
  const captchaOk = await checkTurnstile(c, body);
  if (!captchaOk)
    return c.html(registerPage('Güvenlik doğrulaması başarısız. Sayfayı yenile, "Ben robot değilim" kutusunu işaretle.', false, sk, formData));

  const existingUser = await db.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
  if (existingUser) return c.html(registerPage('Bu kullanici adi zaten alinmis.', false, sk, formData));
  const existingEmail = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existingEmail) return c.html(registerPage('Bu email ile başka bir hesap var.', false, sk, formData));

  const salt = generateSalt();
  const hash = await hashPassword(password, salt);
  const verifyToken = genToken();
  const verifyCode = genCode();
  const expires = expiresIn(24);

  await db.prepare(
    'INSERT INTO users (username, password_hash, password_salt, password_iterations, display_name, role, email, email_verified, verification_token, verification_code, token_expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  ).bind(username, hash, salt, CURRENT_ITERATIONS, display_name || username, 'user', email, 0, verifyToken, verifyCode, expires).run();

  sendVerificationEmail(c.env, { to: email, displayName: display_name || username, token: verifyToken, code: verifyCode }).catch(e => console.error('email error:', e));

  return c.html(statusPage({
    title: 'Kayıt başarılı',
    heading: '✉️ Doğrulama maili gönderildi',
    body: `<strong>${email}</strong> adresine doğrulama linki + 8-haneli kod gönderildi.<br>Linke tıkla VEYA <a href="/verify-resend" style="color:#a78bfa;">kodu manuel gir</a>.<br><br>Spam/Junk klasörünü de kontrol et — iCloud bazen filtreliyor.`,
    kind: 'success',
  }));
});

// --- Email verification (link) ---
auth.get('/verify/:token', async (c) => {
  const db = c.env.DB;
  const token = c.req.param('token') || '';
  if (!/^[a-f0-9]{32,128}$/.test(token)) {
    return c.html(statusPage({ title: 'Geçersiz', heading: '❌ Geçersiz link', body: 'Bu link geçersiz veya bozuk.', kind: 'error' }));
  }
  const user = await db.prepare('SELECT id, username, email, email_verified, token_expires_at FROM users WHERE verification_token = ?').bind(token).first();
  if (!user) {
    return c.html(statusPage({ title: 'Geçersiz', heading: '❌ Link bulunamadı', body: 'Bu link geçersiz veya zaten kullanılmış.', kind: 'error' }));
  }
  if (user.email_verified === 1) {
    return c.html(statusPage({ title: 'Doğrulandı', heading: '✓ Zaten doğrulanmış', body: 'Email adresin daha önce doğrulanmış. Giriş yapabilirsin.', kind: 'success' }));
  }
  if (user.token_expires_at && new Date(user.token_expires_at) < new Date()) {
    return c.html(statusPage({ title: 'Süresi doldu', heading: '⏰ Link süresi dolmuş', body: 'Bu link 24 saatten eski. <a href="/verify-resend" style="color:#a78bfa;">Yeni link iste</a>.', kind: 'error' }));
  }
  await db.prepare('UPDATE users SET email_verified = 1, verification_token = NULL, verification_code = NULL, token_expires_at = NULL WHERE id = ?').bind(user.id).run();
  return c.html(statusPage({
    title: 'Doğrulandı',
    heading: '✓ Email doğrulandı',
    body: 'Tebrikler! Email adresin doğrulandı, artık giriş yapabilirsin.',
    kind: 'success',
  }));
});

// --- Verify-resend / kod ile doğrulama ---
function verifyResendForm(env, opts = {}) {
  const sk = env.TURNSTILE_SITE_KEY || '';
  const tsScript = sk ? '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>' : '';
  const tsWidget = sk ? `<div class="cf-turnstile" data-sitekey="${sk}" data-theme="auto" data-size="flexible" style="margin:10px 0;"></div>` : '';
  const errorBox = opts.error ? `<div style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#ef4444;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:16px;">${opts.error}</div>` : '';
  const okBox = opts.info ? `<div style="background:rgba(45,212,191,.15);border:1px solid rgba(45,212,191,.3);color:#2dd4bf;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:16px;">${opts.info}</div>` : '';
  const emailVal = opts.email ? `value="${opts.email.replace(/"/g, '&quot;')}"` : '';
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Email doğrulama — amator.tr</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>(function(){var t=localStorage.getItem('theme');if(t==='cengiz'){t='vanta-black';localStorage.setItem('theme',t)}if(!t||t==='auto'){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)})()</script>
${tsScript}
<style>*{box-sizing:border-box;margin:0;padding:0}body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#06080f;color:#eaf0f6;padding:20px}html[data-theme="light"] body{background:#f0f2f5;color:#0f172a}.c{max-width:480px;width:100%;padding:36px 32px;background:rgba(30,41,59,.85);border:1px solid rgba(255,255,255,.08);border-radius:16px}html[data-theme="light"] .c{background:#fff;border-color:rgba(0,0,0,.08)}h1{font-size:22px;margin-bottom:6px;font-weight:700}.sub{font-size:14px;color:#94a3b8;margin-bottom:24px}.tabs{display:flex;gap:4px;background:rgba(15,23,42,.5);padding:4px;border-radius:10px;margin-bottom:24px}html[data-theme="light"] .tabs{background:#f1f5f9}.tab{flex:1;padding:10px 12px;border:none;background:transparent;color:#94a3b8;font-weight:600;font-size:13px;border-radius:7px;cursor:pointer;transition:.15s;font-family:inherit}.tab.active{background:#8b5cf6;color:#fff}.pane{display:none}.pane.active{display:block}label{display:block;font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.04em}input{width:100%;padding:13px 14px;background:rgba(15,23,42,.6);border:1px solid rgba(255,255,255,.08);border-radius:8px;color:#eaf0f6;font-size:15px;margin-bottom:14px;font-family:inherit}html[data-theme="light"] input{background:#f1f5f9;border-color:rgba(0,0,0,.08);color:#0f172a}html[data-theme="vanta-black"] body{background:#000;color:#c8c8c8}html[data-theme="vanta-black"] .c{background:rgba(8,8,8,.9);border-color:rgba(255,255,255,.04)}html[data-theme="vanta-black"] .tabs{background:rgba(0,0,0,.5)}html[data-theme="vanta-black"] input{background:rgba(0,0,0,.6);border-color:rgba(255,255,255,.04);color:#c8c8c8}html[data-theme="vanta-black"] .sub,html[data-theme="vanta-black"] label{color:#808080}input.code{font-family:'SF Mono',Menlo,Consolas,monospace;font-size:24px;letter-spacing:0.4em;text-align:center;font-weight:700}.btn{width:100%;padding:13px;background:#8b5cf6;color:#fff;border:none;border-radius:8px;font-weight:600;font-size:15px;cursor:pointer;font-family:inherit}.btn:hover{opacity:.92}.l{display:block;text-align:center;margin-top:16px;color:#a78bfa;text-decoration:none;font-size:13px}</style>
</head><body><div class="c">
<h1>Email doğrulama</h1>
<div class="sub">Maildeki linke tıkladıysan tamam. Tıklamadıysan aşağıdan kodu gir veya yeni link iste.</div>
${errorBox}${okBox}
<div class="tabs">
  <button type="button" class="tab ${opts.tab !== 'resend' ? 'active' : ''}" onclick="document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.pane').forEach(p=>p.classList.remove('active'));this.classList.add('active');document.getElementById('p-code').classList.add('active')">🔢 Kod ile doğrula</button>
  <button type="button" class="tab ${opts.tab === 'resend' ? 'active' : ''}" onclick="document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.pane').forEach(p=>p.classList.remove('active'));this.classList.add('active');document.getElementById('p-resend').classList.add('active')">🔄 Yeni mail iste</button>
</div>
<div id="p-code" class="pane ${opts.tab !== 'resend' ? 'active' : ''}">
  <form method="POST" action="/verify-code" autocomplete="off">
    <label>Email</label>
    <input type="email" name="email" required placeholder="kayıt olduğun email" ${emailVal} autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false">
    <label>8-haneli kod</label>
    <input type="text" name="code" required placeholder="12345678" class="code" inputmode="numeric" pattern="[0-9]{8}" maxlength="8" autocomplete="one-time-code" autofocus>
    ${tsWidget}
    <button class="btn" type="submit">Doğrula</button>
  </form>
</div>
<div id="p-resend" class="pane ${opts.tab === 'resend' ? 'active' : ''}">
  <form method="POST" action="/verify-resend" autocomplete="off">
    <label>Email</label>
    <input type="email" name="email" required placeholder="kayıt olduğun email" ${emailVal} autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false">
    ${tsWidget}
    <button class="btn" type="submit">Yeni doğrulama maili gönder</button>
  </form>
</div>
<a href="/login" class="l">← Giriş sayfasına dön</a>
</div></body></html>`;
}

auth.get('/verify-resend', async (c) => {
  return c.html(verifyResendForm(c.env));
});

auth.post('/verify-resend', async (c) => {
  const db = c.env.DB;
  const body = await c.req.parseBody();
  const email = (body.email || '').trim().toLowerCase();
  const ip = getClientIP(c);
  const ua = c.req.header('user-agent') || '';

  const captchaOk = await checkTurnstile(c, body);
  if (!captchaOk) {
    return c.html(verifyResendForm(c.env, { tab: 'resend', email, error: 'Güvenlik doğrulaması başarısız. Sayfayı yenile, captcha\'yı çöz.' }));
  }

  const genericResp = statusPage({
    title: 'Gönderildi',
    heading: '✉️ Mail gönderildi',
    body: 'Eğer bu email ile bir hesabın varsa, doğrulama linki + kod gönderildi. Spam/Junk klasörünü de kontrol et.',
    kind: 'success',
  });

  if (!isValidEmail(email)) return c.html(genericResp);

  // Per-IP (5/15dk) ve per-email (3/saat) rate limit — Resend kotası DoS savunması
  const recentByIp = await db.prepare(
    "SELECT COUNT(*) as cnt FROM login_log WHERE ip = ? AND username LIKE '__verify_resend__%' AND created_at > datetime('now', '-15 minutes')"
  ).bind(ip).first();
  if (recentByIp && recentByIp.cnt >= 5) return c.html(genericResp);

  const emailKey = `__verify_resend__:${email}`;
  const recentByEmail = await db.prepare(
    "SELECT COUNT(*) as cnt FROM login_log WHERE username = ? AND created_at > datetime('now', '-1 hour')"
  ).bind(emailKey).first();
  if (recentByEmail && recentByEmail.cnt >= 3) return c.html(genericResp);

  await db.prepare("INSERT INTO login_log (username, ip, user_agent, success) VALUES (?, ?, ?, 1)")
    .bind(emailKey, ip, ua).run();

  const user = await db.prepare('SELECT id, display_name, username, email_verified FROM users WHERE email = ?').bind(email).first();
  if (!user || user.email_verified === 1) return c.html(genericResp);

  const newToken = genToken();
  const newCode = genCode();
  const expires = expiresIn(24);
  await db.prepare('UPDATE users SET verification_token = ?, verification_code = ?, token_expires_at = ? WHERE id = ?')
    .bind(newToken, newCode, expires, user.id).run();

  sendVerificationEmail(c.env, { to: email, displayName: user.display_name || user.username, token: newToken, code: newCode }).catch(e => console.error('email error:', e));

  return c.html(genericResp);
});

// --- Code-based verification ---
auth.post('/verify-code', async (c) => {
  const db = c.env.DB;
  const body = await c.req.parseBody();
  const email = (body.email || '').trim().toLowerCase();
  const code = (body.code || '').trim();

  const captchaOk = await checkTurnstile(c, body);
  if (!captchaOk) {
    return c.html(verifyResendForm(c.env, { email, error: 'Güvenlik doğrulaması başarısız. Sayfayı yenile, captcha\'yı çöz.' }));
  }

  if (!isValidEmail(email)) {
    return c.html(verifyResendForm(c.env, { email, error: 'Geçersiz email adresi.' }));
  }
  if (!/^[0-9]{8}$/.test(code)) {
    return c.html(verifyResendForm(c.env, { email, error: 'Kod 8 haneli sayı olmalı.' }));
  }

  const ip = getClientIP(c);
  const ua = c.req.header('user-agent') || '';
  const emailKey = `__verify_code__:${email}`;

  // Per-email rate limit (5 fail/15dk) — botnet'le bile tek hesap kırılamasın
  const recentByEmail = await db.prepare(
    "SELECT COUNT(*) as cnt FROM login_log WHERE username = ? AND success = 0 AND created_at > datetime('now', '-15 minutes')"
  ).bind(emailKey).first();
  if (recentByEmail && recentByEmail.cnt >= 5) {
    return c.html(verifyResendForm(c.env, { email, tab: 'resend', error: 'Bu email için çok fazla yanlış kod denemesi. Yeni kod iste.' }));
  }

  // Per-IP rate limit (cross-email tarama savunması)
  const recentByIp = await db.prepare(
    "SELECT COUNT(*) as cnt FROM login_log WHERE ip = ? AND username LIKE '__verify_code__%' AND success = 0 AND created_at > datetime('now', '-15 minutes')"
  ).bind(ip).first();
  if (recentByIp && recentByIp.cnt >= 10) {
    return c.html(verifyResendForm(c.env, { email, error: 'Çok fazla yanlış kod denemesi. 15 dakika sonra tekrar dene.' }));
  }

  const user = await db.prepare('SELECT id, email_verified, verification_code, token_expires_at FROM users WHERE email = ?').bind(email).first();

  if (!user || user.email_verified === 1 || !user.verification_code) {
    await db.prepare("INSERT INTO login_log (username, ip, user_agent, success) VALUES (?, ?, ?, 0)")
      .bind(emailKey, ip, ua).run();
    return c.html(verifyResendForm(c.env, { email, error: 'Bu email ile bekleyen doğrulama yok. Yeni link iste.' }));
  }
  if (user.token_expires_at && new Date(user.token_expires_at) < new Date()) {
    return c.html(verifyResendForm(c.env, { email, tab: 'resend', error: 'Kod süresi dolmuş (24 saat). Yeni kod iste.' }));
  }
  if (user.verification_code !== code) {
    await db.prepare("INSERT INTO login_log (username, ip, user_agent, success) VALUES (?, ?, ?, 0)")
      .bind(emailKey, ip, ua).run();
    return c.html(verifyResendForm(c.env, { email, error: 'Kod yanlış. Mail\'i tekrar kontrol et.' }));
  }

  await db.prepare('UPDATE users SET email_verified = 1, verification_token = NULL, verification_code = NULL, token_expires_at = NULL WHERE id = ?').bind(user.id).run();
  return c.html(statusPage({
    title: 'Doğrulandı',
    heading: '✓ Email doğrulandı',
    body: 'Tebrikler! Email adresin doğrulandı, artık giriş yapabilirsin.',
    kind: 'success',
  }));
});

// --- Şifre sıfırlama ---
auth.get('/sifre-sifirla', async (c) => {
  const sk = c.env.TURNSTILE_SITE_KEY || '';
  const tsScript = sk ? '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>' : '';
  const tsWidget = sk ? `<div class="cf-turnstile" data-sitekey="${sk}" data-theme="auto" data-size="flexible" style="margin:10px 0;"></div>` : '';
  return c.html(`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Şifre sıfırlama — amator.tr</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>(function(){var t=localStorage.getItem('theme');if(t==='cengiz'){t='vanta-black';localStorage.setItem('theme',t)}if(!t||t==='auto'){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)})()</script>
${tsScript}
<style>*{box-sizing:border-box;margin:0;padding:0}body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#06080f;color:#eaf0f6}html[data-theme="light"] body{background:#f0f2f5;color:#0f172a}.c{max-width:460px;width:100%;padding:32px 28px;background:rgba(30,41,59,.8);border:1px solid rgba(255,255,255,.08);border-radius:16px}html[data-theme="light"] .c{background:#fff;border-color:rgba(0,0,0,.08)}h1{font-size:20px;margin-bottom:8px}p{font-size:14px;color:#94a3b8;margin-bottom:20px}label{display:block;font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:6px;text-transform:uppercase}input{width:100%;padding:12px 14px;background:rgba(15,23,42,.6);border:1px solid rgba(255,255,255,.08);border-radius:8px;color:#eaf0f6;font-size:15px;margin-bottom:16px}html[data-theme="light"] input{background:#f1f5f9;border-color:rgba(0,0,0,.08);color:#0f172a}html[data-theme="vanta-black"] body{background:#000;color:#c8c8c8}html[data-theme="vanta-black"] .c{background:rgba(8,8,8,.9);border-color:rgba(255,255,255,.04)}html[data-theme="vanta-black"] input{background:rgba(0,0,0,.6);border-color:rgba(255,255,255,.04);color:#c8c8c8}html[data-theme="vanta-black"] p,html[data-theme="vanta-black"] label{color:#808080}.btn{width:100%;padding:13px;background:#8b5cf6;color:#fff;border:none;border-radius:8px;font-weight:600;font-size:15px;cursor:pointer}.l{display:block;text-align:center;margin-top:14px;color:#a78bfa;text-decoration:none;font-size:13px}</style>
</head><body><div class="c"><h1>Şifre sıfırlama</h1><p>Email adresini gir, şifre sıfırlama linki göndereceğiz (1 saat geçerli).</p>
<form method="POST" action="/sifre-sifirla"><label>Email</label><input type="email" name="email" required placeholder="ornek@example.com">${tsWidget}<button class="btn" type="submit">Sıfırlama linki gönder</button></form>
<a href="/login" class="l">Giriş sayfasına dön</a></div></body></html>`);
});

auth.post('/sifre-sifirla', async (c) => {
  const db = c.env.DB;
  const body = await c.req.parseBody();
  const email = (body.email || '').trim().toLowerCase();
  const ip = getClientIP(c);
  const ua = c.req.header('user-agent') || '';

  const captchaOk = await checkTurnstile(c, body);
  if (!captchaOk) {
    return c.html(statusPage({ title: 'Hata', heading: '❌ Doğrulama başarısız', body: 'Güvenlik doğrulaması başarısız.', kind: 'error' }));
  }

  const genericResp = statusPage({
    title: 'Gönderildi',
    heading: '✉️ Mail gönderildi',
    body: 'Eğer bu email ile bir hesabın varsa, şifre sıfırlama linki gönderildi. Spam klasörünü de kontrol et.',
    kind: 'success',
  });

  if (!isValidEmail(email)) return c.html(genericResp);

  // Per-IP rate limit (5/15dk) — toplu mail bombası savunması
  const recentByIp = await db.prepare(
    "SELECT COUNT(*) as cnt FROM login_log WHERE ip = ? AND username LIKE '__pw_reset__%' AND created_at > datetime('now', '-15 minutes')"
  ).bind(ip).first();
  if (recentByIp && recentByIp.cnt >= 5) return c.html(genericResp);

  // Per-email rate limit (3/saat) — tek hedef yıldırma savunması
  const emailKey = `__pw_reset__:${email}`;
  const recentByEmail = await db.prepare(
    "SELECT COUNT(*) as cnt FROM login_log WHERE username = ? AND created_at > datetime('now', '-1 hour')"
  ).bind(emailKey).first();
  if (recentByEmail && recentByEmail.cnt >= 3) return c.html(genericResp);

  // Her talep loglanır (geçerli email olsun olmasın oran sayımı doğru kalsın)
  await db.prepare("INSERT INTO login_log (username, ip, user_agent, success) VALUES (?, ?, ?, 1)")
    .bind(emailKey, ip, ua).run();

  const user = await db.prepare('SELECT id, display_name, username FROM users WHERE email = ?').bind(email).first();
  if (!user) return c.html(genericResp);

  const token = genToken();
  const expires = expiresIn(1);
  await db.prepare('UPDATE users SET password_reset_token = ?, password_reset_expires_at = ? WHERE id = ?').bind(token, expires, user.id).run();

  sendPasswordResetEmail(c.env, { to: email, displayName: user.display_name || user.username, token }).catch(e => console.error('email error:', e));

  return c.html(genericResp);
});

auth.get('/sifre-sifirla/:token', async (c) => {
  const db = c.env.DB;
  const token = c.req.param('token') || '';
  if (!/^[a-f0-9]{32,128}$/.test(token)) {
    return c.html(statusPage({ title: 'Geçersiz', heading: '❌ Geçersiz link', body: 'Bu link geçersiz veya bozuk.', kind: 'error' }));
  }
  const user = await db.prepare('SELECT id, password_reset_expires_at FROM users WHERE password_reset_token = ?').bind(token).first();
  if (!user) {
    return c.html(statusPage({ title: 'Geçersiz', heading: '❌ Link bulunamadı', body: 'Bu link geçersiz veya zaten kullanılmış.', kind: 'error' }));
  }
  if (!user.password_reset_expires_at || new Date(user.password_reset_expires_at) < new Date()) {
    return c.html(statusPage({ title: 'Süresi doldu', heading: '⏰ Link süresi dolmuş', body: 'Bu link 1 saatten eski. <a href="/sifre-sifirla" style="color:#a78bfa;">Yeni link iste</a>.', kind: 'error' }));
  }
  return c.html(`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Yeni şifre — amator.tr</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>(function(){var t=localStorage.getItem('theme');if(t==='cengiz'){t='vanta-black';localStorage.setItem('theme',t)}if(!t||t==='auto'){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)})()</script>
<style>*{box-sizing:border-box;margin:0;padding:0}body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#06080f;color:#eaf0f6}html[data-theme="light"] body{background:#f0f2f5;color:#0f172a}.c{max-width:460px;width:100%;padding:32px 28px;background:rgba(30,41,59,.8);border:1px solid rgba(255,255,255,.08);border-radius:16px}html[data-theme="light"] .c{background:#fff;border-color:rgba(0,0,0,.08)}h1{font-size:20px;margin-bottom:8px}p{font-size:14px;color:#94a3b8;margin-bottom:20px}label{display:block;font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:6px;text-transform:uppercase}input{width:100%;padding:12px 14px;background:rgba(15,23,42,.6);border:1px solid rgba(255,255,255,.08);border-radius:8px;color:#eaf0f6;font-size:15px;margin-bottom:16px}html[data-theme="light"] input{background:#f1f5f9;border-color:rgba(0,0,0,.08);color:#0f172a}html[data-theme="vanta-black"] body{background:#000;color:#c8c8c8}html[data-theme="vanta-black"] .c{background:rgba(8,8,8,.9);border-color:rgba(255,255,255,.04)}html[data-theme="vanta-black"] input{background:rgba(0,0,0,.6);border-color:rgba(255,255,255,.04);color:#c8c8c8}html[data-theme="vanta-black"] p,html[data-theme="vanta-black"] label{color:#808080}.btn{width:100%;padding:13px;background:#8b5cf6;color:#fff;border:none;border-radius:8px;font-weight:600;font-size:15px;cursor:pointer}</style>
</head><body><div class="c"><h1>Yeni şifre belirle</h1><p>En az 8 karakter, 1 rakam veya özel karakter.</p>
<form method="POST" action="/sifre-sifirla/${token}" autocomplete="off"><label>Yeni şifre</label><input type="password" name="password" required minlength="8" autocomplete="new-password" autofocus><label>Yeni şifre (tekrar)</label><input type="password" name="password2" required minlength="8" autocomplete="new-password"><button class="btn" type="submit">Şifreyi değiştir</button></form></div></body></html>`);
});

auth.post('/sifre-sifirla/:token', async (c) => {
  const db = c.env.DB;
  const token = c.req.param('token') || '';
  const body = await c.req.parseBody();
  const password = body.password || '';
  const password2 = body.password2 || '';
  if (!/^[a-f0-9]{32,128}$/.test(token)) {
    return c.html(statusPage({ title: 'Geçersiz', heading: '❌ Geçersiz link', body: 'Bu link geçersiz veya bozuk.', kind: 'error' }));
  }
  if (!validatePassword(password)) {
    return c.html(statusPage({ title: 'Hata', heading: '❌ Şifre yetersiz', body: 'Şifre en az 8 karakter ve 1 rakam/özel karakter içermeli. <a href="javascript:history.back()" style="color:#a78bfa;">Geri dön</a>.', kind: 'error' }));
  }
  if (password !== password2) {
    return c.html(statusPage({ title: 'Hata', heading: '❌ Şifreler eşleşmiyor', body: '<a href="javascript:history.back()" style="color:#a78bfa;">Geri dön</a>', kind: 'error' }));
  }
  const user = await db.prepare('SELECT id, password_reset_expires_at FROM users WHERE password_reset_token = ?').bind(token).first();
  if (!user || !user.password_reset_expires_at || new Date(user.password_reset_expires_at) < new Date()) {
    return c.html(statusPage({ title: 'Süresi doldu', heading: '⏰ Link süresi dolmuş', body: '<a href="/sifre-sifirla" style="color:#a78bfa;">Yeni link iste</a>.', kind: 'error' }));
  }
  const salt = generateSalt();
  const hash = await hashPassword(password, salt);
  await db.prepare('UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ?, password_reset_token = NULL, password_reset_expires_at = NULL WHERE id = ?').bind(hash, salt, CURRENT_ITERATIONS, user.id).run();
  await logActivity(db, user.id, 'sifre_degistir', 'Email link ile şifre sıfırlandı');

  return c.html(statusPage({
    title: 'Değiştirildi',
    heading: '✓ Şifre değiştirildi',
    body: 'Yeni şifrenle giriş yapabilirsin.',
    kind: 'success',
  }));
});

// --- Logout ---
auth.get('/logout', (c) => {
  deleteCookie(c, 'session', { path: '/' });
  return c.redirect('/login');
});

// --- GitHub OAuth ---
auth.get('/auth/github', (c) => {
  const clientId = c.env.GITHUB_CLIENT_ID;
  if (!clientId) return c.text('GitHub OAuth yapilandirilmamis', 500);
  const origin = new URL(c.req.url).origin;
  const callbackUrl = `${origin}/auth/github/callback`;
  const state = [...new Uint8Array(crypto.getRandomValues(new Uint8Array(16)))].map(b => b.toString(16).padStart(2, '0')).join('');
  setCookie(c, 'oauth_state', state, { httpOnly: true, secure: true, sameSite: 'Lax', path: '/', maxAge: 600 });
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=read:user&state=${state}`;
  return c.redirect(url);
});

auth.get('/auth/github/callback', async (c) => {
  const code = c.req.query('code');
  if (!code) return c.redirect('/login');

  const stateParam = c.req.query('state');
  const stateCookie = getCookie(c, 'oauth_state');
  deleteCookie(c, 'oauth_state', { path: '/' });
  if (!stateParam || !stateCookie || stateParam !== stateCookie) {
    return c.html(loginPage('Guvenlik dogrulamasi basarisiz. Tekrar deneyin.', '', c.env.TURNSTILE_SITE_KEY || ''));
  }

  const clientId = c.env.GITHUB_CLIENT_ID;
  const clientSecret = c.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) return c.text('GitHub OAuth yapilandirilmamis', 500);

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const tokenData = await tokenRes.json();
    if (tokenData.error || !tokenData.access_token) return c.html(loginPage('GitHub girisi basarisiz.', '', c.env.TURNSTILE_SITE_KEY || ''));

    const userRes = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}`, 'User-Agent': 'RadyoRehberi' },
    });
    if (!userRes.ok) return c.html(loginPage('GitHub kullanici bilgisi alinamadi.', '', c.env.TURNSTILE_SITE_KEY || ''));
    const ghUser = await userRes.json();
    if (!ghUser.id || !ghUser.login) return c.html(loginPage('GitHub kullanici bilgisi alinamadi.', '', c.env.TURNSTILE_SITE_KEY || ''));

    // GitHub her zaman avatars.githubusercontent.com altından serve eder; başka
    // host'tan gelirse görmezden gel — DB'ye keyfi URL girmesin.
    const safeAvatarUrl = (typeof ghUser.avatar_url === 'string'
      && /^https:\/\/avatars\.githubusercontent\.com\//.test(ghUser.avatar_url))
      ? ghUser.avatar_url : '';

    const db = c.env.DB;
    const ip = getClientIP(c);
    const ua = c.req.header('user-agent') || '';

    let user = await db.prepare('SELECT * FROM users WHERE github_id = ?').bind(ghUser.id).first();

    if (!user) {
      const setting = await db.prepare("SELECT value FROM settings WHERE key = 'registration_open'").first();
      if (setting?.value !== 'true') return c.html(loginPage('Kayitlar kapali. GitHub ile yeni hesap olusturulamaz.', '', c.env.TURNSTILE_SITE_KEY || ''));

      const ghUsername = (ghUser.login || '').toLowerCase().replace(/[^a-z0-9_]/g, '');
      let finalUsername = ghUsername || 'user';

      const exists = await db.prepare('SELECT id FROM users WHERE username = ?').bind(finalUsername).first();
      if (exists) finalUsername = `${finalUsername}_${ghUser.id}`;

      const salt = generateSalt();
      const hash = await hashPassword(crypto.randomUUID(), salt);

      await db.prepare('INSERT INTO users (username, password_hash, password_salt, password_iterations, display_name, role, github_id, avatar_url) VALUES (?,?,?,?,?,?,?,?)')
        .bind(finalUsername, hash, salt, CURRENT_ITERATIONS, ghUser.name || ghUser.login, 'user', ghUser.id, safeAvatarUrl).run();

      user = await db.prepare('SELECT * FROM users WHERE github_id = ?').bind(ghUser.id).first();
    } else {
      if (safeAvatarUrl) {
        await db.prepare('UPDATE users SET avatar_url = ? WHERE id = ?').bind(safeAvatarUrl, user.id).run();
      }
    }

    await db.batch([
      db.prepare('INSERT INTO login_log (username, ip, user_agent, success) VALUES (?,?,?,1)').bind(user.username, ip, ua),
      db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").bind(user.id),
    ]);

    const token = await createSessionToken(c.env.SESSION_SECRET, user.id, user.role);
    setCookie(c, 'session', token, { httpOnly: true, secure: true, sameSite: 'Strict', path: '/', maxAge: 7 * 86400 });
    return c.redirect('/');
  } catch (err) {
    console.error('GitHub OAuth error:', err);
    return c.html(loginPage('GitHub girisi sirasinda hata olustu.', '', c.env.TURNSTILE_SITE_KEY || ''));
  }
});

// --- Profil ---
auth.get('/profil', async (c) => {
  const userId = c.get('userId');
  const db = c.env.DB;
  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  const activities = await db.prepare('SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 30').bind(userId).all();
  return c.html(profilePage({ user, activities: activities.results, success: '', error: '' }));
});

auth.post('/profil/guncelle', async (c) => {
  const userId = c.get('userId');
  const db = c.env.DB;
  const body = await c.req.parseBody();
  const display_name = (body.display_name || '').trim();
  await db.prepare('UPDATE users SET display_name = ? WHERE id = ?').bind(display_name, userId).run();
  await logActivity(db, userId, 'profil_guncelle', 'Gorunen ad guncellendi');
  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  const activities = await db.prepare('SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 30').bind(userId).all();
  return c.html(profilePage({ user, activities: activities.results, success: 'Profil guncellendi.', error: '' }));
});

auth.post('/profil/sifre', async (c) => {
  const userId = c.get('userId');
  const db = c.env.DB;
  const body = await c.req.parseBody();
  const currentPw = body.current_password || '';
  const newPw = body.new_password || '';
  const newPw2 = body.new_password2 || '';
  const ip = getClientIP(c);
  const ua = c.req.header('user-agent') || '';

  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  const activities = await db.prepare('SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 30').bind(userId).all();

  // Per-user rate limit: 5 yanlış deneme / 15dk → çalınmış oturumda brute-force savunması
  const pwFailKey = `__profile_pw__:${user.username}`;
  const recentPwFails = await db.prepare(
    "SELECT COUNT(*) as cnt FROM login_log WHERE username = ? AND success = 0 AND created_at > datetime('now', '-15 minutes')"
  ).bind(pwFailKey).first();
  if (recentPwFails && recentPwFails.cnt >= 5) {
    return c.html(profilePage({ user, activities: activities.results, success: '', error: 'Çok fazla yanlış deneme. 15 dakika sonra tekrar dene.' }));
  }

  const userIters = user.password_iterations || LEGACY_ITERATIONS;
  const currentHash = await hashPassword(currentPw, user.password_salt, userIters);
  if (!timingSafeEqualHex(currentHash, user.password_hash)) {
    await db.prepare('INSERT INTO login_log (username, ip, user_agent, success) VALUES (?,?,?,0)').bind(pwFailKey, ip, ua).run();
    return c.html(profilePage({ user, activities: activities.results, success: '', error: 'Mevcut sifre hatali.' }));
  }
  if (!validatePassword(newPw)) {
    return c.html(profilePage({ user, activities: activities.results, success: '', error: 'Yeni sifre en az 8 karakter ve en az 1 rakam/ozel karakter icermeli.' }));
  }
  if (newPw !== newPw2) {
    return c.html(profilePage({ user, activities: activities.results, success: '', error: 'Yeni sifreler eslesmiyor.' }));
  }

  const salt = generateSalt();
  const hash = await hashPassword(newPw, salt);
  await db.prepare('UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ? WHERE id = ?').bind(hash, salt, CURRENT_ITERATIONS, userId).run();
  await logActivity(db, userId, 'sifre_degistir', 'Sifre degistirildi');

  const updatedUser = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  const updatedActs = await db.prepare('SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 30').bind(userId).all();
  return c.html(profilePage({ user: updatedUser, activities: updatedActs.results, success: 'Sifre basariyla degistirildi.', error: '' }));
});

export default auth;
