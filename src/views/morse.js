import { wrapPage } from './components/layout.js';

export function morsePage({ user }) {
  return wrapPage({
    title: 'Mors Alfabesi',
    user,
    headExtra: `<style>
/* ===== MORSE TABS ===== */
.morse-tabs{display:flex;gap:2px;margin-bottom:16px;background:var(--s1);border:1px solid var(--b1);border-radius:var(--rad);padding:4px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.morse-tabs::-webkit-scrollbar{display:none}
.morse-tab{flex:1;padding:10px 12px;font-size:12px;font-weight:600;color:var(--t3);background:transparent;border:none;border-radius:7px;cursor:pointer;transition:.15s;white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:5px;font-family:inherit}
.morse-tab:hover{color:var(--t2);background:var(--b1)}
.morse-tab.active{color:#fff;background:var(--p)}
.morse-panel{display:none}
.morse-panel.active{display:block}

/* ===== CONVERTER ===== */
.conv-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:640px){.conv-grid{grid-template-columns:1fr}}
.conv-box{display:flex;flex-direction:column;gap:6px}
.conv-box label{font-size:12px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.5px}
.conv-ta{width:100%;min-height:140px;padding:12px;background:var(--bg);border:1px solid var(--b1);border-radius:8px;color:var(--t1);font-size:14px;font-family:'Inter',sans-serif;resize:vertical;outline:none;transition:.15s}
.conv-ta:focus{border-color:var(--p)}
.conv-ta.mono{font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:2px}
.conv-controls{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:12px}
.conv-controls .btn-p{display:inline-flex;align-items:center;gap:6px}
.speed-ctrl{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--t2);font-weight:500}
.speed-ctrl input[type="range"]{width:120px;accent-color:var(--p)}
.speed-val{font-family:'JetBrains Mono',monospace;color:var(--p2);min-width:42px}
.visual-morse{min-height:48px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:12px;margin-top:12px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;overflow:hidden}
.vm-dot{width:10px;height:10px;border-radius:50%;background:var(--t3);transition:background .15s}
.vm-dash{width:28px;height:10px;border-radius:5px;background:var(--t3);transition:background .15s}
.vm-gap{width:8px}
.vm-word{width:20px}
.vm-dot.lit,.vm-dash.lit{background:var(--p)}

/* ===== ALPHABET GRID ===== */
.alpha-section{margin-bottom:18px}
.alpha-section-title{font-size:12px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;padding-left:4px}
.alpha-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px}
@media(max-width:480px){.alpha-grid{grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:6px}}
.alpha-card{background:var(--s2);border:1px solid var(--b1);border-radius:10px;padding:12px 8px;text-align:center;cursor:pointer;transition:.2s;user-select:none;position:relative;min-height:70px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.alpha-card:hover{border-color:var(--p);background:var(--pg);transform:translateY(-2px)}
.alpha-card:active{transform:scale(.95)}
.alpha-card .letter{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:700;color:var(--t1);line-height:1.2}
.alpha-card .morse{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--p2);letter-spacing:2px;margin-top:4px}
.alpha-card.flipped .letter{display:none}
.alpha-card.flipped .morse{font-size:20px;color:var(--p)}
.alpha-card.playing{border-color:var(--p);background:var(--pg);box-shadow:0 0 12px rgba(139,92,246,.3)}
.flash-toggle{display:flex;align-items:center;gap:8px;margin-bottom:16px;font-size:13px;color:var(--t2);font-weight:500}

/* ===== QUIZ OPTIONS (shared by Harf Bilmece, Hiz Yarisi, Hayatta Kal) ===== */
.quiz-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:320px;margin:16px auto}
.quiz-opt{min-width:64px;min-height:64px;font-size:24px;font-weight:700;font-family:'JetBrains Mono',monospace;border:2px solid var(--b2);border-radius:12px;background:var(--s2);color:var(--t1);cursor:pointer;transition:.15s;display:flex;align-items:center;justify-content:center;user-select:none;position:relative}
.quiz-opt:hover:not(.disabled){border-color:var(--p);background:var(--pg);transform:scale(1.04)}
.quiz-opt:active:not(.disabled){transform:scale(.96)}
.quiz-opt.correct{background:rgba(45,212,191,.15);border-color:var(--g);color:var(--g)}
.quiz-opt.wrong{background:rgba(239,68,68,.15);border-color:var(--r);color:var(--r)}
.quiz-opt.reveal{border-color:var(--g);box-shadow:0 0 8px rgba(45,212,191,.3)}
.quiz-opt.disabled{opacity:.5;cursor:not-allowed;pointer-events:none}
.quiz-opt-num{position:absolute;top:4px;left:8px;font-size:10px;color:var(--t3);font-weight:400}

/* ===== LIVES ===== */
.lives{display:flex;justify-content:center;gap:6px;margin:8px 0;font-size:22px}
.life{transition:.2s}
.life.lost{opacity:.25;filter:grayscale(1);transform:scale(.85)}

/* ===== COUNTDOWN BAR ===== */
.countdown-bar{width:100%;height:6px;background:var(--b1);border-radius:3px;margin:10px 0;overflow:hidden}
.countdown-fill{height:100%;border-radius:3px;transition:width .2s linear,background .5s;background:var(--g)}
.countdown-fill.warn{background:var(--y)}
.countdown-fill.danger{background:var(--r)}

/* ===== GAME OVER OVERLAY ===== */
.game-over-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.game-over-card{background:var(--s1);border:1px solid var(--b1);border-radius:16px;padding:32px;text-align:center;max-width:360px;width:90%;box-shadow:0 20px 60px var(--shadow);animation:scaleIn .3s ease}
@keyframes scaleIn{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
.go-title{font-size:28px;font-weight:800;color:var(--r);margin-bottom:12px;font-family:'JetBrains Mono',monospace}
.go-score{font-size:36px;font-weight:800;color:var(--p2);margin-bottom:8px;font-family:'JetBrains Mono',monospace}
.go-highscore{font-size:18px;color:var(--y);font-weight:700;margin-bottom:8px}
.go-stats{font-size:13px;color:var(--t2);margin-bottom:20px;line-height:1.8}

/* ===== GAMIFICATION ===== */
.game-bar{display:flex;justify-content:center;gap:20px;margin:10px 0;flex-wrap:wrap}
.game-stat{display:flex;flex-direction:column;align-items:center;gap:2px}
.game-stat .gv{font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;color:var(--p2)}
.game-stat .gv.xp{color:var(--y)}
.game-stat .gv.streak{color:var(--g)}
.game-stat .gv.combo{color:#f97316}
.game-stat .gl{font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.5px}
.xp-bar{width:100%;max-width:300px;height:6px;background:var(--b1);border-radius:3px;margin:8px auto;overflow:hidden}
.xp-fill{height:100%;background:linear-gradient(90deg,var(--p),var(--y));border-radius:3px;transition:width .4s ease}
.streak-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;font-family:'JetBrains Mono',monospace;min-height:24px}
.streak-badge.hot{background:rgba(249,115,22,.12);color:#f97316;border:1px solid rgba(249,115,22,.2)}
.streak-badge.fire{background:rgba(239,68,68,.12);color:#ef4444;border:1px solid rgba(239,68,68,.2)}
@keyframes xpPop{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes comboFlash{0%{opacity:1}50%{opacity:.4}100%{opacity:1}}
.xp-pop{animation:xpPop .3s ease}
.combo-flash{animation:comboFlash .5s ease}
.float-xp{position:absolute;font-size:14px;font-weight:700;color:var(--y);pointer-events:none;animation:floatUp .8s ease forwards;font-family:'JetBrains Mono',monospace}
@keyframes floatUp{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-40px)}}

/* ===== TRAINING AREA ===== */
.train-area{text-align:center;padding:20px 0;position:relative;transition:background .5s ease;border-radius:var(--rad)}
.train-char-display{font-family:'JetBrains Mono',monospace;font-size:64px;font-weight:700;color:var(--p);margin:16px 0;line-height:1;min-height:70px;display:flex;align-items:center;justify-content:center}
.train-morse-hint{font-family:'JetBrains Mono',monospace;font-size:22px;color:var(--t3);letter-spacing:4px;min-height:32px;margin-bottom:16px}

/* ===== URGENCY ===== */
.urgency-1{background:rgba(251,191,36,.04)}
.urgency-2{background:rgba(249,115,22,.08)}
.urgency-3{background:rgba(239,68,68,.12)}
.urgency-4{background:rgba(239,68,68,.2)}

/* ===== ANIMATIONS ===== */
@keyframes correctPulse{0%{transform:scale(1)}30%{transform:scale(1.15)}60%{transform:scale(.95)}100%{transform:scale(1)}}
@keyframes wrongShake{0%{transform:translateX(0)}20%{transform:translateX(-12px)}40%{transform:translateX(12px)}60%{transform:translateX(-8px)}80%{transform:translateX(8px)}100%{transform:translateX(0)}}
@keyframes correctBg{0%{background:transparent}50%{background:rgba(45,212,191,.15)}100%{background:transparent}}
@keyframes wrongBg{0%{background:transparent}50%{background:rgba(239,68,68,.12)}100%{background:transparent}}
.train-anim-correct .train-char-display{animation:correctPulse .5s ease;color:var(--g)}
.train-anim-correct{animation:correctBg .6s ease}
.train-anim-wrong .train-char-display{animation:wrongShake .5s ease;color:var(--r)}
.train-anim-wrong{animation:wrongBg .6s ease}
.train-result-icon{font-size:36px;min-height:44px;display:flex;align-items:center;justify-content:center}

/* ===== CHARSET / LEVELS ===== */
.train-charset{margin-top:16px;padding:12px;background:var(--s2);border:1px solid var(--b1);border-radius:8px}
.train-charset-title{font-size:11px;color:var(--t3);text-transform:uppercase;margin-bottom:6px;font-weight:600}
.train-chars{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.train-char-badge{padding:4px 10px;border-radius:6px;font-size:13px;font-weight:600;font-family:'JetBrains Mono',monospace;background:var(--pg);color:var(--p2);border:1px solid rgba(139,92,246,.12);cursor:pointer;transition:.15s;user-select:none}
.train-char-badge:hover{background:rgba(139,92,246,.2)}
.train-char-badge.locked{background:var(--b1);color:var(--t3);border-color:var(--b1)}
.train-char-badge.selected{background:var(--p);color:#fff;border-color:var(--p)}
.train-level-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin:14px 0}
.train-lvl-btn{padding:6px 14px;border-radius:6px;font-size:12px;font-weight:600;border:1px solid var(--b1);background:var(--s2);color:var(--t2);cursor:pointer;transition:.15s;font-family:inherit}
.train-lvl-btn:hover{border-color:var(--b2);background:var(--s3)}
.train-lvl-btn.active{background:var(--p);color:#fff;border-color:var(--p)}

/* ===== STATS / LEADERBOARD ===== */
.stats-panel{background:var(--s2);border:1px solid var(--b1);border-radius:var(--rad);padding:14px;margin-top:12px}
.stats-title{font-size:12px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;display:flex;align-items:center;gap:6px}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}
.stat-card{background:var(--s1);border:1px solid var(--b1);border-radius:8px;padding:10px;text-align:center}
.stat-card .sv{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:var(--p2)}
.stat-card .sl{font-size:10px;color:var(--t3);margin-top:2px}
.lb-table{width:100%;font-size:12px;margin-top:8px;border-collapse:collapse}
.lb-table th{text-align:left;padding:6px 8px;color:var(--t3);font-size:10px;text-transform:uppercase;border-bottom:1px solid var(--b1)}
.lb-table td{padding:6px 8px;border-bottom:1px solid var(--b1)}
.lb-table tr:last-child td{border:none}
.lb-rank{font-weight:700;color:var(--y);font-family:'JetBrains Mono',monospace}
.lb-me{background:var(--pg)}

/* ===== TOGGLE ===== */
.toggle-row{display:flex;align-items:center;gap:8px;justify-content:center;margin-top:8px;font-size:12px;color:var(--t2)}
.toggle-switch{position:relative;width:36px;height:20px;cursor:pointer}
.toggle-switch input{opacity:0;width:0;height:0}
.toggle-slider{position:absolute;inset:0;background:var(--b1);border-radius:10px;transition:.2s}
.toggle-slider::before{content:'';position:absolute;width:16px;height:16px;left:2px;bottom:2px;background:var(--t3);border-radius:50%;transition:.2s}
.toggle-switch input:checked+.toggle-slider{background:var(--p)}
.toggle-switch input:checked+.toggle-slider::before{transform:translateX(16px);background:#fff}

/* ===== LIVE SENDER ===== */
.live-area{text-align:center;padding:10px 0}
.live-key{width:100%;max-width:400px;height:160px;margin:16px auto;border-radius:16px;background:var(--s2);border:2px solid var(--b2);display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;-webkit-user-select:none;transition:background .08s,border-color .08s,transform .08s;font-size:15px;font-weight:600;color:var(--t2)}
.live-key.pressed{background:var(--pg);border-color:var(--p);transform:scale(.97);color:var(--p)}
.live-key-hint{font-size:12px;color:var(--t3);margin-bottom:8px}
.live-decoded{min-height:80px;background:var(--bg);border:1px solid var(--b1);border-radius:8px;padding:14px;margin-top:16px;font-family:'JetBrains Mono',monospace;font-size:16px;text-align:left;word-break:break-all;color:var(--t1);line-height:1.6}
.live-current{font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:4px;color:var(--p);min-height:36px;margin:8px 0}
.live-wpm{font-size:13px;color:var(--t2);margin:8px 0}
.live-wpm span{font-family:'JetBrains Mono',monospace;color:var(--p2);font-weight:700}
.live-btns{display:flex;justify-content:center;gap:10px;margin-top:14px}

/* ===== WORD MODE ===== */
.word-area{text-align:center;padding:20px 0;position:relative;transition:background .5s ease;border-radius:var(--rad)}
.word-display{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:700;color:var(--p);margin:16px 0;letter-spacing:4px;min-height:44px}
.word-morse{font-family:'JetBrains Mono',monospace;font-size:16px;color:var(--t3);letter-spacing:2px;min-height:24px;margin-bottom:16px}
.word-input{width:100%;max-width:400px;text-align:center;font-size:20px;font-weight:600;padding:12px;text-transform:uppercase;font-family:'JetBrains Mono',monospace}
.word-hint{font-size:12px;color:var(--t3);margin-top:8px}
.word-loading{color:var(--t3);font-size:14px;padding:30px;display:flex;flex-direction:column;align-items:center;gap:14px}
.hourglass{font-size:36px;display:inline-block;animation:hourglassSpin 1.5s ease-in-out infinite}
@keyframes hourglassSpin{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}50.01%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}
.loading-dots::after{content:'';animation:dots 1.5s steps(4,end) infinite}
@keyframes dots{0%{content:''}25%{content:'.'}50%{content:'..'}75%{content:'...'}}
.train-btns{display:flex;justify-content:center;gap:10px;margin-top:14px}

/* ===== SPEED RACE ===== */
.race-timer{font-family:'JetBrains Mono',monospace;font-size:56px;font-weight:800;color:var(--p2);margin:8px 0;line-height:1}
.race-timer.ending{color:var(--r);animation:pulse .5s ease infinite alternate}
@keyframes pulse{from{opacity:1}to{opacity:.5}}
.race-score{font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:800;color:var(--y);margin:8px 0}
.race-pre{text-align:center;padding:30px 0}
.race-pre .btn-p{font-size:20px;padding:14px 40px;border-radius:12px}

/* ===== SURVIVAL ===== */
.surv-timer{font-family:'JetBrains Mono',monospace;font-size:48px;font-weight:800;color:var(--g);margin:8px 0;line-height:1}
.surv-timer.warn{color:var(--y)}
.surv-timer.danger{color:var(--r);animation:pulse .4s ease infinite alternate}
.surv-time-bar{width:100%;height:8px;background:var(--b1);border-radius:4px;margin:8px 0;overflow:hidden}
.surv-time-fill{height:100%;border-radius:4px;transition:width .1s linear,background .3s;background:var(--g)}
.surv-time-fill.warn{background:var(--y)}
.surv-time-fill.danger{background:var(--r)}
.surv-score{font-family:'JetBrains Mono',monospace;font-size:36px;font-weight:800;color:var(--y);margin:4px 0}
</style>`,

    bodyContent: `<div class="wrap-page">
  <div class="morse-tabs">
    <button class="morse-tab active" data-tab="converter">\u270E Cevirici</button>
    <button class="morse-tab" data-tab="alphabet">\uD83D\uDCD6 Alfabe</button>
    <button class="morse-tab" data-tab="quiz">\uD83C\uDFAF Harf Bilmece</button>
    <button class="morse-tab" data-tab="race">\u26A1 Hiz Yarisi</button>
    <button class="morse-tab" data-tab="survival">\uD83D\uDC9A Hayatta Kal</button>
    <button class="morse-tab" data-tab="words">\uD83D\uDCDD Kelime Modu</button>
    <button class="morse-tab" data-tab="live">\uD83D\uDCE1 Canli Gonderici</button>
  </div>

  <!-- Tab 1: Cevirici -->
  <div class="morse-panel active" id="panel-converter">
    <div class="card" style="padding:16px">
      <div class="conv-grid">
        <div class="conv-box">
          <label>Metin</label>
          <textarea class="conv-ta" id="convText" placeholder="Metni buraya yazin..."></textarea>
        </div>
        <div class="conv-box">
          <label>Mors Kodu</label>
          <textarea class="conv-ta mono" id="convMorse" placeholder="Mors kodunu buraya yazin (. ve -)"></textarea>
        </div>
      </div>
      <div class="conv-controls">
        <button class="btn-p" id="convPlay">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          Cal
        </button>
        <button class="btn-g" id="convStop" style="display:none">Durdur</button>
        <div class="speed-ctrl">
          <span>Hiz:</span>
          <input type="range" id="convWpm" min="5" max="30" value="15">
          <span class="speed-val" id="convWpmVal">15 WPM</span>
        </div>
      </div>
      <div class="visual-morse" id="visualMorse"></div>
    </div>
  </div>

  <!-- Tab 2: Alfabe -->
  <div class="morse-panel" id="panel-alphabet">
    <div class="card" style="padding:16px">
      <div class="flash-toggle">
        <label class="toggle-switch"><input type="checkbox" id="alphaFlashToggle"><span class="toggle-slider"></span></label>
        Flash kart modu (tiklayinca cevir)
      </div>
      <div id="alphaContainer"></div>
    </div>
  </div>

  <!-- Tab 3: Harf Bilmece -->
  <div class="morse-panel" id="panel-quiz">
    <div class="card" style="padding:16px">
      <div class="train-area" id="quizArea" style="position:relative">
        <div class="game-bar">
          <div class="game-stat"><div class="gv xp" id="qXp">0</div><div class="gl">XP</div></div>
          <div class="game-stat"><div class="gv streak" id="qStreak">0</div><div class="gl">Seri</div></div>
          <div class="game-stat"><div class="gv combo" id="qCombo">x1</div><div class="gl">Combo</div></div>
          <div class="game-stat sc-ok"><div class="gv" style="color:var(--g)" id="qOk">0</div><div class="gl">Dogru</div></div>
          <div class="game-stat sc-no"><div class="gv" style="color:var(--r)" id="qNo">0</div><div class="gl">Yanlis</div></div>
        </div>
        <div class="xp-bar"><div class="xp-fill" id="qXpBar" style="width:0%"></div></div>
        <div style="text-align:center;font-size:10px;color:var(--t3);margin-bottom:8px" id="qXpLabel">Seviye 1 - 0/100 XP</div>
        <div id="qStreakBadge" style="text-align:center;min-height:24px;margin-bottom:4px"></div>
        <div class="lives" id="qLives"></div>
        <div class="countdown-bar"><div class="countdown-fill" id="qCountdown" style="width:100%"></div></div>
        <div class="train-char-display" id="qCharDisplay">?</div>
        <div class="train-morse-hint" id="qHint"></div>
        <div class="quiz-opts" id="qOpts"></div>
        <div class="train-result-icon" id="qResultIcon"></div>
        <div style="font-size:15px;font-weight:600;min-height:28px;margin:8px 0;text-align:center" id="qFeedback"></div>
        <div class="conv-controls" style="justify-content:center;margin-top:14px;flex-wrap:wrap;gap:14px">
          <div class="speed-ctrl">
            <span>Hiz:</span>
            <input type="range" id="qWpm" min="5" max="30" value="12">
            <span class="speed-val" id="qWpmVal">12 WPM</span>
          </div>
          <label class="toggle-row"><label class="toggle-switch"><input type="checkbox" id="qAutoRepeat"><span class="toggle-slider"></span></label>Otomatik tekrar</label>
        </div>
        <div class="train-level-btns" id="qLevelBtns">
          <button class="train-lvl-btn" data-level="0">Kolay (E, T)</button>
          <button class="train-lvl-btn" data-level="1">Orta (+A,I,M,N)</button>
          <button class="train-lvl-btn" data-level="2">Zor (+D,G,K,O...)</button>
          <button class="train-lvl-btn" data-level="3">Uzman (Harfler)</button>
          <button class="train-lvl-btn" data-level="4">Rakamlar</button>
          <button class="train-lvl-btn active" data-level="99">Hepsi</button>
          <button class="train-lvl-btn" data-level="custom">Karisik</button>
        </div>
        <div class="train-charset" id="qCharset"></div>
        <div class="stats-panel" id="qStatsPanel">
          <div class="stats-title">\uD83C\uDFC6 Istatistikler & Skor Tablosu</div>
          <div class="stats-grid" id="qStatsGrid"></div>
          <table class="lb-table" id="qLeaderboard"></table>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 4: Hiz Yarisi -->
  <div class="morse-panel" id="panel-race">
    <div class="card" style="padding:16px">
      <div class="train-area" id="raceArea" style="position:relative;text-align:center">
        <div id="racePre" class="race-pre">
          <div style="font-size:18px;font-weight:700;color:var(--t1);margin-bottom:12px">Hiz Yarisi</div>
          <div style="font-size:13px;color:var(--t2);margin-bottom:20px;max-width:400px;margin-left:auto;margin-right:auto">30 saniye icinde mumkun oldugunca cok mors kodu cozun. Yanlis cevaplar puan vermez - zaman en buyuk dusman!</div>
          <div class="conv-controls" style="justify-content:center;margin-bottom:20px">
            <div class="speed-ctrl">
              <span>Hiz:</span>
              <input type="range" id="raceWpmPre" min="5" max="30" value="15">
              <span class="speed-val" id="raceWpmPreVal">15 WPM</span>
            </div>
          </div>
          <button class="btn-p" id="raceStartBtn" style="font-size:20px;padding:14px 40px;border-radius:12px">Basla!</button>
        </div>
        <div id="raceGame" style="display:none">
          <div class="race-timer" id="raceTimer">30</div>
          <div class="race-score" id="raceScore">0</div>
          <div style="font-size:12px;color:var(--t2);margin-bottom:8px">Combo: <span id="raceCombo" style="color:#f97316;font-weight:700;font-family:'JetBrains Mono',monospace">x1</span></div>
          <div class="train-char-display" id="raceCharDisplay" style="font-size:48px;min-height:56px">?</div>
          <div class="train-morse-hint" id="raceHint"></div>
          <div class="quiz-opts" id="raceOpts"></div>
        </div>
        <div class="stats-panel" id="raceStatsPanel" style="margin-top:20px">
          <div class="stats-title">\uD83C\uDFC6 Hiz Yarisi Skor Tablosu</div>
          <div class="stats-grid" id="raceStatsGrid"></div>
          <table class="lb-table" id="raceLeaderboard"></table>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 5: Hayatta Kal -->
  <div class="morse-panel" id="panel-survival">
    <div class="card" style="padding:16px">
      <div class="train-area" id="survArea" style="position:relative;text-align:center">
        <div id="survPre" class="race-pre">
          <div style="font-size:18px;font-weight:700;color:var(--t1);margin-bottom:12px">Hayatta Kal</div>
          <div style="font-size:13px;color:var(--t2);margin-bottom:20px;max-width:400px;margin-left:auto;margin-right:auto">15 saniye ile basliyorsun. Dogru cevap +3sn, yanlis cevap -5sn. Zaman biterse oyun biter!</div>
          <div class="conv-controls" style="justify-content:center;margin-bottom:20px">
            <div class="speed-ctrl">
              <span>Hiz:</span>
              <input type="range" id="survWpmPre" min="5" max="30" value="12">
              <span class="speed-val" id="survWpmPreVal">12 WPM</span>
            </div>
          </div>
          <button class="btn-p" id="survStartBtn" style="font-size:20px;padding:14px 40px;border-radius:12px">Basla!</button>
        </div>
        <div id="survGame" style="display:none">
          <div class="surv-timer" id="survTimer">15.0</div>
          <div class="surv-time-bar"><div class="surv-time-fill" id="survTimeFill" style="width:100%"></div></div>
          <div class="surv-score" id="survScore">0</div>
          <div style="font-size:12px;color:var(--t2);margin-bottom:8px">Combo: <span id="survCombo" style="color:#f97316;font-weight:700;font-family:'JetBrains Mono',monospace">x1</span> | Hiz: <span id="survWpmDisplay" style="color:var(--p2);font-weight:700;font-family:'JetBrains Mono',monospace">12</span> WPM</div>
          <div class="train-char-display" id="survCharDisplay" style="font-size:48px;min-height:56px">?</div>
          <div class="train-morse-hint" id="survHint"></div>
          <div class="quiz-opts" id="survOpts"></div>
        </div>
        <div class="stats-panel" id="survStatsPanel" style="margin-top:20px">
          <div class="stats-title">\uD83C\uDFC6 Hayatta Kal Skor Tablosu</div>
          <div class="stats-grid" id="survStatsGrid"></div>
          <table class="lb-table" id="survLeaderboard"></table>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 6: Kelime Modu -->
  <div class="morse-panel" id="panel-words">
    <div class="card" style="padding:16px">
      <div class="word-area" id="wordArea">
        <div class="game-bar">
          <div class="game-stat"><div class="gv xp" id="wordXp">0</div><div class="gl">XP</div></div>
          <div class="game-stat"><div class="gv streak" id="wordStreak">0</div><div class="gl">Seri</div></div>
          <div class="game-stat"><div class="gv combo" id="wordCombo">x1</div><div class="gl">Combo</div></div>
          <div class="game-stat sc-ok"><div class="gv" style="color:var(--g)" id="wordOk">0</div><div class="gl">Dogru</div></div>
          <div class="game-stat sc-no"><div class="gv" style="color:var(--r)" id="wordNo">0</div><div class="gl">Yanlis</div></div>
        </div>
        <div class="xp-bar"><div class="xp-fill" id="wordXpBar" style="width:0%"></div></div>
        <div style="text-align:center;font-size:10px;color:var(--t3);margin-bottom:8px" id="wordXpLabel">Seviye 1 - 0/100 XP</div>
        <div id="wordStreakBadge" style="text-align:center;min-height:24px;margin-bottom:4px"></div>
        <div class="train-result-icon" id="wordResultIcon"></div>
        <div class="word-display" id="wordDisplay">?</div>
        <div class="word-morse" id="wordMorse"></div>
        <div id="wordHintBox" style="min-height:22px;margin-bottom:8px;text-align:center;font-size:13px;color:var(--y);font-weight:600;font-family:'JetBrains Mono',monospace"></div>
        <div style="display:flex;justify-content:center">
          <input type="text" class="inp word-input" id="wordInput" placeholder="Kelimeyi yazin..." autocomplete="off" autocapitalize="characters">
        </div>
        <div style="font-size:15px;font-weight:600;min-height:28px;margin:8px 0;text-align:center" id="wordFeedback"></div>
        <div class="word-hint">Mors kodunu dinleyin ve kelimeyi yazin. Ipucu seriyi kirar ve XP duser!</div>
        <div class="train-btns">
          <button class="btn-p" id="wordPlay">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            Tekrar
          </button>
          <button class="btn-g" id="wordHintBtn">Ipucu</button>
          <button class="btn-g" id="wordNext">Sonraki Kelime</button>
          <button class="btn-g" id="wordNewWords">Yeni Kelimeler</button>
          <button class="btn-g" id="wordReset" style="color:var(--r)">Yeniden Basla</button>
        </div>
        <div class="conv-controls" style="justify-content:center;margin-top:14px;flex-wrap:wrap;gap:14px">
          <div class="speed-ctrl">
            <span>Hiz:</span>
            <input type="range" id="wordWpm" min="5" max="30" value="12">
            <span class="speed-val" id="wordWpmVal">12 WPM</span>
          </div>
          <label class="toggle-row"><label class="toggle-switch"><input type="checkbox" id="wordAutoRepeat"><span class="toggle-slider"></span></label>Otomatik tekrar</label>
        </div>
        <div class="word-loading" id="wordLoading" style="display:none"><span class="hourglass">\u23F3</span><span>Kelimeler yukleniyor<span class="loading-dots"></span></span></div>
        <div class="stats-panel" id="wordStatsPanel">
          <div class="stats-title">\uD83C\uDFC6 Istatistikler & Skor Tablosu</div>
          <div class="stats-grid" id="wordStatsGrid"></div>
          <table class="lb-table" id="wordLeaderboard"></table>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 7: Canli Gonderici -->
  <div class="morse-panel" id="panel-live">
    <div class="card" style="padding:16px">
      <div class="live-area">
        <div class="conv-controls" style="justify-content:center;margin-bottom:10px">
          <div class="speed-ctrl">
            <span>Hiz:</span>
            <input type="range" id="liveWpm" min="5" max="30" value="15">
            <span class="speed-val" id="liveWpmVal">15 WPM</span>
          </div>
        </div>
        <div class="live-key-hint">Basilica tiklayin veya bosluk tusuna basin</div>
        <div class="live-key" id="liveKey">BASILI TUT</div>
        <div class="live-current" id="liveCurrent"></div>
        <div class="live-wpm">Mevcut hiz: <span id="liveWpmDisplay">-- WPM</span></div>
        <div class="live-btns">
          <button class="btn-g" id="liveClear">Temizle</button>
        </div>
        <div class="live-decoded" id="liveDecoded"></div>
      </div>
    </div>
  </div>
</div>`,

    scriptContent: `<script>
(function() {
  'use strict';

  // ========================================================================
  // SHARED INFRASTRUCTURE
  // ========================================================================

  // ===== MORSE CODE MAP =====
  var CHAR_TO_MORSE = {
    'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....',
    'I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.',
    'Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-',
    'Y':'-.--','Z':'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
    '6':'-....','7':'--...','8':'---..','9':'----.',
    '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.','(':'-.--.',
    ')':'-.--.-','&':'.-...',':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.',
    '-':'-....-','_':'..--.-','"':'.-..-.','$':'...-..-','@':'.--.-.'
  };

  var MORSE_TO_CHAR = {};
  var mcKeys = Object.keys(CHAR_TO_MORSE);
  for (var ki = 0; ki < mcKeys.length; ki++) {
    MORSE_TO_CHAR[CHAR_TO_MORSE[mcKeys[ki]]] = mcKeys[ki];
  }

  // ===== LEVELS =====
  var LEVELS = [
    ['E','T'],
    ['A','I','M','N'],
    ['D','G','K','O','R','S','U','W'],
    ['B','C','F','H','J','L','P','Q','V','X','Y','Z'],
    ['0','1','2','3','4','5','6','7','8','9']
  ];

  // ===== AUDIO ENGINE =====
  var audioCtx = null;
  var oscNode = null;
  var gainNode = null;
  var FREQ = 600;

  function ensureAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscNode = audioCtx.createOscillator();
    oscNode.type = 'sine';
    oscNode.frequency.value = FREQ;
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0;
    oscNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscNode.start();
  }

  function toneOn() {
    ensureAudio();
    var now = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0.6, now + 0.005);
  }

  function toneOff() {
    if (!audioCtx) return;
    var now = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.005);
  }

  function ditMs(wpm) { return 1200 / wpm; }

  function killAudio() {
    if (!audioCtx || !gainNode) return;
    var now = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.setValueAtTime(0, now);
  }

  function playMorseString(morse, wpm, onElement, onDone) {
    ensureAudio();
    killAudio();

    var dit = ditMs(wpm) / 1000;
    var dah = dit * 3;
    var elemGap = dit;
    var charGap = dit * 3;
    var wordGap = dit * 7;
    var t = audioCtx.currentTime + 0.05;
    var schedule = [];
    var cancelled = false;
    var timers = [];
    var parts = morse.split(' ');

    for (var pi = 0; pi < parts.length; pi++) {
      var part = parts[pi];
      if (part === '' && pi > 0 && parts[pi - 1] === '') continue;
      if (part === '') {
        t += wordGap;
        schedule.push({ type: 'word', time: t });
        continue;
      }
      for (var ci = 0; ci < part.length; ci++) {
        var sym = part[ci];
        if (sym === '.') {
          schedule.push({ type: 'dot', time: t, dur: dit });
          gainNode.gain.setValueAtTime(0, t);
          gainNode.gain.linearRampToValueAtTime(0.6, t + 0.004);
          gainNode.gain.setValueAtTime(0.6, t + dit - 0.004);
          gainNode.gain.linearRampToValueAtTime(0, t + dit);
          t += dit + elemGap;
        } else if (sym === '-') {
          schedule.push({ type: 'dash', time: t, dur: dah });
          gainNode.gain.setValueAtTime(0, t);
          gainNode.gain.linearRampToValueAtTime(0.6, t + 0.004);
          gainNode.gain.setValueAtTime(0.6, t + dah - 0.004);
          gainNode.gain.linearRampToValueAtTime(0, t + dah);
          t += dah + elemGap;
        }
      }
      t += charGap - elemGap;
    }

    if (onElement) {
      for (var si = 0; si < schedule.length; si++) {
        (function(s) {
          var delay = (s.time - audioCtx.currentTime) * 1000;
          if (delay > 0) timers.push(setTimeout(function() { if (!cancelled) onElement(s); }, delay));
        })(schedule[si]);
      }
    }

    var totalDur = (t - audioCtx.currentTime) * 1000;
    var doneTimer = null;
    if (onDone) doneTimer = setTimeout(function() { if (!cancelled) onDone(); }, totalDur + 50);

    return {
      cancel: function() {
        cancelled = true;
        if (doneTimer) clearTimeout(doneTimer);
        for (var ti = 0; ti < timers.length; ti++) clearTimeout(timers[ti]);
        killAudio();
      }
    };
  }

  // ===== TEXT <-> MORSE CONVERSION =====
  function textToMorse(text) {
    var result = [];
    var upper = text.toUpperCase();
    for (var i = 0; i < upper.length; i++) {
      var ch = upper[i];
      if (ch === ' ') { result.push('/'); }
      else if (CHAR_TO_MORSE[ch]) { result.push(CHAR_TO_MORSE[ch]); }
    }
    return result.join(' ');
  }

  function morseToText(morse) {
    var words = morse.trim().split(/\\s*\\/\\s*/);
    var result = [];
    for (var w = 0; w < words.length; w++) {
      var codes = words[w].trim().split(/\\s+/);
      var word = '';
      for (var c = 0; c < codes.length; c++) {
        word += MORSE_TO_CHAR[codes[c]] || '';
      }
      result.push(word);
    }
    return result.join(' ');
  }

  // ===== GAME ENGINE =====
  function gameEngine() {
    return {
      xp: 0, level: 1, streak: 0, combo: 1, correct: 0, wrong: 0,
      xpForLevel: function(lvl) { return lvl * 100; },
      addXp: function(base, area) {
        var earned = base * this.combo;
        this.xp += earned;
        while (this.xp >= this.xpForLevel(this.level)) {
          this.xp -= this.xpForLevel(this.level);
          this.level++;
        }
        var el = document.createElement('div');
        el.className = 'float-xp';
        el.textContent = '+' + earned + ' XP';
        if (area) { area.appendChild(el); setTimeout(function() { el.remove(); }, 900); }
        return earned;
      },
      onCorrect: function() { this.correct++; this.streak++; this.combo = Math.min(5, 1 + Math.floor(this.streak / 3)); },
      onWrong: function() { this.wrong++; this.streak = 0; this.combo = 1; },
      streakText: function() {
        if (this.streak >= 50) return '\uD83C\uDFC6 50 seri!';
        if (this.streak >= 20) return '\uD83D\uDC8E UNSTOPPABLE!';
        if (this.streak >= 10) return '\u26A1 YANGIN!';
        if (this.streak >= 5) return '\uD83D\uDD25 Harika seri!';
        if (this.streak >= 3) return 'Iyi gidiyor!';
        return '';
      },
      streakClass: function() { return this.streak >= 10 ? 'fire' : this.streak >= 3 ? 'hot' : ''; },
      update: function(xpEl, streakEl, comboEl, okEl, noEl, barEl, labelEl, badgeEl) {
        if (xpEl) { xpEl.textContent = this.xp; xpEl.classList.remove('xp-pop'); void xpEl.offsetWidth; xpEl.classList.add('xp-pop'); }
        if (streakEl) streakEl.textContent = this.streak;
        if (comboEl) { comboEl.textContent = 'x' + this.combo; if (this.combo > 1) { comboEl.classList.remove('combo-flash'); void comboEl.offsetWidth; comboEl.classList.add('combo-flash'); } }
        if (okEl) okEl.textContent = this.correct;
        if (noEl) noEl.textContent = this.wrong;
        if (barEl) barEl.style.width = Math.min(100, (this.xp / this.xpForLevel(this.level)) * 100) + '%';
        if (labelEl) labelEl.textContent = 'Seviye ' + this.level + ' - ' + this.xp + '/' + this.xpForLevel(this.level) + ' XP';
        if (badgeEl) {
          var txt = this.streakText();
          var cls = this.streakClass();
          badgeEl.innerHTML = txt ? '<span class="streak-badge ' + cls + '">' + txt + '</span>' : '';
        }
      }
    };
  }

  // ===== PICK WRONG OPTIONS =====
  function pickWrongOptions(correctChar, pool, count) {
    var options = [];
    var available = [];
    for (var i = 0; i < pool.length; i++) {
      if (pool[i] !== correctChar) available.push(pool[i]);
    }
    for (var j = available.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = available[j]; available[j] = available[k]; available[k] = tmp;
    }
    for (var n = 0; n < count && n < available.length; n++) {
      options.push(available[n]);
    }
    return options;
  }

  // ===== SHUFFLE =====
  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // ===== WEIGHTED RANDOM =====
  function pickWeightedRandom(chars, streaks) {
    if (chars.length === 0) return 'E';
    var weights = [];
    var totalWeight = 0;
    for (var i = 0; i < chars.length; i++) {
      var streak = (streaks && streaks[chars[i]]) || 0;
      var w = Math.max(1, 10 - streak * 2);
      weights.push(w);
      totalWeight += w;
    }
    var r = Math.random() * totalWeight;
    var acc = 0;
    for (var j = 0; j < chars.length; j++) {
      acc += weights[j];
      if (r <= acc) return chars[j];
    }
    return chars[chars.length - 1];
  }

  // ===== GET CHARS FOR LEVEL =====
  function getCharsForLevel(charLevel, mode, customChars) {
    if (mode === 'custom' && customChars && customChars.length > 0) {
      return customChars.slice();
    }
    var chars = [];
    for (var i = 0; i <= charLevel && i < LEVELS.length; i++) {
      chars = chars.concat(LEVELS[i]);
    }
    return chars;
  }

  // ===== ALL CHARS FLAT =====
  var ALL_CHARS = [];
  for (var li = 0; li < LEVELS.length; li++) {
    for (var ci = 0; ci < LEVELS[li].length; ci++) {
      ALL_CHARS.push(LEVELS[li][ci]);
    }
  }

  // ===== LEADERBOARD RENDERER =====
  function renderLeaderboard(tableEl, statsGridEl, mod) {
    fetch('/api/morse/leaderboard?mod=' + mod).then(function(r){return r.json()}).then(function(d) {
      if (!d.leaderboard || !d.leaderboard.length) {
        tableEl.innerHTML = '<tr><td style="text-align:center;color:var(--t3);padding:12px">Henuz skor yok</td></tr>';
        if (statsGridEl) statsGridEl.innerHTML = '';
        return;
      }
      var totalPlays = d.leaderboard.length;
      var topScore = d.leaderboard[0].puan;
      if (statsGridEl) {
        statsGridEl.innerHTML =
          '<div class="stat-card"><div class="sv">' + totalPlays + '</div><div class="sl">Toplam Oyuncu</div></div>' +
          '<div class="stat-card"><div class="sv" style="color:var(--y)">' + topScore + '</div><div class="sl">En Yuksek Skor</div></div>';
      }
      var html = '<tr><th>#</th><th>Oyuncu</th><th>High Score</th><th>Dogru</th><th>Hiz</th></tr>';
      var medals = ['\\uD83E\\uDD47','\\uD83E\\uDD48','\\uD83E\\uDD49'];
      for (var i = 0; i < Math.min(10, d.leaderboard.length); i++) {
        var s = d.leaderboard[i];
        var name = s.display_name || s.username || '?';
        html += '<tr><td class="lb-rank">' + (medals[i] || (i+1)) + '</td><td>' + name + '</td><td style="font-family:JetBrains Mono;font-weight:700;color:var(--y)">' + s.puan + '</td><td>' + s.dogru + '/' + (s.dogru+s.yanlis) + '</td><td>' + s.hiz + ' WPM</td></tr>';
      }
      tableEl.innerHTML = html;
    }).catch(function(){});
  }

  // ===== CREATE GAME OVER OVERLAY =====
  function showGameOver(opts) {
    var existing = document.querySelector('.game-over-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.className = 'game-over-overlay';

    var card = document.createElement('div');
    card.className = 'game-over-card';

    var title = document.createElement('div');
    title.className = 'go-title';
    title.textContent = 'OYUN BITTI';
    card.appendChild(title);

    var score = document.createElement('div');
    score.className = 'go-score';
    score.textContent = 'SKOR: ' + opts.score;
    card.appendChild(score);

    if (opts.isHighScore) {
      var hs = document.createElement('div');
      hs.className = 'go-highscore';
      hs.textContent = '\\uD83C\\uDFC6 YENI REKOR!';
      card.appendChild(hs);
    }

    var stats = document.createElement('div');
    stats.className = 'go-stats';
    stats.textContent = opts.statsText || '';
    card.appendChild(stats);

    var btn = document.createElement('button');
    btn.className = 'btn-p go-replay';
    btn.textContent = 'Tekrar Oyna';
    btn.addEventListener('click', function() {
      overlay.remove();
      if (opts.onReplay) opts.onReplay();
    });
    card.appendChild(btn);

    overlay.appendChild(card);
    document.body.appendChild(overlay);
    return overlay;
  }

  // ===== SAVE SESSION =====
  function saveSessionToServer(mod, hiz, puan, dogru, yanlis, sure) {
    if (dogru + yanlis === 0) return;
    fetch('/api/morse/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mod: mod, hiz: hiz, puan: puan, dogru: dogru, yanlis: yanlis, sure: sure })
    }).catch(function() {});
  }

  // ===== TAB SWITCHING =====
  var allTimerIds = [];
  var allIntervalIds = [];

  // Managed timers — all game timeouts/intervals go through these
  // so clearAllGameTimers() can kill everything on tab switch
  function gSetTimeout(fn, ms) { var id = setTimeout(fn, ms); allTimerIds.push(id); return id; }
  function gSetInterval(fn, ms) { var id = setInterval(fn, ms); allIntervalIds.push(id); return id; }

  function clearAllGameTimers() {
    for (var i = 0; i < allTimerIds.length; i++) clearTimeout(allTimerIds[i]);
    for (var j = 0; j < allIntervalIds.length; j++) clearInterval(allIntervalIds[j]);
    allTimerIds = [];
    allIntervalIds = [];
    killAudio();
  }

  var activePanelName = 'converter';

  var tabBtns = document.querySelectorAll('.morse-tab');
  var panels = document.querySelectorAll('.morse-panel');

  for (var ti = 0; ti < tabBtns.length; ti++) {
    (function(tab) {
      tab.addEventListener('click', function() {
        for (var j = 0; j < tabBtns.length; j++) tabBtns[j].classList.remove('active');
        for (var j = 0; j < panels.length; j++) panels[j].classList.remove('active');
        tab.classList.add('active');
        var tabName = tab.getAttribute('data-tab');
        document.getElementById('panel-' + tabName).classList.add('active');
        killAudio();
        clearAllGameTimers();
        var prev = activePanelName;
        activePanelName = tabName;

        // Tab-specific init
        if (tabName === 'quiz' && typeof quizInit === 'function') quizInit();
        if (tabName === 'words' && typeof wordsInit === 'function') wordsInit();
        if (tabName === 'race') { if (typeof raceLoadLb === 'function') raceLoadLb(); }
        if (tabName === 'survival') { if (typeof survLoadLb === 'function') survLoadLb(); }

        // Remove game over overlays
        var go = document.querySelector('.game-over-overlay');
        if (go) go.remove();
      });
    })(tabBtns[ti]);
  }

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) killAudio();
  });

  document.querySelectorAll('.nav-tab, a[href]').forEach(function(link) {
    link.addEventListener('click', function() {
      killAudio();
      clearAllGameTimers();
    });
  });


  // ========================================================================
  // TAB 1: CEVIRICI (Converter)
  // ========================================================================
  var convText = document.getElementById('convText');
  var convMorse = document.getElementById('convMorse');
  var convPlay = document.getElementById('convPlay');
  var convStop = document.getElementById('convStop');
  var convWpm = document.getElementById('convWpm');
  var convWpmVal = document.getElementById('convWpmVal');
  var visualMorse = document.getElementById('visualMorse');
  var convPlaying = null;

  convWpm.addEventListener('input', function() {
    convWpmVal.textContent = convWpm.value + ' WPM';
  });

  var convDir = null;
  convText.addEventListener('input', function() {
    if (convDir === 'morse') return;
    convDir = 'text';
    convMorse.value = textToMorse(convText.value);
    renderVisual(convMorse.value);
    convDir = null;
  });
  convMorse.addEventListener('input', function() {
    if (convDir === 'text') return;
    convDir = 'morse';
    convText.value = morseToText(convMorse.value);
    renderVisual(convMorse.value);
    convDir = null;
  });

  function renderVisual(morse) {
    var container = visualMorse;
    while (container.firstChild) container.removeChild(container.firstChild);
    var parts = morse.split(' ');
    for (var p = 0; p < parts.length; p++) {
      var part = parts[p];
      if (part === '/' || part === '') {
        var gap = document.createElement('div');
        gap.className = 'vm-word';
        container.appendChild(gap);
        continue;
      }
      for (var c = 0; c < part.length; c++) {
        var el = document.createElement('div');
        if (part[c] === '.') el.className = 'vm-dot';
        else if (part[c] === '-') el.className = 'vm-dash';
        else continue;
        container.appendChild(el);
      }
      var g = document.createElement('div');
      g.className = 'vm-gap';
      container.appendChild(g);
    }
  }

  convPlay.addEventListener('click', function() {
    ensureAudio();
    var morse = convMorse.value.trim();
    if (!morse) return;
    convPlay.style.display = 'none';
    convStop.style.display = '';
    renderVisual(morse);
    var elems = visualMorse.querySelectorAll('.vm-dot,.vm-dash');
    var elemIdx = 0;
    convPlaying = playMorseString(morse, parseInt(convWpm.value), function(s) {
      if ((s.type === 'dot' || s.type === 'dash') && elemIdx < elems.length) {
        var el = elems[elemIdx];
        el.classList.add('lit');
        (function(target, dur) {
          setTimeout(function() { target.classList.remove('lit'); }, (dur || 0.1) * 1000);
        })(el, s.dur);
        elemIdx++;
      }
    }, function() {
      stopConvPlay();
    });
  });

  convStop.addEventListener('click', stopConvPlay);

  function stopConvPlay() {
    if (convPlaying) { convPlaying.cancel(); convPlaying = null; }
    toneOff();
    convPlay.style.display = '';
    convStop.style.display = 'none';
  }


  // ========================================================================
  // TAB 2: ALFABE (Alphabet)
  // ========================================================================
  var alphaContainer = document.getElementById('alphaContainer');
  var alphaFlashToggle = document.getElementById('alphaFlashToggle');
  var alphaPlaying = null;

  var ALPHA_GROUPS = [
    { title: 'Kisa', chars: ['E','T','I','A','N','M'] },
    { title: 'Orta', chars: ['D','G','K','O','R','S','U','W'] },
    { title: 'Uzun', chars: ['B','C','F','H','J','L','P','Q','V','X','Y','Z'] },
    { title: 'Rakamlar', chars: ['0','1','2','3','4','5','6','7','8','9'] }
  ];

  function renderAlphabet() {
    while (alphaContainer.firstChild) alphaContainer.removeChild(alphaContainer.firstChild);
    var isFlash = alphaFlashToggle.checked;

    for (var gi = 0; gi < ALPHA_GROUPS.length; gi++) {
      var group = ALPHA_GROUPS[gi];
      var section = document.createElement('div');
      section.className = 'alpha-section';

      var title = document.createElement('div');
      title.className = 'alpha-section-title';
      title.textContent = group.title;
      section.appendChild(title);

      var grid = document.createElement('div');
      grid.className = 'alpha-grid';

      for (var ci = 0; ci < group.chars.length; ci++) {
        (function(ch) {
          var card = document.createElement('div');
          card.className = 'alpha-card';

          var letterDiv = document.createElement('div');
          letterDiv.className = 'letter';
          letterDiv.textContent = ch;
          card.appendChild(letterDiv);

          var morseDiv = document.createElement('div');
          morseDiv.className = 'morse';
          morseDiv.textContent = CHAR_TO_MORSE[ch];
          card.appendChild(morseDiv);

          card.addEventListener('click', function() {
            if (isFlash) {
              card.classList.toggle('flipped');
            }
            // Play sound
            ensureAudio();
            if (alphaPlaying) alphaPlaying.cancel();
            // Mark playing
            var allCards = alphaContainer.querySelectorAll('.alpha-card');
            for (var k = 0; k < allCards.length; k++) allCards[k].classList.remove('playing');
            card.classList.add('playing');
            alphaPlaying = playMorseString(CHAR_TO_MORSE[ch], 15, null, function() {
              card.classList.remove('playing');
              alphaPlaying = null;
            });
          });

          grid.appendChild(card);
        })(group.chars[ci]);
      }

      section.appendChild(grid);
      alphaContainer.appendChild(section);
    }
  }

  alphaFlashToggle.addEventListener('change', renderAlphabet);
  renderAlphabet();


  // ========================================================================
  // TAB 3: HARF BILMECE (Letter Quiz)
  // ========================================================================
  var qArea = document.getElementById('quizArea');
  var qCharDisplay = document.getElementById('qCharDisplay');
  var qHint = document.getElementById('qHint');
  var qOpts = document.getElementById('qOpts');
  var qFeedback = document.getElementById('qFeedback');
  var qResultIcon = document.getElementById('qResultIcon');
  var qLives = document.getElementById('qLives');
  var qCountdown = document.getElementById('qCountdown');
  var qWpm = document.getElementById('qWpm');
  var qWpmVal = document.getElementById('qWpmVal');
  var qAutoRepeat = document.getElementById('qAutoRepeat');
  var qCharset = document.getElementById('qCharset');
  var qXpEl = document.getElementById('qXp');
  var qStreakEl = document.getElementById('qStreak');
  var qComboEl = document.getElementById('qCombo');
  var qOkEl = document.getElementById('qOk');
  var qNoEl = document.getElementById('qNo');
  var qXpBar = document.getElementById('qXpBar');
  var qXpLabel = document.getElementById('qXpLabel');
  var qStreakBadge = document.getElementById('qStreakBadge');
  var qStatsGrid = document.getElementById('qStatsGrid');
  var qLeaderboard = document.getElementById('qLeaderboard');

  var qGame = gameEngine();

  var qState = {
    charLevel: LEVELS.length - 1,
    mode: 'level',
    customChars: [],
    streaks: {},
    currentChar: null,
    answered: false,
    playing: null,
    lives: 3,
    countdownTimer: null,
    countdownStart: 0,
    autoRepeatTimer: null,
    sessionStart: Date.now(),
    gameOver: false,
    totalCorrectForWpm: 0,
    highScore: 0
  };

  qWpm.addEventListener('input', function() {
    qWpmVal.textContent = qWpm.value + ' WPM';
  });

  function qUpdateGame() {
    qGame.update(qXpEl, qStreakEl, qComboEl, qOkEl, qNoEl, qXpBar, qXpLabel, qStreakBadge);
  }

  function qRenderLives() {
    var html = '';
    for (var i = 0; i < 3; i++) {
      html += '<span class="life' + (i >= qState.lives ? ' lost' : '') + '">\\u2764\\uFE0F</span>';
    }
    qLives.innerHTML = html;
  }

  function qGetChars() {
    return getCharsForLevel(qState.charLevel, qState.mode, qState.customChars);
  }

  function qRenderCharset() {
    var container = qCharset;
    while (container.firstChild) container.removeChild(container.firstChild);

    var titleDiv = document.createElement('div');
    titleDiv.className = 'train-charset-title';
    titleDiv.textContent = qState.mode === 'custom' ? 'Karakterlere tiklayarak sec (' + qState.customChars.length + ' secili)' : 'Karakter Seti';
    container.appendChild(titleDiv);

    var charsDiv = document.createElement('div');
    charsDiv.className = 'train-chars';

    for (var ai = 0; ai < ALL_CHARS.length; ai++) {
      (function(ch, groupIdx) {
        var isUnlocked = groupIdx <= qState.charLevel;
        var isCustomSelected = qState.customChars.indexOf(ch) !== -1;
        var badge = document.createElement('span');
        if (qState.mode === 'custom') {
          badge.className = 'train-char-badge' + (isCustomSelected ? ' selected' : '');
        } else {
          badge.className = 'train-char-badge' + (isUnlocked ? ' selected' : ' locked');
        }
        badge.textContent = ch + ' ' + CHAR_TO_MORSE[ch];
        badge.addEventListener('click', function() {
          if (qState.mode !== 'custom') {
            qState.mode = 'custom';
            qState.customChars = qGetChars();
            var lvlBtns = document.querySelectorAll('#qLevelBtns .train-lvl-btn');
            lvlBtns.forEach(function(b) { b.classList.remove('active'); });
            var customBtn = document.querySelector('#qLevelBtns [data-level="custom"]');
            if (customBtn) customBtn.classList.add('active');
          }
          var idx = qState.customChars.indexOf(ch);
          if (idx !== -1) qState.customChars.splice(idx, 1);
          else qState.customChars.push(ch);
          qRenderCharset();
          if (qState.customChars.length > 0 && !qState.gameOver) qNewRound();
        });
        charsDiv.appendChild(badge);
      })(ALL_CHARS[ai], (function(ch) {
        for (var g = 0; g < LEVELS.length; g++) {
          if (LEVELS[g].indexOf(ch) !== -1) return g;
        }
        return 0;
      })(ALL_CHARS[ai]));
    }
    container.appendChild(charsDiv);
  }

  // Level buttons
  var qLevelBtns = document.querySelectorAll('#qLevelBtns .train-lvl-btn');
  qLevelBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      qLevelBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var lvl = btn.getAttribute('data-level');
      if (lvl === 'custom') {
        qState.mode = 'custom';
        qState.customChars = [];
        qRenderCharset();
      } else {
        qState.mode = 'level';
        var numLvl = parseInt(lvl);
        qState.charLevel = numLvl >= LEVELS.length ? LEVELS.length - 1 : numLvl;
        qRenderCharset();
        if (!qState.gameOver) qNewRound();
      }
    });
  });

  function qClearTimers() {
    if (qState.countdownTimer) { clearInterval(qState.countdownTimer); qState.countdownTimer = null; }
    if (qState.autoRepeatTimer) { clearInterval(qState.autoRepeatTimer); qState.autoRepeatTimer = null; }
    if (qState.playing) { qState.playing.cancel(); qState.playing = null; }
    qArea.classList.remove('urgency-1','urgency-2','urgency-3','urgency-4');
  }

  function qPlayChar() {
    if (!qState.currentChar) return;
    ensureAudio();
    var morse = CHAR_TO_MORSE[qState.currentChar];
    if (qState.playing) qState.playing.cancel();
    qState.playing = playMorseString(morse, parseInt(qWpm.value), null, null);
  }

  function qStartCountdown() {
    qState.countdownStart = Date.now();
    qCountdown.style.width = '100%';
    qCountdown.className = 'countdown-fill';
    qState.countdownTimer = gSetInterval(function() {
      if (qState.answered) { clearInterval(qState.countdownTimer); return; }
      var elapsed = (Date.now() - qState.countdownStart) / 1000;
      var remaining = Math.max(0, 10 - elapsed);
      var pct = (remaining / 10) * 100;
      qCountdown.style.width = pct + '%';

      // Color
      qCountdown.classList.remove('warn','danger');
      if (remaining < 3) qCountdown.classList.add('danger');
      else if (remaining < 6) qCountdown.classList.add('warn');

      // Urgency bg
      qArea.classList.remove('urgency-1','urgency-2','urgency-3','urgency-4');
      if (remaining < 2) qArea.classList.add('urgency-4');
      else if (remaining < 4) qArea.classList.add('urgency-3');
      else if (remaining < 6) qArea.classList.add('urgency-2');
      else if (remaining < 8) qArea.classList.add('urgency-1');

      if (remaining <= 0) {
        // Time up
        clearInterval(qState.countdownTimer);
        qState.countdownTimer = null;
        qTimeUp();
      }
    }, 100);
  }

  function qTimeUp() {
    if (qState.answered) return;
    qState.answered = true;
    qState.lives--;
    qRenderLives();
    qGame.onWrong();
    var ch = qState.currentChar;
    qCharDisplay.textContent = ch;
    qHint.textContent = CHAR_TO_MORSE[ch];
    qResultIcon.textContent = '\\u23F0';
    qResultIcon.style.color = 'var(--r)';
    qFeedback.textContent = 'Sure doldu! Dogru: ' + ch + ' = ' + CHAR_TO_MORSE[ch];
    qFeedback.style.color = 'var(--r)';
    qArea.classList.add('train-anim-wrong');
    // Disable opts
    var btns = qOpts.querySelectorAll('.quiz-opt');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.add('disabled');
      if (btns[i].textContent.trim() === ch) btns[i].classList.add('reveal');
    }
    qUpdateGame();
    qSaveProgress();

    gSetTimeout(function() {
      playMorseString(CHAR_TO_MORSE[ch], parseInt(qWpm.value), null, null);
    }, 400);

    if (qState.lives <= 0) {
      gSetTimeout(qGameOver, 1500);
    } else {
      gSetTimeout(qNewRound, 2000);
    }
  }

  function qStartAutoRepeat() {
    if (!qAutoRepeat.checked) return;
    qState.autoRepeatTimer = gSetInterval(function() {
      if (qState.answered) { clearInterval(qState.autoRepeatTimer); return; }
      qPlayChar();
    }, 4000);
  }

  function qBuildOptions(correctChar) {
    var pool = qGetChars();
    if (pool.length < 4) {
      pool = ALL_CHARS.slice();
    }
    var wrongs = pickWrongOptions(correctChar, pool, 3);
    var opts = shuffleArray([correctChar].concat(wrongs));
    return opts;
  }

  function qRenderOptions(opts) {
    while (qOpts.firstChild) qOpts.removeChild(qOpts.firstChild);
    for (var i = 0; i < opts.length; i++) {
      (function(ch, idx) {
        var btn = document.createElement('button');
        btn.className = 'quiz-opt';
        var numSpan = document.createElement('span');
        numSpan.className = 'quiz-opt-num';
        numSpan.textContent = (idx + 1);
        btn.appendChild(numSpan);
        btn.appendChild(document.createTextNode(ch));
        btn.addEventListener('click', function() {
          qAnswer(ch, btn);
        });
        qOpts.appendChild(btn);
      })(opts[i], i);
    }
  }

  function qAnswer(selected, btnEl) {
    if (qState.answered || qState.gameOver) return;
    qState.answered = true;
    qClearTimers();
    var ch = qState.currentChar;
    qCharDisplay.textContent = ch;
    qHint.textContent = CHAR_TO_MORSE[ch];

    qArea.classList.remove('train-anim-correct','train-anim-wrong');
    void qArea.offsetWidth;

    var elapsed = Date.now() - qState.countdownStart;
    var timeBonus = elapsed < 1500 ? 8 : elapsed < 3000 ? 4 : elapsed < 5000 ? 1 : 0;

    // Mark all btns
    var btns = qOpts.querySelectorAll('.quiz-opt');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.add('disabled');
      var btnChar = btns[i].textContent.trim().replace(/^\\d/, '');
      if (btns[i].childNodes.length > 1) {
        // Get text after the number span
        btnChar = '';
        for (var cn = 0; cn < btns[i].childNodes.length; cn++) {
          if (btns[i].childNodes[cn].nodeType === 3) btnChar += btns[i].childNodes[cn].textContent.trim();
        }
      }
      if (btnChar === ch) btns[i].classList.add('reveal');
    }

    if (selected === ch) {
      // CORRECT
      btnEl.classList.add('correct');
      qGame.onCorrect();
      qState.totalCorrectForWpm++;
      // WPM increase every 5 correct
      if (qState.totalCorrectForWpm % 5 === 0) {
        var curWpm = parseInt(qWpm.value);
        if (curWpm < 30) {
          qWpm.value = curWpm + 1;
          qWpmVal.textContent = (curWpm + 1) + ' WPM';
        }
      }
      var baseXp = 10 + timeBonus;
      qGame.addXp(baseXp, qArea);
      qResultIcon.textContent = '\\u2714';
      qResultIcon.style.color = 'var(--g)';

      var comboNames = {2:' COMBO!',3:' YANGIN!',4:' MUHTESEM!',5:' EFSANE!'};
      var msg = '\\uD83C\\uDFAF Dogru!';
      if (timeBonus >= 8) msg = '\\u26A1 Yildirim hizi!';
      else if (timeBonus >= 4) msg = '\\uD83C\\uDFC3 Iyi tempo!';
      msg += ' +' + (baseXp * qGame.combo) + ' XP';
      if (qGame.combo > 1) msg += ' x' + qGame.combo + (comboNames[qGame.combo] || '!');
      if (qGame.streak === 5) msg += ' \\uD83D\\uDD25 5 seri!';
      else if (qGame.streak === 10) msg += ' \\u26A1 10 seri!';
      else if (qGame.streak === 20) msg += ' \\uD83D\\uDC8E 20 seri!';
      else if (qGame.streak === 50) msg += ' \\uD83C\\uDFC6 50 seri!';

      qFeedback.textContent = msg;
      qFeedback.style.color = 'var(--g)';
      qArea.classList.add('train-anim-correct');
      if (!qState.streaks[ch]) qState.streaks[ch] = 0;
      qState.streaks[ch]++;

      qUpdateGame();
      qSaveProgress();
      gSetTimeout(qNewRound, 1000);
    } else {
      // WRONG
      btnEl.classList.add('wrong');
      qState.lives--;
      qRenderLives();
      qGame.onWrong();
      qState.streaks[ch] = 0;
      qResultIcon.textContent = '\\u2718';
      qResultIcon.style.color = 'var(--r)';
      qFeedback.textContent = '\\uD83D\\uDCA5 Yanlis! Dogru: ' + ch + ' = ' + CHAR_TO_MORSE[ch];
      qFeedback.style.color = 'var(--r)';
      qArea.classList.add('train-anim-wrong');

      qUpdateGame();
      qSaveProgress();

      gSetTimeout(function() {
        playMorseString(CHAR_TO_MORSE[ch], parseInt(qWpm.value), null, null);
      }, 500);

      if (qState.lives <= 0) {
        gSetTimeout(qGameOver, 1500);
      } else {
        gSetTimeout(qNewRound, 2000);
      }
    }
  }

  function qNewRound() {
    if (qState.gameOver) return;
    qClearTimers();
    var chars = qGetChars();
    if (chars.length === 0) chars = ALL_CHARS.slice();
    qState.currentChar = pickWeightedRandom(chars, qState.streaks);
    qState.answered = false;
    qCharDisplay.textContent = '?';
    qHint.textContent = '';
    qResultIcon.textContent = '';
    qFeedback.textContent = '';
    qArea.classList.remove('train-anim-correct','train-anim-wrong','urgency-1','urgency-2','urgency-3','urgency-4');

    var opts = qBuildOptions(qState.currentChar);
    qRenderOptions(opts);
    qPlayChar();
    qStartCountdown();
    qStartAutoRepeat();
  }

  function qGameOver() {
    qState.gameOver = true;
    qClearTimers();
    killAudio();
    var totalScore = qGame.xp + (qGame.level - 1) * 100;
    var dur = Math.floor((Date.now() - qState.sessionStart) / 1000);
    var isHigh = totalScore > qState.highScore;
    if (isHigh) qState.highScore = totalScore;

    saveSessionToServer('egitim', parseInt(qWpm.value), totalScore, qGame.correct, qGame.wrong, dur);

    showGameOver({
      score: totalScore,
      isHighScore: isHigh,
      statsText: 'Dogru: ' + qGame.correct + ' | Yanlis: ' + qGame.wrong + ' | Seri: ' + qGame.streak + ' | Sure: ' + dur + 'sn',
      onReplay: function() {
        qResetGame();
      }
    });
  }

  function qResetGame() {
    qClearTimers();
    qGame.xp = 0; qGame.level = 1; qGame.streak = 0; qGame.combo = 1; qGame.correct = 0; qGame.wrong = 0;
    qState.lives = 3;
    qState.gameOver = false;
    qState.streaks = {};
    qState.currentChar = null;
    qState.answered = false;
    qState.sessionStart = Date.now();
    qState.totalCorrectForWpm = 0;
    qRenderLives();
    qUpdateGame();
    qRenderCharset();
    qNewRound();
  }

  function qSaveProgress() {
    fetch('/api/morse/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: qState.charLevel,
        correct: qGame.correct,
        wrong: qGame.wrong,
        streaks: qState.streaks
      })
    }).catch(function() {});
  }

  function qLoadStats() {
    fetch('/api/morse/progress').then(function(r){return r.json()}).then(function(d) {
      if (!d.progress || !d.progress.length) return;
      var totalOk = 0, totalNo = 0, best = null, worst = null;
      for (var i = 0; i < d.progress.length; i++) {
        var p = d.progress[i];
        totalOk += p.dogru;
        totalNo += p.yanlis;
        var rate = p.dogru / Math.max(1, p.dogru + p.yanlis);
        if (!best || rate > best.rate) best = {ch: p.karakter, rate: rate};
        if (!worst || rate < worst.rate) worst = {ch: p.karakter, rate: rate};
      }
      var accuracy = totalOk + totalNo > 0 ? Math.round(totalOk / (totalOk + totalNo) * 100) : 0;
      qStatsGrid.innerHTML =
        '<div class="stat-card"><div class="sv">' + (totalOk+totalNo) + '</div><div class="sl">Toplam Cevap</div></div>' +
        '<div class="stat-card"><div class="sv" style="color:var(--g)">' + accuracy + '%</div><div class="sl">Isabetlilik</div></div>' +
        '<div class="stat-card"><div class="sv" style="color:var(--g)">' + (best ? best.ch : '-') + '</div><div class="sl">En Guclu</div></div>' +
        '<div class="stat-card"><div class="sv" style="color:var(--r)">' + (worst ? worst.ch : '-') + '</div><div class="sl">En Zayif</div></div>';
    }).catch(function(){});
    renderLeaderboard(qLeaderboard, null, 'egitim');
  }

  // Global keyboard for quiz: press 1/2/3/4
  document.addEventListener('keydown', function(ev) {
    if (activePanelName !== 'quiz' || qState.answered || qState.gameOver) return;
    var num = parseInt(ev.key);
    if (num >= 1 && num <= 4) {
      ev.preventDefault();
      var btns = qOpts.querySelectorAll('.quiz-opt');
      if (btns[num - 1]) btns[num - 1].click();
    }
  });

  function quizInit() {
    if (!qState.currentChar && !qState.gameOver) {
      qRenderLives();
      qNewRound();
    }
    qLoadStats();
  }

  qRenderCharset();
  qRenderLives();

  window.addEventListener('beforeunload', function() {
    if (qGame.correct + qGame.wrong > 0 && !qState.gameOver) {
      saveSessionToServer('egitim', parseInt(qWpm.value), qGame.xp + (qGame.level - 1) * 100, qGame.correct, qGame.wrong, Math.floor((Date.now() - qState.sessionStart) / 1000));
    }
  });


  // ========================================================================
  // TAB 4: HIZ YARISI (Speed Race)
  // ========================================================================
  var racePre = document.getElementById('racePre');
  var raceGameEl = document.getElementById('raceGame');
  var raceTimer = document.getElementById('raceTimer');
  var raceScore = document.getElementById('raceScore');
  var raceCombo = document.getElementById('raceCombo');
  var raceCharDisplay = document.getElementById('raceCharDisplay');
  var raceHint = document.getElementById('raceHint');
  var raceOpts = document.getElementById('raceOpts');
  var raceWpmPre = document.getElementById('raceWpmPre');
  var raceWpmPreVal = document.getElementById('raceWpmPreVal');
  var raceStartBtn = document.getElementById('raceStartBtn');
  var raceStatsGrid = document.getElementById('raceStatsGrid');
  var raceLeaderboardEl = document.getElementById('raceLeaderboard');

  raceWpmPre.addEventListener('input', function() {
    raceWpmPreVal.textContent = raceWpmPre.value + ' WPM';
  });

  var raceState = {
    active: false,
    score: 0,
    combo: 1,
    streak: 0,
    correct: 0,
    wrong: 0,
    currentChar: null,
    answered: false,
    playing: null,
    timerInterval: null,
    startTime: 0,
    wpm: 15,
    highScore: 0
  };

  function raceStart() {
    raceState.active = true;
    raceState.score = 0;
    raceState.combo = 1;
    raceState.streak = 0;
    raceState.correct = 0;
    raceState.wrong = 0;
    raceState.wpm = parseInt(raceWpmPre.value);
    raceState.startTime = Date.now();
    racePre.style.display = 'none';
    raceGameEl.style.display = 'block';
    raceScore.textContent = '0';
    raceCombo.textContent = 'x1';
    raceTimer.className = 'race-timer';
    raceNewQuestion();
    raceState.timerInterval = gSetInterval(function() {
      var remaining = Math.max(0, 30 - (Date.now() - raceState.startTime) / 1000);
      raceTimer.textContent = Math.ceil(remaining);
      if (remaining < 5) raceTimer.classList.add('ending');
      else raceTimer.classList.remove('ending');
      if (remaining <= 0) {
        clearInterval(raceState.timerInterval);
        raceState.timerInterval = null;
        raceEnd();
      }
    }, 100);
  }

  function raceNewQuestion() {
    if (!raceState.active) return;
    raceState.answered = false;
    raceState.currentChar = ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
    raceCharDisplay.textContent = '?';
    raceHint.textContent = '';
    // Build options
    var opts = shuffleArray([raceState.currentChar].concat(pickWrongOptions(raceState.currentChar, ALL_CHARS, 3)));
    raceRenderOpts(opts);
    // Play morse
    ensureAudio();
    if (raceState.playing) raceState.playing.cancel();
    raceState.playing = playMorseString(CHAR_TO_MORSE[raceState.currentChar], raceState.wpm, null, null);
  }

  function raceRenderOpts(opts) {
    while (raceOpts.firstChild) raceOpts.removeChild(raceOpts.firstChild);
    for (var i = 0; i < opts.length; i++) {
      (function(ch, idx) {
        var btn = document.createElement('button');
        btn.className = 'quiz-opt';
        var numSpan = document.createElement('span');
        numSpan.className = 'quiz-opt-num';
        numSpan.textContent = (idx + 1);
        btn.appendChild(numSpan);
        btn.appendChild(document.createTextNode(ch));
        btn.addEventListener('click', function() { raceAnswer(ch, btn); });
        raceOpts.appendChild(btn);
      })(opts[i], i);
    }
  }

  function raceAnswer(selected, btnEl) {
    if (raceState.answered || !raceState.active) return;
    raceState.answered = true;
    var ch = raceState.currentChar;

    if (selected === ch) {
      btnEl.classList.add('correct');
      raceState.correct++;
      raceState.streak++;
      raceState.combo = Math.min(5, 1 + Math.floor(raceState.streak / 3));
      raceState.score += raceState.combo;
      raceScore.textContent = raceState.score;
      raceCombo.textContent = 'x' + raceState.combo;
      raceCharDisplay.textContent = ch;
      // Next question immediately
      gSetTimeout(raceNewQuestion, 200);
    } else {
      btnEl.classList.add('wrong');
      raceState.wrong++;
      raceState.streak = 0;
      raceState.combo = 1;
      raceCombo.textContent = 'x1';
      raceCharDisplay.textContent = ch;
      raceHint.textContent = CHAR_TO_MORSE[ch];
      // Show correct
      var btns = raceOpts.querySelectorAll('.quiz-opt');
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.add('disabled');
        var txt = '';
        for (var cn = 0; cn < btns[i].childNodes.length; cn++) {
          if (btns[i].childNodes[cn].nodeType === 3) txt += btns[i].childNodes[cn].textContent.trim();
        }
        if (txt === ch) btns[i].classList.add('reveal');
      }
      // Skip to next after short delay
      gSetTimeout(raceNewQuestion, 800);
    }
  }

  function raceEnd() {
    raceState.active = false;
    killAudio();
    if (raceState.playing) { raceState.playing.cancel(); raceState.playing = null; }
    var dur = 30;
    var isHigh = raceState.score > raceState.highScore;
    if (isHigh) raceState.highScore = raceState.score;

    saveSessionToServer('hiz', raceState.wpm, raceState.score, raceState.correct, raceState.wrong, dur);

    showGameOver({
      score: raceState.score,
      isHighScore: isHigh,
      statsText: 'Dogru: ' + raceState.correct + ' | Yanlis: ' + raceState.wrong + ' | Combo: x' + raceState.combo + ' | Hiz: ' + raceState.wpm + ' WPM',
      onReplay: function() {
        raceStart();
      }
    });
    raceLoadLb();
  }

  raceStartBtn.addEventListener('click', raceStart);

  // Keyboard for race: 1/2/3/4
  document.addEventListener('keydown', function(ev) {
    if (activePanelName !== 'race' || raceState.answered || !raceState.active) return;
    var num = parseInt(ev.key);
    if (num >= 1 && num <= 4) {
      ev.preventDefault();
      var btns = raceOpts.querySelectorAll('.quiz-opt');
      if (btns[num - 1]) btns[num - 1].click();
    }
  });

  function raceLoadLb() {
    renderLeaderboard(raceLeaderboardEl, raceStatsGrid, 'hiz');
  }

  // Reset race UI when tab switches away
  function raceReset() {
    if (raceState.timerInterval) { clearInterval(raceState.timerInterval); raceState.timerInterval = null; }
    raceState.active = false;
    racePre.style.display = '';
    raceGameEl.style.display = 'none';
  }


  // ========================================================================
  // TAB 5: HAYATTA KAL (Survival)
  // ========================================================================
  var survPre = document.getElementById('survPre');
  var survGameEl = document.getElementById('survGame');
  var survTimer = document.getElementById('survTimer');
  var survTimeFill = document.getElementById('survTimeFill');
  var survScore = document.getElementById('survScore');
  var survCombo = document.getElementById('survCombo');
  var survCharDisplay = document.getElementById('survCharDisplay');
  var survHint = document.getElementById('survHint');
  var survOpts = document.getElementById('survOpts');
  var survWpmPre = document.getElementById('survWpmPre');
  var survWpmPreVal = document.getElementById('survWpmPreVal');
  var survWpmDisplay = document.getElementById('survWpmDisplay');
  var survStartBtn = document.getElementById('survStartBtn');
  var survStatsGrid = document.getElementById('survStatsGrid');
  var survLeaderboardEl = document.getElementById('survLeaderboard');

  survWpmPre.addEventListener('input', function() {
    survWpmPreVal.textContent = survWpmPre.value + ' WPM';
  });

  var survState = {
    active: false,
    timeRemaining: 15.0,
    score: 0,
    combo: 1,
    streak: 0,
    correct: 0,
    wrong: 0,
    currentChar: null,
    answered: false,
    playing: null,
    tickInterval: null,
    wpm: 12,
    startTime: 0,
    totalCorrectForWpm: 0,
    highScore: 0
  };

  function survStart() {
    survState.active = true;
    survState.timeRemaining = 15.0;
    survState.score = 0;
    survState.combo = 1;
    survState.streak = 0;
    survState.correct = 0;
    survState.wrong = 0;
    survState.wpm = parseInt(survWpmPre.value);
    survState.startTime = Date.now();
    survState.totalCorrectForWpm = 0;
    survPre.style.display = 'none';
    survGameEl.style.display = 'block';
    survScore.textContent = '0';
    survCombo.textContent = 'x1';
    survWpmDisplay.textContent = survState.wpm;
    survNewQuestion();

    survState.tickInterval = gSetInterval(function() {
      survState.timeRemaining -= 0.1;
      if (survState.timeRemaining < 0) survState.timeRemaining = 0;
      survTimer.textContent = survState.timeRemaining.toFixed(1);

      // Color
      survTimer.classList.remove('warn','danger');
      survTimeFill.classList.remove('warn','danger');
      if (survState.timeRemaining < 5) {
        survTimer.classList.add('danger');
        survTimeFill.classList.add('danger');
      } else if (survState.timeRemaining < 10) {
        survTimer.classList.add('warn');
        survTimeFill.classList.add('warn');
      }

      // Bar
      var pct = Math.min(100, (survState.timeRemaining / 15) * 100);
      survTimeFill.style.width = pct + '%';

      if (survState.timeRemaining <= 0) {
        clearInterval(survState.tickInterval);
        survState.tickInterval = null;
        survEnd();
      }
    }, 100);
  }

  function survNewQuestion() {
    if (!survState.active) return;
    survState.answered = false;
    survState.currentChar = ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
    survCharDisplay.textContent = '?';
    survHint.textContent = '';
    var opts = shuffleArray([survState.currentChar].concat(pickWrongOptions(survState.currentChar, ALL_CHARS, 3)));
    survRenderOpts(opts);
    ensureAudio();
    if (survState.playing) survState.playing.cancel();
    survState.playing = playMorseString(CHAR_TO_MORSE[survState.currentChar], survState.wpm, null, null);
  }

  function survRenderOpts(opts) {
    while (survOpts.firstChild) survOpts.removeChild(survOpts.firstChild);
    for (var i = 0; i < opts.length; i++) {
      (function(ch, idx) {
        var btn = document.createElement('button');
        btn.className = 'quiz-opt';
        var numSpan = document.createElement('span');
        numSpan.className = 'quiz-opt-num';
        numSpan.textContent = (idx + 1);
        btn.appendChild(numSpan);
        btn.appendChild(document.createTextNode(ch));
        btn.addEventListener('click', function() { survAnswer(ch, btn); });
        survOpts.appendChild(btn);
      })(opts[i], i);
    }
  }

  function survAnswer(selected, btnEl) {
    if (survState.answered || !survState.active) return;
    survState.answered = true;
    var ch = survState.currentChar;

    if (selected === ch) {
      btnEl.classList.add('correct');
      survState.correct++;
      survState.streak++;
      survState.combo = Math.min(5, 1 + Math.floor(survState.streak / 3));
      survState.score += survState.combo;
      survState.timeRemaining += 3;
      survState.totalCorrectForWpm++;
      // WPM increase every 10 correct
      if (survState.totalCorrectForWpm % 10 === 0) {
        survState.wpm = Math.min(30, survState.wpm + 1);
        survWpmDisplay.textContent = survState.wpm;
      }
      survScore.textContent = survState.score;
      survCombo.textContent = 'x' + survState.combo;
      survCharDisplay.textContent = ch;
      gSetTimeout(survNewQuestion, 200);
    } else {
      btnEl.classList.add('wrong');
      survState.wrong++;
      survState.streak = 0;
      survState.combo = 1;
      survState.timeRemaining -= 5;
      if (survState.timeRemaining < 0) survState.timeRemaining = 0;
      survCombo.textContent = 'x1';
      survCharDisplay.textContent = ch;
      survHint.textContent = CHAR_TO_MORSE[ch];
      var btns = survOpts.querySelectorAll('.quiz-opt');
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.add('disabled');
        var txt = '';
        for (var cn = 0; cn < btns[i].childNodes.length; cn++) {
          if (btns[i].childNodes[cn].nodeType === 3) txt += btns[i].childNodes[cn].textContent.trim();
        }
        if (txt === ch) btns[i].classList.add('reveal');
      }
      if (survState.timeRemaining <= 0) {
        clearInterval(survState.tickInterval);
        survState.tickInterval = null;
        gSetTimeout(survEnd, 500);
      } else {
        gSetTimeout(survNewQuestion, 800);
      }
    }
  }

  function survEnd() {
    survState.active = false;
    killAudio();
    if (survState.playing) { survState.playing.cancel(); survState.playing = null; }
    var dur = Math.floor((Date.now() - survState.startTime) / 1000);
    var finalScore = Math.floor(survState.score * (dur / 10));
    var isHigh = finalScore > survState.highScore;
    if (isHigh) survState.highScore = finalScore;

    saveSessionToServer('hayatta_kal', survState.wpm, finalScore, survState.correct, survState.wrong, dur);

    showGameOver({
      score: finalScore,
      isHighScore: isHigh,
      statsText: 'Dogru: ' + survState.correct + ' | Yanlis: ' + survState.wrong + ' | Ham: ' + survState.score + ' | Sure: ' + dur + 'sn',
      onReplay: function() {
        survStart();
      }
    });
    survLoadLb();
  }

  survStartBtn.addEventListener('click', survStart);

  // Keyboard for survival: 1/2/3/4
  document.addEventListener('keydown', function(ev) {
    if (activePanelName !== 'survival' || survState.answered || !survState.active) return;
    var num = parseInt(ev.key);
    if (num >= 1 && num <= 4) {
      ev.preventDefault();
      var btns = survOpts.querySelectorAll('.quiz-opt');
      if (btns[num - 1]) btns[num - 1].click();
    }
  });

  function survLoadLb() {
    renderLeaderboard(survLeaderboardEl, survStatsGrid, 'hayatta_kal');
  }

  function survReset() {
    if (survState.tickInterval) { clearInterval(survState.tickInterval); survState.tickInterval = null; }
    survState.active = false;
    survPre.style.display = '';
    survGameEl.style.display = 'none';
  }


  // ========================================================================
  // TAB 6: KELIME MODU (Word Mode)
  // ========================================================================
  var wordDisplay = document.getElementById('wordDisplay');
  var wordMorse = document.getElementById('wordMorse');
  var wordInput = document.getElementById('wordInput');
  var wordFeedback = document.getElementById('wordFeedback');
  var wordOkEl = document.getElementById('wordOk');
  var wordNoEl = document.getElementById('wordNo');
  var wordResultIcon = document.getElementById('wordResultIcon');
  var wordPlayBtn = document.getElementById('wordPlay');
  var wordNextBtn = document.getElementById('wordNext');
  var wordNewBtn = document.getElementById('wordNewWords');
  var wordHintBtn = document.getElementById('wordHintBtn');
  var wordHintBox = document.getElementById('wordHintBox');
  var wordWpm = document.getElementById('wordWpm');
  var wordWpmVal = document.getElementById('wordWpmVal');
  var wordLoading = document.getElementById('wordLoading');
  var wordArea = document.getElementById('wordArea');

  var wordGame = gameEngine();
  var wordXpEl = document.getElementById('wordXp');
  var wordStreakElG = document.getElementById('wordStreak');
  var wordComboEl = document.getElementById('wordCombo');
  var wordXpBar = document.getElementById('wordXpBar');
  var wordXpLabel = document.getElementById('wordXpLabel');
  var wordStreakBadge = document.getElementById('wordStreakBadge');
  var wordStatsGrid = document.getElementById('wordStatsGrid');
  var wordLeaderboardEl = document.getElementById('wordLeaderboard');
  var wordAutoRepeat = document.getElementById('wordAutoRepeat');
  var wordResetBtn = document.getElementById('wordReset');

  function updateWordGame() {
    wordGame.update(wordXpEl, wordStreakElG, wordComboEl, wordOkEl, wordNoEl, wordXpBar, wordXpLabel, wordStreakBadge);
  }

  var wordState = {
    words: [],
    currentIndex: 0,
    currentWord: null,
    answered: false,
    playing: null,
    roundStart: 0,
    hintLevel: 0,
    urgencyTimer: null,
    autoRepeatTimer: null,
    sessionStart: Date.now()
  };

  var FALLBACK_WORDS = [
    'EL','AT','AL','OL','GEL','GIT','YAP','BUL','KAL','SOR',
    'SU','GOZ','YOL','GUN','BAS','SON','KIZ','CAN','YIL','BIR',
    'ANA','ARA','IKI','ALT','UST','DIS','BEN','SEN','BIZ','SIZ',
    'KOY','DAG','DEN','TAR','TOP','KAR','TAS','YER','KUS','BAL',
    'TELSIZ','RADYO','ANTEN','ROLE','MORS','SINYAL','FREKANS',
    'CAGRI','YAYIN','ALICI','VERICI','DALGA','BANT','KANAL'
  ];

  wordWpm.addEventListener('input', function() {
    wordWpmVal.textContent = wordWpm.value + ' WPM';
  });

  function clearWordTimers() {
    if (wordState.urgencyTimer) { clearInterval(wordState.urgencyTimer); wordState.urgencyTimer = null; }
    if (wordState.autoRepeatTimer) { clearInterval(wordState.autoRepeatTimer); wordState.autoRepeatTimer = null; }
    if (wordState.playing) { wordState.playing.cancel(); wordState.playing = null; }
    wordArea.classList.remove('urgency-1','urgency-2','urgency-3','urgency-4');
  }

  function startWordUrgency() {
    wordState.urgencyTimer = gSetInterval(function() {
      if (wordState.answered) { clearWordTimers(); return; }
      var elapsed = (Date.now() - wordState.roundStart) / 1000;
      wordArea.classList.remove('urgency-1','urgency-2','urgency-3','urgency-4');
      if (elapsed > 20) wordArea.classList.add('urgency-4');
      else if (elapsed > 14) wordArea.classList.add('urgency-3');
      else if (elapsed > 8) wordArea.classList.add('urgency-2');
      else if (elapsed > 4) wordArea.classList.add('urgency-1');
    }, 500);
  }

  function startWordAutoRepeat() {
    if (!wordAutoRepeat.checked) return;
    wordState.autoRepeatTimer = gSetInterval(function() {
      if (wordState.answered) { clearInterval(wordState.autoRepeatTimer); return; }
      wordPlayWord();
    }, 6000);
  }

  function fetchWords() {
    wordLoading.style.display = 'flex';
    wordDisplay.textContent = '';
    wordMorse.textContent = '';
    var abortCtrl = new AbortController();
    var fetchTimeout = setTimeout(function() { abortCtrl.abort(); }, 8000);
    fetch('/api/morse/words', { method: 'POST', signal: abortCtrl.signal })
      .then(function(r) { clearTimeout(fetchTimeout); return r.json(); })
      .then(function(data) {
        try {
          wordLoading.style.display = 'none';
          if (data.words && data.words.length > 0) {
            wordState.words = shuffleArray(data.words.map(function(w) { return w.toUpperCase().replace(/[^A-Z]/g, ''); }).filter(function(w) { return w.length >= 2; }));
          } else {
            wordState.words = shuffleArray(FALLBACK_WORDS.slice());
          }
          wordState.currentIndex = 0;
          wordNewRound();
        } catch(e) {
          wordLoading.style.display = 'none';
          wordState.words = shuffleArray(FALLBACK_WORDS.slice());
          wordState.currentIndex = 0;
          wordNewRound();
        }
      })
      .catch(function() {
        clearTimeout(fetchTimeout);
        wordLoading.style.display = 'none';
        wordState.words = shuffleArray(FALLBACK_WORDS.slice());
        wordState.currentIndex = 0;
        wordNewRound();
      });
  }

  function wordNewRound() {
    clearWordTimers();
    if (wordState.words.length === 0) { fetchWords(); return; }
    if (wordState.currentIndex >= wordState.words.length) { fetchWords(); return; }
    wordState.currentWord = wordState.words[wordState.currentIndex];
    fetch('/api/morse/used-words', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({kelime:wordState.currentWord}) }).catch(function(){});
    wordState.currentIndex++;
    wordState.answered = false;
    wordState.roundStart = Date.now();
    wordState.hintLevel = 0;
    wordDisplay.textContent = '_ '.repeat(wordState.currentWord.length).trim();
    wordMorse.textContent = '';
    wordHintBox.textContent = wordState.currentWord.length + ' harf';
    wordResultIcon.textContent = '';
    wordFeedback.textContent = '';
    wordFeedback.style.color = '';
    wordInput.value = '';
    wordInput.disabled = false;
    wordInput.focus();
    wordPlayWord();
    startWordUrgency();
    startWordAutoRepeat();
  }

  function wordPlayWord() {
    if (!wordState.currentWord) return;
    ensureAudio();
    var morse = textToMorse(wordState.currentWord);
    if (wordState.playing) wordState.playing.cancel();
    wordState.playing = playMorseString(morse, parseInt(wordWpm.value), null, null);
  }

  wordPlayBtn.addEventListener('click', wordPlayWord);
  wordNextBtn.addEventListener('click', wordNewRound);
  wordNewBtn.addEventListener('click', fetchWords);

  wordHintBtn.addEventListener('click', function() {
    if (wordState.answered || !wordState.currentWord) return;
    var word = wordState.currentWord;
    wordState.hintLevel++;
    if (wordState.hintLevel === 1) {
      wordHintBox.textContent = word[0] + ' _ '.repeat(word.length - 1).trim() + ' (' + word.length + ' harf)';
    } else if (wordState.hintLevel === 2) {
      var h = '';
      for (var i = 0; i < word.length; i++) h += (i === 0 || i === word.length - 1) ? word[i] : '_';
      wordHintBox.textContent = h.split('').join(' ');
    } else if (wordState.hintLevel === 3) {
      wordHintBox.textContent = textToMorse(word);
    } else {
      wordHintBox.textContent = word;
      wordState.hintLevel = 99;
    }
  });

  // Global keyboard for word mode
  document.addEventListener('keydown', function(ev) {
    if (activePanelName !== 'words') return;
    if (wordState.answered) return;
    if (document.activeElement !== wordInput) {
      if (ev.key.length === 1 && /[a-zA-Z]/.test(ev.key)) {
        wordInput.focus();
      } else if (ev.key === 'Enter') {
        checkWordAnswer();
        ev.preventDefault();
      }
    } else if (ev.key === 'Enter') {
      checkWordAnswer();
      ev.preventDefault();
    }
  });

  function checkWordAnswer() {
    if (wordState.answered) return;
    var val = wordInput.value.toUpperCase().replace(/[^A-Z]/g, '').trim();
    if (!val) return;
    wordState.answered = true;
    wordInput.disabled = true;
    clearWordTimers();
    var word = wordState.currentWord;
    wordDisplay.textContent = word;
    wordMorse.textContent = textToMorse(word);

    wordArea.classList.remove('train-anim-correct', 'train-anim-wrong');
    void wordArea.offsetWidth;

    var elapsed = Date.now() - wordState.roundStart;
    var timeBonus = elapsed < 5000 ? 10 : elapsed < 10000 ? 5 : 0;
    var lengthBonus = word.length * 3;

    if (val === word) {
      wordGame.onCorrect();
      var baseXp = 15 + timeBonus + lengthBonus;
      if (wordState.hintLevel > 0) {
        baseXp = Math.max(1, Math.floor(baseXp / (wordState.hintLevel * 3)));
        wordGame.streak = 0;
        wordGame.combo = 1;
      }
      wordGame.addXp(baseXp, wordArea);
      wordResultIcon.textContent = '\\u2714';
      wordResultIcon.style.color = 'var(--g)';
      var msg = '\\uD83C\\uDF89 Dogru! +' + (baseXp * (wordState.hintLevel > 0 ? 1 : wordGame.combo)) + ' XP';
      if (wordState.hintLevel > 0) msg += ' (ipucu cezasi)';
      else if (timeBonus > 0) msg += ' \\u26A1 hiz bonusu!';
      if (wordGame.combo > 1 && wordState.hintLevel === 0) msg += ' x' + wordGame.combo;
      wordFeedback.textContent = msg;
      wordFeedback.style.color = 'var(--g)';
      wordArea.classList.add('train-anim-correct');
    } else {
      var matchCount = 0;
      var minLen = Math.min(val.length, word.length);
      for (var mi = 0; mi < minLen; mi++) { if (val[mi] === word[mi]) matchCount++; }
      var ratio = word.length > 0 ? matchCount / word.length : 0;

      if (ratio >= 0.5 && matchCount >= 2) {
        var partialXp = Math.max(1, Math.floor((5 + lengthBonus * ratio)));
        wordGame.addXp(partialXp, wordArea);
        wordGame.wrong++;
        wordGame.streak = 0;
        wordGame.combo = 1;
        wordResultIcon.textContent = '\\u2248';
        wordResultIcon.style.color = 'var(--y)';
        wordFeedback.textContent = 'Yakin! ' + matchCount + '/' + word.length + ' harf dogru. +' + partialXp + ' XP. Dogru: ' + word;
        wordFeedback.style.color = 'var(--y)';
        wordArea.classList.add('train-anim-wrong');
      } else {
        wordGame.onWrong();
        wordResultIcon.textContent = '\\u2718';
        wordResultIcon.style.color = 'var(--r)';
        wordFeedback.textContent = '\\uD83D\\uDCA5 Yanlis! Dogru: ' + word;
        wordFeedback.style.color = 'var(--r)';
        wordArea.classList.add('train-anim-wrong');
        gSetTimeout(function() { playMorseString(textToMorse(word), parseInt(wordWpm.value), null, null); }, 600);
      }
    }

    updateWordGame();
    gSetTimeout(wordNewRound, 2800);
  }

  function saveWordSession() {
    if (wordGame.correct + wordGame.wrong === 0) return;
    saveSessionToServer('kelime', parseInt(wordWpm.value), wordGame.xp + (wordGame.level - 1) * 100, wordGame.correct, wordGame.wrong, Math.floor((Date.now() - wordState.sessionStart) / 1000));
  }

  window.addEventListener('beforeunload', saveWordSession);

  wordResetBtn.addEventListener('click', function() {
    clearWordTimers();
    saveWordSession();
    wordGame.xp = 0; wordGame.level = 1; wordGame.streak = 0; wordGame.combo = 1; wordGame.correct = 0; wordGame.wrong = 0;
    wordState.sessionStart = Date.now();
    updateWordGame();
    fetchWords();
  });

  function loadWordStats() {
    renderLeaderboard(wordLeaderboardEl, wordStatsGrid, 'kelime');
  }

  var wordTabLoaded = false;
  function wordsInit() {
    if (!wordTabLoaded) {
      wordTabLoaded = true;
      fetchWords();
    }
    if (wordInput && !wordState.answered) gSetTimeout(function() { wordInput.focus(); }, 100);
    loadWordStats();
  }


  // ========================================================================
  // TAB 7: CANLI GONDERICI (Live Sender)
  // ========================================================================
  var liveKeyEl = document.getElementById('liveKey');
  var liveCurrentEl = document.getElementById('liveCurrent');
  var liveDecodedEl = document.getElementById('liveDecoded');
  var liveWpmSlider = document.getElementById('liveWpm');
  var liveWpmValEl = document.getElementById('liveWpmVal');
  var liveWpmDisplayEl = document.getElementById('liveWpmDisplay');
  var liveClearBtn = document.getElementById('liveClear');

  liveWpmSlider.addEventListener('input', function() {
    liveWpmValEl.textContent = liveWpmSlider.value + ' WPM';
  });

  var liveState = {
    isDown: false,
    downTime: 0,
    upTime: 0,
    currentSymbols: '',
    decodedText: '',
    charTimer: null,
    wordTimer: null,
    elementTimes: []
  };

  function liveDit() {
    return ditMs(parseInt(liveWpmSlider.value));
  }

  function liveDown() {
    if (liveState.isDown) return;
    ensureAudio();
    liveState.isDown = true;
    liveState.downTime = performance.now();
    toneOn();
    liveKeyEl.classList.add('pressed');
    if (liveState.charTimer) { clearTimeout(liveState.charTimer); liveState.charTimer = null; }
    if (liveState.wordTimer) { clearTimeout(liveState.wordTimer); liveState.wordTimer = null; }
  }

  function liveUp() {
    if (!liveState.isDown) return;
    liveState.isDown = false;
    liveState.upTime = performance.now();
    toneOff();
    liveKeyEl.classList.remove('pressed');

    var duration = liveState.upTime - liveState.downTime;
    var dit = liveDit();

    if (duration < dit * 1.5) {
      liveState.currentSymbols += '.';
    } else {
      liveState.currentSymbols += '-';
    }

    liveState.elementTimes.push(duration);
    liveCurrentEl.textContent = liveState.currentSymbols;
    updateLiveWpm();

    liveState.charTimer = gSetTimeout(function() {
      var ch = MORSE_TO_CHAR[liveState.currentSymbols] || '';
      if (ch) {
        liveState.decodedText += ch;
        liveDecodedEl.textContent = liveState.decodedText;
      }
      liveState.currentSymbols = '';
      liveCurrentEl.textContent = '';

      liveState.wordTimer = gSetTimeout(function() {
        liveState.decodedText += ' ';
        liveDecodedEl.textContent = liveState.decodedText;
      }, dit * 4);
    }, dit * 3);
  }

  function updateLiveWpm() {
    var times = liveState.elementTimes;
    if (times.length < 2) return;
    var recent = times.slice(-10);
    var minTime = recent[0];
    for (var i = 1; i < recent.length; i++) {
      if (recent[i] < minTime) minTime = recent[i];
    }
    var estWpm = Math.round(1200 / minTime);
    if (estWpm > 0 && estWpm < 60) {
      liveWpmDisplayEl.textContent = estWpm + ' WPM';
    }
  }

  liveKeyEl.addEventListener('mousedown', function(e) { e.preventDefault(); liveDown(); });
  liveKeyEl.addEventListener('mouseup', liveUp);
  liveKeyEl.addEventListener('mouseleave', function() { if (liveState.isDown) liveUp(); });

  liveKeyEl.addEventListener('touchstart', function(e) { e.preventDefault(); liveDown(); });
  liveKeyEl.addEventListener('touchend', function(e) { e.preventDefault(); liveUp(); });
  liveKeyEl.addEventListener('touchcancel', function() { if (liveState.isDown) liveUp(); });

  document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && activePanelName === 'live') {
      e.preventDefault();
      if (!e.repeat) liveDown();
    }
  });
  document.addEventListener('keyup', function(e) {
    if (e.code === 'Space' && activePanelName === 'live') {
      e.preventDefault();
      liveUp();
    }
  });

  liveClearBtn.addEventListener('click', function() {
    liveState.currentSymbols = '';
    liveState.decodedText = '';
    liveState.elementTimes = [];
    liveCurrentEl.textContent = '';
    liveDecodedEl.textContent = '';
    liveWpmDisplayEl.textContent = '-- WPM';
    if (liveState.charTimer) { clearTimeout(liveState.charTimer); liveState.charTimer = null; }
    if (liveState.wordTimer) { clearTimeout(liveState.wordTimer); liveState.wordTimer = null; }
  });

})();
<\/script>`
  });
}
