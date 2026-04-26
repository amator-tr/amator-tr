function e(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}

export function adminPage({user}){
return`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin - Radyo Rehberi</title>
<script>(function(){var t=localStorage.getItem('theme');if(t==='cengiz'){t='vanta-black';localStorage.setItem('theme',t)}if(!t||t==='auto'){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t);var s=localStorage.getItem('fontSize')||'md';document.documentElement.setAttribute('data-size',s)})()</script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root,html[data-theme="dark"]{--bg:#06080f;--s1:#0c1018;--s2:#141a24;--s3:#1e2735;--b1:rgba(255,255,255,.05);--b2:rgba(255,255,255,.08);--t1:#eaf0f6;--t2:#8b96a4;--t3:#4a5568;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--yg:rgba(251,191,36,.08);--rad:10px;--top-bg:rgba(6,8,15,.82);--shadow:rgba(0,0,0,.4)}
html[data-theme="light"]{--bg:#f0f2f5;--s1:#ffffff;--s2:#f8f9fb;--s3:#e8ecf1;--b1:rgba(0,0,0,.07);--b2:rgba(0,0,0,.1);--t1:#0f172a;--t2:#475569;--t3:#94a3b8;--p:#7c3aed;--p2:#6d28d9;--pg:rgba(124,58,237,.07);--g:#0d9488;--gg:rgba(13,148,136,.06);--r:#dc2626;--rg:rgba(220,38,38,.06);--y:#d97706;--yg:rgba(217,119,6,.06);--rad:10px;--top-bg:rgba(255,255,255,.88);--shadow:rgba(0,0,0,.12)}
html[data-theme="vanta-black"]{--bg:#000000;--s1:#080808;--s2:#101010;--s3:#1a1a1a;--b1:rgba(255,255,255,.04);--b2:rgba(255,255,255,.06);--t1:#c8c8c8;--t2:#808080;--t3:#505050;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--yg:rgba(251,191,36,.08);--rad:10px;--top-bg:rgba(0,0,0,.92);--shadow:rgba(0,0,0,.6)}
html[data-theme="dark-navy"]{--bg:#1a1a2e;--s1:#16213e;--s2:#0f3460;--s3:#1a3a6e;--b1:rgba(255,255,255,.06);--b2:rgba(255,255,255,.09);--t1:#eee;--t2:#8b96a4;--t3:#4a5568;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--yg:rgba(251,191,36,.08);--rad:10px;--top-bg:rgba(26,26,46,.85);--shadow:rgba(0,0,0,.4)}
html[data-theme="dark-charcoal"]{--bg:#15151a;--s1:#1f1f27;--s2:#2a2a33;--s3:#35353f;--b1:rgba(255,255,255,.05);--b2:rgba(255,255,255,.08);--t1:#e8e8e8;--t2:#9090a0;--t3:#555560;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--yg:rgba(251,191,36,.08);--rad:10px;--top-bg:rgba(21,21,26,.85);--shadow:rgba(0,0,0,.4)}
html[data-theme="contrast"]{--bg:#000;--s1:#000;--s2:#0a0a0a;--s3:#141414;--b1:rgba(255,255,255,.15);--b2:rgba(255,255,255,.2);--t1:#fff;--t2:#fff;--t3:#fff;--p:#ffff00;--p2:#ffff00;--pg:rgba(255,255,0,.1);--g:#00ff00;--gg:rgba(0,255,0,.07);--r:#ff6060;--rg:rgba(255,96,96,.06);--y:#ffff00;--yg:rgba(255,255,0,.08);--rad:10px;--top-bg:rgba(0,0,0,.95);--shadow:rgba(0,0,0,.6)}
html[data-theme="contrast"] a{text-decoration:underline}
html[data-theme="contrast"] :focus-visible{outline:3px solid #ffff00;outline-offset:2px}
html[data-size="xs"] body{zoom:0.85}html[data-size="sm"] body{zoom:0.92}html[data-size="md"] body{zoom:1}html[data-size="lg"] body{zoom:1.08}html[data-size="xl"] body{zoom:1.18}
body{background:var(--bg);color:var(--t1);font-family:'Inter',system-ui,sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased;transition:background .25s,color .25s}
.top{position:sticky;top:0;z-index:90;background:var(--top-bg);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--b1);height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 14px}
@media(min-width:768px){.top{padding:0 24px}}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--t1)}.brand:hover{opacity:.85}.brand i{width:30px;height:30px;background:linear-gradient(135deg,var(--y),#d97706);border-radius:8px;display:grid;place-items:center;font-style:normal;font-size:14px;color:#fff}.brand span{font-size:14px;font-weight:700}
.site-links{display:none;gap:2px;list-style:none;margin:0 0 0 8px;padding:0}@media(min-width:1000px){.site-links{display:flex}}
.site-links a{padding:6px 10px;border-radius:6px;font-size:12px;font-weight:500;color:var(--t2);text-decoration:none;transition:.15s}.site-links a:hover{background:var(--s2);color:var(--t1)}.site-links a.active{color:var(--p2);background:var(--pg)}
.top-r{display:flex;gap:6px;align-items:center;margin-left:auto}
.tbtn{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:500;text-decoration:none;border:1px solid var(--b1);transition:.15s;cursor:pointer;display:inline-flex;align-items:center;gap:4px;background:var(--s2);color:var(--t2)}
.tbtn:hover{border-color:var(--b2);background:var(--s3)}
.wrap{max-width:1200px;margin:0 auto;padding:20px 14px}
@media(min-width:768px){.wrap{padding:20px 24px}}
.tabs{display:flex;gap:4px;border-bottom:1px solid var(--b1);margin-bottom:20px;overflow-x:auto;-webkit-overflow-scrolling:touch}
.tab{padding:10px 16px;font-size:13px;font-weight:600;color:var(--t3);cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:.15s}
.tab:hover{color:var(--t2)}
.tab.active{color:var(--p);border-bottom-color:var(--p)}
.panel{display:none}.panel.active{display:block}
.card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);padding:20px;margin-bottom:16px}
.card-h{font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.stat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:20px}
.stat{background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:16px;text-align:center}
.stat-val{font-size:24px;font-weight:700;font-family:'JetBrains Mono',monospace}
.stat-lbl{font-size:11px;color:var(--t3);margin-top:4px;text-transform:uppercase;letter-spacing:.5px}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;padding:10px 12px;font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--b1)}
td{padding:10px 12px;border-bottom:1px solid var(--b1);color:var(--t2);vertical-align:middle}
tr:hover td{background:var(--s2)}
.badge{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.badge-admin{background:var(--yg);color:var(--y)}
.badge-user{background:var(--pg);color:var(--p2)}
.badge-ok{background:var(--gg);color:var(--g)}
.badge-fail{background:var(--rg);color:var(--r)}
.act-btn{padding:4px 10px;border-radius:5px;font-size:11px;font-weight:500;cursor:pointer;border:1px solid var(--b1);background:var(--s2);color:var(--t2);transition:.15s}
.act-btn:hover{border-color:var(--b2);background:var(--s3)}
.act-btn-r{color:var(--r);border-color:rgba(239,68,68,.15)}
.act-btn-r:hover{background:var(--rg)}
.act-btn-g{color:var(--g);border-color:rgba(45,212,191,.15)}
.act-btn-g:hover{background:var(--gg)}
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--b1)}
.toggle-row:last-child{border-bottom:none}
.toggle-lbl{font-size:14px;font-weight:500}
.toggle-desc{font-size:12px;color:var(--t3);margin-top:2px}
.toggle{position:relative;width:44px;height:24px;cursor:pointer;flex-shrink:0}
.toggle input{opacity:0;width:0;height:0}
.toggle .slider{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--s3);border-radius:12px;transition:.2s}
.toggle .slider:before{content:'';position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:var(--t3);border-radius:50%;transition:.2s}
.toggle input:checked+.slider{background:var(--p)}
.toggle input:checked+.slider:before{transform:translateX(20px);background:#fff}
.pager{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:16px}
.pager button{padding:6px 12px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;border:1px solid var(--b1);background:var(--s2);color:var(--t2);transition:.15s}
.pager button:hover:not(:disabled){border-color:var(--b2);background:var(--s3)}
.pager button:disabled{opacity:.4;cursor:default}
.pager span{font-size:12px;color:var(--t3)}
.empty{text-align:center;padding:40px 20px;color:var(--t3);font-size:14px}
.search-box{margin-bottom:14px;display:flex;align-items:center;gap:8px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:8px 12px}
.search-box svg{color:var(--t3);flex-shrink:0}
.search-box input{flex:1;background:none;border:none;color:var(--t1);font-size:13px;outline:none;min-width:0}
.search-box input::placeholder{color:var(--t3)}
.search-box .s-count{font-size:11px;color:var(--t3);font-family:'JetBrains Mono',monospace;white-space:nowrap}
.mono{font-family:'JetBrains Mono',monospace;font-size:12px}
.toast{position:fixed;bottom:20px;right:20px;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:999;animation:fadeIn .2s;background:var(--s1);border:1px solid var(--b1);color:var(--t1);box-shadow:0 8px 30px var(--shadow)}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.responsive-table{overflow-x:auto;-webkit-overflow-scrolling:touch}
.ann-item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--b1)}
.ann-item:last-child{border-bottom:none}
.ann-type{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.ann-type-info{background:var(--p)}.ann-type-warning{background:var(--y)}.ann-type-success{background:var(--g)}
.ann-body{flex:1;min-width:0}
.ann-title{font-size:13px;font-weight:600;color:var(--t1)}.ann-text{font-size:11px;color:var(--t2);margin-top:2px}
.ann-meta{font-size:10px;color:var(--t3);margin-top:2px;font-family:'JetBrains Mono',monospace}
.ann-inactive{opacity:.4}
.ann-acts{display:flex;gap:4px;flex-shrink:0}
/* Password reset modal */
.pw-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);backdrop-filter:blur(5px);z-index:200;place-items:center;padding:16px}
.pw-modal.open{display:grid}
.pw-box{background:var(--s1);border:1px solid var(--b2);border-radius:12px;padding:24px;width:100%;max-width:360px;box-shadow:0 20px 50px var(--shadow)}
.pw-box h3{font-size:14px;margin-bottom:14px}
.pw-box input{width:100%;padding:10px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;color:var(--t1);font-size:14px;outline:none;margin-bottom:12px}
.pw-box input:focus{border-color:var(--p)}
.pw-btns{display:flex;gap:8px;justify-content:flex-end}
.pw-btns button{padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none}
.pw-cancel{background:var(--s3);color:var(--t2)}.pw-save{background:var(--p);color:#fff}
.theme-fab{position:fixed;right:20px;bottom:20px;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--p),#6d28d9);color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.35);transition:transform .15s,box-shadow .15s;z-index:1000;font-size:1rem}
.theme-fab:hover{transform:scale(1.08);box-shadow:0 6px 16px rgba(0,0,0,.45)}
.theme-menu{position:fixed;right:20px;bottom:76px;min-width:190px;background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:6px;box-shadow:0 8px 24px var(--shadow);display:flex;flex-direction:column;gap:2px;z-index:1000}
.theme-menu[hidden]{display:none}
.theme-option{display:flex;align-items:center;gap:10px;padding:8px 12px;background:none;border:1px solid transparent;border-radius:8px;color:var(--t1);font-size:12px;text-align:left;cursor:pointer;font-family:inherit;transition:.15s}
.theme-option:hover{background:var(--s2)}
.theme-option.active{border-color:var(--p);color:var(--p2);font-weight:600}
.theme-swatch{width:16px;height:16px;border-radius:50%;border:1px solid var(--b2);flex-shrink:0}
</style></head><body>

<div class="top">
<a href="https://amator.tr/" class="brand" rel="noopener"><i>&#128737;</i><span>amator.tr · Admin</span></a>
<ul class="site-links">
<li><a href="https://amator.tr/tutorials/" rel="noopener">Tutorial'lar</a></li>
<li><a href="https://amator.tr/role-export/" rel="noopener">Röle</a></li>
<li><a href="https://amator.tr/araclar/anten-hesaplayici/" rel="noopener">Anten</a></li>
<li><a href="https://amator.tr/araclar/ctcss-ton-bulucu/" rel="noopener">CTCSS</a></li>
<li><a href="https://amator.tr/araclar/maidenhead-grid/" rel="noopener">Maidenhead</a></li>
<li><a href="https://amator.tr/araclar/propagasyon-durumu/" rel="noopener">Propagasyon</a></li>
<li><a href="https://amator.tr/araclar/lisans-sinavi/" rel="noopener">Sınav</a></li>
<li><a href="https://amator.tr/sozluk" rel="noopener">Sözlük</a></li>
<li><a href="/">Çağrı Defteri</a></li>
<li><a href="/admin" class="active">Admin</a></li>
</ul>
<div class="top-r">
<span style="font-size:12px;color:var(--t3)">${e(user.display_name||user.username)}</span>
<a href="/" class="tbtn">Ana Sayfa</a>
<a href="/logout" class="tbtn" style="color:var(--r)">Cikis</a>
</div></div>

<div class="wrap">
<div class="tabs">
<div class="tab active" data-tab="users">Kullanicilar</div>
<div class="tab" data-tab="settings">Ayarlar</div>
<div class="tab" data-tab="announcements">Duyurular</div>
<div class="tab" data-tab="activity">Aktiviteler</div>
<div class="tab" data-tab="logs">Giris Loglari</div>
<div class="tab" data-tab="operators">Tum Operatorler</div>
</div>

<div class="panel active" id="p-users">
<div class="stat-row" id="userStats"></div>
<div class="card">
<div class="card-h">Kullanicilar</div>
<div class="search-box"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" id="userSearch" placeholder="Kullanici ara..."><span class="s-count" id="userCount"></span></div>
<div class="responsive-table"><table><thead><tr><th>ID</th><th>Kullanici</th><th>Gorunen Ad</th><th>Rol</th><th>Kayit</th><th>Son Giris</th><th>Islem</th></tr></thead><tbody id="userBody"></tbody></table></div>
</div></div>

<div class="panel" id="p-settings">
<div class="card">
<div class="card-h">Sistem Ayarlari</div>
<div class="toggle-row">
<div><div class="toggle-lbl">Kayit Acik</div><div class="toggle-desc">Yeni kullanicilarin kayit olmasina izin ver</div></div>
<label class="toggle"><input type="checkbox" id="regToggle"><span class="slider"></span></label>
</div>
</div>
<div class="card">
<div class="card-h">Yedekleme / Geri Yukleme</div>
<div style="display:flex;flex-direction:column;gap:12px">
<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--b1)">
<div><div style="font-size:14px;font-weight:500">Tum Veriyi Yedekle</div><div style="font-size:12px;color:var(--t3);margin-top:2px">Kullanicilar, operatorler, ayarlar, duyurular, loglar - JSON</div></div>
<button class="act-btn act-btn-g" id="backupBtn">Yedekle</button>
</div>
<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0">
<div><div style="font-size:14px;font-weight:500">Yedekten Geri Yukle</div><div style="font-size:12px;color:var(--t3);margin-top:2px">JSON yedek dosyasindan tum veriyi geri yukle</div></div>
<div style="display:flex;gap:6px;align-items:center"><input type="file" accept=".json" id="restoreFile" style="display:none"><button class="act-btn" id="restoreBtn" style="color:var(--y);border-color:rgba(251,191,36,.15)">Geri Yukle</button></div>
</div>
</div>
</div></div>

<div class="panel" id="p-announcements">
<div class="card">
<div class="card-h">Yeni Duyuru</div>
<div style="display:flex;flex-direction:column;gap:10px">
<input type="text" id="annTitle" placeholder="Baslik" style="padding:10px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;color:var(--t1);font-size:13px;outline:none">
<textarea id="annContent" placeholder="Icerik" rows="3" style="padding:10px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;color:var(--t1);font-size:13px;outline:none;resize:vertical;font-family:inherit"></textarea>
<div style="display:flex;gap:8px;align-items:center">
<select id="annType" style="padding:8px 12px;background:var(--s2);border:1px solid var(--b1);border-radius:6px;color:var(--t1);font-size:12px;outline:none"><option value="info">Bilgi</option><option value="warning">Uyari</option><option value="success">Basari</option></select>
<button class="act-btn act-btn-g" id="annAdd">Yayinla</button>
</div></div></div>
<div class="card">
<div class="card-h">Mevcut Duyurular</div>
<div id="annList"></div>
</div></div>

<div class="panel" id="p-activity">
<div class="card">
<div class="card-h">Aktivite Loglari</div>
<div class="search-box"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" id="actSearch" placeholder="Kullanici, islem ara..."><span class="s-count" id="actCount"></span></div>
<div class="responsive-table"><table><thead><tr><th>Tarih</th><th>Kullanici</th><th>Islem</th><th>Detay</th></tr></thead><tbody id="actBody"></tbody></table></div>
<div class="pager" id="actPager"></div>
</div></div>

<div class="panel" id="p-logs">
<div class="card">
<div class="card-h">Giris Loglari</div>
<div class="search-box"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" id="logSearch" placeholder="Kullanici veya IP ara..."><span class="s-count" id="logCount"></span></div>
<div class="responsive-table"><table><thead><tr><th>Tarih</th><th>Kullanici</th><th>IP</th><th>Durum</th></tr></thead><tbody id="logBody"></tbody></table></div>
<div class="pager" id="logPager"></div>
</div></div>

<div class="panel" id="p-operators">
<div class="card">
<div class="card-h">Tum Operatorler</div>
<div class="search-box"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" id="opSearch" placeholder="Operator, cagri isareti, sahip ara..."><span class="s-count" id="opCount"></span></div>
<div class="responsive-table"><table><thead><tr><th>ID</th><th>Sahip</th><th>Cagri</th><th>Operator</th><th>QTH</th><th>Hakkinda</th></tr></thead><tbody id="opBody"></tbody></table></div>
</div></div>
</div>

<div class="pw-modal" id="pwModal"><div class="pw-box"><h3 id="pwTitle">Sifre Sifirla</h3><input type="password" id="pwInput" placeholder="Yeni sifre (en az 8 karakter)" minlength="8"><div class="pw-btns"><button class="pw-cancel" id="pwCancel">Iptal</button><button class="pw-save" id="pwSave">Sifirla</button></div></div></div>

<script>
var currentUserId=${user.id};

/* XSS-safe text escaping */
function esc(s){var d=document.createElement('div');d.textContent=s||'';return d.innerHTML}

/* UTC tarih string'ini Istanbul saatine (UTC+3) cevirir */
function toIST(dateStr){
  if(!dateStr||dateStr==='-')return'-';
  try{
    var d=new Date(dateStr+(dateStr.indexOf('Z')===-1&&dateStr.indexOf('+')===-1?' UTC':''));
    return d.toLocaleString('tr-TR',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }catch(e){return dateStr}
}

function toast(msg,ok){var d=document.createElement('div');d.className='toast';d.style.borderColor=ok?'rgba(45,212,191,.3)':'rgba(239,68,68,.3)';d.textContent=msg;document.body.appendChild(d);setTimeout(function(){d.remove()},3000)}

/* Safe DOM builder helpers */
function createEl(tag,attrs,children){
  var el=document.createElement(tag);
  if(attrs){for(var k in attrs){if(k==='className')el.className=attrs[k];else if(k==='style')el.style.cssText=attrs[k];else el.setAttribute(k,attrs[k])}}
  if(typeof children==='string')el.textContent=children;
  else if(Array.isArray(children))children.forEach(function(c){if(c)el.appendChild(c)});
  return el;
}
function textTd(text,cls){var td=document.createElement('td');td.textContent=text||'';if(cls)td.className=cls;return td}
function htmlTd(nodes,cls){var td=document.createElement('td');if(cls)td.className=cls;if(Array.isArray(nodes))nodes.forEach(function(n){if(n)td.appendChild(n)});else if(nodes)td.appendChild(nodes);return td}

/* TABS */
document.querySelectorAll('.tab').forEach(function(t){t.addEventListener('click',function(){
document.querySelectorAll('.tab').forEach(function(x){x.classList.remove('active')});
document.querySelectorAll('.panel').forEach(function(x){x.classList.remove('active')});
t.classList.add('active');
document.getElementById('p-'+t.dataset.tab).classList.add('active');
if(t.dataset.tab==='users')loadUsers();
if(t.dataset.tab==='settings')loadSettings();
if(t.dataset.tab==='announcements')loadAnnouncements();
if(t.dataset.tab==='activity')loadActivity(1);
if(t.dataset.tab==='logs')loadLogs(1);
if(t.dataset.tab==='operators')loadOperators();
})});

/* Fuzzy search helper */
function fuzzy(needle,haystack){
  if(!needle)return true;
  var n=needle.toLowerCase(),h=(haystack||'').toLowerCase();
  return h.indexOf(n)!==-1;
}

/* USERS */
var allUsers=[];
function loadUsers(){
fetch('/api/admin/users').then(function(r){return r.json()}).then(function(d){
allUsers=d.users;
renderUsers(allUsers);
})}

function renderUsers(list){
var stats=document.getElementById('userStats');
var total=allUsers.length;
var admins=allUsers.filter(function(u){return u.role==='admin'}).length;
var totalOps=allUsers.reduce(function(s,u){return s+u.operator_count},0);
stats.textContent='';
[[total,'Toplam Kullanici'],[admins,'Admin'],[totalOps,'Toplam Operator']].forEach(function(s){
  var box=createEl('div',{className:'stat'});
  box.appendChild(createEl('div',{className:'stat-val'},String(s[0])));
  box.appendChild(createEl('div',{className:'stat-lbl'},s[1]));
  stats.appendChild(box);
});

document.getElementById('userCount').textContent=list.length===allUsers.length?'':list.length+'/'+allUsers.length;

var body=document.getElementById('userBody');
body.textContent='';
if(!list.length){var emptyTr=document.createElement('tr');emptyTr.appendChild(createEl('td',{className:'empty',colspan:'7'},'Sonuc yok'));body.appendChild(emptyTr);return}
list.forEach(function(u){
  var tr=document.createElement('tr');
  tr.appendChild(textTd(u.id,'mono'));

  var userTd=document.createElement('td');
  userTd.textContent=u.username;
  if(u.github_id){var gh=createEl('span',{style:'color:var(--t3);font-size:10px;margin-left:4px'},' GH');userTd.appendChild(gh)}
  tr.appendChild(userTd);

  tr.appendChild(textTd(u.display_name));

  var badge=createEl('span',{className:'badge '+(u.role==='admin'?'badge-admin':'badge-user')},u.role.toUpperCase());
  tr.appendChild(htmlTd(badge));

  tr.appendChild(textTd(u.operator_count,'mono'));
  tr.appendChild(textTd(toIST(u.last_login),'mono'));

  var actTd=document.createElement('td');
  if(u.id!==currentUserId){
    if(u.role==='user'){
      var promBtn=createEl('button',{className:'act-btn act-btn-g'},'Admin Yap');
      promBtn.addEventListener('click',function(){changeRole(u.id,'admin')});
      actTd.appendChild(promBtn);
    } else {
      var demBtn=createEl('button',{className:'act-btn'},'User Yap');
      demBtn.addEventListener('click',function(){changeRole(u.id,'user')});
      actTd.appendChild(demBtn);
    }
    actTd.appendChild(document.createTextNode(' '));
    var pwBtn=createEl('button',{className:'act-btn'},'Sifre');
    pwBtn.addEventListener('click',function(){showPwReset(u.id,u.username)});
    actTd.appendChild(pwBtn);
    actTd.appendChild(document.createTextNode(' '));
    var delBtn=createEl('button',{className:'act-btn act-btn-r'},'Sil');
    delBtn.addEventListener('click',function(){deleteUser(u.id,u.username)});
    actTd.appendChild(delBtn);
  }
  tr.appendChild(actTd);
  body.appendChild(tr);
});
}

document.getElementById('userSearch').addEventListener('input',function(){
  var q=this.value.trim();
  if(!q){renderUsers(allUsers);return}
  renderUsers(allUsers.filter(function(u){return fuzzy(q,u.username)||fuzzy(q,u.display_name)||fuzzy(q,u.role)}));
});

loadUsers();

function changeRole(id,role){
fetch('/api/admin/users/'+id+'/role',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({role:role})})
.then(function(r){return r.json()}).then(function(d){if(d.ok){toast('Rol guncellendi',true);loadUsers()}else toast(d.error,false)})}

function deleteUser(id,name){
if(!confirm(name+' kullanicisini ve tum verilerini silmek istediginize emin misiniz?'))return;
fetch('/api/admin/users/'+id,{method:'DELETE'}).then(function(r){return r.json()}).then(function(d){if(d.ok){toast('Kullanici silindi',true);loadUsers()}else toast(d.error,false)})}

/* SETTINGS */
function loadSettings(){
fetch('/api/admin/settings').then(function(r){return r.json()}).then(function(d){
document.getElementById('regToggle').checked=d.settings.registration_open==='true';
})}

document.getElementById('regToggle').addEventListener('change',function(){
var val=this.checked?'true':'false';
fetch('/api/admin/settings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({registration_open:val})})
.then(function(r){return r.json()}).then(function(d){if(d.ok)toast('Ayar kaydedildi',true);else toast('Hata',false)})});

/* LOGS */
var allLogs=[];
function loadLogs(page){
fetch('/api/admin/login-log?page='+page).then(function(r){return r.json()}).then(function(d){
allLogs=d.logs;
document.getElementById('logSearch').value='';
renderLogs(allLogs);
var pager=document.getElementById('logPager');
pager.textContent='';
var prevBtn=createEl('button',{},'Onceki');
if(page<=1)prevBtn.disabled=true;
prevBtn.addEventListener('click',function(){loadLogs(page-1)});
var info=createEl('span',{},page+' / '+d.pages);
var nextBtn=createEl('button',{},'Sonraki');
if(page>=d.pages)nextBtn.disabled=true;
nextBtn.addEventListener('click',function(){loadLogs(page+1)});
pager.appendChild(prevBtn);pager.appendChild(info);pager.appendChild(nextBtn);
})}

function renderLogs(list){
var body=document.getElementById('logBody');
body.textContent='';
document.getElementById('logCount').textContent=list.length===allLogs.length?'':list.length+'/'+allLogs.length;
if(!list.length){var emptyTr=document.createElement('tr');emptyTr.appendChild(createEl('td',{className:'empty',colspan:'4'},'Sonuc yok'));body.appendChild(emptyTr);return}
list.forEach(function(l){
  var tr=document.createElement('tr');
  tr.appendChild(textTd(toIST(l.created_at),'mono'));
  tr.appendChild(textTd(l.username||'-'));
  tr.appendChild(textTd(l.ip,'mono'));
  var badge=createEl('span',{className:'badge '+(l.success?'badge-ok':'badge-fail')},l.success?'Basarili':'Basarisiz');
  tr.appendChild(htmlTd(badge));
  body.appendChild(tr);
});
}

document.getElementById('logSearch').addEventListener('input',function(){
  var q=this.value.trim();
  if(!q){renderLogs(allLogs);return}
  renderLogs(allLogs.filter(function(l){return fuzzy(q,l.username)||fuzzy(q,l.ip)||fuzzy(q,l.created_at)}));
});

/* OPERATORS */
var allOps=[];
function loadOperators(){
fetch('/api/admin/operators').then(function(r){return r.json()}).then(function(d){
allOps=d.operators;
document.getElementById('opSearch').value='';
renderOps(allOps);
})}

function renderOps(list){
var body=document.getElementById('opBody');
body.textContent='';
document.getElementById('opCount').textContent=list.length===allOps.length?'':list.length+'/'+allOps.length;
if(!list.length){var emptyTr=document.createElement('tr');emptyTr.appendChild(createEl('td',{className:'empty',colspan:'6'},'Sonuc yok'));body.appendChild(emptyTr);return}
list.forEach(function(o){
  var tr=document.createElement('tr');
  tr.appendChild(textTd(o.id,'mono'));
  tr.appendChild(textTd(o.username||'?'));
  var csTd=textTd(o.cagri_isareti,'mono');
  csTd.style.color='var(--g)';
  tr.appendChild(csTd);
  tr.appendChild(textTd(o.operator));
  tr.appendChild(textTd(o.qth));
  tr.appendChild(textTd(o.hakkinda));
  body.appendChild(tr);
});
}

document.getElementById('opSearch').addEventListener('input',function(){
  var q=this.value.trim();
  if(!q){renderOps(allOps);return}
  renderOps(allOps.filter(function(o){return fuzzy(q,o.username)||fuzzy(q,o.cagri_isareti)||fuzzy(q,o.operator)||fuzzy(q,o.qth)||fuzzy(q,o.hakkinda)}));
});

/* PASSWORD RESET */
var pwTargetId=null;
function showPwReset(id,name){
  pwTargetId=id;
  document.getElementById('pwTitle').textContent=name+' - Sifre Sifirla';
  document.getElementById('pwInput').value='';
  document.getElementById('pwModal').classList.add('open');
}
document.getElementById('pwCancel').addEventListener('click',function(){document.getElementById('pwModal').classList.remove('open')});
document.getElementById('pwModal').addEventListener('click',function(ev){if(ev.target===this)this.classList.remove('open')});
document.getElementById('pwSave').addEventListener('click',function(){
  var pw=document.getElementById('pwInput').value;
  if(pw.length<8){toast('Sifre en az 8 karakter',false);return}
  fetch('/api/admin/users/'+pwTargetId+'/reset-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})})
    .then(function(r){return r.json()}).then(function(d){if(d.ok){toast('Sifre sifirlandi',true);document.getElementById('pwModal').classList.remove('open')}else toast(d.error,false)});
});

/* ANNOUNCEMENTS */
function loadAnnouncements(){
fetch('/api/admin/announcements').then(function(r){return r.json()}).then(function(d){
  var list=document.getElementById('annList');
  list.textContent='';
  if(!d.announcements.length){list.appendChild(createEl('div',{className:'empty'},'Duyuru yok'));return}
  d.announcements.forEach(function(a){
    var item=createEl('div',{className:'ann-item'+(a.active?'':' ann-inactive')});
    item.appendChild(createEl('div',{className:'ann-type ann-type-'+a.type}));
    var body=createEl('div',{className:'ann-body'});
    body.appendChild(createEl('div',{className:'ann-title'},a.title));
    body.appendChild(createEl('div',{className:'ann-text'},a.content));
    body.appendChild(createEl('div',{className:'ann-meta'},(a.username||'?')+' - '+toIST(a.created_at)));
    item.appendChild(body);
    var acts=createEl('div',{className:'ann-acts'});
    var togBtn=createEl('button',{className:'act-btn'},a.active?'Kapat':'Ac');
    togBtn.addEventListener('click',function(){
      fetch('/api/admin/announcements/'+a.id+'/toggle',{method:'POST'}).then(function(r){return r.json()}).then(function(d){if(d.ok)loadAnnouncements()});
    });
    acts.appendChild(togBtn);
    var delBtn=createEl('button',{className:'act-btn act-btn-r'},'Sil');
    delBtn.addEventListener('click',function(){
      if(!confirm('Duyuruyu silmek istediginize emin misiniz?'))return;
      fetch('/api/admin/announcements/'+a.id,{method:'DELETE'}).then(function(r){return r.json()}).then(function(d){if(d.ok){toast('Duyuru silindi',true);loadAnnouncements()}});
    });
    acts.appendChild(delBtn);
    item.appendChild(acts);
    list.appendChild(item);
  });
})}

document.getElementById('annAdd').addEventListener('click',function(){
  var title=document.getElementById('annTitle').value.trim();
  var content=document.getElementById('annContent').value.trim();
  var type=document.getElementById('annType').value;
  if(!title||!content){toast('Baslik ve icerik gerekli',false);return}
  fetch('/api/admin/announcements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:title,content:content,type:type})})
    .then(function(r){return r.json()}).then(function(d){if(d.ok){toast('Duyuru yayinlandi',true);document.getElementById('annTitle').value='';document.getElementById('annContent').value='';loadAnnouncements()}else toast(d.error,false)});
});

/* ACTIVITY LOG */
var allActs=[];
function loadActivity(page){
fetch('/api/admin/activity-log?page='+page).then(function(r){return r.json()}).then(function(d){
  allActs=d.logs;
  document.getElementById('actSearch').value='';
  renderActs(allActs);
  var pager=document.getElementById('actPager');
  pager.textContent='';
  var prevBtn=createEl('button',{},'Onceki');
  if(page<=1)prevBtn.disabled=true;
  prevBtn.addEventListener('click',function(){loadActivity(page-1)});
  var info=createEl('span',{},page+' / '+d.pages);
  var nextBtn=createEl('button',{},'Sonraki');
  if(page>=d.pages)nextBtn.disabled=true;
  nextBtn.addEventListener('click',function(){loadActivity(page+1)});
  pager.appendChild(prevBtn);pager.appendChild(info);pager.appendChild(nextBtn);
})}

function renderActs(list){
  var body=document.getElementById('actBody');
  body.textContent='';
  document.getElementById('actCount').textContent=list.length===allActs.length?'':list.length+'/'+allActs.length;
  if(!list.length){var emptyTr=document.createElement('tr');emptyTr.appendChild(createEl('td',{className:'empty',colspan:'4'},'Aktivite yok'));body.appendChild(emptyTr);return}
  list.forEach(function(a){
    var tr=document.createElement('tr');
    tr.appendChild(textTd(toIST(a.created_at),'mono'));
    tr.appendChild(textTd(a.username||'?'));
    tr.appendChild(textTd(a.action));
    tr.appendChild(textTd(a.detail));
    body.appendChild(tr);
  });
}

document.getElementById('actSearch').addEventListener('input',function(){
  var q=this.value.trim();
  if(!q){renderActs(allActs);return}
  renderActs(allActs.filter(function(a){return fuzzy(q,a.username)||fuzzy(q,a.action)||fuzzy(q,a.detail)}));
});

/* BACKUP */
document.getElementById('backupBtn').addEventListener('click',function(){
  var pw=prompt('Yedekleme için mevcut şifreni gir:');
  if(!pw)return;
  var btn=this;btn.disabled=true;btn.textContent='Hazirlaniyor...';
  fetch('/api/admin/backup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})})
    .then(function(r){return r.json().then(function(d){return {ok:r.ok,d:d}})})
    .then(function(res){
      if(!res.ok){toast(res.d.error||'Yedekleme reddedildi',false);return}
      var blob=new Blob([JSON.stringify(res.d,null,2)],{type:'application/json'});
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a');
      a.href=url;a.download='radyo-rehberi-backup-'+new Date().toISOString().slice(0,10)+'.json';
      a.click();URL.revokeObjectURL(url);
      toast('Yedek indirildi',true);
    }).catch(function(){toast('Yedekleme hatasi',false)}).finally(function(){btn.disabled=false;btn.textContent='Yedekle'});
});

/* RESTORE */
document.getElementById('restoreBtn').addEventListener('click',function(){document.getElementById('restoreFile').click()});
document.getElementById('restoreFile').addEventListener('change',function(){
  var file=this.files[0];if(!file)return;
  if(!confirm('DIKKAT: Bu islem mevcut tum veriyi silip yedekteki veri ile degistirecek. Devam etmek istiyor musunuz?')){this.value='';return}
  var pw=prompt('Geri yükleme için mevcut şifreni gir:');
  if(!pw){this.value='';return}
  var reader=new FileReader();
  var fileInput=this;
  reader.onload=function(ev){
    try{
      var data=JSON.parse(ev.target.result);
      if(!data.version||!data.users||!data.operatorler){toast('Gecersiz yedek dosyasi',false);return}
      data.password=pw;
      var btn=document.getElementById('restoreBtn');btn.disabled=true;btn.textContent='Yukleniyor...';
      fetch('/api/admin/restore',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json()}).then(function(d){
          if(d.ok){toast('Geri yukleme tamamlandi! Sayfa yenileniyor...',true);setTimeout(function(){location.reload()},1500)}
          else toast(d.error||'Geri yukleme hatasi',false);
        }).catch(function(){toast('Baglanti hatasi',false)}).finally(function(){btn.disabled=false;btn.textContent='Geri Yukle'});
    }catch(e){toast('JSON parse hatasi',false)}
  };
  reader.readAsText(file,'UTF-8');
  fileInput.value='';
});
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
</body></html>`
}
