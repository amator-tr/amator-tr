import { wrapPage } from './components/layout.js';

export function dashboardPage({ user }) {
  const headExtra = `<style>
.dash-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:20px}
.stat-card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);padding:16px 18px;display:flex;flex-direction:column;gap:6px;transition:border-color .2s,box-shadow .2s}
.stat-card:hover{border-color:var(--p);box-shadow:0 0 0 1px var(--pg)}
.stat-card .stat-label{font-size:11px;font-weight:500;color:var(--t3);text-transform:uppercase;letter-spacing:.5px}
.stat-card .stat-value{font-size:26px;font-weight:700;color:var(--t1);font-family:'JetBrains Mono',monospace}
.stat-card .stat-sub{font-size:11px;color:var(--t2)}
.stat-card .stat-icon{font-size:18px;margin-bottom:2px}
.charts-grid{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:20px}
@media(min-width:768px){.charts-grid{grid-template-columns:1fr 1fr}}
@media(min-width:1024px){.charts-grid.three{grid-template-columns:1fr 1fr 1fr}}
.chart-card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden}
.chart-header{padding:12px 16px;font-size:13px;font-weight:600;color:var(--t2);border-bottom:1px solid var(--b1);display:flex;align-items:center;gap:8px}
.chart-header svg{width:16px;height:16px;flex-shrink:0}
.chart-body{padding:16px;min-height:220px;display:flex;align-items:center;justify-content:center}
.chart-body svg{width:100%;height:auto}
.chart-loading{color:var(--t3);font-size:12px}
.recent-card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);overflow:hidden}
.recent-header{padding:12px 16px;font-size:13px;font-weight:600;color:var(--t2);border-bottom:1px solid var(--b1);display:flex;align-items:center;gap:8px}
.recent-table{width:100%;border-collapse:collapse;font-size:12px}
.recent-table th{padding:8px 12px;text-align:left;font-weight:600;color:var(--t3);font-size:10px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--b1);background:var(--s2)}
.recent-table td{padding:8px 12px;border-bottom:1px solid var(--b1);color:var(--t1)}
.recent-table tr:last-child td{border-bottom:none}
.recent-table tr:hover td{background:var(--pg)}
.callsign-tag{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--p2);font-size:12px}
.band-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;font-family:'JetBrains Mono',monospace}
.mode-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;background:var(--gg);color:var(--g)}
.empty-state{text-align:center;padding:40px 20px;color:var(--t3);font-size:13px}
.donut-legend{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}
.donut-legend-item{display:flex;align-items:center;gap:4px;font-size:10px;color:var(--t2)}
.donut-legend-color{width:10px;height:10px;border-radius:2px;flex-shrink:0}
</style>`;

  const bodyContent = `
<div class="wrap-page">
  <div class="dash-grid" id="statsRow">
    <div class="stat-card"><span class="stat-icon">📊</span><span class="stat-label">Toplam QSO</span><span class="stat-value" id="statTotalQso">-</span></div>
    <div class="stat-card"><span class="stat-icon">🔗</span><span class="stat-label">Benzersiz Operator</span><span class="stat-value" id="statUnique">-</span></div>
    <div class="stat-card"><span class="stat-icon">📒</span><span class="stat-label">Toplam Operator</span><span class="stat-value" id="statTotal">-</span></div>
    <div class="stat-card"><span class="stat-icon">📅</span><span class="stat-label">Bu Ay QSO</span><span class="stat-value" id="statMonth">-</span></div>
    <div class="stat-card"><span class="stat-icon">📡</span><span class="stat-label">En Aktif Bant</span><span class="stat-value" id="statBand" style="font-size:20px">-</span></div>
  </div>

  <div class="charts-grid three">
    <div class="chart-card">
      <div class="chart-header"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="2" width="4" height="19"/></svg>Bantlara Gore QSO</div>
      <div class="chart-body" id="barChart"><span class="chart-loading">Yukleniyor...</span></div>
    </div>
    <div class="chart-card">
      <div class="chart-header"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>Son 30 Gun Aktivite</div>
      <div class="chart-body" id="lineChart"><span class="chart-loading">Yukleniyor...</span></div>
    </div>
    <div class="chart-card">
      <div class="chart-header"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0110 10"/></svg>Mod Dagilimi</div>
      <div class="chart-body" id="donutChart" style="flex-direction:column"><span class="chart-loading">Yukleniyor...</span></div>
    </div>
  </div>

  <div class="recent-card">
    <div class="recent-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>Son QSO Kayitlari</div>
    <div id="recentTable"><div class="empty-state">Yukleniyor...</div></div>
  </div>
</div>`;

  const scriptContent = `<script>
(function(){
  var BAND_COLORS={'160m':'#ef4444','80m':'#f97316','40m':'#eab308','20m':'#22c55e','15m':'#06b6d4','10m':'#8b5cf6','2m':'#ec4899','70cm':'#6366f1'};
  var MODE_COLORS={'SSB':'#8b5cf6','FM':'#22c55e','CW':'#eab308','AM':'#f97316','FT8':'#06b6d4','DMR':'#ec4899'};

  function esc(s){
    if(!s)return'';
    var d=document.createElement('div');
    d.appendChild(document.createTextNode(String(s)));
    return d.innerHTML;
  }

  function authFetch(url){
    return fetch(url,{credentials:'same-origin'}).then(function(r){
      if(!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  function setContent(id,html){
    var el=document.getElementById(id);
    if(el){while(el.firstChild)el.removeChild(el.firstChild);var t=document.createElement('template');t.innerHTML=html;el.appendChild(t.content.cloneNode(true));}
  }

  // Load stats
  authFetch('/api/dashboard/stats').then(function(d){
    document.getElementById('statTotalQso').textContent=d.toplam_qso||0;
    document.getElementById('statUnique').textContent=d.benzersiz_operator||0;
    document.getElementById('statTotal').textContent=d.toplam_operator||0;
    document.getElementById('statMonth').textContent=d.bu_ay_qso||0;
    document.getElementById('statBand').textContent=d.en_aktif_bant||'-';
  }).catch(function(){});

  // Bar chart - bands
  authFetch('/api/dashboard/bands').then(function(d){
    var bands=d.bands||[];
    if(!bands.length){document.getElementById('barChart').textContent='Veri yok';return;}
    var max=Math.max.apply(null,bands.map(function(b){return b.cnt}));
    if(max===0)max=1;
    var w=Math.max(bands.length*60,300);
    var h=200;
    var barW=Math.min(40,Math.floor((w-40)/bands.length)-8);
    var startX=30;
    var ns='http://www.w3.org/2000/svg';
    var svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 '+w+' '+(h+30));
    svg.style.overflow='visible';

    function makeLine(x1,y1,x2,y2,attrs){
      var l=document.createElementNS(ns,'line');
      l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);
      l.setAttribute('stroke','var(--b1)');l.setAttribute('stroke-width','1');
      if(attrs)Object.keys(attrs).forEach(function(k){l.setAttribute(k,attrs[k])});
      return l;
    }
    function makeText(x,y,txt,attrs){
      var t=document.createElementNS(ns,'text');
      t.setAttribute('x',x);t.setAttribute('y',y);t.textContent=txt;
      t.setAttribute('fill','var(--t3)');t.setAttribute('font-size','9');t.setAttribute('font-family','JetBrains Mono,monospace');
      if(attrs)Object.keys(attrs).forEach(function(k){t.setAttribute(k,attrs[k])});
      return t;
    }

    svg.appendChild(makeLine(startX,10,startX,h,{}));
    svg.appendChild(makeLine(startX,h,w-10,h,{}));

    for(var g=0;g<5;g++){
      var gy=h-((g+1)/5)*(h-10);
      svg.appendChild(makeLine(startX,gy,w-10,gy,{'stroke-width':'0.5','stroke-dasharray':'4'}));
      svg.appendChild(makeText(startX-4,gy+3,Math.round(max*(g+1)/5),{'text-anchor':'end'}));
    }

    bands.forEach(function(b,i){
      var bh=Math.max(2,(b.cnt/max)*(h-20));
      var x=startX+12+i*(barW+12);
      var y=h-bh;
      var color=BAND_COLORS[b.bant]||'var(--p)';
      var rect=document.createElementNS(ns,'rect');
      rect.setAttribute('x',x);rect.setAttribute('y',y);rect.setAttribute('width',barW);rect.setAttribute('height',bh);
      rect.setAttribute('rx','3');rect.setAttribute('fill',color);rect.setAttribute('opacity','0.85');
      var title=document.createElementNS(ns,'title');
      title.textContent=b.bant+': '+b.cnt+' QSO';
      rect.appendChild(title);
      svg.appendChild(rect);

      var cap=document.createElementNS(ns,'rect');
      cap.setAttribute('x',x);cap.setAttribute('y',y);cap.setAttribute('width',barW);cap.setAttribute('height','4');
      cap.setAttribute('rx','2');cap.setAttribute('fill',color);cap.setAttribute('opacity','1');
      svg.appendChild(cap);

      svg.appendChild(makeText(x+barW/2,h+14,b.bant,{'text-anchor':'middle','fill':'var(--t2)','font-size':'10','font-weight':'600'}));
      svg.appendChild(makeText(x+barW/2,y-5,String(b.cnt),{'text-anchor':'middle','fill':'var(--t1)','font-size':'10','font-weight':'600'}));
    });

    var container=document.getElementById('barChart');
    while(container.firstChild)container.removeChild(container.firstChild);
    container.appendChild(svg);
  }).catch(function(){document.getElementById('barChart').textContent='Yuklenemedi';});

  // Line chart - activity
  authFetch('/api/dashboard/activity?days=30').then(function(d){
    var activity=d.activity||[];
    if(!activity.length){document.getElementById('lineChart').textContent='Veri yok';return;}
    var max=Math.max.apply(null,activity.map(function(a){return a.cnt}));
    if(max===0)max=1;
    var w=400;var h=200;var padL=35;var padR=10;var padT=15;var padB=30;
    var chartW=w-padL-padR;var chartH=h-padT-padB;
    var ns='http://www.w3.org/2000/svg';
    var svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 '+w+' '+h);
    svg.style.overflow='visible';

    // Grid lines
    for(var g=0;g<4;g++){
      var gy=padT+chartH-((g+1)/4)*chartH;
      var gl=document.createElementNS(ns,'line');
      gl.setAttribute('x1',padL);gl.setAttribute('y1',gy);gl.setAttribute('x2',w-padR);gl.setAttribute('y2',gy);
      gl.setAttribute('stroke','var(--b1)');gl.setAttribute('stroke-width','0.5');gl.setAttribute('stroke-dasharray','4');
      svg.appendChild(gl);
      var gt=document.createElementNS(ns,'text');
      gt.setAttribute('x',padL-4);gt.setAttribute('y',gy+3);gt.setAttribute('text-anchor','end');
      gt.setAttribute('fill','var(--t3)');gt.setAttribute('font-size','9');gt.setAttribute('font-family','JetBrains Mono,monospace');
      gt.textContent=Math.round(max*(g+1)/4);
      svg.appendChild(gt);
    }

    // Build points
    var points=[];var fillPts=[];
    activity.forEach(function(a,i){
      var x=padL+(i/(activity.length-1||1))*chartW;
      var y=padT+chartH-(a.cnt/max)*chartH;
      points.push(x.toFixed(1)+','+y.toFixed(1));
      fillPts.push(x.toFixed(1)+','+y.toFixed(1));
    });

    // Fill area
    var polygon=document.createElementNS(ns,'polygon');
    polygon.setAttribute('points',padL+','+(padT+chartH)+' '+fillPts.join(' ')+' '+(padL+chartW)+','+(padT+chartH));
    polygon.setAttribute('fill','var(--p)');polygon.setAttribute('opacity','0.08');
    svg.appendChild(polygon);

    // Line
    var polyline=document.createElementNS(ns,'polyline');
    polyline.setAttribute('points',points.join(' '));
    polyline.setAttribute('fill','none');polyline.setAttribute('stroke','var(--p)');polyline.setAttribute('stroke-width','2');
    polyline.setAttribute('stroke-linecap','round');polyline.setAttribute('stroke-linejoin','round');
    svg.appendChild(polyline);

    // Data points
    activity.forEach(function(a,i){
      var x=padL+(i/(activity.length-1||1))*chartW;
      var y=padT+chartH-(a.cnt/max)*chartH;
      var circle=document.createElementNS(ns,'circle');
      circle.setAttribute('cx',x.toFixed(1));circle.setAttribute('cy',y.toFixed(1));circle.setAttribute('r','3');
      circle.setAttribute('fill','var(--s1)');circle.setAttribute('stroke','var(--p)');circle.setAttribute('stroke-width','1.5');
      var title=document.createElementNS(ns,'title');
      title.textContent=(a.tarih||'')+': '+a.cnt+' QSO';
      circle.appendChild(title);
      svg.appendChild(circle);
    });

    // X axis labels
    var step=Math.max(1,Math.floor(activity.length/6));
    for(var i=0;i<activity.length;i+=step){
      var x=padL+(i/(activity.length-1||1))*chartW;
      var label=activity[i].tarih?activity[i].tarih.slice(5):'';
      var xt=document.createElementNS(ns,'text');
      xt.setAttribute('x',x.toFixed(1));xt.setAttribute('y',h-5);xt.setAttribute('text-anchor','middle');
      xt.setAttribute('fill','var(--t3)');xt.setAttribute('font-size','9');xt.setAttribute('font-family','JetBrains Mono,monospace');
      xt.textContent=label;
      svg.appendChild(xt);
    }

    var container=document.getElementById('lineChart');
    while(container.firstChild)container.removeChild(container.firstChild);
    container.appendChild(svg);
  }).catch(function(){document.getElementById('lineChart').textContent='Yuklenemedi';});

  // Donut chart - modes
  authFetch('/api/dashboard/modes').then(function(d){
    var modes=d.modes||[];
    if(!modes.length){document.getElementById('donutChart').textContent='Veri yok';return;}
    var total=modes.reduce(function(s,m){return s+m.cnt},0);
    if(total===0){document.getElementById('donutChart').textContent='Veri yok';return;}
    var r=80;var cx=100;var cy=100;var circumference=2*Math.PI*r;
    var ns='http://www.w3.org/2000/svg';
    var svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 200 200');
    svg.style.maxWidth='200px';

    var offset=0;
    modes.forEach(function(m){
      var pct=m.cnt/total;
      var dashLen=pct*circumference;
      var dashGap=circumference-dashLen;
      var color=MODE_COLORS[m.mod]||'var(--t3)';
      var circle=document.createElementNS(ns,'circle');
      circle.setAttribute('cx',cx);circle.setAttribute('cy',cy);circle.setAttribute('r',r);
      circle.setAttribute('fill','none');circle.setAttribute('stroke',color);circle.setAttribute('stroke-width','24');
      circle.setAttribute('stroke-dasharray',dashLen.toFixed(2)+' '+dashGap.toFixed(2));
      circle.setAttribute('stroke-dashoffset',(-offset).toFixed(2));
      circle.setAttribute('transform','rotate(-90 '+cx+' '+cy+')');
      circle.style.transition='stroke-dasharray .5s';
      var title=document.createElementNS(ns,'title');
      title.textContent=m.mod+': '+m.cnt+' ('+Math.round(pct*100)+'%)';
      circle.appendChild(title);
      svg.appendChild(circle);
      offset+=dashLen;
    });

    // Center text
    var centerVal=document.createElementNS(ns,'text');
    centerVal.setAttribute('x',cx);centerVal.setAttribute('y',cy-4);centerVal.setAttribute('text-anchor','middle');
    centerVal.setAttribute('fill','var(--t1)');centerVal.setAttribute('font-size','22');centerVal.setAttribute('font-weight','700');
    centerVal.setAttribute('font-family','JetBrains Mono,monospace');
    centerVal.textContent=total;
    svg.appendChild(centerVal);

    var centerLabel=document.createElementNS(ns,'text');
    centerLabel.setAttribute('x',cx);centerLabel.setAttribute('y',cy+12);centerLabel.setAttribute('text-anchor','middle');
    centerLabel.setAttribute('fill','var(--t3)');centerLabel.setAttribute('font-size','10');
    centerLabel.textContent='toplam';
    svg.appendChild(centerLabel);

    // Legend
    var legend=document.createElement('div');
    legend.className='donut-legend';
    modes.forEach(function(m){
      var color=MODE_COLORS[m.mod]||'var(--t3)';
      var item=document.createElement('div');
      item.className='donut-legend-item';
      var swatch=document.createElement('span');
      swatch.className='donut-legend-color';
      swatch.style.background=color;
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(m.mod+' ('+m.cnt+')'));
      legend.appendChild(item);
    });

    var container=document.getElementById('donutChart');
    while(container.firstChild)container.removeChild(container.firstChild);
    container.appendChild(svg);
    container.appendChild(legend);
  }).catch(function(){document.getElementById('donutChart').textContent='Yuklenemedi';});

  // Recent QSOs table
  authFetch('/api/dashboard/stats').then(function(d){
    var qsos=d.son_qso||[];
    var container=document.getElementById('recentTable');
    while(container.firstChild)container.removeChild(container.firstChild);
    if(!qsos.length){
      var empty=document.createElement('div');
      empty.className='empty-state';
      empty.textContent='Henuz QSO kaydedilmemis';
      container.appendChild(empty);
      return;
    }
    var table=document.createElement('table');
    table.className='recent-table';
    var thead=document.createElement('thead');
    var headRow=document.createElement('tr');
    ['Tarih','Cagri Isareti','Bant','Mod','RST G','RST A'].forEach(function(h){
      var th=document.createElement('th');th.textContent=h;headRow.appendChild(th);
    });
    thead.appendChild(headRow);table.appendChild(thead);
    var tbody=document.createElement('tbody');

    qsos.slice(0,10).forEach(function(q){
      var tr=document.createElement('tr');
      var bandColor=BAND_COLORS[q.bant]||'var(--t3)';

      var tdDate=document.createElement('td');
      tdDate.style.cssText='font-size:11px;color:var(--t2);font-family:JetBrains Mono,monospace';
      tdDate.textContent=q.tarih||'-';
      tr.appendChild(tdDate);

      var tdCall=document.createElement('td');
      var callSpan=document.createElement('span');
      callSpan.className='callsign-tag';
      callSpan.textContent=q.cagri_isareti||'-';
      tdCall.appendChild(callSpan);
      tr.appendChild(tdCall);

      var tdBand=document.createElement('td');
      var bandSpan=document.createElement('span');
      bandSpan.className='band-tag';
      bandSpan.style.cssText='background:'+bandColor+'22;color:'+bandColor;
      bandSpan.textContent=q.bant||'-';
      tdBand.appendChild(bandSpan);
      tr.appendChild(tdBand);

      var tdMode=document.createElement('td');
      var modeSpan=document.createElement('span');
      modeSpan.className='mode-tag';
      modeSpan.textContent=q.mod||'-';
      tdMode.appendChild(modeSpan);
      tr.appendChild(tdMode);

      var tdRstG=document.createElement('td');
      tdRstG.style.cssText='font-family:JetBrains Mono,monospace;font-size:11px';
      tdRstG.textContent=q.rst_gonderilen||'-';
      tr.appendChild(tdRstG);

      var tdRstA=document.createElement('td');
      tdRstA.style.cssText='font-family:JetBrains Mono,monospace;font-size:11px';
      tdRstA.textContent=q.rst_alinan||'-';
      tr.appendChild(tdRstA);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
  }).catch(function(){document.getElementById('recentTable').textContent='Yuklenemedi';});
})();
<\/script>`;

  return wrapPage({
    title: 'Panel',
    user,
    bodyContent,
    headExtra,
    scriptContent
  });
}
