import { wrapPage } from './components/layout.js';

export function qsoPage({ user }) {
  return wrapPage({
    title: 'QSO Log',
    user,
    headExtra: `<style>
/* Stats */
.qso-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
@media(max-width:600px){.qso-stats{grid-template-columns:1fr}}
.stat-card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);padding:14px 16px;display:flex;flex-direction:column;gap:4px}
.stat-label{font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.4px}
.stat-val{font-size:22px;font-weight:700;color:var(--p2);font-family:'JetBrains Mono',monospace}
.stat-sub{font-size:11px;color:var(--t2)}
/* Top bar */
.qso-topbar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.qso-topbar h2{font-size:16px;font-weight:700;color:var(--t1)}
.btn-export{padding:7px 16px;background:var(--gg);border:1px solid rgba(45,212,191,.15);border-radius:7px;color:var(--g);font-size:12px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:.15s}
.btn-export:hover{background:rgba(45,212,191,.14)}
/* Form toggle */
.qso-form-sec{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden;margin-bottom:14px}
.qso-form-toggle{width:100%;padding:10px 14px;background:none;border:none;color:var(--p2);font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;transition:.15s}
.qso-form-toggle:hover{background:var(--pg)}
.qso-form-toggle svg{transition:transform .2s}
.qso-form-toggle.open svg{transform:rotate(45deg)}
.qso-form-body{display:none;padding:0 14px 14px}
.qso-form-body.open{display:block}
.qso-grid{display:grid;grid-template-columns:1fr;gap:8px}
@media(min-width:500px){.qso-grid{grid-template-columns:1fr 1fr}}
@media(min-width:800px){.qso-grid{grid-template-columns:1fr 1fr 1fr}}
.qso-grid label{display:flex;flex-direction:column;gap:3px;font-size:11px;font-weight:600;color:var(--t2)}
.qso-grid .inp{width:100%}
.qso-grid textarea.inp{resize:vertical;min-height:60px}
.qso-full{grid-column:1/-1}
.qso-form-actions{margin-top:10px;display:flex;gap:8px;justify-content:flex-end}
/* Autocomplete */
.ac-wrap{position:relative}
.ac-list{display:none;position:absolute;top:100%;left:0;right:0;background:var(--s1);border:1px solid var(--b2);border-radius:0 0 7px 7px;box-shadow:0 8px 20px var(--shadow);z-index:60;max-height:180px;overflow-y:auto}
.ac-list.open{display:block}
.ac-item{padding:7px 12px;font-size:12px;color:var(--t2);cursor:pointer;font-family:'JetBrains Mono',monospace;display:flex;align-items:center;gap:8px}
.ac-item:hover,.ac-item.sel{background:var(--pg);color:var(--t1)}
.ac-item .ac-op{font-family:'Inter',sans-serif;color:var(--t3);font-size:11px}
/* Filter */
.qso-filter{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);padding:10px 14px;margin-bottom:14px;display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end}
.qso-filter label{display:flex;flex-direction:column;gap:3px;font-size:10px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.3px}
.qso-filter .inp,.qso-filter select{padding:7px 10px;font-size:12px;min-width:0}
.qso-filter select{background:var(--bg);border:1px solid var(--b1);border-radius:7px;color:var(--t1);font-size:12px;outline:none;cursor:pointer}
.filter-btns{display:flex;gap:6px;align-items:flex-end}
.btn-filter{padding:7px 14px;background:var(--p);border:none;border-radius:7px;color:#fff;font-size:12px;font-weight:600;cursor:pointer}
.btn-filter:hover{opacity:.9}
.btn-clear{padding:7px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:7px;color:var(--t2);font-size:12px;font-weight:500;cursor:pointer}
.btn-clear:hover{background:var(--s3)}
/* Table */
.qso-tbl-w{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden}
.qso-tbl-scroll{overflow-x:auto;scrollbar-width:thin;scrollbar-color:var(--s3) transparent}
.qso-tbl{width:100%;border-collapse:collapse;font-size:12px}
.qso-tbl th{position:sticky;top:0;background:var(--s2);padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--b1);white-space:nowrap}
.qso-tbl td{padding:7px 10px;border-bottom:1px solid var(--b1);color:var(--t1);white-space:nowrap}
.qso-tbl tr:hover td{background:var(--pg)}
.qso-tbl .cs-cell{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--p2);font-size:13px}
.qso-tbl .notes-cell{white-space:normal;max-width:180px;overflow:hidden;text-overflow:ellipsis}
.ib{width:28px;height:28px;border-radius:6px;border:1px solid var(--b1);background:var(--s2);color:var(--t2);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:.15s;margin-right:4px}
.ib:hover{border-color:var(--b2);background:var(--s3)}
.ib-d:hover{color:var(--r);border-color:rgba(239,68,68,.2);background:var(--rg)}
.ib-e:hover{color:var(--p);border-color:rgba(139,92,246,.2);background:var(--pg)}
/* Pagination */
.qso-pag{display:flex;align-items:center;justify-content:center;gap:4px;padding:12px 14px;flex-wrap:wrap}
.pag-btn{padding:6px 12px;border-radius:6px;border:1px solid var(--b1);background:var(--s2);color:var(--t2);font-size:12px;font-weight:500;cursor:pointer;transition:.15s}
.pag-btn:hover{border-color:var(--b2);background:var(--s3)}
.pag-btn.active{background:var(--p);color:#fff;border-color:var(--p)}
.pag-btn:disabled{opacity:.3;cursor:not-allowed}
.pag-info{font-size:11px;color:var(--t3);padding:0 8px}
/* Edit Modal */
.qso-modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:200;align-items:center;justify-content:center;padding:14px}
.qso-modal-bg.open{display:flex}
.qso-modal{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);padding:20px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto}
.qso-modal h3{font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1)}
.qso-modal .qso-grid{grid-template-columns:1fr 1fr}
.qso-modal .qso-form-actions{margin-top:14px}
.btn-cancel{padding:8px 18px;background:var(--s2);border:1px solid var(--b1);border-radius:7px;color:var(--t2);font-size:13px;font-weight:500;cursor:pointer}
.btn-cancel:hover{background:var(--s3)}
/* Empty */
.qso-empty{padding:40px 20px;text-align:center;color:var(--t3);font-size:13px}
.qso-empty svg{margin-bottom:10px;opacity:.4}
/* Loading */
.qso-loading{padding:30px;text-align:center;color:var(--t3);font-size:12px}
</style>`,
    bodyContent: `<div class="wrap-page">
  <!-- Stats -->
  <div class="qso-stats">
    <div class="stat-card"><span class="stat-label">Toplam QSO</span><span class="stat-val" id="statTotal">-</span></div>
    <div class="stat-card"><span class="stat-label">Bu Ay</span><span class="stat-val" id="statMonth">-</span></div>
    <div class="stat-card"><span class="stat-label">Son QSO</span><span class="stat-val" id="statLast" style="font-size:14px">-</span><span class="stat-sub" id="statLastSub"></span></div>
  </div>

  <!-- Top bar -->
  <div class="qso-topbar">
    <h2>QSO Log</h2>
    <a href="/api/qso/export" class="btn-export"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>ADIF Export</a>
  </div>

  <!-- QSO Form (collapsible) -->
  <div class="qso-form-sec">
    <button class="qso-form-toggle" id="formToggle">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Yeni QSO Ekle
    </button>
    <div class="qso-form-body" id="formBody">
      <form id="qsoForm" autocomplete="off">
        <div class="qso-grid">
          <label>Cagri Isareti *
            <div class="ac-wrap">
              <input type="text" class="inp" name="cagri_isareti" id="fCallsign" required placeholder="TA1..." style="text-transform:uppercase;font-family:'JetBrains Mono',monospace">
              <div class="ac-list" id="acList"></div>
            </div>
          </label>
          <label>Tarih
            <input type="date" class="inp" name="tarih" id="fDate">
          </label>
          <label>Saat UTC
            <input type="time" class="inp" name="saat" id="fTime">
          </label>
          <label>Frekans MHz
            <input type="number" class="inp" name="frekans" id="fFreq" step="0.001" placeholder="144.300">
          </label>
          <label>Mod
            <select class="inp" name="mod" id="fMode">
              <option value="">Sec...</option>
              <option value="SSB">SSB</option><option value="FM">FM</option><option value="CW">CW</option>
              <option value="AM">AM</option><option value="DIGI">DIGI</option><option value="FT8">FT8</option>
              <option value="FT4">FT4</option><option value="DMR">DMR</option><option value="C4FM">C4FM</option>
              <option value="DSTAR">DSTAR</option>
            </select>
          </label>
          <label>Bant
            <input type="text" class="inp" name="bant" id="fBand" placeholder="Otomatik hesaplanir">
          </label>
          <label>RST Gond.
            <input type="text" class="inp" name="rst_gonderilen" id="fRstS" value="59" maxlength="3">
          </label>
          <label>RST Aln.
            <input type="text" class="inp" name="rst_alinan" id="fRstR" value="59" maxlength="3">
          </label>
          <label>Guc W
            <input type="number" class="inp" name="guc" id="fPower" placeholder="100">
          </label>
          <label class="qso-full">Notlar
            <textarea class="inp" name="notlar" id="fNotes" rows="2" placeholder="Not ekleyin..."></textarea>
          </label>
        </div>
        <div class="qso-form-actions">
          <button type="submit" class="btn-p" id="btnSave">Kaydet</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Filter Bar -->
  <div class="qso-filter">
    <label>Arama
      <input type="text" class="inp" id="fltQ" placeholder="Cagri isareti veya not...">
    </label>
    <label>Bant
      <select class="inp" id="fltBand">
        <option value="">Tumu</option>
        <option>160m</option><option>80m</option><option>40m</option><option>20m</option>
        <option>15m</option><option>10m</option><option>2m</option><option>70cm</option>
      </select>
    </label>
    <label>Mod
      <select class="inp" id="fltMode">
        <option value="">Tumu</option>
        <option>SSB</option><option>FM</option><option>CW</option><option>AM</option>
        <option>DIGI</option><option>FT8</option><option>FT4</option><option>DMR</option>
        <option>C4FM</option><option>DSTAR</option>
      </select>
    </label>
    <label>Baslangic
      <input type="date" class="inp" id="fltDateStart">
    </label>
    <label>Bitis
      <input type="date" class="inp" id="fltDateEnd">
    </label>
    <div class="filter-btns">
      <button class="btn-filter" id="btnFilter">Filtrele</button>
      <button class="btn-clear" id="btnClear">Temizle</button>
    </div>
  </div>

  <!-- QSO Table -->
  <div class="qso-tbl-w">
    <div class="qso-tbl-scroll">
      <table class="qso-tbl">
        <thead>
          <tr>
            <th>Tarih / Saat</th><th>Cagri Isareti</th><th>Frekans</th><th>Mod</th><th>Bant</th>
            <th>RST (G/A)</th><th>Guc</th><th>Notlar</th><th>Islemler</th>
          </tr>
        </thead>
        <tbody id="qsoBody"></tbody>
      </table>
    </div>
    <div class="qso-pag" id="qsoPag"></div>
  </div>

  <!-- Edit Modal -->
  <div class="qso-modal-bg" id="editModal">
    <div class="qso-modal">
      <h3>QSO Duzenle</h3>
      <form id="editForm" autocomplete="off">
        <input type="hidden" name="id" id="eId">
        <div class="qso-grid">
          <label>Cagri Isareti *
            <input type="text" class="inp" name="cagri_isareti" id="eCallsign" required style="text-transform:uppercase;font-family:'JetBrains Mono',monospace">
          </label>
          <label>Tarih
            <input type="date" class="inp" name="tarih" id="eDate">
          </label>
          <label>Saat UTC
            <input type="time" class="inp" name="saat" id="eTime">
          </label>
          <label>Frekans MHz
            <input type="number" class="inp" name="frekans" id="eFreq" step="0.001">
          </label>
          <label>Mod
            <select class="inp" name="mod" id="eMode">
              <option value="">Sec...</option>
              <option value="SSB">SSB</option><option value="FM">FM</option><option value="CW">CW</option>
              <option value="AM">AM</option><option value="DIGI">DIGI</option><option value="FT8">FT8</option>
              <option value="FT4">FT4</option><option value="DMR">DMR</option><option value="C4FM">C4FM</option>
              <option value="DSTAR">DSTAR</option>
            </select>
          </label>
          <label>Bant
            <input type="text" class="inp" name="bant" id="eBand">
          </label>
          <label>RST Gond.
            <input type="text" class="inp" name="rst_gonderilen" id="eRstS" maxlength="3">
          </label>
          <label>RST Aln.
            <input type="text" class="inp" name="rst_alinan" id="eRstR" maxlength="3">
          </label>
          <label>Guc W
            <input type="number" class="inp" name="guc" id="ePower">
          </label>
          <label class="qso-full">Notlar
            <textarea class="inp" name="notlar" id="eNotes" rows="2"></textarea>
          </label>
        </div>
        <div class="qso-form-actions">
          <button type="button" class="btn-cancel" id="btnEditCancel">Iptal</button>
          <button type="submit" class="btn-p">Guncelle</button>
        </div>
      </form>
    </div>
  </div>
</div>`,
    scriptContent: `<script>
(function(){
  function esc(s){return s?String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'):''}

  var BANDS = [
    {min:1.8,max:2.0,name:'160m'},{min:3.5,max:3.8,name:'80m'},
    {min:7.0,max:7.2,name:'40m'},{min:14.0,max:14.35,name:'20m'},
    {min:21.0,max:21.45,name:'15m'},{min:28.0,max:29.7,name:'10m'},
    {min:144.0,max:146.0,name:'2m'},{min:430.0,max:440.0,name:'70cm'}
  ];

  function freqToBand(f){
    f = parseFloat(f);
    if(!f) return '';
    for(var i=0;i<BANDS.length;i++){
      if(f>=BANDS[i].min && f<=BANDS[i].max) return BANDS[i].name;
    }
    return '';
  }

  function todayStr(){return new Date().toISOString().slice(0,10)}
  function nowUTC(){var d=new Date();return ('0'+d.getUTCHours()).slice(-2)+':'+('0'+d.getUTCMinutes()).slice(-2)}

  var currentPage = 1;
  var limit = 50;
  var allOperators = [];

  var qsoBody = document.getElementById('qsoBody');
  var pagEl = document.getElementById('qsoPag');
  var formToggle = document.getElementById('formToggle');
  var formBody = document.getElementById('formBody');
  var qsoForm = document.getElementById('qsoForm');
  var editModal = document.getElementById('editModal');
  var editForm = document.getElementById('editForm');
  var fFreq = document.getElementById('fFreq');
  var fBand = document.getElementById('fBand');
  var fCallsign = document.getElementById('fCallsign');
  var acList = document.getElementById('acList');
  var eFreq = document.getElementById('eFreq');
  var eBand = document.getElementById('eBand');

  document.getElementById('fDate').value = todayStr();
  document.getElementById('fTime').value = nowUTC();

  formToggle.addEventListener('click', function(){
    formToggle.classList.toggle('open');
    formBody.classList.toggle('open');
  });

  fFreq.addEventListener('input', function(){
    var b = freqToBand(this.value);
    if(b) fBand.value = b;
    fBand.placeholder = b ? b : 'Otomatik hesaplanir';
  });
  eFreq.addEventListener('input', function(){
    var b = freqToBand(this.value);
    if(b) eBand.value = b;
  });

  var acIdx = -1;
  function fetchOperators(){
    fetch('/api/all').then(function(r){return r.json()}).then(function(d){
      allOperators = (d.kayitlar || d.data || d || []).map(function(o){
        return {cs: o.cagri_isareti||'', op: o.operator||''};
      });
    }).catch(function(){});
  }
  fetchOperators();

  function renderAC(val){
    val = val.toUpperCase().trim();
    if(val.length < 1){acList.classList.remove('open');return;}
    var matches = allOperators.filter(function(o){
      return o.cs && o.cs.toUpperCase().indexOf(val) !== -1;
    }).slice(0, 12);
    if(!matches.length){acList.classList.remove('open');return;}
    var h = '';
    for(var i=0;i<matches.length;i++){
      var m = matches[i];
      h += '<div class="ac-item' + (i===acIdx?' sel':'') + '" data-cs="' + esc(m.cs) + '">' + esc(m.cs);
      if(m.op) h += ' <span class="ac-op">' + esc(m.op) + '</span>';
      h += '</div>';
    }
    acList.textContent = '';
    var tmp = document.createElement('div');
    tmp.innerHTML = h;
    while(tmp.firstChild) acList.appendChild(tmp.firstChild);
    acList.classList.add('open');
    acIdx = -1;
  }

  fCallsign.addEventListener('input', function(){
    this.value = this.value.toUpperCase();
    renderAC(this.value);
  });
  fCallsign.addEventListener('keydown', function(ev){
    var items = acList.querySelectorAll('.ac-item');
    if(!items.length) return;
    if(ev.key==='ArrowDown'){ev.preventDefault();acIdx=Math.min(acIdx+1,items.length-1);markAC(items);}
    else if(ev.key==='ArrowUp'){ev.preventDefault();acIdx=Math.max(acIdx-1,0);markAC(items);}
    else if(ev.key==='Enter' && acIdx>=0){ev.preventDefault();fCallsign.value=items[acIdx].getAttribute('data-cs');acList.classList.remove('open');}
    else if(ev.key==='Escape'){acList.classList.remove('open');}
  });
  function markAC(items){
    for(var i=0;i<items.length;i++) items[i].classList.toggle('sel',i===acIdx);
    if(acIdx>=0 && items[acIdx]) items[acIdx].scrollIntoView({block:'nearest'});
  }
  acList.addEventListener('click', function(ev){
    var el = ev.target.closest('.ac-item');
    if(el){fCallsign.value = el.getAttribute('data-cs');acList.classList.remove('open');}
  });
  document.addEventListener('click', function(ev){
    if(!ev.target.closest('.ac-wrap')) acList.classList.remove('open');
  });

  function buildQuery(){
    var p = 'page='+currentPage+'&limit='+limit;
    var q = document.getElementById('fltQ').value.trim();
    var bant = document.getElementById('fltBand').value;
    var mod = document.getElementById('fltMode').value;
    var ds = document.getElementById('fltDateStart').value;
    var de = document.getElementById('fltDateEnd').value;
    if(q) p += '&q='+encodeURIComponent(q);
    if(bant) p += '&bant='+encodeURIComponent(bant);
    if(mod) p += '&mod='+encodeURIComponent(mod);
    if(ds) p += '&tarih_bas='+encodeURIComponent(ds);
    if(de) p += '&tarih_son='+encodeURIComponent(de);
    return p;
  }

  function renderRow(q){
    var tr = document.createElement('tr');
    tr.setAttribute('data-id', q.id);

    var tdDate = document.createElement('td');
    tdDate.textContent = (q.tarih||'') + ' ';
    var timeSpan = document.createElement('span');
    timeSpan.style.color = 'var(--t3)';
    timeSpan.textContent = q.saat||'';
    tdDate.appendChild(timeSpan);

    var tdCs = document.createElement('td');
    tdCs.className = 'cs-cell';
    tdCs.textContent = q.cagri_isareti||'';

    var tdFreq = document.createElement('td');
    tdFreq.textContent = q.frekans||'';

    var tdMod = document.createElement('td');
    tdMod.textContent = q.mod||'';

    var tdBant = document.createElement('td');
    tdBant.textContent = q.bant||'';

    var tdRst = document.createElement('td');
    tdRst.textContent = (q.rst_gonderilen||'') + ' / ' + (q.rst_alinan||'');

    var tdPow = document.createElement('td');
    tdPow.textContent = q.guc ? q.guc+'W' : '';

    var tdNotes = document.createElement('td');
    tdNotes.className = 'notes-cell';
    tdNotes.textContent = q.notlar||'';

    var tdAct = document.createElement('td');
    var btnE = document.createElement('button');
    btnE.className = 'ib ib-e';
    btnE.setAttribute('data-id', q.id);
    btnE.setAttribute('data-json', JSON.stringify(q));
    btnE.title = 'Duzenle';
    btnE.innerHTML = '<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
    var btnD = document.createElement('button');
    btnD.className = 'ib ib-d';
    btnD.setAttribute('data-id', q.id);
    btnD.title = 'Sil';
    btnD.innerHTML = '<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>';
    tdAct.appendChild(btnE);
    tdAct.appendChild(btnD);

    tr.appendChild(tdDate);
    tr.appendChild(tdCs);
    tr.appendChild(tdFreq);
    tr.appendChild(tdMod);
    tr.appendChild(tdBant);
    tr.appendChild(tdRst);
    tr.appendChild(tdPow);
    tr.appendChild(tdNotes);
    tr.appendChild(tdAct);
    return tr;
  }

  function loadQSOs(){
    qsoBody.textContent = '';
    var loadTr = document.createElement('tr');
    var loadTd = document.createElement('td');
    loadTd.setAttribute('colspan','9');
    loadTd.className = 'qso-loading';
    loadTd.textContent = 'Yukleniyor...';
    loadTr.appendChild(loadTd);
    qsoBody.appendChild(loadTr);

    fetch('/api/qso?'+buildQuery()).then(function(r){return r.json()}).then(function(d){
      var list = d.qsos || d.data || [];
      var total = d.total || 0;
      var totalPages = Math.ceil(total / limit) || 1;

      document.getElementById('statTotal').textContent = total;
      document.getElementById('statMonth').textContent = d.bu_ay != null ? d.bu_ay : '-';
      if(list.length > 0){
        var last = list[0];
        document.getElementById('statLast').textContent = last.cagri_isareti || '-';
        document.getElementById('statLastSub').textContent = (last.tarih||'') + ' ' + (last.saat||'') + (last.mod ? ' / '+last.mod : '');
      } else {
        document.getElementById('statLast').textContent = '-';
        document.getElementById('statLastSub').textContent = '';
      }

      qsoBody.textContent = '';
      pagEl.textContent = '';

      if(!list.length){
        var emTr = document.createElement('tr');
        var emTd = document.createElement('td');
        emTd.setAttribute('colspan','9');
        emTd.className = 'qso-empty';
        emTd.innerHTML = '<svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg><br>Henuz QSO kaydi yok.';
        emTr.appendChild(emTd);
        qsoBody.appendChild(emTr);
        return;
      }

      for(var i=0;i<list.length;i++){
        qsoBody.appendChild(renderRow(list[i]));
      }

      var prevBtn = document.createElement('button');
      prevBtn.className = 'pag-btn';
      prevBtn.textContent = 'Onceki';
      prevBtn.setAttribute('data-p', currentPage-1);
      if(currentPage<=1) prevBtn.disabled = true;
      pagEl.appendChild(prevBtn);

      var start = Math.max(1, currentPage-2);
      var end = Math.min(totalPages, currentPage+2);
      for(var p=start;p<=end;p++){
        var pb = document.createElement('button');
        pb.className = 'pag-btn' + (p===currentPage?' active':'');
        pb.textContent = p;
        pb.setAttribute('data-p', p);
        pagEl.appendChild(pb);
      }

      var info = document.createElement('span');
      info.className = 'pag-info';
      info.textContent = currentPage + ' / ' + totalPages;
      pagEl.appendChild(info);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'pag-btn';
      nextBtn.textContent = 'Sonraki';
      nextBtn.setAttribute('data-p', currentPage+1);
      if(currentPage>=totalPages) nextBtn.disabled = true;
      pagEl.appendChild(nextBtn);

    }).catch(function(err){
      qsoBody.textContent = '';
      var errTr = document.createElement('tr');
      var errTd = document.createElement('td');
      errTd.setAttribute('colspan','9');
      errTd.className = 'qso-empty';
      errTd.textContent = 'Yukleme hatasi: ' + err.message;
      errTr.appendChild(errTd);
      qsoBody.appendChild(errTr);
    });
  }

  pagEl.addEventListener('click', function(ev){
    var btn = ev.target.closest('.pag-btn');
    if(!btn || btn.disabled) return;
    currentPage = parseInt(btn.getAttribute('data-p'));
    loadQSOs();
  });

  document.getElementById('btnFilter').addEventListener('click', function(){
    currentPage = 1;
    loadQSOs();
  });
  document.getElementById('btnClear').addEventListener('click', function(){
    document.getElementById('fltQ').value = '';
    document.getElementById('fltBand').value = '';
    document.getElementById('fltMode').value = '';
    document.getElementById('fltDateStart').value = '';
    document.getElementById('fltDateEnd').value = '';
    currentPage = 1;
    loadQSOs();
  });

  qsoForm.addEventListener('submit', function(ev){
    ev.preventDefault();
    var btn = document.getElementById('btnSave');
    btn.disabled = true;
    btn.textContent = 'Kaydediliyor...';
    var fd = new FormData(qsoForm);
    var obj = {};
    fd.forEach(function(v,k){obj[k]=v});
    obj.cagri_isareti = (obj.cagri_isareti||'').toUpperCase();

    fetch('/api/qso', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(obj)
    }).then(function(r){
      if(!r.ok) throw new Error('Kayit hatasi');
      return r.json();
    }).then(function(){
      qsoForm.reset();
      document.getElementById('fDate').value = todayStr();
      document.getElementById('fTime').value = nowUTC();
      document.getElementById('fRstS').value = '59';
      document.getElementById('fRstR').value = '59';
      currentPage = 1;
      loadQSOs();
    }).catch(function(err){
      alert('Hata: ' + err.message);
    }).finally(function(){
      btn.disabled = false;
      btn.textContent = 'Kaydet';
    });
  });

  qsoBody.addEventListener('click', function(ev){
    var editBtn = ev.target.closest('.ib-e');
    if(editBtn){
      try{
        var q = JSON.parse(editBtn.getAttribute('data-json'));
        document.getElementById('eId').value = q.id;
        document.getElementById('eCallsign').value = q.cagri_isareti || '';
        document.getElementById('eDate').value = q.tarih || '';
        document.getElementById('eTime').value = q.saat || '';
        document.getElementById('eFreq').value = q.frekans || '';
        document.getElementById('eMode').value = q.mod || '';
        document.getElementById('eBand').value = q.bant || '';
        document.getElementById('eRstS').value = q.rst_gonderilen || '59';
        document.getElementById('eRstR').value = q.rst_alinan || '59';
        document.getElementById('ePower').value = q.guc || '';
        document.getElementById('eNotes').value = q.notlar || '';
        editModal.classList.add('open');
      }catch(e){}
      return;
    }

    var delBtn = ev.target.closest('.ib-d');
    if(delBtn){
      var id = delBtn.getAttribute('data-id');
      if(!confirm('Bu QSO kaydini silmek istediginize emin misiniz?')) return;
      fetch('/api/qso/'+id, {method:'DELETE'}).then(function(r){
        if(!r.ok) throw new Error('Silme hatasi');
        loadQSOs();
      }).catch(function(err){alert('Hata: '+err.message)});
    }
  });

  document.getElementById('btnEditCancel').addEventListener('click', function(){
    editModal.classList.remove('open');
  });
  editModal.addEventListener('click', function(ev){
    if(ev.target === editModal) editModal.classList.remove('open');
  });

  editForm.addEventListener('submit', function(ev){
    ev.preventDefault();
    var id = document.getElementById('eId').value;
    var fd = new FormData(editForm);
    var obj = {};
    fd.forEach(function(v,k){if(k!=='id') obj[k]=v});
    obj.cagri_isareti = (obj.cagri_isareti||'').toUpperCase();

    fetch('/api/qso/'+id, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(obj)
    }).then(function(r){
      if(!r.ok) throw new Error('Guncelleme hatasi');
      return r.json();
    }).then(function(){
      editModal.classList.remove('open');
      loadQSOs();
    }).catch(function(err){
      alert('Hata: '+err.message);
    });
  });

  loadQSOs();
})();
<\/script>`
  });
}
