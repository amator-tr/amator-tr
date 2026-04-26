function e(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}

export function registerPage(error = '', closed = false, siteKey = '', formData = {}) {
  const turnstileScript = siteKey ? '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>' : '';
  const turnstileWidget = siteKey
    ? `<div class="cf-turnstile" data-sitekey="${e(siteKey)}" data-theme="auto" data-size="flexible" style="margin-bottom:16px;"></div>`
    : '';
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YDKPBD0EJX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-YDKPBD0EJX");</script>
<title>Kayıt Ol — Çağrı Defteri | amator.tr</title>
  <script>(function(){var t=localStorage.getItem('theme');if(t==='cengiz'){t='vanta-black';localStorage.setItem('theme',t)}if(!t||t==='auto'){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)})()</script>
  ${turnstileScript}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root, html[data-theme="dark"] {
      --bg: #06080f; --s1: #0c1018; --s2: #141a24;
      --b1: rgba(255,255,255,.08); --t1: #eaf0f6; --t2: #94a3b8; --t3: #475569;
      --p: #8b5cf6; --p2: #a78bfa; --r: #ef4444; --g: #2dd4bf;
      --card-bg: rgba(30, 41, 59, 0.8); --input-bg: rgba(15, 23, 42, 0.6);
      --grad1: #0f172a; --grad2: #1e293b;
    }
    html[data-theme="light"] {
      --bg: #f0f2f5; --s1: #ffffff; --s2: #f8f9fb;
      --b1: rgba(0,0,0,.08); --t1: #0f172a; --t2: #475569; --t3: #94a3b8;
      --p: #7c3aed; --p2: #6d28d9; --r: #dc2626; --g: #0d9488;
      --card-bg: rgba(255,255,255,0.9); --input-bg: rgba(241,245,249,0.8);
      --grad1: #e2e8f0; --grad2: #f1f5f9;
    }
    html[data-theme="vanta-black"] {
      --bg: #000000; --s1: #080808; --s2: #101010;
      --b1: rgba(255,255,255,.04); --t1: #c8c8c8; --t2: #808080; --t3: #505050;
      --p: #8b5cf6; --p2: #a78bfa; --r: #ef4444; --g: #2dd4bf;
      --card-bg: rgba(8,8,8,0.9); --input-bg: rgba(0,0,0,0.6);
      --grad1: #000000; --grad2: #080808;
    }
    html[data-theme="dark-navy"] {
      --bg: #1a1a2e; --s1: #16213e; --s2: #0f3460;
      --b1: rgba(255,255,255,.06); --t1: #eee; --t2: #8b96a4; --t3: #4a5568;
      --p: #8b5cf6; --p2: #a78bfa; --r: #ef4444; --g: #2dd4bf;
      --card-bg: rgba(22,33,62,0.9); --input-bg: rgba(15,52,96,0.6);
      --grad1: #1a1a2e; --grad2: #16213e;
    }
    html[data-theme="dark-charcoal"] {
      --bg: #15151a; --s1: #1f1f27; --s2: #2a2a33;
      --b1: rgba(255,255,255,.05); --t1: #e8e8e8; --t2: #9090a0; --t3: #555560;
      --p: #8b5cf6; --p2: #a78bfa; --r: #ef4444; --g: #2dd4bf;
      --card-bg: rgba(31,31,39,0.9); --input-bg: rgba(21,21,26,0.6);
      --grad1: #15151a; --grad2: #1f1f27;
    }
    html[data-theme="contrast"] {
      --bg: #000000; --s1: #000000; --s2: #0a0a0a;
      --b1: rgba(255,255,255,.15); --t1: #ffffff; --t2: #ffffff; --t3: #ffffff;
      --p: #ffff00; --p2: #ffff00; --r: #ff6060; --g: #00ff00;
      --card-bg: rgba(0,0,0,0.95); --input-bg: rgba(0,0,0,0.8);
      --grad1: #000000; --grad2: #000000;
    }
    html[data-theme="contrast"] a { text-decoration: underline; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, var(--grad1) 0%, var(--grad2) 50%, var(--grad1) 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: var(--t1);
      transition: background .25s;
    }
    .top {
      position: sticky; top: 0; z-index: 90;
      background: rgba(15,23,42,.65);
      -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--b1);
    }
    html[data-theme="light"] .top { background: rgba(255,255,255,.85); }
    .top-inner {
      max-width: 1300px; margin: 0 auto;
      display: flex; align-items: center; gap: 14px;
      padding: 0 14px; height: 52px; flex-wrap: wrap;
    }
    @media (min-width: 768px) { .top-inner { padding: 0 24px; gap: 18px; } }
    .top-brand {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; color: var(--t1);
    }
    .top-brand i {
      width: 30px; height: 30px;
      background: linear-gradient(135deg, var(--p), #6d28d9);
      border-radius: 8px;
      display: grid; place-items: center;
      font-style: normal; font-size: 14px; color: #fff;
    }
    .top-brand span { font-size: 14px; font-weight: 700; }
    .top-brand:hover { opacity: .85; }
    .top-links {
      display: none; gap: 2px;
      list-style: none; margin: 0; padding: 0;
    }
    @media (min-width: 900px) { .top-links { display: flex; } }
    .top-links a {
      padding: 6px 10px; border-radius: 6px;
      font-size: 12px; font-weight: 500;
      color: var(--t2); text-decoration: none;
      transition: .15s;
    }
    .top-links a:hover { background: var(--s2); color: var(--t1); }
    .top-links a.active {
      color: var(--p2);
      background: rgba(139,92,246,.1);
    }
    .login-page-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .login-container { width: 100%; max-width: 420px; padding: 20px; }
    .login-card {
      background: var(--card-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--b1);
      border-radius: 16px;
      padding: 48px 40px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
    }
    .logo-area { text-align: center; margin-bottom: 32px; }
    .logo-icon {
      width: 72px; height: 72px;
      background: linear-gradient(135deg, var(--p), var(--p2));
      border-radius: 16px;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 32px; margin-bottom: 16px;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
    }
    .logo-area h1 { font-size: 22px; font-weight: 700; color: var(--t1); line-height: 1.3; }
    .logo-area p { font-size: 14px; color: var(--t2); margin-top: 6px; }
    .form-group { margin-bottom: 20px; }
    .form-group label {
      display: block; font-size: 13px; font-weight: 600; color: var(--t2);
      margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .form-group input {
      width: 100%; padding: 14px 16px;
      background: var(--input-bg);
      border: 1px solid var(--b1);
      border-radius: 10px; color: var(--t1); font-size: 16px;
      transition: border-color 0.2s, box-shadow 0.2s; outline: none;
    }
    .form-group input:focus {
      border-color: var(--p);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
    }
    .form-group input::placeholder { color: var(--t3); }
    .form-hint { font-size: 11px; color: var(--t3); margin-top: 6px; }
    .btn-login {
      width: 100%; padding: 14px;
      background: linear-gradient(135deg, var(--p), var(--p2));
      border: none; border-radius: 10px; color: #fff;
      font-size: 16px; font-weight: 600; cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s; letter-spacing: 0.3px;
    }
    .btn-login:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35); }
    .btn-login:active { transform: translateY(0); }
    .error-msg {
      background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3);
      color: var(--r); padding: 12px 16px; border-radius: 8px;
      font-size: 14px; margin-bottom: 20px; text-align: center;
    }
    .closed-msg {
      background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2);
      color: #fbbf24; padding: 16px; border-radius: 8px;
      font-size: 14px; text-align: center; line-height: 1.5;
    }
    .footer-note { text-align: center; margin-top: 24px; font-size: 13px; color: var(--t3); }
    .footer-note a { color: var(--p); text-decoration: none; font-weight: 600; }
    .footer-note a:hover { text-decoration: underline; }
    .theme-fab{position:fixed;right:20px;bottom:20px;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--p),#6d28d9);color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.35);transition:transform .15s;z-index:1000}
    .theme-fab:hover{transform:scale(1.08)}
    .theme-menu{position:fixed;right:20px;bottom:76px;min-width:190px;background:var(--card-bg,rgba(30,41,59,.9));border:1px solid var(--b1);border-radius:12px;padding:6px;box-shadow:0 8px 24px rgba(0,0,0,.4);display:flex;flex-direction:column;gap:2px;z-index:1000}
    .theme-menu[hidden]{display:none}
    .theme-option{display:flex;align-items:center;gap:10px;padding:8px 12px;background:none;border:1px solid transparent;border-radius:8px;color:var(--t1);font-size:12px;text-align:left;cursor:pointer;font-family:inherit}
    .theme-option:hover{background:rgba(255,255,255,.05)}
    .theme-option.active{border-color:var(--p);color:var(--p2);font-weight:600}
    .theme-swatch{width:16px;height:16px;border-radius:50%;border:1px solid var(--b1);flex-shrink:0}
  </style>
</head>
<body>
  <div class="top">
    <div class="top-inner">
      <a href="https://amator.tr/" class="top-brand" rel="noopener"><i>📡</i><span>amator.tr</span></a>
      <ul class="top-links">
        <li><a href="https://amator.tr/tutorials/" rel="noopener">Tutorial'lar</a></li>
        <li><a href="https://amator.tr/role-export/" rel="noopener">Röle</a></li>
        <li><a href="https://amator.tr/araclar/anten-hesaplayici/" rel="noopener">Anten</a></li>
<li><a href="https://amator.tr/araclar/ctcss-ton-bulucu/" rel="noopener">CTCSS</a></li>
<li><a href="https://amator.tr/araclar/maidenhead-grid/" rel="noopener">Maidenhead</a></li>
<li><a href="https://amator.tr/araclar/propagasyon-durumu/" rel="noopener">Propagasyon</a></li>
<li><a href="https://amator.tr/araclar/lisans-sinavi/" rel="noopener">Sınav</a></li>
<li><a href="https://amator.tr/sozluk" rel="noopener">Sözlük</a></li>
        <li><a href="/" class="active">Çağrı Defteri</a></li>
        <li><a href="https://amator.tr/hakkinda" rel="noopener">Hakkında</a></li>
      </ul>
    </div>
  </div>
  <div class="login-page-wrap">
  <div class="login-container">
    <div class="login-card">
      <div class="logo-area">
        <div class="logo-icon">&#128225;</div>
        <h1>Kayit Ol</h1>
        <p><a href="https://amator.tr/" style="color:inherit;text-decoration:none;opacity:.85">amator.tr</a> · Çağrı Defteri'ne katıl</p>
      </div>
      ${closed ? `<div class="closed-msg">Kayitlar su anda kapatilmistir. Yonetici ile iletisime gecin.</div>
      <div class="footer-note"><a href="/login">Girise don</a></div>` : `
      ${error ? `<div class="error-msg">${e(error)}</div>` : ''}
      <form method="POST" action="/register">
        <div class="form-group">
          <label>Kullanici Adi</label>
          <input type="text" name="username" placeholder="ornek: ta1abc" required minlength="3" maxlength="20" pattern="[a-zA-Z0-9_]+" value="${e(formData.username || '')}" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false">
          <div class="form-hint">3-20 karakter, harf, rakam ve alt cizgi</div>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="ornek@example.com" required maxlength="120" value="${e(formData.email || '')}" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false">
          <div class="form-hint">Doğrulama linki gönderilecek</div>
        </div>
        <div class="form-group">
          <label>Gorunen Ad (opsiyonel)</label>
          <input type="text" name="display_name" placeholder="Ahmet Yilmaz" maxlength="50" value="${e(formData.display_name || '')}">
        </div>
        <div class="form-group">
          <label>Sifre</label>
          <input type="password" name="password" placeholder="En az 8 karakter..." required minlength="8" autocomplete="new-password">
          <div class="form-hint">En az 8 karakter, 1 rakam veya ozel karakter</div>
        </div>
        <div class="form-group">
          <label>Sifre Tekrar</label>
          <input type="password" name="password2" placeholder="Sifrenizi tekrar girin..." required minlength="8" autocomplete="new-password">
        </div>
        ${turnstileWidget}
        <button type="submit" class="btn-login">Kayit Ol</button>
      </form>
      <div class="footer-note">Zaten hesabınız var mı? <a href="/login">Giriş Yap</a></div>`}
    </div>
  </div>
  </div>
<button id="theme-fab" class="theme-fab" type="button" aria-label="Tema seç"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></button>
<div id="theme-menu" class="theme-menu" role="menu" hidden></div>
<script>
(function(){
var TH=[{id:'dark',ad:'Koyu',sw:'#06080f'},{id:'dark-navy',ad:'Navy',sw:'#1a1a2e'},{id:'dark-charcoal',ad:'Kömür',sw:'#15151a'},{id:'vanta-black',ad:'Vanta Black',sw:'#000'},{id:'light',ad:'Açık',sw:'#f0f2f5'},{id:'contrast',ad:'Yüksek Kontrast',sw:'#000'}];
var fab=document.getElementById('theme-fab'),menu=document.getElementById('theme-menu');
if(!fab||!menu)return;
function isV(id){return TH.some(function(t){return t.id===id})}
function apply(id){document.documentElement.setAttribute('data-theme',id);menu.querySelectorAll('.theme-option').forEach(function(b){b.classList.toggle('active',b.dataset.theme===id)})}
TH.forEach(function(t){var b=document.createElement('button');b.type='button';b.className='theme-option';b.dataset.theme=t.id;b.setAttribute('role','menuitemradio');var s=document.createElement('span');s.className='theme-swatch';s.style.background=t.sw;var l=document.createElement('span');l.textContent=t.ad;b.appendChild(s);b.appendChild(l);menu.appendChild(b)});
var cur=localStorage.getItem('theme')||'dark';if(!isV(cur))cur='dark';
apply(cur);
fab.addEventListener('click',function(e){e.stopPropagation();menu.hidden=!menu.hidden});
menu.addEventListener('click',function(e){var b=e.target.closest('.theme-option');if(!b)return;var id=b.dataset.theme;if(!isV(id))return;localStorage.setItem('theme',id);apply(id);menu.hidden=true});
document.addEventListener('click',function(e){if(!menu.hidden&&!e.target.closest('#theme-menu,#theme-fab'))menu.hidden=true});
document.addEventListener('keydown',function(e){if(e.key==='Escape')menu.hidden=true});
})();
</script>
</body>
</html>`;
}
