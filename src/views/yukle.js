// dosyalar.amator.tr/yukle — admin upload UI.
// Sadece adminler erisir; auth handler /yukle rotasinda kontrol eder.
// Multipart upload -> /api/dosyalar/upload (admin cookie .amator.tr scope).

function e(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}

export function yuklePage(user){
return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dosya Yukle — dosyalar.amator.tr</title>
<link rel="icon" type="image/png" sizes="32x32" href="https://amator.tr/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://amator.tr/favicon-16x16.png">
<script>(function(){var t=localStorage.getItem('theme')||'dark';if(t==='cengiz')t='vanta-black';if(t==='auto')t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',t)})()</script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root,html[data-theme="dark"]{--bg:#06080f;--s1:#0c1018;--s2:#141a24;--s3:#1e2735;--b1:rgba(255,255,255,.05);--b2:rgba(255,255,255,.08);--t1:#eaf0f6;--t2:#8b96a4;--t3:#4a5568;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--yg:rgba(251,191,36,.08);--shadow:rgba(0,0,0,.4)}
html[data-theme="light"]{--bg:#f0f2f5;--s1:#ffffff;--s2:#f8f9fb;--s3:#e8ecf1;--b1:rgba(0,0,0,.07);--b2:rgba(0,0,0,.1);--t1:#0f172a;--t2:#475569;--t3:#94a3b8;--p:#7c3aed;--p2:#6d28d9;--pg:rgba(124,58,237,.07);--g:#0d9488;--gg:rgba(13,148,136,.06);--r:#dc2626;--rg:rgba(220,38,38,.06);--y:#d97706;--yg:rgba(217,119,6,.06);--shadow:rgba(0,0,0,.12)}
html[data-theme="vanta-black"]{--bg:#000;--s1:#080808;--s2:#101010;--s3:#1a1a1a;--b1:rgba(255,255,255,.04);--b2:rgba(255,255,255,.06);--t1:#c8c8c8;--t2:#808080;--t3:#505050;--p:#8b5cf6;--p2:#a78bfa;--pg:rgba(139,92,246,.1);--g:#2dd4bf;--gg:rgba(45,212,191,.07);--r:#ef4444;--rg:rgba(239,68,68,.06);--y:#fbbf24;--yg:rgba(251,191,36,.08);--shadow:rgba(0,0,0,.6)}
body{background:var(--bg);color:var(--t1);font-family:'Inter',system-ui,sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased}
.top{position:sticky;top:0;z-index:90;background:var(--s1);border-bottom:1px solid var(--b1);height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 24px}
.brand{display:flex;align-items:center;gap:10px;color:var(--t1);text-decoration:none;font-weight:700;font-size:14px}
.brand i{width:30px;height:30px;background:linear-gradient(135deg,var(--p),#6d28d9);border-radius:8px;display:grid;place-items:center;font-style:normal;font-size:14px;color:#fff}
.top-r{display:flex;gap:8px;align-items:center}
.user-tag{font-size:12px;color:var(--t2);font-family:'JetBrains Mono',monospace}
.tbtn{padding:6px 12px;border-radius:6px;font-size:12px;font-weight:500;text-decoration:none;border:1px solid var(--b1);background:var(--s2);color:var(--t2);cursor:pointer}
.tbtn:hover{background:var(--s3);color:var(--t1)}
.wrap{max-width:1200px;margin:0 auto;padding:24px}
.card{background:var(--s1);border:1px solid var(--b1);border-radius:10px;padding:20px;margin-bottom:16px}
.card-h{font-size:15px;font-weight:700;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
.dropzone{border:2px dashed var(--b2);border-radius:10px;padding:40px 24px;text-align:center;background:var(--s2);transition:.2s;cursor:pointer}
.dropzone:hover,.dropzone.over{border-color:var(--p);background:var(--pg)}
.dropzone-icon{font-size:36px;margin-bottom:8px}
.dropzone-text{font-size:14px;color:var(--t2)}
.dropzone-hint{font-size:12px;color:var(--t3);margin-top:6px}
input[type=file]{display:none}
.queue{margin-top:16px;display:flex;flex-direction:column;gap:8px}
.q-item{background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:10px 14px;display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;font-size:13px}
.q-item .qname{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.q-item .qbar{height:4px;background:var(--s3);border-radius:2px;overflow:hidden;margin-top:6px}
.q-item .qbar > div{height:100%;background:var(--p);transition:width .2s;width:0}
.q-item .qstats{font-size:11px;color:var(--t3);margin-top:6px;font-family:'JetBrains Mono',monospace;display:flex;gap:10px;flex-wrap:wrap}
.q-item .qstats span{white-space:nowrap}
.q-item .qstats .qstat-eta{color:var(--p2)}
.fitem .ftop{display:flex;gap:10px;align-items:center}
.fitem .fcheck{flex-shrink:0}
.fitem .fcheck input{cursor:pointer;accent-color:var(--p)}
.bulk-bar{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--pg);border:1px solid var(--p);border-radius:8px;margin-bottom:10px;font-size:13px}
.bulk-bar.hidden{display:none}
.bulk-bar .b-count{flex:1;font-weight:600;color:var(--p)}
.q-item.q-ok{border-color:rgba(45,212,191,.3)}
.q-item.q-err{border-color:rgba(239,68,68,.3)}
.q-status{font-size:11px;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.q-cancel-btn{padding:3px 8px;border-radius:4px;font-size:10px;font-weight:600;border:1px solid var(--b1);background:var(--s2);color:var(--t2);cursor:pointer;margin-left:8px}
.q-cancel-btn:hover{border-color:var(--r);color:var(--r)}
.q-ok .q-status{color:var(--g)}
.q-err .q-status{color:var(--r)}
.q-result{grid-column:1 / -1;margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.q-result code{flex:1;background:var(--s3);padding:6px 10px;border-radius:5px;font-size:11px;color:var(--t1);font-family:'JetBrains Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.copy-btn{padding:5px 10px;border-radius:5px;font-size:11px;font-weight:600;border:1px solid var(--b1);background:var(--s2);color:var(--t2);cursor:pointer}
.copy-btn:hover{background:var(--p);color:#fff;border-color:var(--p)}
.toolbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
.search,.toolbar select{padding:8px 12px;background:var(--s2);border:1px solid var(--b1);border-radius:6px;color:var(--t1);font-size:13px;outline:none;font-family:inherit}
.search{flex:1;min-width:200px}
.search:focus,.toolbar select:focus{border-color:var(--p)}
.list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px}
.fitem{background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:8px}
.fitem .ftop{display:flex;gap:10px;align-items:center}
.fthumb{width:44px;height:44px;border-radius:6px;background:var(--s3);display:grid;place-items:center;font-size:18px;flex-shrink:0;overflow:hidden}
.fthumb img{width:100%;height:100%;object-fit:cover}
.fmeta{flex:1;min-width:0}
.fname{font-size:13px;font-weight:600;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:'JetBrains Mono',monospace}
.fsub{font-size:11px;color:var(--t3);margin-top:2px}
.fcat{display:inline-block;padding:1px 7px;border-radius:3px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;background:var(--pg);color:var(--p)}
.factions{display:flex;gap:6px;flex-wrap:wrap}
.act-btn{padding:5px 10px;border-radius:5px;font-size:11px;font-weight:500;cursor:pointer;border:1px solid var(--b1);background:var(--s2);color:var(--t2)}
.act-btn:hover{border-color:var(--b2);background:var(--s3)}
.act-btn-r{color:var(--r);border-color:rgba(239,68,68,.15)}
.act-btn-r:hover{background:var(--rg)}
.act-btn-p{color:var(--p);border-color:rgba(139,92,246,.2)}
.empty{text-align:center;padding:32px;color:var(--t3);font-size:13px;grid-column:1/-1}
.totals{font-size:12px;color:var(--t3);font-family:'JetBrains Mono',monospace}
.toast{position:fixed;bottom:20px;right:20px;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:999;background:var(--s1);border:1px solid var(--b1);color:var(--t1);box-shadow:0 8px 30px var(--shadow);animation:fadeIn .2s}
.toast.toast-r{border-color:rgba(239,68,68,.3);color:var(--r)}
.toast.toast-g{border-color:rgba(45,212,191,.3);color:var(--g)}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1}}
.pw-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(5px);z-index:200;place-items:center;padding:16px}
.pw-modal.open{display:grid}
.pw-box{background:var(--s1);border:1px solid var(--b2);border-radius:12px;padding:24px;width:100%;max-width:360px;box-shadow:0 20px 50px var(--shadow)}
.pw-box h3{font-size:14px;margin-bottom:14px}
.pw-box p{font-size:12px;color:var(--t3);margin-bottom:14px}
.pw-box input{width:100%;padding:10px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;color:var(--t1);font-size:14px;outline:none;margin-bottom:12px}
.pw-box input:focus{border-color:var(--p)}
.pw-btns{display:flex;gap:8px;justify-content:flex-end}
.pw-btns button{padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none}
.pw-cancel{background:var(--s3);color:var(--t2)}
.pw-save{background:var(--r);color:#fff}
</style>
</head>
<body>
<div class="top">
<a class="brand" href="/"><i>D</i><span>dosyalar.amator.tr</span></a>
<div class="top-r">
<span class="user-tag">${e(user.username)}</span>
<a class="tbtn" href="https://cagri.amator.tr/admin">← Admin</a>
<a class="tbtn" href="/">Listele</a>
<button class="tbtn" id="themeBtn" type="button">Tema</button>
</div>
</div>

<div class="wrap">

<div class="card">
<div class="card-h"><span>Yukle</span><span class="totals" id="totals">…</span></div>
<div class="dropzone" id="dropzone" tabindex="0" role="button" aria-label="Dosya secmek icin tikla veya surukle">
<div class="dropzone-icon">⬆</div>
<div class="dropzone-text">Dosyalari surukle/birak veya tiklayip sec</div>
<div class="dropzone-hint">Cloudflare 100 MB ustu icin otomatik chunked upload (5 GB'a kadar)</div>
</div>
<input type="file" id="fileInput" multiple>
<div class="queue" id="queue"></div>
</div>

<div class="card">
<div class="card-h"><span>Yuklenmis Dosyalar</span></div>
<div class="toolbar">
<input type="search" class="search" id="search" placeholder="Dosya adi ara...">
<select id="catFilter">
<option value="">Tum kategoriler</option>
<option value="img">img — Gorseller</option>
<option value="pdf">pdf — PDF</option>
<option value="video">video — Video</option>
<option value="audio">audio — Ses</option>
<option value="arsiv">arsiv — Arsiv</option>
<option value="exe">exe — Calistirilabilir</option>
<option value="doc">doc — Dokuman</option>
<option value="diger">diger — Diger</option>
</select>
<button class="tbtn" id="reloadBtn" type="button">Yenile</button>
<label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--t2);cursor:pointer;margin-left:auto">
  <input type="checkbox" id="selectAll" style="cursor:pointer;accent-color:var(--p)"> Tumunu sec
</label>
</div>
<div class="bulk-bar hidden" id="bulkBar">
<span class="b-count" id="bulkCount">0 secili</span>
<button class="act-btn act-btn-r" id="bulkDelBtn" type="button">Secilenleri sil</button>
<button class="act-btn" id="bulkClearBtn" type="button">Secimi temizle</button>
</div>
<div class="list" id="filesList"></div>
</div>

</div>

<div class="pw-modal" id="pwModal">
<div class="pw-box">
<h3>Dosyayi sil</h3>
<p>Bu islem icin admin sifrenizi tekrar girin. Dosya hem diskten hem DB'den silinir, geri alinamaz.</p>
<input type="password" id="pwInput" placeholder="Admin sifresi" autocomplete="current-password">
<div class="pw-btns"><button class="pw-cancel" id="pwCancel" type="button">Iptal</button><button class="pw-save" id="pwConfirm" type="button">Sil</button></div>
</div>
</div>

<div class="pw-modal" id="conflictModal">
<div class="pw-box" style="max-width:440px">
<h3>Bu isimde dosya zaten var</h3>
<p id="conflictMsg" style="margin-bottom:14px"></p>
<div class="pw-btns" style="justify-content:flex-start;flex-wrap:wrap;gap:6px">
<button class="pw-cancel" id="ckCancel" type="button">Iptal</button>
<button class="pw-save" id="ckRename" type="button" style="background:var(--p)">Yeniden adlandir</button>
<button class="pw-save" id="ckOverwrite" type="button" style="background:var(--y);color:#000">Uzerine yaz</button>
</div>
</div>
</div>

<div class="pw-modal" id="riskyModal">
<div class="pw-box" style="max-width:440px">
<h3 style="color:var(--y)">⚠ Riskli uzanti</h3>
<p id="riskyMsg" style="margin-bottom:14px"></p>
<p style="font-size:11px;color:var(--t3);margin-bottom:14px">Yine de yuklersen "diger" klasorune gidecek; magic-byte kontrolu atlanir. Sadece guvendigin kaynaklardan yukle.</p>
<div class="pw-btns" style="justify-content:flex-start;flex-wrap:wrap;gap:6px">
<button class="pw-cancel" id="rkCancel" type="button">Iptal</button>
<button class="pw-save" id="rkConfirm" type="button" style="background:var(--y);color:#000">Yine de yukle</button>
</div>
</div>
</div>

<div class="pw-modal" id="renameModal">
<div class="pw-box" style="max-width:520px">
<h3>Yeniden adlandir</h3>
<p style="font-size:12px;color:var(--t3);margin-bottom:8px">Mevcut: <code id="renOldName" style="background:var(--s3);padding:2px 6px;border-radius:3px;font-size:11px"></code></p>
<input type="text" id="renInput" placeholder="yeni-isim.uzanti" style="width:100%;padding:10px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;color:var(--t1);font-size:13px;outline:none;margin-bottom:10px;font-family:'JetBrains Mono',monospace">
<div id="renRefsBox" style="font-size:11px;color:var(--t3);margin-bottom:10px">Referanslar yukleniyor...</div>
<label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--t1);margin-bottom:14px;cursor:pointer">
  <input type="checkbox" id="renUpdateRefs" checked> Tum referanslari guncelle (markdown'lardaki URL'leri yenile + build + git push)
</label>
<div class="pw-btns">
<button class="pw-cancel" id="renCancel" type="button">Iptal</button>
<button class="pw-save" id="renConfirm" type="button" style="background:var(--p)">Yeniden adlandir</button>
</div>
</div>
</div>

<div class="pw-modal" id="bulkRiskyModal">
<div class="pw-box" style="max-width:480px">
<h3 style="color:var(--y)">⚠ Birden fazla riskli uzanti</h3>
<p id="bulkRiskyMsg" style="margin-bottom:8px"></p>
<div id="bulkRiskyList" style="max-height:160px;overflow:auto;background:var(--s2);border:1px solid var(--b1);border-radius:6px;padding:8px;font-size:11px;font-family:'JetBrains Mono',monospace;color:var(--t2);margin-bottom:14px"></div>
<p style="font-size:11px;color:var(--t3);margin-bottom:14px">"Tumunu yukle" — hepsi 'diger' klasorune gider, magic-byte atlanir.</p>
<div class="pw-btns" style="justify-content:flex-start;flex-wrap:wrap;gap:6px">
<button class="pw-cancel" id="brkCancel" type="button">Iptal (hepsini atla)</button>
<button class="pw-save" id="brkConfirm" type="button" style="background:var(--y);color:#000">Tumunu yukle</button>
</div>
</div>
</div>

<script>
function $(s){return document.querySelector(s)}
function $$(s){return document.querySelectorAll(s)}
function fmtSize(n){if(n<1024)return n+' B';if(n<1048576)return (n/1024).toFixed(1)+' KB';if(n<1073741824)return (n/1048576).toFixed(1)+' MB';return (n/1073741824).toFixed(2)+' GB'}
function fmtSpeed(bps){if(!isFinite(bps)||bps<=0)return '-';return fmtSize(bps)+'/s'}
function fmtTime(secs){
  if(!isFinite(secs)||secs<0)return '-';
  if(secs<60)return Math.round(secs)+'sn';
  var m=Math.floor(secs/60);
  var s=Math.round(secs-m*60);
  if(m<60)return m+'dk '+(s<10?'0':'')+s+'sn';
  var h=Math.floor(m/60);
  m=m-h*60;
  return h+'sa '+(m<10?'0':'')+m+'dk';
}
function updateStats(item, done, total, startTime, extra){
  var stats=item.querySelector('.qstats');
  if(!stats){
    stats=document.createElement('div');
    stats.className='qstats';
    item.querySelector('.qbar').parentNode.appendChild(stats);
  }
  var elapsed=(Date.now()-startTime)/1000;
  var speed=elapsed>0.5?done/elapsed:0;
  var remaining=Math.max(0,total-done);
  var eta=speed>0?remaining/speed:Infinity;
  var pct=total>0?Math.round(done/total*100):0;
  var html='<span>'+fmtSize(done)+' / '+fmtSize(total)+' ('+pct+'%)</span>'+
    '<span>'+fmtSpeed(speed)+'</span>'+
    '<span class="qstat-eta">kalan: '+fmtTime(eta)+'</span>';
  if(extra)html+='<span>'+extra+'</span>';
  stats.innerHTML=html;
}
function clearStats(item){
  var stats=item.querySelector('.qstats');
  if(stats)stats.remove();
}
function fmtDate(s){if(!s)return'-';try{var d=new Date(s+(s.indexOf('Z')<0&&s.indexOf('+')<0?' UTC':''));return d.toLocaleString('tr-TR',{timeZone:'Europe/Istanbul',dateStyle:'short',timeStyle:'short'})}catch(e){return s}}
function escHTML(s){var d=document.createElement('div');d.textContent=s||'';return d.innerHTML}
function toast(msg,kind){var t=document.createElement('div');t.className='toast'+(kind==='ok'?' toast-g':kind==='err'?' toast-r':'');t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove()},3500)}

var THEMES=['dark','light','vanta-black'];
$('#themeBtn').addEventListener('click',function(){var cur=document.documentElement.getAttribute('data-theme')||'dark';var i=THEMES.indexOf(cur);var nxt=THEMES[(i+1)%THEMES.length];document.documentElement.setAttribute('data-theme',nxt);localStorage.setItem('theme',nxt)});

var dropzone=$('#dropzone'),fileInput=$('#fileInput'),queue=$('#queue');
dropzone.addEventListener('click',function(){fileInput.click()});
dropzone.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();fileInput.click()}});
['dragenter','dragover'].forEach(function(ev){dropzone.addEventListener(ev,function(e){e.preventDefault();dropzone.classList.add('over')})});
['dragleave','drop'].forEach(function(ev){dropzone.addEventListener(ev,function(e){e.preventDefault();dropzone.classList.remove('over')})});
dropzone.addEventListener('drop',function(e){if(e.dataTransfer&&e.dataTransfer.files)handleFiles(e.dataTransfer.files)});
fileInput.addEventListener('change',function(){handleFiles(fileInput.files);fileInput.value=''});

var CHUNK_THRESHOLD = 90 * 1024 * 1024; // 90 MB - CF 100MB sinirinin biraz altinda
var MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5 GB

// Server-side allowlist'in mirror'i — toplu secimde 'risky' on-classification.
// Server validation hala yapilir; bu sadece UI'in tek modal'la sormasini saglar.
var KNOWN_EXTS = new Set([
  'png','jpg','jpeg','webp','gif',
  'pdf','txt','csv','doc','docx','xls','xlsx',
  'mp3','wav','ogg','m4a',
  'mp4','webm','mov','mkv',
  'zip','tar','gz','7z','rar',
  'exe','msi','dmg','deb','rpm'
]);
function getFileExt(name){var i=name.lastIndexOf('.');return i<0?'':name.slice(i+1).toLowerCase()}
function isKnownExt(ext){return KNOWN_EXTS.has(ext)}

function handleFiles(files){
  files=Array.from(files);
  // Boyut filtresi
  var oksize=[];
  files.forEach(function(f){
    if(f.size>MAX_FILE_SIZE){
      var item=mkQueueItem(f);
      item.classList.add('q-err');
      item.querySelector('.q-status').textContent='> 5GB';
    } else {
      oksize.push(f);
    }
  });
  // Risky vs safe ayrimi
  var safe=[],risky=[];
  oksize.forEach(function(f){
    if(isKnownExt(getFileExt(f.name)))safe.push(f);
    else risky.push(f);
  });
  // Safe dosyalari direkt yukle
  safe.forEach(function(f){uploadFile(f)});
  // Risky 0 ise bitti
  if(risky.length===0)return;
  // Risky 1 ise eski tek-modal akisi (server 400 ile risky_unknown_ext doner, modal acilir)
  if(risky.length===1){uploadFile(risky[0]);return}
  // Risky >=2 — tek batch modal
  askBulkRisky(risky, function(decision){
    if(decision==='cancel'){
      risky.forEach(function(f){
        var item=mkQueueItem(f);
        item.classList.add('q-err');
        item.querySelector('.q-status').textContent='ATLANDI';
        clearCancelBtn(item);
      });
      return;
    }
    // 'all' — hepsi force=true ile
    risky.forEach(function(f){uploadFile(f, undefined, true)});
  });
}

function mkQueueItem(f){
  var div=document.createElement('div');
  div.className='q-item';
  div.innerHTML='<div><div class="qname"></div><div class="qbar"><div></div></div></div><div style="display:flex;align-items:center"><span class="q-status">…</span><button type="button" class="q-cancel-btn">Iptal</button></div>';
  div.querySelector('.qname').textContent=f.name+' · '+fmtSize(f.size);
  // ctx: aktif xhr referansi + cancel flag
  div._ctx={cancelled:false, xhr:null};
  div.querySelector('.q-cancel-btn').addEventListener('click',function(){
    div._ctx.cancelled=true;
    if(div._ctx.xhr){try{div._ctx.xhr.abort()}catch(e){}}
    div.classList.add('q-err');
    div.querySelector('.q-status').textContent='IPTAL';
    div.querySelector('.qbar > div').style.background='var(--r)';
    this.remove();
  });
  queue.insertBefore(div,queue.firstChild);
  return div;
}
function isCancelled(item){return item && item._ctx && item._ctx.cancelled}
function setActiveXhr(item, xhr){if(item && item._ctx)item._ctx.xhr=xhr}
function clearCancelBtn(item){var b=item.querySelector('.q-cancel-btn');if(b)b.remove()}

function uploadFile(f, onConflict, force){
  var item=mkQueueItem(f);
  if(f.size > CHUNK_THRESHOLD){
    doChunkedUpload(f, item, onConflict, force);
  } else {
    doUpload(f, item, onConflict, force);
  }
}

// Buyuk dosya: client-side splitting + chunked upload (CF 100MB bypass).
// init -> chunk*N (raw body) -> finalize.
function doChunkedUpload(f, item, onConflict, force){
  var bar=item.querySelector('.qbar > div');
  var status=item.querySelector('.q-status');
  bar.style.width='0%';bar.style.background='var(--p)';
  status.textContent='HAZIRLANIYOR';
  item.classList.remove('q-err','q-ok');
  Array.prototype.forEach.call(item.querySelectorAll('.q-result'),function(n){n.remove()});
  clearStats(item);

  // 1) init
  var initBody={filename:f.name,total_size:f.size};
  if(onConflict)initBody.on_conflict=onConflict;
  if(force)initBody.force=true;

  fetch('/api/dosyalar/upload/init',{
    method:'POST',credentials:'include',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(initBody)
  }).then(function(r){return r.json().then(function(j){return{status:r.status,j:j}})})
    .then(function(o){
      if(isCancelled(item))return;
      if(o.status===409 && o.j.exists){
        status.textContent='CAKISMA';bar.style.width='100%';bar.style.background='var(--y)';
        askConflict(f, o.j, function(choice){
          if(choice==='cancel'){item.classList.add('q-err');status.textContent='IPTAL'}
          else{doChunkedUpload(f, item, choice, force)}
        });
        return;
      }
      if(o.status===400 && o.j.risky_unknown_ext){
        status.textContent='RISKLI UZANTI';bar.style.width='100%';bar.style.background='var(--y)';
        askRisky(f, o.j, function(ok){
          if(!ok){item.classList.add('q-err');status.textContent='IPTAL'}
          else{doChunkedUpload(f, item, onConflict, true)}
        });
        return;
      }
      if(o.status<200||o.status>=300||!o.j.upload_id){
        item.classList.add('q-err');status.textContent='INIT HATA';bar.style.background='var(--r)';
        var r=document.createElement('div');r.className='q-result';r.style.fontSize='11px';r.style.color='var(--r)';
        r.textContent=o.j.error||('HTTP '+o.status);
        item.appendChild(r);
        return;
      }
      var uploadId=o.j.upload_id;
      var chunkSize=o.j.chunk_size||CHUNK_THRESHOLD;
      var totalChunks=Math.ceil(f.size/chunkSize);
      sendChunks(f, item, uploadId, chunkSize, totalChunks, 0, onConflict, Date.now());
    })
    .catch(function(e){
      item.classList.add('q-err');status.textContent='AGSIZ';bar.style.background='var(--r)';
      var r=document.createElement('div');r.className='q-result';r.style.fontSize='11px';r.style.color='var(--r)';
      r.textContent='init: '+(e.message||'agsiz');
      item.appendChild(r);
    });
}

function sendChunks(f, item, uploadId, chunkSize, totalChunks, idx, onConflict, startTime){
  if(isCancelled(item))return;
  var bar=item.querySelector('.qbar > div');
  var status=item.querySelector('.q-status');

  if(idx>=totalChunks){
    status.textContent='BIRLESTIRILIYOR';
    updateStats(item, f.size, f.size, startTime, 'parca '+totalChunks+'/'+totalChunks);
    finalizeChunked(f, item, uploadId, onConflict, startTime);
    return;
  }

  var start=idx*chunkSize;
  var end=Math.min(start+chunkSize, f.size);
  var blob=f.slice(start,end);
  status.textContent='YUKLENIYOR';

  var xhr=new XMLHttpRequest();
  xhr.open('POST','/api/dosyalar/upload/chunk',true);
  xhr.withCredentials=true;
  xhr.setRequestHeader('Content-Type','application/octet-stream');
  xhr.setRequestHeader('X-Upload-Id',uploadId);
  xhr.setRequestHeader('X-Chunk-Index',String(idx));
  xhr.setRequestHeader('X-Total-Chunks',String(totalChunks));
  setActiveXhr(item, xhr);
  xhr.upload.onprogress=function(e){
    if(e.lengthComputable){
      var totalDone=start+e.loaded;
      bar.style.width=Math.round(totalDone/f.size*100)+'%';
      updateStats(item, totalDone, f.size, startTime, 'parca '+(idx+1)+'/'+totalChunks);
    }
  };
  xhr.onload=function(){
    if(isCancelled(item))return;
    var json={};try{json=JSON.parse(xhr.responseText||'{}')}catch(e){}
    if(xhr.status>=200 && xhr.status<300 && json.ok){
      sendChunks(f, item, uploadId, chunkSize, totalChunks, idx+1, onConflict, startTime);
    } else {
      item.classList.add('q-err');status.textContent='CHUNK HATA';bar.style.background='var(--r)';
      var r=document.createElement('div');r.className='q-result';r.style.fontSize='11px';r.style.color='var(--r)';
      r.textContent='chunk '+(idx+1)+': '+(json.error||('HTTP '+xhr.status));
      item.appendChild(r);
    }
  };
  xhr.onerror=function(){if(isCancelled(item))return;item.classList.add('q-err');status.textContent='AGSIZ';bar.style.background='var(--r)'};
  xhr.send(blob);
}

function finalizeChunked(f, item, uploadId, onConflict, startTime){
  if(isCancelled(item))return;
  var bar=item.querySelector('.qbar > div');
  var status=item.querySelector('.q-status');

  fetch('/api/dosyalar/upload/finalize',{
    method:'POST',credentials:'include',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({upload_id:uploadId})
  }).then(function(r){return r.json().then(function(j){return{status:r.status,j:j}})})
    .then(function(o){
      if(isCancelled(item))return;
      if(o.status>=200 && o.status<300 && o.j.ok){
        clearCancelBtn(item);
        item.classList.add('q-ok');status.textContent=o.j.overwrote?'YAZILDI':(o.j.renamed?'AD DEGISTI':'OK');
        bar.style.width='100%';
        // Final stats: ortalama hiz + toplam sure
        if(startTime){
          var elapsed=(Date.now()-startTime)/1000;
          var avgSpeed=elapsed>0?f.size/elapsed:0;
          var statsEl=item.querySelector('.qstats');
          if(statsEl){
            statsEl.innerHTML='<span>'+fmtSize(f.size)+' tamam</span>'+
              '<span>ort '+fmtSpeed(avgSpeed)+'</span>'+
              '<span class="qstat-eta">sure '+fmtTime(elapsed)+'</span>';
          }
        }
        var r=document.createElement('div');r.className='q-result';
        var c=document.createElement('code');c.textContent=o.j.url;
        var copy=document.createElement('button');copy.className='copy-btn';copy.textContent='URL kopyala';
        copy.addEventListener('click',function(){navigator.clipboard.writeText(o.j.url);toast('URL kopyalandi','ok')});
        r.appendChild(c);r.appendChild(copy);
        if(o.j.category==='img'){
          var copyMd=document.createElement('button');copyMd.className='copy-btn';copyMd.textContent='Markdown kopyala';
          copyMd.addEventListener('click',function(){navigator.clipboard.writeText('!['+(o.j.stored_name||f.name)+']('+o.j.url+')');toast('Markdown kopyalandi','ok')});
          r.appendChild(copyMd);
        }
        item.appendChild(r);
        loadList();
      } else {
        item.classList.add('q-err');status.textContent='FINAL HATA';bar.style.background='var(--r)';
        var r=document.createElement('div');r.className='q-result';r.style.fontSize='11px';r.style.color='var(--r)';
        r.textContent=o.j.error||('HTTP '+o.status);
        item.appendChild(r);
      }
    })
    .catch(function(e){
      item.classList.add('q-err');status.textContent='AGSIZ';bar.style.background='var(--r)';
    });
}

function doUpload(f, item, onConflict, force){
  var bar=item.querySelector('.qbar > div');
  var status=item.querySelector('.q-status');
  bar.style.width='0%';bar.style.background='var(--p)';
  status.textContent='YUKLENIYOR';
  item.classList.remove('q-err','q-ok');
  // Eski result kutucuklari + stats temizle
  Array.prototype.forEach.call(item.querySelectorAll('.q-result'),function(n){n.remove()});
  clearStats(item);

  var fd=new FormData();fd.append('file',f);
  var qs=[];
  if(onConflict)qs.push('on_conflict='+encodeURIComponent(onConflict));
  if(force)qs.push('force=true');
  var url='/api/dosyalar/upload'+(qs.length?'?'+qs.join('&'):'');
  var xhr=new XMLHttpRequest();
  xhr.open('POST',url,true);
  xhr.withCredentials=true;
  setActiveXhr(item, xhr);
  var startTime=Date.now();
  xhr.upload.onprogress=function(e){
    if(e.lengthComputable){
      bar.style.width=Math.round(e.loaded/e.total*100)+'%';
      updateStats(item, e.loaded, e.total, startTime);
    }
  };
  xhr.onload=function(){
    if(isCancelled(item))return;
    var json={};try{json=JSON.parse(xhr.responseText||'{}')}catch(e){}
    if(xhr.status>=200 && xhr.status<300 && json.ok){
      clearCancelBtn(item);
      item.classList.add('q-ok');status.textContent=json.overwrote?'YAZILDI':(json.renamed?'AD DEGISTI':'OK');bar.style.width='100%';
      // Final stats
      var elapsed=(Date.now()-startTime)/1000;
      var avgSpeed=elapsed>0?f.size/elapsed:0;
      var statsEl=item.querySelector('.qstats');
      if(statsEl){
        statsEl.innerHTML='<span>'+fmtSize(f.size)+' tamam</span>'+
          '<span>ort '+fmtSpeed(avgSpeed)+'</span>'+
          '<span class="qstat-eta">sure '+fmtTime(elapsed)+'</span>';
      }
      var r=document.createElement('div');r.className='q-result';
      var c=document.createElement('code');c.textContent=json.url;
      var copy=document.createElement('button');copy.className='copy-btn';copy.textContent='URL kopyala';
      copy.addEventListener('click',function(){navigator.clipboard.writeText(json.url);toast('URL kopyalandi','ok')});
      var copyMd=null;
      if(json.category==='img'){
        copyMd=document.createElement('button');copyMd.className='copy-btn';copyMd.textContent='Markdown kopyala';
        copyMd.addEventListener('click',function(){navigator.clipboard.writeText('!['+(json.stored_name||f.name)+']('+json.url+')');toast('Markdown kopyalandi','ok')});
      }
      r.appendChild(c);r.appendChild(copy);if(copyMd)r.appendChild(copyMd);
      item.appendChild(r);
      loadList();
    } else if(xhr.status===409 && json.exists){
      status.textContent='CAKISMA';bar.style.width='100%';bar.style.background='var(--y)';
      askConflict(f, json, function(choice){
        if(choice==='cancel'){item.classList.add('q-err');status.textContent='IPTAL'}
        else{doUpload(f, item, choice, force)}
      });
    } else if(xhr.status===400 && json.risky_unknown_ext){
      status.textContent='RISKLI UZANTI';bar.style.width='100%';bar.style.background='var(--y)';
      askRisky(f, json, function(ok){
        if(!ok){item.classList.add('q-err');status.textContent='IPTAL'}
        else{doUpload(f, item, onConflict, true)}
      });
    } else {
      item.classList.add('q-err');status.textContent='HATA';bar.style.width='100%';bar.style.background='var(--r)';
      var r=document.createElement('div');r.className='q-result';r.style.fontSize='11px';r.style.color='var(--r)';
      r.textContent=json.error||('HTTP '+xhr.status);
      item.appendChild(r);
    }
  };
  xhr.onerror=function(){if(isCancelled(item))return;item.classList.add('q-err');status.textContent='AGSIZ';bar.style.background='var(--r)'};
  xhr.send(fd);
}

var pendingConflict=null;
function askConflict(file, info, callback){
  pendingConflict={callback:callback};
  $('#conflictMsg').innerHTML='<strong>'+escHTML(info.original_name)+'</strong><br>'+
    'Mevcut: <code style="font-size:11px;background:var(--s3);padding:2px 6px;border-radius:3px">'+escHTML(info.existing_url)+'</code><br><br>'+
    '<strong>Yeniden adlandir</strong>: dosya <code>'+escHTML(info.suggested_name||'?')+'</code> olarak kaydedilir.<br>'+
    '<strong>Uzerine yaz</strong>: mevcut dosya silinip yenisi konur (geri alinamaz).<br>'+
    '<strong>Iptal</strong>: yukleme atlanir.';
  $('#conflictModal').classList.add('open');
}
function closeConflict(choice){
  $('#conflictModal').classList.remove('open');
  if(pendingConflict && pendingConflict.callback){
    var cb=pendingConflict.callback;pendingConflict=null;
    cb(choice);
  }
}
$('#ckCancel').addEventListener('click',function(){closeConflict('cancel')});
$('#ckRename').addEventListener('click',function(){closeConflict('rename')});
$('#ckOverwrite').addEventListener('click',function(){closeConflict('overwrite')});

var pendingRisky=null;
function askRisky(file, info, callback){
  pendingRisky={callback:callback};
  $('#riskyMsg').innerHTML='<strong>'+escHTML(file.name)+'</strong><br>'+
    'Uzanti: <code style="font-size:11px;background:var(--s3);padding:2px 6px;border-radius:3px">.'+escHTML(info.ext||'?')+'</code><br><br>'+
    'Bu uzanti dosyalar.amator.tr allowlist\\'inde yok. Magic-byte kontrolu uzantiya gore yapilamaz, dosya icerigi dogrulanamaz.';
  $('#riskyModal').classList.add('open');
}
function closeRisky(ok){
  $('#riskyModal').classList.remove('open');
  if(pendingRisky && pendingRisky.callback){
    var cb=pendingRisky.callback;pendingRisky=null;
    cb(ok);
  }
}
$('#rkCancel').addEventListener('click',function(){closeRisky(false)});
$('#rkConfirm').addEventListener('click',function(){closeRisky(true)});

var pendingBulkRisky=null;
function askBulkRisky(files, callback){
  pendingBulkRisky={callback:callback};
  var exts={};
  files.forEach(function(f){
    var e=getFileExt(f.name)||'(uzanti yok)';
    exts[e]=(exts[e]||0)+1;
  });
  var extSummary=Object.keys(exts).map(function(e){return '.'+e+'×'+exts[e]}).join(', ');
  $('#bulkRiskyMsg').innerHTML='<strong>'+files.length+' dosyanin uzantisi listede yok</strong> ('+escHTML(extSummary)+').';
  var listHtml=files.map(function(f){return escHTML(f.name)+' <span style="color:var(--t3)">· '+fmtSize(f.size)+'</span>'}).join('<br>');
  $('#bulkRiskyList').innerHTML=listHtml;
  $('#bulkRiskyModal').classList.add('open');
}
function closeBulkRisky(decision){
  $('#bulkRiskyModal').classList.remove('open');
  if(pendingBulkRisky && pendingBulkRisky.callback){
    var cb=pendingBulkRisky.callback;pendingBulkRisky=null;
    cb(decision);
  }
}
$('#brkCancel').addEventListener('click',function(){closeBulkRisky('cancel')});
$('#brkConfirm').addEventListener('click',function(){closeBulkRisky('all')});

var pendingRename=null;
function openRename(item){
  pendingRename=item;
  // Mevcut isim stored_path'in basename'i — backend zaten original_name dondu
  var currentName=item.stored_path?item.stored_path.split('/').pop():item.original_name;
  $('#renOldName').textContent=currentName;
  $('#renInput').value=currentName;
  $('#renUpdateRefs').checked=true;
  $('#renRefsBox').innerHTML='Referanslar yukleniyor...';
  $('#renRefsBox').style.color='var(--t3)';
  $('#renConfirm').disabled=false;
  $('#renameModal').classList.add('open');
  $('#renInput').focus();
  $('#renInput').setSelectionRange(0, currentName.lastIndexOf('.')>0?currentName.lastIndexOf('.'):currentName.length);

  // Refs scan
  fetch('/api/dosyalar/'+item.id+'/refs',{credentials:'include'})
    .then(function(r){return r.json()})
    .then(function(d){
      if(d.error){$('#renRefsBox').innerHTML='<span style="color:var(--r)">Refs hatasi: '+escHTML(d.error)+'</span>';return}
      if(d.total_hits===0){
        $('#renRefsBox').innerHTML='<span style="color:var(--g)">Bu dosya hicbir yerde referans edilmiyor — guvenle yeniden adlandirabilirsin.</span>';
        return;
      }
      var html='<strong style="color:var(--y)">'+d.total_hits+' referans bulundu</strong>:<br>';
      var lines=[];
      (d.md_refs||[]).forEach(function(r){
        lines.push('• '+escHTML(r.dir)+'/'+escHTML(r.slug)+'.md ('+r.hits.length+' kez)');
      });
      (d.db_refs||[]).forEach(function(r){
        lines.push('• DB '+escHTML(r.kind||'?')+' "'+escHTML(r.slug)+'" ('+r.status+', '+r.hits.length+' kez)');
      });
      html+='<div style="max-height:120px;overflow:auto;background:var(--s2);border:1px solid var(--b1);border-radius:6px;padding:8px;margin-top:6px;font-family:JetBrains Mono,monospace">'+lines.join('<br>')+'</div>';
      $('#renRefsBox').innerHTML=html;
    })
    .catch(function(e){$('#renRefsBox').innerHTML='<span style="color:var(--r)">Refs hatasi: '+escHTML(e.message)+'</span>'});
}
function closeRename(){$('#renameModal').classList.remove('open');pendingRename=null}
$('#renCancel').addEventListener('click',closeRename);
$('#renConfirm').addEventListener('click',function(){
  if(!pendingRename)return;
  var newName=$('#renInput').value.trim();
  if(!newName){toast('Yeni isim bos olamaz','err');return}
  var updateRefs=$('#renUpdateRefs').checked;
  $('#renConfirm').disabled=true;$('#renConfirm').textContent='Calisiyor...';
  fetch('/api/dosyalar/'+pendingRename.id+'/rename',{
    method:'POST',credentials:'include',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({new_name:newName,update_refs:updateRefs})
  }).then(function(r){return r.json().then(function(j){return{status:r.status,j:j}})})
    .then(function(o){
      $('#renConfirm').disabled=false;$('#renConfirm').textContent='Yeniden adlandir';
      if(o.status>=200&&o.status<300&&o.j.ok){
        var msg='Adlandirildi';
        if(o.j.md_updated||o.j.db_updated){
          msg+=' · md='+o.j.md_updated+', db='+o.j.db_updated;
          if(o.j.commit)msg+=' · commit '+o.j.commit.slice(0,7);
        }
        toast(msg,'ok');
        closeRename();
        loadList();
      } else {
        toast(o.j.error||'Hata','err');
      }
    })
    .catch(function(e){
      $('#renConfirm').disabled=false;$('#renConfirm').textContent='Yeniden adlandir';
      toast(e.message||'agsiz','err');
    });
});

function loadList(){
  var cat=$('#catFilter').value;var q=$('#search').value.trim();
  var url='/api/dosyalar/list'+(cat||q?'?':'')+(cat?'category='+encodeURIComponent(cat):'')+(cat&&q?'&':'')+(q?'q='+encodeURIComponent(q):'');
  fetch(url,{credentials:'include'}).then(function(r){return r.json()}).then(function(d){
    $('#totals').textContent=(d.total_count||0)+' dosya · '+fmtSize(d.total_size||0);
    var list=$('#filesList');list.textContent='';
    if(!d.items||!d.items.length){var em=document.createElement('div');em.className='empty';em.textContent='Dosya yok';list.appendChild(em);return}
    d.items.forEach(function(it){
      var div=document.createElement('div');div.className='fitem';
      var icon='📄';
      if(it.category==='img')icon='🖼';else if(it.category==='pdf')icon='📕';else if(it.category==='video')icon='🎬';else if(it.category==='audio')icon='🎵';else if(it.category==='arsiv')icon='📦';else if(it.category==='exe')icon='⚙';else if(it.category==='doc')icon='📝';
      var thumb='<div class="fthumb">'+icon+'</div>';
      if(it.category==='img'){thumb='<div class="fthumb"><img loading="lazy" src="'+escHTML(it.url)+'" alt=""></div>'}
      div.innerHTML='<div class="fcheck"><input type="checkbox" data-id="'+it.id+'"></div>'+thumb+'<div class="fmeta"></div>';
      var meta=div.querySelector('.fmeta');
      var chk=div.querySelector('.fcheck input');
      chk.addEventListener('change',function(){updateBulkBar()});
      // Diskteki gercek isim (URL ile ayni). Cakismada server (2),(3) suffix
      // ekliyor — orijinal isim degil bunu goster ki tek-isim-iki-dosya
      // confusion olmasin.
      var storedName=it.stored_path?it.stored_path.split('/').pop():it.original_name;
      var nm=document.createElement('div');nm.className='fname';nm.textContent=storedName;
      nm.title=storedName;
      var sub=document.createElement('div');sub.className='fsub';
      var subParts='<span class="fcat">'+escHTML(it.category)+'</span> · '+fmtSize(it.size)+' · '+fmtDate(it.uploaded_at);
      // Yuklenirken farkli isimdeyse "yuklenen: X" ipucu
      if(it.original_name && it.original_name!==storedName){
        subParts+=' · <span style="color:var(--y)" title="Yuklenen orijinal isim">yüklenen: '+escHTML(it.original_name)+'</span>';
      }
      sub.innerHTML=subParts;
      meta.appendChild(nm);meta.appendChild(sub);
      var top=document.createElement('div');top.className='ftop';
      // 3 elemani sirayla top'a tasi: fcheck, fthumb, fmeta
      top.appendChild(div.firstChild);top.appendChild(div.firstChild);top.appendChild(div.firstChild);
      div.insertBefore(top,div.firstChild);
      var actions=document.createElement('div');actions.className='factions';
      var bCopy=document.createElement('button');bCopy.className='act-btn act-btn-p';bCopy.textContent='URL';
      bCopy.addEventListener('click',function(){navigator.clipboard.writeText(it.url);toast('URL kopyalandi','ok')});
      var bOpen=document.createElement('a');bOpen.className='act-btn';bOpen.textContent='Ac';bOpen.href=it.url;bOpen.target='_blank';bOpen.rel='noopener';
      var bRen=document.createElement('button');bRen.className='act-btn';bRen.textContent='Ad';
      bRen.addEventListener('click',function(){openRename(it)});
      var bDel=document.createElement('button');bDel.className='act-btn act-btn-r';bDel.textContent='Sil';
      bDel.addEventListener('click',function(){confirmDelete(it)});
      actions.appendChild(bCopy);actions.appendChild(bOpen);actions.appendChild(bRen);actions.appendChild(bDel);
      if(it.category==='img'){
        var bMd=document.createElement('button');bMd.className='act-btn';bMd.textContent='MD';
        bMd.addEventListener('click',function(){navigator.clipboard.writeText('!['+it.original_name+']('+it.url+')');toast('Markdown kopyalandi','ok')});
        actions.appendChild(bMd);
      }
      div.appendChild(actions);
      list.appendChild(div);
    });
  }).catch(function(e){toast('Liste alinamadi: '+e.message,'err')});
}

var pendingDelete=null;
function confirmDelete(it){pendingDelete=it;$('#pwInput').value='';$('#pwModal').classList.add('open');$('#pwInput').focus()}
$('#pwCancel').addEventListener('click',function(){$('#pwModal').classList.remove('open');$('#pwModal').querySelector('h3').textContent='Dosyayi sil';pendingDelete=null;bulkDeleteIds=null});
$('#pwConfirm').addEventListener('click',function(){
  var pw=$('#pwInput').value;if(!pw){toast('Sifre gerekli','err');return}
  // Bulk delete oncelikli
  if(bulkDeleteIds && bulkDeleteIds.length){
    var ids=bulkDeleteIds;
    fetch('/api/dosyalar/bulk-delete',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw,ids:ids})})
      .then(function(r){return r.json().then(function(j){return{status:r.status,j:j}})})
      .then(function(o){
        if(o.status>=200&&o.status<300&&o.j.ok){
          var msg=o.j.deleted+' dosya silindi';
          if(o.j.failed&&o.j.failed.length)msg+=' ('+o.j.failed.length+' hata)';
          toast(msg,'ok');
          $('#pwModal').classList.remove('open');
          $('#pwModal').querySelector('h3').textContent='Dosyayi sil';
          bulkDeleteIds=null;
          loadList();
        } else {
          toast(o.j.error||'Bulk silme basarisiz','err');
        }
      });
    return;
  }
  if(!pendingDelete)return;
  fetch('/api/dosyalar/'+pendingDelete.id,{method:'DELETE',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})})
    .then(function(r){return r.json().then(function(j){return{status:r.status,j:j}})})
    .then(function(o){
      if(o.status>=200&&o.status<300&&o.j.ok){toast('Silindi','ok');$('#pwModal').classList.remove('open');pendingDelete=null;loadList()}
      else{toast(o.j.error||'Silme basarisiz','err')}
    });
});

$('#search').addEventListener('input',function(){clearTimeout(window._sT);window._sT=setTimeout(loadList,250)});
$('#catFilter').addEventListener('change',loadList);
$('#reloadBtn').addEventListener('click',loadList);

function getSelectedIds(){
  return Array.prototype.map.call($$('#filesList .fcheck input:checked'),function(i){return parseInt(i.dataset.id,10)}).filter(function(n){return n>0});
}
function updateBulkBar(){
  var ids=getSelectedIds();
  var bar=$('#bulkBar');
  if(ids.length===0){bar.classList.add('hidden');$('#selectAll').checked=false;return}
  bar.classList.remove('hidden');
  $('#bulkCount').textContent=ids.length+' secili';
}
$('#selectAll').addEventListener('change',function(){
  var checked=this.checked;
  Array.prototype.forEach.call($$('#filesList .fcheck input'),function(i){i.checked=checked});
  updateBulkBar();
});
$('#bulkClearBtn').addEventListener('click',function(){
  Array.prototype.forEach.call($$('#filesList .fcheck input'),function(i){i.checked=false});
  $('#selectAll').checked=false;
  updateBulkBar();
});
$('#bulkDelBtn').addEventListener('click',function(){
  var ids=getSelectedIds();
  if(!ids.length)return;
  bulkDeleteIds=ids;
  $('#pwInput').value='';$('#pwModal').classList.add('open');
  $('#pwModal').querySelector('h3').textContent=ids.length+' dosyayi sil';
  $('#pwInput').focus();
});

var bulkDeleteIds=null;
// pwConfirm hem tek-sil hem bulk-sil icin kullanilir
loadList();
</script>
</body></html>`;
}
