function e(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function toIST(d){if(!d||d==='-')return'-';try{return new Date(d+(d.indexOf('Z')===-1&&d.indexOf('+')===-1?' UTC':'')).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})}catch(e){return d}}

export function profilePage({user, activities, success, error}){
return`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Profil - Radyo Rehberi</title>
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
html[data-size="xs"] body{zoom:0.85}html[data-size="sm"] body{zoom:0.92}html[data-size="md"] body{zoom:1}html[data-size="lg"] body{zoom:1.08}html[data-size="xl"] body{zoom:1.18}
body{background:var(--bg);color:var(--t1);font-family:'Inter',system-ui,sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased}
.top{position:sticky;top:0;z-index:90;background:var(--top-bg);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--b1);height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 24px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--t1)}.brand:hover{opacity:.85}.brand i{width:30px;height:30px;background:linear-gradient(135deg,var(--p),#6d28d9);border-radius:8px;display:grid;place-items:center;font-style:normal;font-size:14px;color:#fff}.brand span{font-size:14px;font-weight:700}
.site-links{display:none;gap:2px;list-style:none;margin:0 0 0 8px;padding:0}@media(min-width:1000px){.site-links{display:flex}}
.site-links a{padding:6px 10px;border-radius:6px;font-size:12px;font-weight:500;color:var(--t2);text-decoration:none;transition:.15s}.site-links a:hover{background:var(--s2);color:var(--t1)}.site-links a.active{color:var(--p2);background:var(--pg)}
.top-r{display:flex;gap:6px;align-items:center;margin-left:auto}
.tbtn{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:500;text-decoration:none;border:1px solid var(--b1);transition:.15s;cursor:pointer;display:inline-flex;align-items:center;gap:4px;background:var(--s2);color:var(--t2)}.tbtn:hover{border-color:var(--b2);background:var(--s3)}
.wrap{max-width:700px;margin:0 auto;padding:20px 14px}
@media(min-width:768px){.wrap{padding:24px}}
.card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);padding:24px;margin-bottom:16px}
.card-h{font-size:15px;font-weight:700;margin-bottom:16px}
.avatar-area{display:flex;align-items:center;gap:16px;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid var(--b1)}
.avatar{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--p),var(--p2));display:grid;place-items:center;font-size:22px;font-weight:700;color:#fff}
.avatar img{width:56px;height:56px;border-radius:14px;object-fit:cover}
.user-info h2{font-size:18px;font-weight:700}.user-info p{font-size:12px;color:var(--t3);margin-top:2px}
.user-info .role-badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;text-transform:uppercase;margin-left:6px}
.role-admin{background:rgba(251,191,36,.1);color:var(--y)}.role-user{background:var(--pg);color:var(--p2)}
.fg{margin-bottom:16px}.fg label{display:block;font-size:12px;font-weight:600;color:var(--t3);margin-bottom:6px;text-transform:uppercase;letter-spacing:.4px}
.fg input{width:100%;padding:10px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;color:var(--t1);font-size:14px;outline:none;transition:.15s}
.fg input:focus{border-color:var(--p);box-shadow:0 0 0 3px var(--pg)}
.fg input::placeholder{color:var(--t3)}
.fg .hint{font-size:10px;color:var(--t3);margin-top:4px}
.btn{padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:.15s}
.btn-p{background:var(--p);color:#fff}.btn-p:hover{background:#7c3aed}
.btn-s{background:var(--s3);color:var(--t2)}.btn-s:hover{background:var(--s2)}
.btn-row{display:flex;gap:8px;justify-content:flex-end}
.msg{padding:12px 16px;border-radius:8px;font-size:13px;margin-bottom:16px;text-align:center}
.msg-ok{background:rgba(45,212,191,.1);border:1px solid rgba(45,212,191,.2);color:var(--g)}
.msg-err{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:var(--r)}
.activity-list{max-height:300px;overflow-y:auto}
.act-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--b1);font-size:12px}
.act-item:last-child{border-bottom:none}
.act-icon{width:28px;height:28px;border-radius:6px;display:grid;place-items:center;flex-shrink:0;font-size:12px}
.act-add{background:var(--gg);color:var(--g)}
.act-edit{background:rgba(251,191,36,.08);color:var(--y)}
.act-del{background:var(--rg);color:var(--r)}
.act-other{background:var(--pg);color:var(--p2)}
.act-text{flex:1;color:var(--t2);line-height:1.4}
.act-text b{color:var(--t1);font-weight:600}
.act-time{font-size:10px;color:var(--t3);font-family:'JetBrains Mono',monospace;white-space:nowrap;flex-shrink:0}
.empty{text-align:center;padding:24px;color:var(--t3);font-size:13px}
.mono{font-family:'JetBrains Mono',monospace}
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
<a href="https://amator.tr/" class="brand" rel="noopener"><i>&#128225;</i><span>amator.tr</span></a>
<ul class="site-links">
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
<div class="top-r">
<a href="/" class="tbtn">Ana Sayfa</a>
<a href="/logout" class="tbtn" style="color:var(--r)">Cikis</a>
</div></div>

<div class="wrap">
${success?'<div class="msg msg-ok">'+e(success)+'</div>':''}
${error?'<div class="msg msg-err">'+e(error)+'</div>':''}

<div class="card">
<div class="avatar-area">
<div class="avatar">${user.avatar_url?'<img src="'+e(user.avatar_url)+'" alt="">':e((user.display_name||user.username||'?')[0].toUpperCase())}</div>
<div class="user-info">
<h2>${e(user.display_name||user.username)}<span class="role-badge role-${e(user.role)}">${e(user.role)}</span></h2>
<p>@${e(user.username)} &middot; Uye: ${e(toIST(user.created_at).split(' ')[0]||'-')}</p>
</div></div>

<div class="card-h">Profil Bilgileri</div>
<form method="POST" action="/profil/guncelle">
<div class="fg"><label>Gorunen Ad</label><input type="text" name="display_name" value="${e(user.display_name)}" placeholder="Adiniz Soyadiniz" maxlength="50"></div>
<div class="btn-row"><button type="submit" class="btn btn-p">Kaydet</button></div>
</form>
</div>

<div class="card">
<div class="card-h">Sifre Degistir</div>
<form method="POST" action="/profil/sifre">
<div class="fg"><label>Mevcut Sifre</label><input type="password" name="current_password" required></div>
<div class="fg"><label>Yeni Sifre</label><input type="password" name="new_password" required minlength="8"><div class="hint">En az 8 karakter, 1 rakam veya ozel karakter</div></div>
<div class="fg"><label>Yeni Sifre Tekrar</label><input type="password" name="new_password2" required minlength="8"></div>
<div class="btn-row"><button type="submit" class="btn btn-p">Sifreyi Degistir</button></div>
</form>
</div>

<div class="card">
<div class="card-h">Son Aktiviteler</div>
<div class="activity-list">
${activities.length?activities.map(function(a){
  var icon=a.action.includes('ekle')||a.action.includes('create')?'act-add':a.action.includes('sil')||a.action.includes('delete')?'act-del':a.action.includes('duzenle')||a.action.includes('update')?'act-edit':'act-other';
  var sym=icon==='act-add'?'+':icon==='act-del'?'-':icon==='act-edit'?'~':'*';
  return'<div class="act-item"><div class="act-icon '+icon+'">'+sym+'</div><div class="act-text"><b>'+e(a.action)+'</b> '+e(a.detail||'')+'</div><div class="act-time">'+e(toIST(a.created_at))+'</div></div>';
}).join(''):'<div class="empty">Henuz aktivite yok</div>'}
</div></div>
</div>
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
