/**
 * Paylasilan sayfa layout'u - tum view'lar bu fonksiyonu kullanir
 */

function e(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function wrapPage({ title, user, bodyContent, headExtra, scriptContent }) {
  const isAdmin = user && user.role === 'admin';
  const userName = e(user && (user.display_name || user.username) || '');
  const currentPath = ''; // Will be set client-side

  return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><title>${e(title)} — Çağrı Defteri | amator.tr</title>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YDKPBD0EJX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-YDKPBD0EJX");</script>
<link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#8b5cf6"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<script>(function(){var t=localStorage.getItem('theme');if(t==='cengiz'){t='vanta-black';localStorage.setItem('theme',t)}if(!t||t==='auto'){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t);var s=localStorage.getItem('fontSize')||'md';document.documentElement.setAttribute('data-size',s)})()</script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root,html[data-theme="dark"]{--bg:#06080f;--s1:#0c1018;--s2:#141a24;--s3:#1e2735;--b1:rgba(255,255,255,.05);--b2:rgba(255,255,255,.08);--t1:#eaf0f6;--t2:#8b96a4;--t3:#4a5568;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--rad:10px;--top-bg:rgba(6,8,15,.82);--shadow:rgba(0,0,0,.4)}
html[data-theme="light"]{--bg:#f0f2f5;--s1:#ffffff;--s2:#f8f9fb;--s3:#e8ecf1;--b1:rgba(0,0,0,.07);--b2:rgba(0,0,0,.1);--t1:#0f172a;--t2:#475569;--t3:#94a3b8;--p:#7c3aed;--p2:#6d28d9;--pg:rgba(124,58,237,.07);--g:#0d9488;--gg:rgba(13,148,136,.06);--r:#dc2626;--rg:rgba(220,38,38,.06);--y:#d97706;--rad:10px;--top-bg:rgba(255,255,255,.88);--shadow:rgba(0,0,0,.12)}
html[data-theme="vanta-black"]{--bg:#000000;--s1:#080808;--s2:#101010;--s3:#1a1a1a;--b1:rgba(255,255,255,.04);--b2:rgba(255,255,255,.06);--t1:#c8c8c8;--t2:#808080;--t3:#505050;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--rad:10px;--top-bg:rgba(0,0,0,.92);--shadow:rgba(0,0,0,.6)}
html[data-theme="dark-navy"]{--bg:#1a1a2e;--s1:#16213e;--s2:#0f3460;--s3:#1a3a6e;--b1:rgba(255,255,255,.06);--b2:rgba(255,255,255,.09);--t1:#eee;--t2:#8b96a4;--t3:#4a5568;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--rad:10px;--top-bg:rgba(26,26,46,.85);--shadow:rgba(0,0,0,.4)}
html[data-theme="dark-charcoal"]{--bg:#15151a;--s1:#1f1f27;--s2:#2a2a33;--s3:#35353f;--b1:rgba(255,255,255,.05);--b2:rgba(255,255,255,.08);--t1:#e8e8e8;--t2:#9090a0;--t3:#555560;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--rad:10px;--top-bg:rgba(21,21,26,.85);--shadow:rgba(0,0,0,.4)}
html[data-theme="contrast"]{--bg:#000;--s1:#000;--s2:#0a0a0a;--s3:#141414;--b1:rgba(255,255,255,.15);--b2:rgba(255,255,255,.2);--t1:#fff;--t2:#fff;--t3:#fff;--p:#ffff00;--p2:#ffff00;--pg:rgba(255,255,0,.1);--g:#00ff00;--gg:rgba(0,255,0,.07);--r:#ff6060;--rg:rgba(255,96,96,.06);--y:#ffff00;--rad:10px;--top-bg:rgba(0,0,0,.95);--shadow:rgba(0,0,0,.6)}
html[data-theme="contrast"] a{text-decoration:underline}
html[data-theme="contrast"] :focus-visible{outline:3px solid #ffff00;outline-offset:2px}
body{background:var(--bg);color:var(--t1);font-family:'Inter',system-ui,sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased;transition:background .25s,color .25s}
.top{position:sticky;top:0;z-index:90;background:var(--top-bg);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--b1);transition:background .25s}
.top-inner{max-width:1300px;margin:0 auto;display:flex;align-items:center;gap:14px;padding:0 14px;height:52px;flex-wrap:wrap}
@media(min-width:768px){.top-inner{padding:0 24px;gap:18px}}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--t1)}
.brand i{width:30px;height:30px;background:linear-gradient(135deg,var(--p),#6d28d9);border-radius:8px;display:grid;place-items:center;font-style:normal;font-size:14px;color:#fff}
.brand span{font-size:14px;font-weight:700}
.brand:hover{opacity:.85}
.site-links{display:none;gap:2px;list-style:none;margin:0;padding:0}
@media(min-width:900px){.site-links{display:flex}}
.site-links a{padding:6px 10px;border-radius:6px;font-size:12px;font-weight:500;color:var(--t2);text-decoration:none;transition:.15s}
.site-links a:hover{background:var(--s2);color:var(--t1)}
.site-links a.active{color:var(--p2);background:var(--pg)}
.top-r{margin-left:auto;display:flex;gap:6px;align-items:center}
.tbtn{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:500;text-decoration:none;border:1px solid var(--b1);transition:.15s;cursor:pointer;display:inline-flex;align-items:center;gap:4px;background:var(--s2);color:var(--t2)}
.tbtn:hover{border-color:var(--b2);background:var(--s3)}
.tbtn-r{color:var(--r);background:var(--rg);border-color:rgba(239,68,68,.08)}
.tbtn-admin{color:var(--y);background:rgba(251,191,36,.08);border-color:rgba(251,191,36,.12)}
.user-badge{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px;background:var(--pg);color:var(--p2);border:1px solid rgba(139,92,246,.12)}
/* Navigation tabs */
.nav-tabs{display:flex;gap:2px;padding:0 14px;background:var(--s1);border-bottom:1px solid var(--b1);overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.nav-tabs::-webkit-scrollbar{display:none}
@media(min-width:768px){.nav-tabs{padding:0 24px;gap:4px}}
.nav-tab{padding:10px 14px;font-size:12px;font-weight:500;color:var(--t3);text-decoration:none;border-bottom:2px solid transparent;transition:.15s;white-space:nowrap;display:flex;align-items:center;gap:6px}
.nav-tab:hover{color:var(--t2);background:var(--pg)}
.nav-tab.active{color:var(--p2);border-bottom-color:var(--p);font-weight:600}
.nav-tab svg{width:14px;height:14px;flex-shrink:0}
/* Common */
.btn-p{padding:8px 20px;background:var(--p);border:none;border-radius:7px;color:#fff;font-size:13px;font-weight:600;cursor:pointer}.btn-p:disabled{opacity:.4;cursor:not-allowed}
.btn-p:hover{opacity:.9}
.btn-g{padding:8px 20px;background:var(--gg);border:1px solid rgba(45,212,191,.15);border-radius:7px;color:var(--g);font-size:13px;font-weight:600;cursor:pointer}
.btn-g:hover{background:rgba(45,212,191,.12)}
.inp{padding:9px 12px;background:var(--bg);border:1px solid var(--b1);border-radius:7px;color:var(--t1);font-size:13px;outline:none;transition:.15s}.inp:focus{border-color:var(--p)}.inp::placeholder{color:var(--t3)}
.card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden}
.pnl{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden}
.pnl-h{padding:10px 14px;font-size:13px;font-weight:600;color:var(--t2);display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--b1)}
.wrap-page{max-width:1200px;margin:0 auto;padding:14px}
@media(min-width:768px){.wrap-page{padding:20px 24px}}
.theme-fab{position:fixed;right:20px;bottom:20px;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--p),#6d28d9);color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.35);transition:transform .15s,box-shadow .15s;z-index:1000;font-size:1rem}
.theme-fab:hover{transform:scale(1.08);box-shadow:0 6px 16px rgba(0,0,0,.45)}
.theme-menu{position:fixed;right:20px;bottom:76px;min-width:190px;background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:6px;box-shadow:0 8px 24px var(--shadow);display:flex;flex-direction:column;gap:2px;z-index:1000}
.theme-menu[hidden]{display:none}
.theme-option{display:flex;align-items:center;gap:10px;padding:8px 12px;background:none;border:1px solid transparent;border-radius:8px;color:var(--t1);font-size:12px;text-align:left;cursor:pointer;font-family:inherit;transition:.15s}
.theme-option:hover{background:var(--s2)}
.theme-option.active{border-color:var(--p);color:var(--p2);font-weight:600}
.theme-swatch{width:16px;height:16px;border-radius:50%;border:1px solid var(--b2);flex-shrink:0}
</style>
${headExtra || ''}
</head>
<body>
<div class="top">
  <div class="top-inner">
    <a href="https://amator.tr/" class="brand" rel="noopener"><i>📡</i><span>amator.tr</span></a>
    <ul class="site-links">
      <li><a href="https://amator.tr/tutorials/" rel="noopener">Tutorial'lar</a></li>
      <li><a href="https://amator.tr/role-export/" rel="noopener">Röle</a></li>
      <li><a href="https://amator.tr/araclar/anten-hesaplayici/" rel="noopener">Anten</a></li>
      <li><a href="https://amator.tr/araclar/ctcss-ton-bulucu/" rel="noopener">CTCSS</a></li>
      <li><a href="https://amator.tr/araclar/maidenhead-grid/" rel="noopener">Maidenhead</a></li>
<li><a href="https://amator.tr/araclar/propagasyon-durumu/" rel="noopener">Propagasyon</a></li>
<li><a href="https://amator.tr/araclar/rf-los/" rel="noopener">RF LOS</a></li>
<li><a href="https://amator.tr/araclar/lisans-sinavi/" rel="noopener">Sınav</a></li>
      <li><a href="https://amator.tr/sozluk" rel="noopener">Sözlük</a></li>
      <li><a href="/" class="active">Çağrı Defteri</a></li>
      <li><a href="https://amator.tr/hakkinda" rel="noopener">Hakkında</a></li>
    </ul>
    <div class="top-r">
      ${user ? `<span class="user-badge">${userName}</span>` : ''}
      ${isAdmin ? `<a href="/admin" class="tbtn tbtn-admin">Admin</a>` : ''}
      ${user ? `<a href="/profil" class="tbtn">Profil</a><a href="/logout" class="tbtn tbtn-r">Çıkış</a>` : ''}
    </div>
  </div>
</div>
<nav class="nav-tabs" id="mainNav">
  <a href="/" class="nav-tab" data-path="/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>Not Defteri</a>
  <a href="/qso" class="nav-tab" data-path="/qso"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>QSO Log</a>
  <a href="/mors" class="nav-tab" data-path="/mors"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>Mors</a>
  <a href="/frekans" class="nav-tab" data-path="/frekans"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h4l3-9 4 18 3-9h4"/></svg>Frekanslar</a>
  <a href="/panel" class="nav-tab" data-path="/panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Panel</a>
</nav>
${bodyContent}
<script>
(function(){
  var path = location.pathname;
  var tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(function(t){
    var p = t.getAttribute('data-path');
    if(p === path || (p !== '/' && path.startsWith(p))) t.classList.add('active');
    else if(p === '/' && path === '/') t.classList.add('active');
  });
})();
</script>
<button id="theme-fab" class="theme-fab" type="button" aria-label="Tema seç"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></button>
<div id="theme-menu" class="theme-menu" role="menu" aria-label="Tema seçenekleri" hidden></div>
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
${scriptContent || ''}
</body></html>`;
}
