function e(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function row(k){return`<tr data-id="${k.id}"><td class="c-sel"><input type="checkbox" class="sel-cb row-cb" data-id="${k.id}"></td><td class="c-cs"><button class="cs-btn" data-cs="${e(k.cagri_isareti)}"><span class="cs">${e(k.cagri_isareti)}</span></button><a href="https://www.qrz.com/db/${e(k.cagri_isareti)}" target="_blank" rel="noopener" class="qrz-link" title="QRZ.com">Q</a></td><td class="c-nm">${e(k.operator)}</td><td class="c-qt">${e(k.qth)}</td><td class="c-ab">${e(k.hakkinda)}</td><td class="c-act"><button class="ib ib-e" data-id="${k.id}" data-op="${e(k.operator)}" data-cs="${e(k.cagri_isareti)}" data-qt="${e(k.qth||'')}" data-ab="${e(k.hakkinda||'')}"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="ib ib-d" data-id="${k.id}"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button></td></tr>`}

function nlPanel(){return`<div class="pnl nl-container" style="border:1px solid var(--b1);border-radius:var(--rad)">
<div class="pnl-h"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Dogal Dil ile Ekle</div>
<div class="nl-w">
<textarea class="nl-area" placeholder="Ornek: Ahmet TA1AHM Kadikoy'de oturuyor, elektronik muhendisi. Mehmet TB2MHT Tuzla'da yasıyor."></textarea>
<div class="nl-hint">Bir veya birden fazla telsizci bilgisi yazin. AI ayristirip sirayla onaylatacak.</div>
<div class="nl-actions"><button class="btn-g nl-btn">Analiz Et</button></div>
<div class="nl-queue"></div>
</div></div>`}

function astPanel(){return`<div class="pnl ast-container" style="border:1px solid var(--b1);border-radius:var(--rad)">
<div class="pnl-h"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Asistan <span class="ast-model-tag"></span></div>
<div class="a-w">
<div class="a-inp"><input type="text" class="aI" placeholder="Telsiz konularinda sor..." maxlength="400"><button class="aB">Sor</button></div>
<div class="a-out aO"></div>
</div></div>`}

export function mainPage({kayitlar,total,user}){
const rows=kayitlar.map(k=>row(k)).join('');
const dj=JSON.stringify(kayitlar.map(k=>({id:k.id,operator:k.operator||'',cagri_isareti:k.cagri_isareti||'',qth:k.qth||'',hakkinda:k.hakkinda||''})));
const isAdmin=user&&user.role==='admin';
const userName=e(user&&user.display_name||user&&user.username||'');
return`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><title>Radyo Rehberi</title>
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
.top{position:sticky;top:0;z-index:90;background:var(--top-bg);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--b1);height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;transition:background .25s}
@media(min-width:768px){.top{padding:0 24px}}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--t1)}.brand:hover{opacity:.85}.brand i{width:30px;height:30px;background:linear-gradient(135deg,var(--p),#6d28d9);border-radius:8px;display:grid;place-items:center;font-style:normal;font-size:14px;color:#fff}.brand span{font-size:14px;font-weight:700}
.site-links{display:none;gap:2px;list-style:none;margin:0 0 0 8px;padding:0}@media(min-width:1000px){.site-links{display:flex}}
.site-links a{padding:6px 10px;border-radius:6px;font-size:12px;font-weight:500;color:var(--t2);text-decoration:none;transition:.15s}.site-links a:hover{background:var(--s2);color:var(--t1)}.site-links a.active{color:var(--p2);background:var(--pg)}
.top-r{display:flex;gap:6px;align-items:center;margin-left:auto}
.tbtn{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:500;text-decoration:none;border:1px solid var(--b1);transition:.15s;cursor:pointer;display:inline-flex;align-items:center;gap:4px;background:var(--s2);color:var(--t2)}
.tbtn:hover{border-color:var(--b2);background:var(--s3)}
.tbtn-r{color:var(--r);background:var(--rg);border-color:rgba(239,68,68,.08)}
.tbtn-admin{color:var(--y);background:rgba(251,191,36,.08);border-color:rgba(251,191,36,.12)}
.user-badge{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px;background:var(--pg);color:var(--p2);border:1px solid rgba(139,92,246,.12)}
.ham{display:flex;align-items:center;gap:5px;color:var(--p2);background:var(--pg);border-color:rgba(139,92,246,.12)}
@media(min-width:1024px){.ham{display:none}}
.model-sel{padding:5px 10px;border-radius:6px;font-size:10px;font-weight:500;border:1px solid var(--b1);cursor:pointer;background:var(--s2);color:var(--g);border-color:rgba(45,212,191,.12);font-family:'JetBrains Mono',monospace;outline:none;transition:.15s}
.model-sel option{background:var(--s1);color:var(--t1)}
.wrap{max-width:1480px;margin:0 auto;padding:14px}
@media(min-width:768px){.wrap{padding:20px 24px}}
@media(min-width:1024px){.wrap{display:grid;grid-template-columns:1fr 340px;gap:18px;align-items:start}}
.left{display:flex;flex-direction:column;gap:12px;min-width:0}
.srch-bar{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);padding:10px 14px;display:flex;align-items:center;gap:10px;transition:border-color .2s,box-shadow .2s;position:relative}
.srch-bar svg{color:var(--t3);flex-shrink:0}
#q{flex:1;padding:0;background:none;border:none;color:var(--t1);font-size:14px;outline:none;min-width:0}
#q::placeholder{color:var(--t3)}
.srch-bar:focus-within{border-color:var(--p);box-shadow:0 0 0 3px var(--pg)}
.srch-hist{display:none;position:absolute;top:100%;left:0;right:0;background:var(--s1);border:1px solid var(--b2);border-radius:0 0 var(--rad) var(--rad);box-shadow:0 8px 24px var(--shadow);z-index:50;max-height:240px;overflow-y:auto}
.srch-hist.open{display:block}
.srch-hist-item{padding:8px 14px;font-size:13px;color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:.1s}
.srch-hist-item:hover{background:var(--pg);color:var(--t1)}
.srch-hist-item .sh-x{font-size:10px;color:var(--t3);padding:2px 6px;border-radius:3px;opacity:0;transition:.1s}
.srch-hist-item:hover .sh-x{opacity:1}
.srch-hist-item .sh-x:hover{background:var(--rg);color:var(--r)}
.srch-hist-lbl{padding:6px 14px;font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;font-weight:600;border-bottom:1px solid var(--b1)}
.srch-tags{display:flex;gap:6px;flex-shrink:0;align-items:center}
.tag{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;font-family:'JetBrains Mono',monospace;letter-spacing:.3px}
.tag-total{background:var(--pg);color:var(--p2)}
.tag-found{background:rgba(45,212,191,.12);color:var(--g);display:none}
.tag small{font-weight:400;opacity:.7;font-family:inherit}
.add-sec{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden}
.add-h{width:100%;padding:10px 14px;background:none;border:none;color:var(--p2);font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;transition:.15s}
.add-h:hover{background:var(--pg)}.add-h svg{transition:transform .2s}.add-h.open svg{transform:rotate(45deg)}
.add-b{display:none;padding:0 14px 14px}.add-b.open{display:block}
.add-g{display:grid;grid-template-columns:1fr;gap:8px}
@media(min-width:600px){.add-g{grid-template-columns:1fr 1fr}}
.inp{padding:9px 12px;background:var(--bg);border:1px solid var(--b1);border-radius:7px;color:var(--t1);font-size:13px;outline:none;transition:.15s}.inp:focus{border-color:var(--p)}.inp::placeholder{color:var(--t3)}
.add-act{margin-top:8px;display:flex;justify-content:flex-end}
.btn-p{padding:8px 20px;background:var(--p);border:none;border-radius:7px;color:#fff;font-size:13px;font-weight:600;cursor:pointer}.btn-p:disabled{opacity:.4;cursor:not-allowed}
.tbl-w{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden}
.tbl-s{overflow-x:auto;overflow-y:auto;max-height:calc(100vh - 300px);max-height:calc(100dvh - 300px);scrollbar-width:thin;scrollbar-color:var(--s3) transparent;-webkit-overflow-scrolling:touch}
@media(min-width:1024px){.tbl-s{max-height:calc(100vh - 260px)}}
table{width:100%;border-collapse:collapse;font-size:13px}
thead{position:sticky;top:0;z-index:2}
thead th{padding:9px 12px;text-align:left;font-size:10px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;background:var(--s2);border-bottom:1px solid var(--b1);white-space:nowrap}
tbody tr{border-bottom:1px solid var(--b1);transition:.1s}tbody tr:last-child{border-bottom:none}tbody tr:hover{background:var(--pg)}
td{padding:8px 12px;vertical-align:middle}
.c-cs{white-space:nowrap}.cs-btn{background:none;border:none;cursor:pointer;padding:0}
.cs{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:var(--p2);letter-spacing:.8px;background:var(--pg);padding:2px 7px;border-radius:4px;display:inline-block;transition:.15s}
.cs-btn:hover .cs{background:rgba(139,92,246,.2);box-shadow:0 0 0 2px rgba(139,92,246,.2)}
.qrz-link{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:3px;font-size:9px;font-weight:800;color:var(--y);background:rgba(251,191,36,.08);text-decoration:none;margin-left:4px;vertical-align:middle;transition:.15s;font-family:'JetBrains Mono',monospace;border:1px solid rgba(251,191,36,.12)}
.qrz-link:hover{background:rgba(251,191,36,.2);transform:scale(1.1)}
.c-nm{font-weight:500;white-space:nowrap}.c-qt{color:var(--g);font-size:11px;white-space:nowrap}
.c-ab{color:var(--t2);font-size:11px;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.c-act{white-space:nowrap;text-align:right;width:60px}
.ib{width:26px;height:26px;border-radius:5px;border:none;background:transparent;color:var(--t3);cursor:pointer;display:inline-grid;place-items:center;transition:.12s}
.ib-e:hover{color:var(--y);background:rgba(251,191,36,.07)}.ib-d:hover{color:var(--r);background:var(--rg)}
.empty-row{text-align:center;padding:36px;color:var(--t3);font-style:italic}
@media(max-width:599px){thead{display:none}tbody tr{display:grid;grid-template-columns:auto 1fr auto;gap:2px 8px;padding:12px;border-bottom:1px solid var(--b1)}td{padding:0}.c-sel{grid-column:1;grid-row:1/4;display:flex;align-items:center}.c-cs{grid-column:2;grid-row:1;margin-bottom:4px}.c-nm{grid-column:2;grid-row:2}.c-qt{grid-column:2;grid-row:3}.c-ab{grid-column:1/-1;grid-row:4;max-width:100%;margin-top:4px;padding-top:6px;border-top:1px solid var(--b1)}.c-act{grid-column:3;grid-row:1/4;display:flex;flex-direction:column;gap:4px;align-items:flex-end;justify-content:center}}
.right{display:none;flex-direction:column;gap:12px}
@media(min-width:1024px){.right{display:flex;position:sticky;top:66px}}
.drawer-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:150;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}.drawer-bg.open{display:block}
.drawer{position:fixed;top:0;right:-340px;width:320px;max-width:85vw;height:100%;background:var(--s1);border-left:1px solid var(--b1);z-index:160;transition:right .25s ease;overflow-y:auto;display:flex;flex-direction:column}.drawer.open{right:0}
.drawer-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--b1);flex-shrink:0}.drawer-head h2{font-size:14px;font-weight:600}
.drawer-close{width:32px;height:32px;border-radius:6px;border:none;background:var(--s3);color:var(--t2);cursor:pointer;display:grid;place-items:center;font-size:18px}
.drawer-body{flex:1;overflow-y:auto;padding-bottom:20px}
@media(min-width:1024px){.drawer-bg,.drawer{display:none!important}}
.pnl{overflow:hidden}.pnl-h{padding:10px 14px;font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--b1);display:flex;align-items:center;gap:7px}.pnl-h svg{flex-shrink:0;color:var(--p2)}
.nl-w{padding:12px}.nl-area{width:100%;min-height:60px;padding:10px;background:var(--bg);border:1px solid var(--b1);border-radius:7px;color:var(--t1);font-size:13px;font-family:inherit;outline:none;resize:vertical;transition:.15s}.nl-area:focus{border-color:var(--g)}.nl-area::placeholder{color:var(--t3)}
.nl-hint{font-size:10px;color:var(--t3);margin-top:4px;line-height:1.4}
.nl-actions{margin-top:8px;display:flex;gap:6px;justify-content:flex-end}
.btn-g{padding:7px 16px;background:var(--gg);border:1px solid rgba(45,212,191,.15);border-radius:7px;color:var(--g);font-size:12px;font-weight:600;cursor:pointer}.btn-g:disabled{opacity:.4;cursor:not-allowed}
.q-head{display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding:6px 0}
.q-count{font-size:11px;color:var(--t3);font-weight:500}.q-count b{color:var(--p2);font-family:'JetBrains Mono',monospace}
.q-batch{display:flex;gap:6px}
.q-all-ok{padding:5px 12px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid rgba(45,212,191,.2);background:var(--gg);color:var(--g)}
.q-all-clr{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:500;cursor:pointer;border:1px solid var(--b1);background:var(--s3);color:var(--t3)}
.q-item{margin-top:8px;background:var(--s2);border:1px solid var(--b2);border-radius:8px;padding:10px;position:relative;transition:all .2s}
.q-item.saving{opacity:.5;pointer-events:none}
.q-item.saved{border-color:rgba(45,212,191,.3);background:rgba(45,212,191,.04)}
.q-item.saved .q-btns{display:none}
.q-item.saved::after{content:'\\2713 Kaydedildi';position:absolute;top:8px;right:10px;font-size:10px;color:var(--g);font-weight:600}
.q-rm{animation:qrm .25s ease forwards}@keyframes qrm{to{opacity:0;max-height:0;margin:0;padding:0;overflow:hidden}}
.q-label{font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px}
.q-inp{width:100%;padding:5px 8px;background:var(--bg);border:1px solid var(--b1);border-radius:5px;color:var(--t1);font-size:12px;outline:none;margin-bottom:6px}.q-inp:focus{border-color:var(--p)}
.q-inp-cs{font-family:'JetBrains Mono',monospace;color:var(--p2)}
.q-btns{display:flex;gap:6px;justify-content:flex-end;margin-top:4px}
.q-btns button{padding:5px 12px;border-radius:5px;font-size:11px;font-weight:600;cursor:pointer;border:none;transition:.15s}
.q-ok{background:var(--g);color:#000}.q-ok:hover{filter:brightness(1.1)}
.q-skip{background:var(--s3);color:var(--t2)}.q-skip:hover{background:rgba(239,68,68,.12);color:var(--r)}
.a-w{padding:10px 12px}.a-inp{display:flex;gap:6px}
.a-inp input{flex:1;min-width:0;padding:8px 10px;background:var(--bg);border:1px solid var(--b1);border-radius:6px;color:var(--t1);font-size:13px;outline:none}.a-inp input:focus{border-color:var(--g)}.a-inp input::placeholder{color:var(--t3)}
.a-inp button{padding:8px 12px;background:var(--gg);border:1px solid rgba(45,212,191,.12);border-radius:6px;color:var(--g);font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap}
.a-out{margin-top:8px;padding:10px;background:var(--bg);border:1px solid var(--b1);border-radius:6px;font-size:12px;line-height:1.6;color:var(--t2);display:none;max-height:220px;overflow-y:auto;white-space:pre-wrap;word-break:break-word}.a-out.show{display:block}.a-ld{color:var(--p2);font-style:italic}
.ast-model-tag{font-size:9px;color:var(--g);font-family:'JetBrains Mono',monospace;margin-left:4px}
/* Modals shared */
.modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);z-index:200;place-items:center;padding:16px}.modal-bg.open{display:grid}
.modal-box{background:var(--s1);border:1px solid var(--b2);border-radius:12px;padding:20px;width:100%;box-shadow:0 20px 50px var(--shadow);max-height:90vh;overflow-y:auto}
.modal-box h3{font-size:14px;margin-bottom:14px;font-weight:600}
/* Edit modal */
.m-box{max-width:420px}
.fg{display:flex;flex-direction:column;gap:3px;margin-bottom:8px}.fl{font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;font-weight:600}
.fi{padding:8px 10px;background:var(--bg);border:1px solid var(--b1);border-radius:6px;color:var(--t1);font-size:13px;outline:none}.fi:focus{border-color:var(--p)}.fi-cs{font-family:'JetBrains Mono',monospace;color:var(--p2)}
.m-btns{display:flex;justify-content:flex-end;gap:6px;margin-top:14px}
.m-btns button{padding:7px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none}
.bc{background:var(--s3);color:var(--t2)}.bs{background:var(--p);color:#fff}.bs:hover{background:#7c3aed}
/* Phonetic modal */
.ph-box{max-width:380px;text-align:center;padding:24px}
.ph-cs{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;color:var(--p2);letter-spacing:3px;margin-bottom:16px}
.ph-list{text-align:left}.ph-item{display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--b1)}.ph-item:last-child{border-bottom:none}
.ph-char{width:28px;height:28px;border-radius:6px;background:var(--pg);color:var(--p2);font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;display:grid;place-items:center;flex-shrink:0}
.ph-word{font-size:14px;color:var(--t1);font-weight:500}
.ph-close{margin-top:16px;padding:8px 24px;background:var(--s3);border:none;border-radius:7px;color:var(--t2);font-size:12px;font-weight:600;cursor:pointer}
/* CSV Modal */
.csv-box{max-width:600px}
.csv-choice{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px}
.csv-opt{padding:24px 16px;background:var(--s2);border:1px solid var(--b1);border-radius:10px;cursor:pointer;text-align:center;transition:.15s}
.csv-opt:hover{border-color:var(--p);background:var(--pg)}
.csv-opt svg{display:block;margin:0 auto 8px;color:var(--p2)}
.csv-opt-t{font-size:13px;font-weight:600;color:var(--t1)}.csv-opt-d{font-size:10px;color:var(--t3);margin-top:2px}
.csv-step{display:none}.csv-step.active{display:block}
.csv-drop{border:2px dashed var(--b2);border-radius:10px;padding:32px 16px;text-align:center;cursor:pointer;transition:.15s;margin-top:10px}
.csv-drop:hover,.csv-drop.drag{border-color:var(--p);background:var(--pg)}
.csv-drop-t{font-size:13px;color:var(--t2);margin-top:6px}.csv-drop-s{font-size:10px;color:var(--t3);margin-top:2px}
.csv-file-inp{display:none}
.csv-summary{margin-top:14px;background:var(--s2);border-radius:8px;padding:12px;font-size:12px}
.csv-summary-row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--b1)}.csv-summary-row:last-child{border:none}
.csv-summary-label{color:var(--t2)}.csv-summary-val{font-weight:600;font-family:'JetBrains Mono',monospace}
.csv-val-new{color:var(--g)}.csv-val-dup{color:var(--t3)}.csv-val-conf{color:var(--y)}
.csv-conflicts{margin-top:12px;max-height:300px;overflow-y:auto}
.csv-conf-item{background:var(--s2);border:1px solid var(--b2);border-radius:8px;padding:10px;margin-bottom:8px}
.csv-conf-cs{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:var(--p2);margin-bottom:8px}
.csv-diff{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;font-size:11px}
.csv-diff-h{font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px}
.csv-diff-cur{padding:4px 8px;background:var(--bg);border-radius:4px;color:var(--t2);border:1px solid var(--b1)}
.csv-diff-new{padding:4px 8px;background:rgba(139,92,246,.05);border-radius:4px;color:var(--p2);border:1px solid rgba(139,92,246,.15)}
.csv-radios{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.csv-radios label{font-size:10px;padding:4px 10px;border-radius:5px;cursor:pointer;border:1px solid var(--b1);background:var(--s3);color:var(--t2);transition:.15s}
.csv-radios input{display:none}
.csv-radios input:checked+span{background:var(--pg);color:var(--p2);border-color:var(--p)}
.csv-radios label:has(input:checked){background:var(--pg);color:var(--p2);border-color:var(--p)}
.csv-batch-bar{display:flex;gap:6px;align-items:center;margin-top:10px;padding:8px;background:var(--s2);border-radius:8px;font-size:11px}
.csv-batch-bar span{color:var(--t3);margin-right:auto}
.csv-batch-bar button{padding:5px 12px;border-radius:5px;font-size:10px;font-weight:600;cursor:pointer;border:1px solid var(--b1);background:var(--s3);color:var(--t2);transition:.15s}
.csv-batch-bar button:hover{border-color:var(--p);color:var(--p2)}
.csv-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
.csv-result{margin-top:14px;padding:16px;background:var(--gg);border:1px solid rgba(45,212,191,.15);border-radius:8px;text-align:center}
.csv-result b{color:var(--g);font-family:'JetBrains Mono',monospace}
/* Settings Modal */
.set-box{max-width:520px}
.set-tabs{display:flex;gap:4px;border-bottom:1px solid var(--b1);margin-bottom:14px;overflow-x:auto}
.set-tab{padding:8px 14px;font-size:11px;font-weight:600;color:var(--t3);cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;transition:.15s;white-space:nowrap}
.set-tab.active{color:var(--p2);border-bottom-color:var(--p)}
.set-tab:hover{color:var(--t1)}
.set-sec{display:none}.set-sec.active{display:block}
.set-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--b1)}
.set-row:last-child{border:none}
.set-info{flex:1}.set-info-t{font-size:13px;font-weight:500;color:var(--t1)}.set-info-d{font-size:10px;color:var(--t3);margin-top:2px}
.set-val{font-size:12px;color:var(--t2);font-family:'JetBrains Mono',monospace}
.theme-fab{position:fixed;right:20px;bottom:20px;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--p),#6d28d9);color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.35);transition:transform .15s,box-shadow .15s;z-index:1000;font-size:1rem}
.theme-fab:hover{transform:scale(1.08);box-shadow:0 6px 16px rgba(0,0,0,.45)}
.theme-menu{position:fixed;right:20px;bottom:76px;min-width:190px;background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:6px;box-shadow:0 8px 24px var(--shadow);display:flex;flex-direction:column;gap:2px;z-index:1000}
.theme-menu[hidden]{display:none}
.theme-option{display:flex;align-items:center;gap:10px;padding:8px 12px;background:none;border:1px solid transparent;border-radius:8px;color:var(--t1);font-size:12px;text-align:left;cursor:pointer;font-family:inherit;transition:.15s}
.theme-option:hover{background:var(--s2)}
.theme-option.active{border-color:var(--p);color:var(--p2);font-weight:600}
.theme-swatch{width:16px;height:16px;border-radius:50%;border:1px solid var(--b2);flex-shrink:0}
.size-btns{display:flex;gap:6px}
.size-btn{padding:6px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--b1);background:var(--s3);color:var(--t2);transition:.15s}
.size-btn.active{background:var(--pg);color:var(--p2);border-color:var(--p)}
html[data-size="xs"] body{zoom:0.85}
html[data-size="sm"] body{zoom:0.92}
html[data-size="md"] body{zoom:1}
html[data-size="lg"] body{zoom:1.08}
html[data-size="xl"] body{zoom:1.18}
.btn-danger{padding:7px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid rgba(239,68,68,.2);background:var(--rg);color:var(--r);transition:.15s}
.btn-danger:hover{background:rgba(239,68,68,.15)}
.del-confirm{display:none;margin-top:8px;padding:10px;background:var(--rg);border:1px solid rgba(239,68,68,.15);border-radius:8px}
.del-confirm.open{display:block}
.del-confirm p{font-size:11px;color:var(--r);margin-bottom:6px}
.del-confirm input{padding:6px 10px;background:var(--bg);border:1px solid var(--b1);border-radius:5px;color:var(--t1);font-size:12px;outline:none;width:100%;margin-bottom:6px}
.del-confirm button{padding:6px 14px;border-radius:5px;font-size:11px;font-weight:600;cursor:pointer;border:none;background:var(--r);color:#fff}
.del-confirm button:disabled{opacity:.4;cursor:not-allowed}
.ver-info{font-size:11px;color:var(--t3);line-height:1.8}
.ver-info b{color:var(--t2)}
/* Announcements banner */
.ann-banner{margin-bottom:12px}
.ann-card{padding:12px 16px;border-radius:var(--rad);display:flex;align-items:flex-start;gap:10px;margin-bottom:6px;font-size:13px;line-height:1.5}
.ann-card-info{background:var(--pg);border:1px solid rgba(139,92,246,.15);color:var(--p2)}
.ann-card-warning{background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.15);color:var(--y)}
.ann-card-success{background:var(--gg);border:1px solid rgba(45,212,191,.15);color:var(--g)}
.ann-card-icon{font-size:16px;flex-shrink:0;margin-top:1px}
.ann-card-body{flex:1;min-width:0}
.ann-card-title{font-weight:700;margin-bottom:2px}
.ann-card-close{background:none;border:none;color:inherit;opacity:.5;cursor:pointer;font-size:16px;padding:0 4px;transition:.15s}
.ann-card-close:hover{opacity:1}
/* Bulk select */
.bulk-bar{display:none;position:fixed;bottom:20px;left:50%;transform:translateX(-50%);padding:10px 20px;background:var(--s1);border:1px solid var(--b2);border-radius:12px;box-shadow:0 8px 30px var(--shadow);z-index:100;align-items:center;gap:12px;font-size:13px;animation:fadeIn .2s}
.bulk-bar.show{display:flex}
.bulk-bar .bulk-count{font-weight:700;color:var(--p2);font-family:'JetBrains Mono',monospace}
.bulk-bar button{padding:6px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none;transition:.15s}
.bulk-bar .bulk-del{background:var(--rg);color:var(--r);border:1px solid rgba(239,68,68,.15)}
.bulk-bar .bulk-del:hover{background:rgba(239,68,68,.15)}
.bulk-bar .bulk-clr{background:var(--s3);color:var(--t2)}
.c-sel{width:30px;text-align:center}
.sel-cb{width:14px;height:14px;cursor:pointer;accent-color:var(--p)}
@keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
/* Toast */
.toast{position:fixed;bottom:16px;left:50%;transform:translateX(-50%) translateY(70px);padding:9px 22px;border-radius:8px;font-size:12px;font-weight:500;box-shadow:0 6px 20px rgba(0,0,0,.3);opacity:0;transition:.25s;z-index:300;color:#fff;pointer-events:none}.toast.show{transform:translateX(-50%) translateY(0);opacity:1}.toast.ok{background:#059669}.toast.err{background:var(--r)}
/* Kbd hint */
.kbd{display:none;font-size:9px;color:var(--t3);padding:1px 5px;border:1px solid var(--b1);border-radius:3px;font-family:'JetBrains Mono',monospace}
@media(min-width:768px){.kbd{display:inline}}
.nav-tabs{display:flex;gap:2px;padding:0 14px;background:var(--s1);border-bottom:1px solid var(--b1);overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.nav-tabs::-webkit-scrollbar{display:none}
@media(min-width:768px){.nav-tabs{padding:0 24px;gap:4px}}
.nav-tab{padding:10px 14px;font-size:12px;font-weight:500;color:var(--t3);text-decoration:none;border-bottom:2px solid transparent;transition:.15s;white-space:nowrap;display:flex;align-items:center;gap:6px}
.nav-tab:hover{color:var(--t2);background:var(--pg)}
.nav-tab.active{color:var(--p2);border-bottom-color:var(--p);font-weight:600}
.nav-tab svg{width:14px;height:14px;flex-shrink:0}
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
<select class="model-sel" id="modelSel"><option value="gpt120">GPT-OSS 120B</option><option value="kimi">Kimi K2.5</option><option value="llama70">Llama 3.3 70B</option><option value="llama8">Llama 3.1 8B</option></select>
<button class="tbtn" id="csvBtn"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>CSV</button>
<button class="tbtn" id="setBtn"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button>
<button class="tbtn ham" id="hamBtn"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg></button>
${isAdmin?'<a href="/admin" class="tbtn tbtn-admin"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>Admin</a>':''}
<a href="/profil" class="user-badge" style="text-decoration:none"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>${userName}</a>
<a href="/logout" class="tbtn tbtn-r">Cikis</a>
</div></div>
<nav class="nav-tabs">
<a href="/" class="nav-tab active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>Not Defteri</a>
<a href="/qso" class="nav-tab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>QSO Log</a>
<a href="/mors" class="nav-tab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>Mors</a>
<a href="/frekans" class="nav-tab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h4l3-9 4 18 3-9h4"/></svg>Frekanslar</a>
<a href="/panel" class="nav-tab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Panel</a>
</nav>
<div class="drawer-bg" id="drBg"></div>
<div class="drawer" id="drawer"><div class="drawer-head"><h2>Araclar</h2><button class="drawer-close" id="drClose">&times;</button></div><div class="drawer-body">${nlPanel()}${astPanel()}</div></div>
<div class="wrap">
<div class="left">
<div class="ann-banner" id="annBanner"></div>
<div class="srch-bar"><svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" id="q" placeholder="Ara... isim, cagri isareti, konum" autocomplete="off"><span class="kbd">Ctrl+K</span><div class="srch-tags"><span class="tag tag-found" id="tagF"><b id="stS">${total}</b><small>sonuc</small></span><span class="tag tag-total"><b id="stT">${total}</b><small>kayit</small></span></div><div class="srch-hist" id="srchHist"></div></div>
<div class="add-sec"><button class="add-h" id="addH"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg> Yeni Operator Ekle</button>
<div class="add-b" id="addB"><div class="add-g"><input class="inp" name="operator" placeholder="Isim"><input class="inp" name="cagri_isareti" placeholder="Cagri Isareti (TA1XXX)" required><input class="inp" name="qth" placeholder="QTH"><input class="inp" name="hakkinda" placeholder="Hakkinda"></div><div class="add-act"><button class="btn-p" id="btnA">Kaydet</button></div></div></div>
<div class="tbl-w"><div class="tbl-s" id="tblS"><table><thead><tr><th class="c-sel"><input type="checkbox" class="sel-cb" id="selAll"></th><th>Cagri</th><th>Isim</th><th>QTH</th><th>Hakkinda</th><th></th></tr></thead><tbody id="tb">${rows||'<tr><td colspan="6" class="empty-row">Kayit yok</td></tr>'}</tbody></table></div></div>
<div class="bulk-bar" id="bulkBar"><span><span class="bulk-count" id="bulkCount">0</span> secili</span><button class="bulk-del" id="bulkDel">Secilenleri Sil</button><button class="bulk-clr" id="bulkClr">Iptal</button></div>
</div>
<div class="right">${nlPanel()}${astPanel()}</div>
</div>
<!-- Edit Modal -->
<div class="modal-bg" id="modal"><div class="modal-box m-box"><h3>Duzenle</h3><div class="fg"><span class="fl">Cagri Isareti</span><input class="fi fi-cs" id="mCs"></div><div class="fg"><span class="fl">Isim</span><input class="fi" id="mOp"></div><div class="fg"><span class="fl">QTH</span><input class="fi" id="mQt"></div><div class="fg"><span class="fl">Hakkinda</span><input class="fi" id="mAb" maxlength="200"></div><input type="hidden" id="mId"><div class="m-btns"><button class="bc" id="mC">Iptal</button><button class="bs" id="mS">Kaydet</button></div></div></div>
<!-- Phonetic Modal -->
<div class="modal-bg" id="phBg"><div class="modal-box ph-box"><div class="ph-cs" id="phCs"></div><div class="ph-list" id="phList"></div><button class="ph-close" id="phClose">Kapat</button></div></div>
<!-- CSV Modal -->
<div class="modal-bg" id="csvMdl"><div class="modal-box csv-box">
<h3>CSV Islemleri</h3>
<div class="csv-step active" id="csvStep1">
<div class="csv-choice">
<div class="csv-opt" id="csvExport"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><div class="csv-opt-t">Disa Aktar</div><div class="csv-opt-d">Tum kayitlari CSV olarak indir</div></div>
<div class="csv-opt" id="csvImport"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><div class="csv-opt-t">Iceri Aktar</div><div class="csv-opt-d">CSV dosyasindan kayit yukle</div></div>
</div></div>
<div class="csv-step" id="csvStep2">
<div class="csv-drop" id="csvDrop"><svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><div class="csv-drop-t">CSV dosyasi secin veya surukleyin</div><div class="csv-drop-s">Noktalı virgul (;) ayracli, UTF-8</div></div>
<input type="file" accept=".csv" class="csv-file-inp" id="csvFile">
</div>
<div class="csv-step" id="csvStep3">
<div class="csv-summary" id="csvSum"></div>
<div class="csv-conflicts" id="csvConf"></div>
<div id="csvBatchArea"></div>
<div class="csv-actions"><button class="bc" id="csvBack">Geri</button><button class="bs" id="csvGo">Iceri Aktar</button></div>
</div>
<div class="csv-step" id="csvStep4">
<div class="csv-result" id="csvRes"></div>
<div class="csv-actions"><button class="bs" id="csvDone">Tamam</button></div>
</div>
</div></div>
<!-- Settings Modal -->
<div class="modal-bg" id="setMdl"><div class="modal-box set-box">
<h3>Ayarlar</h3>
<div class="set-tabs">
<button class="set-tab active" data-tab="gorunum">Gorunum</button>
<button class="set-tab" data-tab="veritabani">Veritabani</button>
<button class="set-tab" data-tab="model">AI Model</button>
<button class="set-tab" data-tab="hakkinda">Hakkinda</button>
</div>
<div class="set-sec active" id="sec-gorunum">
<div class="set-row"><div class="set-info"><div class="set-info-t">Yazi Boyutu</div><div class="set-info-d">Arayuz genel yazi boyutunu ayarlayin</div></div>
<div class="size-btns"><button class="size-btn" data-size="xs">XS</button><button class="size-btn" data-size="sm">S</button><button class="size-btn" data-size="md">M</button><button class="size-btn" data-size="lg">L</button><button class="size-btn" data-size="xl">XL</button></div></div>
</div>
<div class="set-sec" id="sec-veritabani">
<div class="set-row"><div class="set-info"><div class="set-info-t">Toplam Kayit</div><div class="set-info-d">Veritabanindaki operator sayisi</div></div><div class="set-val" id="setTotal">-</div></div>
<div class="set-row"><div class="set-info"><div class="set-info-t">Son Guncelleme</div><div class="set-info-d">En son yapilan degisiklik</div></div><div class="set-val" id="setLast">-</div></div>
<div class="set-row" style="flex-direction:column;align-items:stretch">
<div style="display:flex;align-items:center;justify-content:space-between">
<div class="set-info"><div class="set-info-t">Tum Verileri Sil</div><div class="set-info-d">Bu islem geri alinamaz!</div></div>
<button class="btn-danger" id="delAllBtn">Verileri Sil</button></div>
<div class="del-confirm" id="delConf">
<p>Emin misiniz? Onaylamak icin asagiya <b>SIL</b> yazin:</p>
<input type="text" id="delInp" placeholder="SIL">
<button id="delGo" disabled>Kalici Olarak Sil</button>
</div></div>
</div>
<div class="set-sec" id="sec-model">
<div class="set-row"><div class="set-info"><div class="set-info-t">Varsayilan Model</div><div class="set-info-d">Sayfa acildiginda secili olacak model</div></div>
<select class="model-sel" id="defModelSel"><option value="gpt120">GPT-OSS 120B</option><option value="kimi">Kimi K2.5</option><option value="llama70">Llama 3.3 70B</option><option value="llama8">Llama 3.1 8B</option></select>
</div></div>
<div class="set-sec" id="sec-hakkinda">
<div class="ver-info">
<b>Radyo Rehberi</b> v4.0<br>
Cloudflare Workers + D1 + Workers AI<br>
Hono.js Framework<br><br>
Amator telsiz radyo operatorleri rehberi ve yonetim sistemi.
</div></div>
</div></div>
<div id="toast" class="toast"></div>
<script>
var D=${dj},sT;
var PH={'A':'Alfa','B':'Bravo','C':'Charlie','D':'Delta','E':'Echo','F':'Foxtrot','G':'Golf','H':'Hotel','I':'India','J':'Juliet','K':'Kilo','L':'Lima','M':'Mike','N':'November','O':'Oscar','P':'Papa','Q':'Quebec','R':'Romeo','S':'Sierra','T':'Tango','U':'Uniform','V':'Victor','W':'Whiskey','X':'X-ray','Y':'Yankee','Z':'Zulu','0':'Sıfır','1':'Bir','2':'İki','3':'Üç','4':'Dört','5':'Beş','6':'Altı','7':'Yedi','8':'Sekiz','9':'Dokuz'};
function toast(m,ok){var t=document.getElementById('toast');t.textContent=m;t.className='toast '+(ok?'ok':'err');setTimeout(function(){t.classList.add('show')},10);setTimeout(function(){t.classList.remove('show')},2500)}
function esc(s){if(!s)return'';var d=document.createElement('div');d.appendChild(document.createTextNode(s));return d.textContent.replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function trN(s){if(!s)return'';return s.toLowerCase().replace(/\\u0130/g,'i').replace(/I/g,'i').replace(/\\u0131/g,'i').replace(/\\u00fc/g,'u').replace(/\\u00f6/g,'o').replace(/\\u00e7/g,'c').replace(/\\u015f/g,'s').replace(/\\u011f/g,'g').replace(/\\u00dc/g,'u').replace(/\\u00d6/g,'o').replace(/\\u00c7/g,'c').replace(/\\u015e/g,'s').replace(/\\u011e/g,'g')}
function fz(n,h){var a=trN(n),b=trN(h);if(!a)return 1;if(b.indexOf(a)!==-1)return 100;var ni=0,hi=0,sc=0,c=0;while(ni<a.length&&hi<b.length){if(a[ni]===b[hi]){ni++;c++;sc+=c*2}else c=0;hi++}if(ni<a.length)return 0;return sc-(b.length-a.length)*.1}
function srch(q){if(!q||!q.trim())return null;var r=[];for(var i=0;i<D.length;i++){var k=D[i],s=Math.max(fz(q,k.operator),fz(q,k.cagri_isareti),fz(q,k.qth),fz(q,k.hakkinda));if(s>0)r.push({item:k,score:s})}r.sort(function(a,b){return b.score-a.score});return r.map(function(x){return x.item})}
function mkR(k){return'<tr data-id="'+k.id+'"><td class="c-sel"><input type="checkbox" class="sel-cb row-cb" data-id="'+k.id+'"></td><td class="c-cs"><button class="cs-btn" data-cs="'+esc(k.cagri_isareti)+'"><span class="cs">'+esc(k.cagri_isareti)+'</span></button><a href="https://www.qrz.com/db/'+esc(k.cagri_isareti)+'" target="_blank" rel="noopener" class="qrz-link" title="QRZ.com">Q</a></td><td class="c-nm">'+esc(k.operator)+'</td><td class="c-qt">'+esc(k.qth)+'</td><td class="c-ab">'+esc(k.hakkinda)+'</td><td class="c-act"><button class="ib ib-e" data-id="'+k.id+'" data-op="'+esc(k.operator)+'" data-cs="'+esc(k.cagri_isareti)+'" data-qt="'+esc(k.qth||'')+'" data-ab="'+esc(k.hakkinda||'')+'"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="ib ib-d" data-id="'+k.id+'"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button></td></tr>'}
function render(items,isSearch){
  var tb=document.getElementById('tb');tb.textContent='';
  var tagF=document.getElementById('tagF'),stS=document.getElementById('stS');
  if(isSearch){tagF.style.display='inline-flex';stS.textContent=items.length}
  else{tagF.style.display='none'}
  if(!items.length){tb.insertAdjacentHTML('beforeend','<tr><td colspan="6" class="empty-row">Sonuc yok</td></tr>');return}
  items.forEach(function(k){tb.insertAdjacentHTML('beforeend',mkR(k))})
}
function reload(){fetch('/api/all').then(function(r){return r.json()}).then(function(d){D=d.kayitlar;document.getElementById('stT').textContent=d.total;var q=document.getElementById('q').value;var res=srch(q);render(res||D,!!q.trim())})}
function getModel(){return document.getElementById('modelSel').value}
function closeModal(id){document.getElementById(id).classList.remove('open')}

/* Init saved preferences */
(function(){
  var dm=localStorage.getItem('defaultModel');
  if(dm){document.getElementById('modelSel').value=dm;document.getElementById('defModelSel').value=dm}
  var sz=localStorage.getItem('fontSize')||'md';
  document.querySelectorAll('.size-btn').forEach(function(b){b.classList.toggle('active',b.dataset.size===sz)});
})();

/* Drawer */
document.getElementById('hamBtn').addEventListener('click',function(){document.getElementById('drBg').classList.add('open');document.getElementById('drawer').classList.add('open')});
function closeDr(){document.getElementById('drBg').classList.remove('open');document.getElementById('drawer').classList.remove('open')}
document.getElementById('drClose').addEventListener('click',closeDr);
document.getElementById('drBg').addEventListener('click',closeDr);

/* Search */
document.getElementById('q').addEventListener('input',function(){var v=this.value;clearTimeout(sT);sT=setTimeout(function(){var res=srch(v);render(res||D,!!v.trim())},150)});

/* Add section */
document.getElementById('addH').addEventListener('click',function(){this.classList.toggle('open');document.getElementById('addB').classList.toggle('open')});
document.getElementById('btnA').addEventListener('click',function(){var b=document.getElementById('addB'),fd=new FormData();fd.append('operator',b.querySelector('[name=operator]').value);fd.append('cagri_isareti',b.querySelector('[name=cagri_isareti]').value);fd.append('qth',b.querySelector('[name=qth]').value);fd.append('hakkinda',b.querySelector('[name=hakkinda]').value);if(!b.querySelector('[name=cagri_isareti]').value.trim()){toast('Cagri isareti zorunlu',false);return}var btn=this;btn.disabled=true;fetch('/ekle',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(d){if(d.ok){toast('Kaydedildi',true);b.querySelectorAll('input').forEach(function(i){i.value=''});reload()}else toast(d.error||'Hata',false)}).catch(function(){toast('Hata',false)}).finally(function(){btn.disabled=false})});

/* Table events */
document.getElementById('tb').addEventListener('click',function(ev){
  var csB=ev.target.closest('.cs-btn');if(csB){showPh(csB.dataset.cs);return}
  var dl=ev.target.closest('.ib-d');if(dl){if(!confirm('Silmek istediginize emin misiniz?'))return;var fd=new FormData();fd.append('id',dl.dataset.id);fetch('/sil',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(d){if(d.ok){toast('Silindi',true);reload()}else toast(d.error,'false')});return}
  var ed=ev.target.closest('.ib-e');if(ed){document.getElementById('mId').value=ed.dataset.id;document.getElementById('mCs').value=ed.dataset.cs||'';document.getElementById('mOp').value=ed.dataset.op||'';document.getElementById('mQt').value=ed.dataset.qt||'';document.getElementById('mAb').value=ed.dataset.ab||'';document.getElementById('modal').classList.add('open')}
});

/* Phonetic */
function showPh(cs){document.getElementById('phCs').textContent=cs;var l=document.getElementById('phList');l.textContent='';cs.split('').forEach(function(c){var u=c.toUpperCase(),w=PH[u]||c,d=document.createElement('div');d.className='ph-item';var ch=document.createElement('div');ch.className='ph-char';ch.textContent=u;var wo=document.createElement('div');wo.className='ph-word';wo.textContent=w;d.appendChild(ch);d.appendChild(wo);l.appendChild(d)});document.getElementById('phBg').classList.add('open')}
document.getElementById('phClose').addEventListener('click',function(){closeModal('phBg')});
document.getElementById('phBg').addEventListener('click',function(ev){if(ev.target===this)closeModal('phBg')});

/* Edit modal */
document.getElementById('mC').addEventListener('click',function(){closeModal('modal')});
document.getElementById('modal').addEventListener('click',function(ev){if(ev.target===this)closeModal('modal')});
document.getElementById('mS').addEventListener('click',function(){var fd=new FormData();fd.append('id',document.getElementById('mId').value);fd.append('cagri_isareti',document.getElementById('mCs').value);fd.append('operator',document.getElementById('mOp').value);fd.append('qth',document.getElementById('mQt').value);fd.append('hakkinda',document.getElementById('mAb').value);fetch('/duzenle',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(d){if(d.ok){toast('Guncellendi',true);closeModal('modal');reload()}else toast(d.error||'Hata',false)})});

/* ===== CSV IMPORT/EXPORT ===== */
var csvData={newRecs:[],conflicts:[],dupes:0};

document.getElementById('csvBtn').addEventListener('click',function(){
  document.querySelectorAll('.csv-step').forEach(function(s){s.classList.remove('active')});
  document.getElementById('csvStep1').classList.add('active');
  document.getElementById('csvMdl').classList.add('open');
});
document.getElementById('csvMdl').addEventListener('click',function(ev){if(ev.target===this)closeModal('csvMdl')});
document.getElementById('csvExport').addEventListener('click',function(){closeModal('csvMdl');window.location.href='/export'});
document.getElementById('csvImport').addEventListener('click',function(){
  document.querySelectorAll('.csv-step').forEach(function(s){s.classList.remove('active')});
  document.getElementById('csvStep2').classList.add('active');
});

/* CSV file drop zone */
var csvDrop=document.getElementById('csvDrop'),csvFile=document.getElementById('csvFile');
csvDrop.addEventListener('click',function(){csvFile.click()});
csvDrop.addEventListener('dragover',function(ev){ev.preventDefault();csvDrop.classList.add('drag')});
csvDrop.addEventListener('dragleave',function(){csvDrop.classList.remove('drag')});
csvDrop.addEventListener('drop',function(ev){ev.preventDefault();csvDrop.classList.remove('drag');if(ev.dataTransfer.files[0])processCSV(ev.dataTransfer.files[0])});
csvFile.addEventListener('change',function(){if(this.files[0])processCSV(this.files[0])});

function parseCSV(text){
  if(text.charCodeAt(0)===0xFEFF)text=text.slice(1);
  var lines=[],cur='',inQ=false;
  for(var i=0;i<text.length;i++){
    var c=text[i];
    if(inQ){if(c==='"'){if(text[i+1]==='"'){cur+='"';i++}else inQ=false}else cur+=c}
    else{if(c==='"')inQ=true;else if(c===';'){lines.length?lines[lines.length-1].push(cur):lines.push([cur]);cur=''}else if(c==='\\n'||c==='\\r'){if(c==='\\r'&&text[i+1]==='\\n')i++;if(cur||lines.length&&lines[lines.length-1]){lines.length?lines[lines.length-1].push(cur):lines.push([cur]);lines.push([]);cur=''}else{lines.push([]);cur=''}}else cur+=c}
  }
  if(cur||lines.length&&lines[lines.length-1])lines.length?lines[lines.length-1].push(cur):lines.push([cur]);
  // Fix: flatten - each line should be an array of fields
  var result=[];var row=[];
  // Re-parse properly
  result=[];row=[];inQ=false;cur='';
  for(var i=0;i<text.length;i++){
    var c=text[i];
    if(inQ){if(c==='"'){if(text[i+1]==='"'){cur+='"';i++}else inQ=false}else cur+=c}
    else if(c==='"'){inQ=true}
    else if(c===';'){row.push(cur);cur=''}
    else if(c==='\\n'||c==='\\r'){if(c==='\\r'&&text[i+1]==='\\n')i++;row.push(cur);cur='';if(row.some(function(f){return f.trim()}))result.push(row);row=[]}
    else{cur+=c}
  }
  row.push(cur);if(row.some(function(f){return f.trim()}))result.push(row);
  if(!result.length)return[];
  var hdr=result[0].map(function(h){return h.trim().toLowerCase()});
  var out=[];
  for(var i=1;i<result.length;i++){
    var r=result[i],o={};
    hdr.forEach(function(h,j){o[h]=r[j]?r[j].trim():''});
    if(o['cagri isareti']||o['cagri_isareti']){
      out.push({
        operator:o['operator']||o['isim']||'',
        cagri_isareti:(o['cagri isareti']||o['cagri_isareti']||'').toUpperCase(),
        qth:o['qth']||o['konum']||'',
        hakkinda:o['hakkinda']||o['hakkinda']||''
      });
    }
  }
  return out;
}

function analyzeImport(parsed){
  var newRecs=[],conflicts=[],dupes=0;
  var dbMap={};D.forEach(function(d){dbMap[d.cagri_isareti]=d});
  parsed.forEach(function(p){
    var ex=dbMap[p.cagri_isareti];
    if(!ex){newRecs.push(p);return}
    var same=((ex.operator||'')===p.operator)&&((ex.qth||'')===p.qth)&&((ex.hakkinda||'')===p.hakkinda);
    if(same){dupes++;return}
    conflicts.push({imported:p,existing:ex,action:'skip'});
  });
  return{newRecs:newRecs,conflicts:conflicts,dupes:dupes};
}

function processCSV(file){
  var reader=new FileReader();
  reader.onload=function(ev){
    var parsed=parseCSV(ev.target.result);
    if(!parsed.length){toast('CSV okunamadi veya bos',false);return}
    csvData=analyzeImport(parsed);
    showStep3();
  };
  reader.readAsText(file,'UTF-8');
}

function showStep3(){
  document.querySelectorAll('.csv-step').forEach(function(s){s.classList.remove('active')});
  document.getElementById('csvStep3').classList.add('active');
  var sum=document.getElementById('csvSum');
  sum.innerHTML='<div class="csv-summary-row"><span class="csv-summary-label">Yeni kayit</span><span class="csv-summary-val csv-val-new">'+csvData.newRecs.length+'</span></div>'
    +'<div class="csv-summary-row"><span class="csv-summary-label">Birebir ayni (atlanacak)</span><span class="csv-summary-val csv-val-dup">'+csvData.dupes+'</span></div>'
    +'<div class="csv-summary-row"><span class="csv-summary-label">Cakisma</span><span class="csv-summary-val csv-val-conf">'+csvData.conflicts.length+'</span></div>';

  var conf=document.getElementById('csvConf');conf.innerHTML='';
  var batch=document.getElementById('csvBatchArea');batch.innerHTML='';

  if(csvData.conflicts.length){
    batch.innerHTML='<div class="csv-batch-bar"><span>Tumune uygula:</span>'
      +'<button data-act="skip">Mevcut Kalsin</button>'
      +'<button data-act="merge">Farklilari Al</button>'
      +'<button data-act="update">Importu Kullan</button></div>';
    batch.querySelector('.csv-batch-bar').addEventListener('click',function(ev){
      var btn=ev.target.closest('button');if(!btn)return;
      var act=btn.dataset.act;
      csvData.conflicts.forEach(function(c,i){c.action=act});
      conf.querySelectorAll('.csv-radios input[value="'+act+'"]').forEach(function(r){r.checked=true});
    });

    csvData.conflicts.forEach(function(c,idx){
      var div=document.createElement('div');div.className='csv-conf-item';
      var diffs='';
      ['operator','qth','hakkinda'].forEach(function(f){
        if((c.existing[f]||'')!==(c.imported[f]||'')){
          diffs+='<div class="csv-diff"><div><div class="csv-diff-h">Mevcut '+f+'</div><div class="csv-diff-cur">'+esc(c.existing[f]||'-')+'</div></div>'
            +'<div><div class="csv-diff-h">Import '+f+'</div><div class="csv-diff-new">'+esc(c.imported[f]||'-')+'</div></div></div>';
        }
      });
      div.innerHTML='<div class="csv-conf-cs">'+esc(c.imported.cagri_isareti)+'</div>'+diffs
        +'<div class="csv-radios">'
        +'<label><input type="radio" name="cact'+idx+'" value="skip" checked> Mevcut Kalsin</label>'
        +'<label><input type="radio" name="cact'+idx+'" value="merge"> Farklilari Al</label>'
        +'<label><input type="radio" name="cact'+idx+'" value="update"> Importu Kullan</label></div>';
      div.querySelectorAll('input[type=radio]').forEach(function(r){
        r.addEventListener('change',function(){csvData.conflicts[idx].action=this.value});
      });
      conf.appendChild(div);
    });
  }
}

document.getElementById('csvBack').addEventListener('click',function(){
  document.querySelectorAll('.csv-step').forEach(function(s){s.classList.remove('active')});
  document.getElementById('csvStep2').classList.add('active');
});

document.getElementById('csvGo').addEventListener('click',function(){
  var btn=this;btn.disabled=true;btn.textContent='Aktariliyor...';
  var records=[];
  csvData.newRecs.forEach(function(r){records.push({cagri_isareti:r.cagri_isareti,operator:r.operator,qth:r.qth,hakkinda:r.hakkinda,action:'new'})});
  csvData.conflicts.forEach(function(c){
    if(c.action==='skip')return;
    records.push({cagri_isareti:c.imported.cagri_isareti,operator:c.imported.operator,qth:c.imported.qth,hakkinda:c.imported.hakkinda,action:c.action});
  });
  if(!records.length){
    document.querySelectorAll('.csv-step').forEach(function(s){s.classList.remove('active')});
    document.getElementById('csvStep4').classList.add('active');
    document.getElementById('csvRes').innerHTML='Aktarilacak kayit yok. Tum kayitlar zaten mevcut.';
    btn.disabled=false;btn.textContent='Iceri Aktar';return;
  }
  fetch('/import',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({records:records})})
    .then(function(r){return r.json()}).then(function(d){
      document.querySelectorAll('.csv-step').forEach(function(s){s.classList.remove('active')});
      document.getElementById('csvStep4').classList.add('active');
      if(d.ok){
        var r=d.results;
        var resEl=document.getElementById('csvRes');resEl.innerHTML='Import tamamlandi!<br><b>'+(parseInt(r.created)||0)+'</b> eklendi, <b>'+(parseInt(r.updated)||0)+'</b> guncellendi, <b>'+(parseInt(r.skipped)||0)+'</b> atlandi';
        if(r.errors&&r.errors.length){var br=document.createElement('br');resEl.appendChild(br);var errS=document.createElement('span');errS.style.color='var(--r)';errS.textContent=r.errors.join(', ');resEl.appendChild(errS)}
        reload();
      } else{var errEl=document.getElementById('csvRes');errEl.textContent='';var errSpan=document.createElement('span');errSpan.style.color='var(--r)';errSpan.textContent=d.error||'Hata';errEl.appendChild(errSpan)}
    }).catch(function(){
      document.querySelectorAll('.csv-step').forEach(function(s){s.classList.remove('active')});
      document.getElementById('csvStep4').classList.add('active');
      document.getElementById('csvRes').innerHTML='<span style="color:var(--r)">Baglanti hatasi</span>';
    }).finally(function(){btn.disabled=false;btn.textContent='Iceri Aktar'});
});
document.getElementById('csvDone').addEventListener('click',function(){closeModal('csvMdl')});

/* ===== SETTINGS ===== */
document.getElementById('setBtn').addEventListener('click',function(){
  document.getElementById('setMdl').classList.add('open');
  fetch('/api/stats').then(function(r){return r.json()}).then(function(d){
    document.getElementById('setTotal').textContent=d.total;
    document.getElementById('setLast').textContent=d.last_updated||'-';
  });
});
document.getElementById('setMdl').addEventListener('click',function(ev){if(ev.target===this)closeModal('setMdl')});

/* Settings tabs */
document.querySelectorAll('.set-tab').forEach(function(tab){
  tab.addEventListener('click',function(){
    document.querySelectorAll('.set-tab').forEach(function(t){t.classList.remove('active')});
    document.querySelectorAll('.set-sec').forEach(function(s){s.classList.remove('active')});
    tab.classList.add('active');
    document.getElementById('sec-'+tab.dataset.tab).classList.add('active');
  });
});

/* Theme FAB */
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

/* Font size toggle */
document.querySelectorAll('.size-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    var sz=btn.dataset.size;
    document.documentElement.setAttribute('data-size',sz);
    localStorage.setItem('fontSize',sz);
    document.querySelectorAll('.size-btn').forEach(function(b){b.classList.toggle('active',b.dataset.size===sz)});
  });
});

/* Default model */
document.getElementById('defModelSel').addEventListener('change',function(){
  localStorage.setItem('defaultModel',this.value);
  document.getElementById('modelSel').value=this.value;
  toast('Varsayilan model kaydedildi',true);
});

/* Delete all */
document.getElementById('delAllBtn').addEventListener('click',function(){document.getElementById('delConf').classList.add('open')});
document.getElementById('delInp').addEventListener('input',function(){document.getElementById('delGo').disabled=this.value!=='SIL'});
document.getElementById('delGo').addEventListener('click',function(){
  var btn=this;btn.disabled=true;btn.textContent='Siliniyor...';
  fetch('/api/sil-hepsi',{method:'DELETE'}).then(function(r){return r.json()}).then(function(d){
    if(d.ok){toast('Tum veriler silindi',true);document.getElementById('delConf').classList.remove('open');document.getElementById('delInp').value='';reload();closeModal('setMdl')}
    else toast('Hata',false);
  }).finally(function(){btn.disabled=false;btn.textContent='Kalici Olarak Sil'});
});

/* ===== KEYBOARD SHORTCUTS ===== */
document.addEventListener('keydown',function(ev){
  if((ev.ctrlKey||ev.metaKey)&&ev.key==='k'){ev.preventDefault();document.getElementById('q').focus()}
  if(ev.key==='Escape'){document.querySelectorAll('.modal-bg.open').forEach(function(m){m.classList.remove('open')});closeDr()}
});

/* NL - queue based */
function setupNL(ct){
  var area=ct.querySelector('.nl-area'),btn=ct.querySelector('.nl-btn'),queue=ct.querySelector('.nl-queue');
  if(!area||!btn)return;

  function updHead(){
    var pending=queue.querySelectorAll('.q-item:not(.saved)');
    var head=queue.querySelector('.q-head');
    if(pending.length===0){if(head)head.remove();return}
    if(!head){head=document.createElement('div');head.className='q-head';queue.prepend(head)}
    head.innerHTML='<span class="q-count"><b>'+pending.length+'</b> bekliyor</span>'
      +'<div class="q-batch"><button class="q-all-clr">Temizle</button><button class="q-all-ok">Tumunu Onayla</button></div>';
  }

  function saveItem(item){
    return new Promise(function(res){
      var fd=new FormData();
      item.querySelectorAll('.q-inp').forEach(function(inp){fd.append(inp.dataset.f,inp.value)});
      if(!fd.get('cagri_isareti')){toast('Cagri isareti zorunlu: '+fd.get('operator'),false);res(false);return}
      item.classList.add('saving');
      fetch('/ekle',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(d){
        item.classList.remove('saving');
        if(d.ok){item.classList.add('saved');toast(fd.get('cagri_isareti')+' eklendi',true);res(true)}
        else{toast(d.error||'Hata',false);res(false)}
      }).catch(function(){item.classList.remove('saving');toast('Hata',false);res(false)});
    });
  }

  function removeItem(item){
    item.classList.add('q-rm');
    setTimeout(function(){item.remove();updHead()},250);
  }

  btn.addEventListener('click',function(){
    var txt=area.value.trim();if(!txt){toast('Metin girin',false);return}
    btn.disabled=true;btn.textContent='Analiz ediliyor...';
    var fd=new FormData();fd.append('metin',txt);fd.append('model',getModel());
    fetch('/api/nl-ekle',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(d){
      if(d.ok&&d.parsed&&d.parsed.length){
        d.parsed.forEach(function(p){
          var div=document.createElement('div');div.className='q-item';
          div.innerHTML='<div class="q-label">Isim</div><input class="q-inp" data-f="operator" value="'+esc(p.operator)+'">'
            +'<div class="q-label">Cagri Isareti</div><input class="q-inp q-inp-cs" data-f="cagri_isareti" value="'+esc(p.cagri_isareti)+'">'
            +'<div class="q-label">QTH</div><input class="q-inp" data-f="qth" value="'+esc(p.qth)+'">'
            +'<div class="q-label">Hakkinda</div><input class="q-inp" data-f="hakkinda" value="'+esc(p.hakkinda)+'">'
            +'<div class="q-btns"><button class="q-skip">Sil</button><button class="q-ok">Onayla</button></div>';
          queue.appendChild(div);
        });
        area.value='';
        updHead();
      } else toast(d.error||'Anlasilamadi',false);
    }).catch(function(){toast('Hata',false)}).finally(function(){btn.disabled=false;btn.textContent='Analiz Et'});
  });

  queue.addEventListener('click',function(ev){
    var okBtn=ev.target.closest('.q-ok');
    if(okBtn){
      var item=okBtn.closest('.q-item');
      saveItem(item).then(function(){updHead();reload()});
      return;
    }
    var skipBtn=ev.target.closest('.q-skip');
    if(skipBtn){removeItem(skipBtn.closest('.q-item'));return}
    var allOk=ev.target.closest('.q-all-ok');
    if(allOk){
      var items=Array.from(queue.querySelectorAll('.q-item:not(.saved)'));
      if(!items.length)return;
      allOk.disabled=true;allOk.textContent='Kaydediliyor...';
      var chain=Promise.resolve();
      items.forEach(function(it){chain=chain.then(function(){return saveItem(it)})});
      chain.then(function(){updHead();reload()});
      return;
    }
    var allClr=ev.target.closest('.q-all-clr');
    if(allClr){
      var pend=queue.querySelectorAll('.q-item:not(.saved)');
      pend.forEach(function(it){removeItem(it)});
    }
  });
}
document.querySelectorAll('.nl-container').forEach(setupNL);

/* ASISTAN */
function setupAI(c){
  var inp=c.querySelector('.aI'),btn=c.querySelector('.aB'),out=c.querySelector('.aO'),tag=c.querySelector('.ast-model-tag');
  if(!inp)return;
  function ask(){var q=inp.value.trim();if(!q)return;out.textContent='Dusunuyor...';out.className='a-out show a-ld';
    var fd=new FormData();fd.append('soru',q);fd.append('model',getModel());
    fetch('/api/asistan',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(d){out.classList.remove('a-ld');if(d.ok){out.textContent=d.cevap;if(tag)tag.textContent='('+d.model+')'}else out.textContent=d.error||'Hata'}).catch(function(){out.textContent='Hata';out.classList.remove('a-ld')})}
  btn.addEventListener('click',ask);inp.addEventListener('keydown',function(ev){if(ev.key==='Enter')ask()});
}
document.querySelectorAll('.ast-container').forEach(setupAI);

/* ===== SEARCH HISTORY ===== */
var HIST_KEY='searchHistory',MAX_HIST=20;
function getHist(){try{return JSON.parse(localStorage.getItem(HIST_KEY))||[]}catch(e){return[]}}
function saveHist(arr){localStorage.setItem(HIST_KEY,JSON.stringify(arr.slice(0,MAX_HIST)))}
function addHist(q){if(!q||!q.trim())return;q=q.trim();var h=getHist().filter(function(x){return x!==q});h.unshift(q);saveHist(h)}
function removeHist(q){saveHist(getHist().filter(function(x){return x!==q}))}

var histBox=document.getElementById('srchHist'),qInp=document.getElementById('q');
function showHist(){
  var h=getHist();if(!h.length){histBox.classList.remove('open');return}
  histBox.textContent='';
  var lbl=document.createElement('div');lbl.className='srch-hist-lbl';lbl.textContent='Son Aramalar';histBox.appendChild(lbl);
  h.forEach(function(q){
    var item=document.createElement('div');item.className='srch-hist-item';
    var txt=document.createElement('span');txt.textContent=q;item.appendChild(txt);
    var x=document.createElement('span');x.className='sh-x';x.textContent='sil';item.appendChild(x);
    x.addEventListener('click',function(ev){ev.stopPropagation();removeHist(q);showHist()});
    item.addEventListener('click',function(){qInp.value=q;histBox.classList.remove('open');var res=srch(q);render(res||D,true);addHist(q)});
    histBox.appendChild(item);
  });
  histBox.classList.add('open');
}
qInp.addEventListener('focus',function(){if(!this.value.trim())showHist()});
qInp.addEventListener('input',function(){if(!this.value.trim())showHist();else histBox.classList.remove('open')});
document.addEventListener('click',function(ev){if(!ev.target.closest('.srch-bar'))histBox.classList.remove('open')});
/* Save search on Enter */
qInp.addEventListener('keydown',function(ev){if(ev.key==='Enter'&&this.value.trim()){addHist(this.value.trim());histBox.classList.remove('open')}});

/* ===== BULK SELECT/DELETE ===== */
var bulkBar=document.getElementById('bulkBar'),bulkCount=document.getElementById('bulkCount');
function getSelected(){return Array.from(document.querySelectorAll('.row-cb:checked')).map(function(cb){return parseInt(cb.dataset.id)})}
function updateBulk(){var sel=getSelected();bulkCount.textContent=sel.length;if(sel.length>0)bulkBar.classList.add('show');else bulkBar.classList.remove('show')}

document.getElementById('selAll').addEventListener('change',function(){var checked=this.checked;document.querySelectorAll('.row-cb').forEach(function(cb){cb.checked=checked});updateBulk()});
document.getElementById('tb').addEventListener('change',function(ev){if(ev.target.classList.contains('row-cb'))updateBulk()});

document.getElementById('bulkClr').addEventListener('click',function(){document.querySelectorAll('.row-cb,.sel-cb').forEach(function(cb){cb.checked=false});updateBulk()});
/* ===== ANNOUNCEMENTS ===== */
(function(){
  var banner=document.getElementById('annBanner');
  var dismissed=JSON.parse(localStorage.getItem('dismissedAnns')||'[]');
  fetch('/api/announcements').then(function(r){return r.json()}).then(function(d){
    if(!d.announcements||!d.announcements.length)return;
    d.announcements.forEach(function(a){
      if(dismissed.indexOf(a.id)!==-1)return;
      var icons={info:'&#9432;',warning:'&#9888;',success:'&#10003;'};
      var card=document.createElement('div');card.className='ann-card ann-card-'+a.type;
      var icon=document.createElement('span');icon.className='ann-card-icon';icon.innerHTML=icons[a.type]||icons.info;card.appendChild(icon);
      var body=document.createElement('div');body.className='ann-card-body';
      var title=document.createElement('div');title.className='ann-card-title';title.textContent=a.title;body.appendChild(title);
      var text=document.createElement('div');text.textContent=a.content;body.appendChild(text);
      card.appendChild(body);
      var close=document.createElement('button');close.className='ann-card-close';close.innerHTML='&times;';
      close.addEventListener('click',function(){card.remove();dismissed.push(a.id);localStorage.setItem('dismissedAnns',JSON.stringify(dismissed))});
      card.appendChild(close);
      banner.appendChild(card);
    });
  }).catch(function(){});
})();

document.getElementById('bulkDel').addEventListener('click',function(){
  var ids=getSelected();if(!ids.length)return;
  if(!confirm(ids.length+' kaydi silmek istediginize emin misiniz?'))return;
  var btn=this;btn.disabled=true;btn.textContent='Siliniyor...';
  fetch('/sil-toplu',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ids:ids})})
    .then(function(r){return r.json()}).then(function(d){
      if(d.ok){toast(ids.length+' kayit silindi',true);document.getElementById('selAll').checked=false;updateBulk();reload()}
      else toast(d.error||'Hata',false);
    }).catch(function(){toast('Hata',false)}).finally(function(){btn.disabled=false;btn.textContent='Secilenleri Sil'});
});
if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(function(){});}
</script>
<button id="theme-fab" class="theme-fab" type="button" aria-label="Tema seç"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></button>
<div id="theme-menu" class="theme-menu" role="menu" aria-label="Tema seçenekleri" hidden></div>
</body></html>`
}
