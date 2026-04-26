import { wrapPage } from './components/layout.js';

export function frequencyGuidePage({ user }) {
  const headExtra = `<style>
.freq-page{max-width:1200px;margin:0 auto;padding:14px}
@media(min-width:768px){.freq-page{padding:20px 24px}}
.freq-section{margin-bottom:24px}
.freq-section-title{font-size:16px;font-weight:700;color:var(--t1);margin-bottom:12px;display:flex;align-items:center;gap:8px}
.freq-section-title svg{width:20px;height:20px;color:var(--p)}
.freq-section-desc{font-size:12px;color:var(--t2);margin-bottom:16px;line-height:1.6}

/* Visual band plan bars */
.band-plan{display:flex;flex-direction:column;gap:8px}
.band-bar-row{display:flex;align-items:center;gap:12px;padding:8px 12px;background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);cursor:pointer;transition:border-color .2s,box-shadow .2s}
.band-bar-row:hover{border-color:var(--p);box-shadow:0 0 0 1px var(--pg)}
.band-bar-row.active{border-color:var(--p);background:var(--s2)}
.band-bar-label{min-width:60px;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:var(--p2);flex-shrink:0}
.band-bar-container{flex:1;height:24px;background:var(--bg);border-radius:6px;overflow:hidden;position:relative}
.band-bar-fill{height:100%;border-radius:6px;transition:width .4s ease;display:flex;align-items:center;justify-content:center}
.band-bar-fill span{font-size:9px;font-weight:600;color:#fff;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,.4)}
.band-bar-info{min-width:160px;text-align:right;font-size:11px;color:var(--t2);font-family:'JetBrains Mono',monospace;flex-shrink:0}
@media(max-width:600px){.band-bar-info{display:none}}
.band-bar-modes{display:flex;gap:4px;flex-shrink:0}
.band-mode-pill{padding:2px 6px;border-radius:3px;font-size:9px;font-weight:600;background:var(--pg);color:var(--p2)}

/* Band detail panel */
.band-detail{display:none;margin-top:4px;margin-bottom:4px;padding:14px 16px;background:var(--s2);border:1px solid var(--b1);border-radius:var(--rad);animation:slideDown .2s ease}
.band-detail.open{display:block}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.band-detail-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.band-detail-item{display:flex;flex-direction:column;gap:2px}
.band-detail-label{font-size:10px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.5px}
.band-detail-value{font-size:13px;color:var(--t1);font-family:'JetBrains Mono',monospace}
.band-detail-desc{font-size:12px;color:var(--t2);line-height:1.5;margin-top:8px;padding-top:8px;border-top:1px solid var(--b1)}

/* Repeater table */
.rptr-card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden}
.rptr-header{padding:12px 16px;font-size:13px;font-weight:600;color:var(--t2);border-bottom:1px solid var(--b1);display:flex;align-items:center;gap:8px}
.rptr-table{width:100%;border-collapse:collapse;font-size:12px}
.rptr-table th{padding:8px 12px;text-align:left;font-weight:600;color:var(--t3);font-size:10px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--b1);background:var(--s2)}
.rptr-table td{padding:8px 12px;border-bottom:1px solid var(--b1);color:var(--t1)}
.rptr-table tr:last-child td{border-bottom:none}
.rptr-table tr:hover td{background:var(--pg)}
.rptr-freq{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--g)}
.rptr-mode{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;background:var(--pg);color:var(--p2)}
.empty-state{text-align:center;padding:40px 20px;color:var(--t3);font-size:13px}
.freq-loading{text-align:center;padding:40px;color:var(--t3);font-size:13px}

/* Band colors */
.band-color-160m{background:#ef4444}.band-color-80m{background:#f97316}.band-color-40m{background:#eab308}
.band-color-30m{background:#84cc16}.band-color-20m{background:#22c55e}.band-color-17m{background:#14b8a6}
.band-color-15m{background:#06b6d4}.band-color-12m{background:#0ea5e9}.band-color-10m{background:#8b5cf6}
.band-color-6m{background:#a855f7}.band-color-2m{background:#ec4899}.band-color-70cm{background:#6366f1}
.band-color-23cm{background:#f43f5e}

/* Search */
.freq-search{display:flex;gap:8px;margin-bottom:16px}
.freq-search .inp{flex:1;max-width:400px}
</style>`;

  const bodyContent = `
<div class="freq-page">
  <div class="freq-section">
    <div class="freq-section-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h4l3-9 4 18 3-9h4"/></svg>
      Frekans Rehberi
    </div>
    <div class="freq-section-desc">Turkiye amator radyo bant plani. Her banda tiklayarak detaylari gorebilirsiniz.</div>
    <div class="freq-search">
      <input type="text" class="inp" id="freqSearch" placeholder="Bant veya frekans ara... (ornek: 40m, 144)">
    </div>
  </div>

  <div class="freq-section">
    <div class="freq-section-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
      Bant Plani
    </div>
    <div id="bandPlan" class="band-plan"><div class="freq-loading">Yukleniyor...</div></div>
  </div>

  <div class="freq-section">
    <div class="freq-section-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/></svg>
      Roleyler (Istanbul Bolgesi)
    </div>
    <div id="repeaterSection"><div class="freq-loading">Yukleniyor...</div></div>
  </div>
</div>`;

  const scriptContent = `<script>
(function(){
  var BAND_COLORS={'160m':'#ef4444','80m':'#f97316','40m':'#eab308','30m':'#84cc16','20m':'#22c55e','17m':'#14b8a6','15m':'#06b6d4','12m':'#0ea5e9','10m':'#8b5cf6','6m':'#a855f7','2m':'#ec4899','70cm':'#6366f1','23cm':'#f43f5e'};

  // Default band data in case API is not available
  var DEFAULT_BANDS=[
    {bant:'160m',baslangic:1.810,bitis:2.000,mod:'CW, SSB',aciklama:'Uzun dalga, gece yayilimi iyi. Turkiye A ve B sinifi.',tur:'bant'},
    {bant:'80m',baslangic:3.500,bitis:3.800,mod:'CW, SSB',aciklama:'Gece yerel ve bolgesel baglanti. A ve B sinifi.',tur:'bant'},
    {bant:'40m',baslangic:7.000,bitis:7.200,mod:'CW, SSB, FT8',aciklama:'Gun ve gece kullanilabilir. En populer HF bant.',tur:'bant'},
    {bant:'30m',baslangic:10.100,bitis:10.150,mod:'CW, FT8',aciklama:'Sadece dar bant dijital ve CW. A sinifi.',tur:'bant'},
    {bant:'20m',baslangic:14.000,bitis:14.350,mod:'CW, SSB, FT8',aciklama:'Gunduz DX icin en iyi bant. A ve B sinifi.',tur:'bant'},
    {bant:'17m',baslangic:18.068,bitis:18.168,mod:'CW, SSB, FT8',aciklama:'Gunduz DX, gunes lekesi donemlerinde aktif.',tur:'bant'},
    {bant:'15m',baslangic:21.000,bitis:21.450,mod:'CW, SSB, FT8',aciklama:'Gunduz DX. Gunes aktivitesine bagli.',tur:'bant'},
    {bant:'12m',baslangic:24.890,bitis:24.990,mod:'CW, SSB',aciklama:'Gunduz DX, dar bant.',tur:'bant'},
    {bant:'10m',baslangic:28.000,bitis:29.700,mod:'CW, SSB, FM',aciklama:'Gunduz DX ve yerel FM. Genis bant.',tur:'bant'},
    {bant:'6m',baslangic:50.000,bitis:54.000,mod:'SSB, CW, FT8',aciklama:'VHF baslangic, sporadik E yayilimi.',tur:'bant'},
    {bant:'2m',baslangic:144.000,bitis:146.000,mod:'FM, SSB, CW',aciklama:'En populer VHF bant. Roleyler ve simplex.',tur:'bant'},
    {bant:'70cm',baslangic:430.000,bitis:440.000,mod:'FM, DMR, SSB',aciklama:'UHF bant. Roleyler, dijital modlar.',tur:'bant'},
    {bant:'23cm',baslangic:1240.000,bitis:1300.000,mod:'FM, SSB',aciklama:'Mikrodalga baslangic bandi.',tur:'bant'}
  ];

  var DEFAULT_REPEATERS=[
    {bant:'2m',baslangic:145.600,bitis:145.000,mod:'FM',aciklama:'Istanbul Camlica Roleyesi',tur:'role'},
    {bant:'2m',baslangic:145.625,bitis:145.025,mod:'FM',aciklama:'Istanbul Avrupa Yakasi',tur:'role'},
    {bant:'70cm',baslangic:438.650,bitis:431.050,mod:'FM',aciklama:'Istanbul UHF Roleye',tur:'role'},
    {bant:'70cm',baslangic:438.500,bitis:430.900,mod:'DMR',aciklama:'Istanbul DMR Roleye (CC1)',tur:'role'},
    {bant:'2m',baslangic:145.750,bitis:145.150,mod:'FM',aciklama:'Kocaeli Roleye',tur:'role'},
    {bant:'70cm',baslangic:438.800,bitis:431.200,mod:'FM',aciklama:'Istanbul Anadolu Yakasi UHF',tur:'role'}
  ];

  var allData=[];
  var activeBand=null;

  function authFetch(url){
    return fetch(url,{credentials:'same-origin'}).then(function(r){
      if(!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  function cacheData(data){
    try{localStorage.setItem('frekans_cache',JSON.stringify({ts:Date.now(),data:data}))}catch(e){}
  }

  function getCached(){
    try{
      var c=JSON.parse(localStorage.getItem('frekans_cache')||'null');
      if(c&&c.data)return c.data;
    }catch(e){}
    return null;
  }

  function renderBandPlan(data){
    var bands=data.filter(function(d){return d.tur==='bant'});
    if(!bands.length)bands=DEFAULT_BANDS;

    var container=document.getElementById('bandPlan');
    while(container.firstChild)container.removeChild(container.firstChild);

    // Find max frequency range for bar scaling
    var maxRange=Math.max.apply(null,bands.map(function(b){return b.bitis-b.baslangic}));
    if(maxRange===0)maxRange=1;

    bands.forEach(function(b){
      var wrapper=document.createElement('div');
      wrapper.setAttribute('data-band',b.bant);

      // Band bar row
      var row=document.createElement('div');
      row.className='band-bar-row';

      var label=document.createElement('div');
      label.className='band-bar-label';
      label.textContent=b.bant;
      row.appendChild(label);

      var barContainer=document.createElement('div');
      barContainer.className='band-bar-container';
      var fill=document.createElement('div');
      fill.className='band-bar-fill';
      var range=b.bitis-b.baslangic;
      var pct=Math.max(15,Math.min(100,(range/maxRange)*100));
      fill.style.width=pct+'%';
      fill.style.background=BAND_COLORS[b.bant]||'var(--p)';
      var fillLabel=document.createElement('span');
      fillLabel.textContent=b.baslangic.toFixed(3)+' - '+b.bitis.toFixed(3)+' MHz';
      fill.appendChild(fillLabel);
      barContainer.appendChild(fill);
      row.appendChild(barContainer);

      var info=document.createElement('div');
      info.className='band-bar-info';
      info.textContent=range.toFixed(3)+' MHz';
      row.appendChild(info);

      var modesDiv=document.createElement('div');
      modesDiv.className='band-bar-modes';
      (b.mod||'').split(',').forEach(function(m){
        m=m.trim();
        if(!m)return;
        var pill=document.createElement('span');
        pill.className='band-mode-pill';
        pill.textContent=m;
        modesDiv.appendChild(pill);
      });
      row.appendChild(modesDiv);

      wrapper.appendChild(row);

      // Detail panel
      var detail=document.createElement('div');
      detail.className='band-detail';

      var grid=document.createElement('div');
      grid.className='band-detail-grid';

      var items=[
        {label:'Bant',value:b.bant},
        {label:'Baslangic Frekansi',value:b.baslangic.toFixed(3)+' MHz'},
        {label:'Bitis Frekansi',value:b.bitis.toFixed(3)+' MHz'},
        {label:'Bant Genisligi',value:range.toFixed(3)+' MHz'},
        {label:'Izin Verilen Modlar',value:b.mod||'-'},
        {label:'Tur',value:b.tur==='bant'?'Bant Tahsisi':'Roleye'}
      ];

      items.forEach(function(it){
        var item=document.createElement('div');
        item.className='band-detail-item';
        var lbl=document.createElement('div');
        lbl.className='band-detail-label';
        lbl.textContent=it.label;
        var val=document.createElement('div');
        val.className='band-detail-value';
        val.textContent=it.value;
        item.appendChild(lbl);item.appendChild(val);
        grid.appendChild(item);
      });

      detail.appendChild(grid);

      if(b.aciklama){
        var desc=document.createElement('div');
        desc.className='band-detail-desc';
        desc.textContent=b.aciklama;
        detail.appendChild(desc);
      }

      wrapper.appendChild(detail);
      container.appendChild(wrapper);

      // Click to toggle
      row.addEventListener('click',function(){
        var isOpen=detail.classList.contains('open');
        // Close all
        document.querySelectorAll('.band-detail.open').forEach(function(d){d.classList.remove('open')});
        document.querySelectorAll('.band-bar-row.active').forEach(function(r){r.classList.remove('active')});
        if(!isOpen){
          detail.classList.add('open');
          row.classList.add('active');
          activeBand=b.bant;
        } else {
          activeBand=null;
        }
      });
    });
  }

  function renderRepeaters(data){
    var repeaters=data.filter(function(d){return d.tur==='role'});
    if(!repeaters.length)repeaters=DEFAULT_REPEATERS;

    var container=document.getElementById('repeaterSection');
    while(container.firstChild)container.removeChild(container.firstChild);

    if(!repeaters.length){
      var empty=document.createElement('div');
      empty.className='empty-state';
      empty.textContent='Roleye verisi bulunamadi';
      container.appendChild(empty);
      return;
    }

    var card=document.createElement('div');
    card.className='rptr-card';

    var header=document.createElement('div');
    header.className='rptr-header';
    header.textContent='Istanbul ve Cevresi Roleyeleri';
    card.appendChild(header);

    var table=document.createElement('table');
    table.className='rptr-table';

    var thead=document.createElement('thead');
    var headRow=document.createElement('tr');
    ['Bant','Cikis (MHz)','Giris (MHz)','Mod','Aciklama'].forEach(function(h){
      var th=document.createElement('th');th.textContent=h;headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody=document.createElement('tbody');
    repeaters.forEach(function(rp){
      var tr=document.createElement('tr');

      var tdBand=document.createElement('td');
      var bandSpan=document.createElement('span');
      bandSpan.style.cssText='font-family:JetBrains Mono,monospace;font-weight:600;color:'+(BAND_COLORS[rp.bant]||'var(--p2)');
      bandSpan.textContent=rp.bant;
      tdBand.appendChild(bandSpan);
      tr.appendChild(tdBand);

      var tdOut=document.createElement('td');
      tdOut.className='rptr-freq';
      tdOut.textContent=rp.baslangic?rp.baslangic.toFixed(3):'-';
      tr.appendChild(tdOut);

      var tdIn=document.createElement('td');
      tdIn.className='rptr-freq';
      tdIn.textContent=rp.bitis?rp.bitis.toFixed(3):'-';
      tr.appendChild(tdIn);

      var tdMode=document.createElement('td');
      var modeSpan=document.createElement('span');
      modeSpan.className='rptr-mode';
      modeSpan.textContent=rp.mod||'-';
      tdMode.appendChild(modeSpan);
      tr.appendChild(tdMode);

      var tdDesc=document.createElement('td');
      tdDesc.style.cssText='font-size:12px;color:var(--t2)';
      tdDesc.textContent=rp.aciklama||'-';
      tr.appendChild(tdDesc);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    card.appendChild(table);
    container.appendChild(card);
  }

  function renderAll(data){
    allData=data;
    renderBandPlan(data);
    renderRepeaters(data);
  }

  // Search filter
  document.getElementById('freqSearch').addEventListener('input',function(){
    var q=this.value.toLowerCase().trim();
    var wrappers=document.querySelectorAll('#bandPlan > div[data-band]');
    wrappers.forEach(function(w){
      var band=w.getAttribute('data-band').toLowerCase();
      if(!q||band.indexOf(q)>-1){
        w.style.display='';
      } else {
        // Check frequency values in the detail
        var texts=w.textContent.toLowerCase();
        w.style.display=texts.indexOf(q)>-1?'':'none';
      }
    });
  });

  // Load data: fetch fresh, cache, fallback to cache or defaults
  authFetch('/api/frekans').then(function(d){
    var data=d.frekanslar||[];
    if(data.length){
      cacheData(data);
      renderAll(data);
    } else {
      var cached=getCached();
      renderAll(cached||DEFAULT_BANDS.concat(DEFAULT_REPEATERS));
    }
  }).catch(function(){
    var cached=getCached();
    renderAll(cached||DEFAULT_BANDS.concat(DEFAULT_REPEATERS));
  });
})();
<\/script>`;

  return wrapPage({
    title: 'Frekans Rehberi',
    user,
    bodyContent,
    headExtra,
    scriptContent
  });
}
