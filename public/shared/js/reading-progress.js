/**
 * shared/js/reading-progress.js
 * Article sayfasında scroll yüzdesini gösteren ince çizgi.
 * Sadece <article class="prose"> içeren sayfada aktif.
 */

function init() {
  const article = document.querySelector("article.prose");
  if (!article) return;

  const bar = document.createElement("div");
  bar.className = "reading-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  function update() {
    const total = article.offsetTop + article.offsetHeight - window.innerHeight;
    const top = window.scrollY - article.offsetTop;
    const pct = Math.max(0, Math.min(100, (top / Math.max(1, total - article.offsetTop)) * 100));
    bar.style.width = pct + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
