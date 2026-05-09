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
.q-item.q-ok{border-color:rgba(45,212,191,.3)}
.q-item.q-err{border-color:rgba(239,68,68,.3)}
.q-status{font-size:11px;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;font-weight:600}
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
<div class="dropzone-hint">Maks 100 MB / dosya · img, pdf, video, audio, arsiv, exe, doc, txt</div>
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

<script>
function $(s){return document.querySelector(s)}
function $$(s){return document.querySelectorAll(s)}
function fmtSize(n){if(n<1024)return n+' B';if(n<1048576)return (n/1024).toFixed(1)+' KB';if(n<1073741824)return (n/1048576).toFixed(1)+' MB';return (n/1073741824).toFixed(2)+' GB'}
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

function handleFiles(files){
  Array.from(files).forEach(function(f){
    if(f.size > 100 * 1024 * 1024){
      var item=mkQueueItem(f);
      item.classList.add('q-err');
      item.querySelector('.q-status').textContent='> 100MB';
      return;
    }
    uploadFile(f);
  });
}

function mkQueueItem(f){
  var div=document.createElement('div');
  div.className='q-item';
  div.innerHTML='<div><div class="qname"></div><div class="qbar"><div></div></div></div><span class="q-status">…</span>';
  div.querySelector('.qname').textContent=f.name+' · '+fmtSize(f.size);
  queue.insertBefore(div,queue.firstChild);
  return div;
}

function uploadFile(f, onConflict){
  var item=mkQueueItem(f);
  doUpload(f, item, onConflict);
}

function doUpload(f, item, onConflict){
  var bar=item.querySelector('.qbar > div');
  var status=item.querySelector('.q-status');
  bar.style.width='0%';bar.style.background='var(--p)';
  status.textContent='YUKLENIYOR';
  item.classList.remove('q-err','q-ok');
  // Eski result kutucuklari temizle
  Array.prototype.forEach.call(item.querySelectorAll('.q-result'),function(n){n.remove()});

  var fd=new FormData();fd.append('file',f);
  var url='/api/dosyalar/upload'+(onConflict?'?on_conflict='+encodeURIComponent(onConflict):'');
  var xhr=new XMLHttpRequest();
  xhr.open('POST',url,true);
  xhr.withCredentials=true;
  xhr.upload.onprogress=function(e){if(e.lengthComputable){bar.style.width=Math.round(e.loaded/e.total*100)+'%'}};
  xhr.onload=function(){
    var json={};try{json=JSON.parse(xhr.responseText||'{}')}catch(e){}
    if(xhr.status>=200 && xhr.status<300 && json.ok){
      item.classList.add('q-ok');status.textContent=json.overwrote?'YAZILDI':(json.renamed?'AD DEGISTI':'OK');bar.style.width='100%';
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
      // Cakisma — kullaniciya sor
      status.textContent='CAKISMA';bar.style.width='100%';bar.style.background='var(--y)';
      askConflict(f, json, function(choice){
        if(choice==='cancel'){
          item.classList.add('q-err');status.textContent='IPTAL';
        } else {
          doUpload(f, item, choice);
        }
      });
    } else {
      item.classList.add('q-err');status.textContent='HATA';bar.style.width='100%';bar.style.background='var(--r)';
      var r=document.createElement('div');r.className='q-result';r.style.fontSize='11px';r.style.color='var(--r)';
      r.textContent=json.error||('HTTP '+xhr.status);
      item.appendChild(r);
    }
  };
  xhr.onerror=function(){item.classList.add('q-err');status.textContent='AGSIZ';bar.style.background='var(--r)'};
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
      div.innerHTML=thumb+'<div class="fmeta"></div>';
      var meta=div.querySelector('.fmeta');
      var nm=document.createElement('div');nm.className='fname';nm.textContent=it.original_name;
      var sub=document.createElement('div');sub.className='fsub';
      sub.innerHTML='<span class="fcat">'+escHTML(it.category)+'</span> · '+fmtSize(it.size)+' · '+fmtDate(it.uploaded_at);
      meta.appendChild(nm);meta.appendChild(sub);
      var top=document.createElement('div');top.className='ftop';
      top.appendChild(div.firstChild);top.appendChild(div.firstChild);
      div.insertBefore(top,div.firstChild);
      var actions=document.createElement('div');actions.className='factions';
      var bCopy=document.createElement('button');bCopy.className='act-btn act-btn-p';bCopy.textContent='URL';
      bCopy.addEventListener('click',function(){navigator.clipboard.writeText(it.url);toast('URL kopyalandi','ok')});
      var bOpen=document.createElement('a');bOpen.className='act-btn';bOpen.textContent='Ac';bOpen.href=it.url;bOpen.target='_blank';bOpen.rel='noopener';
      var bDel=document.createElement('button');bDel.className='act-btn act-btn-r';bDel.textContent='Sil';
      bDel.addEventListener('click',function(){confirmDelete(it)});
      actions.appendChild(bCopy);actions.appendChild(bOpen);actions.appendChild(bDel);
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
$('#pwCancel').addEventListener('click',function(){$('#pwModal').classList.remove('open');pendingDelete=null});
$('#pwConfirm').addEventListener('click',function(){
  if(!pendingDelete)return;
  var pw=$('#pwInput').value;if(!pw){toast('Sifre gerekli','err');return}
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
loadList();
</script>
</body></html>`;
}
