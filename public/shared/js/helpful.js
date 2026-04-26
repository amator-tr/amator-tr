// shared/js/helpful.js — "Faydalıydı?" oylama butonu
function init() {
  const article = document.querySelector("article.prose");
  if (!article) return;
  const slug = location.pathname.replace(/^\/tutorials\//, "").replace(/\/$/, "");
  if (!slug || slug === "tutorials") return;

  const STORAGE = "helpful-voted-" + slug;
  const wrap = document.createElement("aside");
  wrap.className = "helpful";
  wrap.setAttribute("role", "region");
  wrap.setAttribute("aria-label", "Geri bildirim");

  const q = document.createElement("p");
  q.className = "helpful-question";
  q.textContent = "Bu kılavuz faydalı mıydı?";
  wrap.appendChild(q);

  const btn = document.createElement("button");
  btn.className = "helpful-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Faydalı buldum, oy ver");
  btn.appendChild(document.createTextNode("👍 "));
  const span = document.createElement("span");
  span.className = "helpful-count";
  span.textContent = "…";
  btn.appendChild(span);
  wrap.appendChild(btn);

  article.appendChild(wrap);

  fetch("/api/stats/helpful?slug=" + encodeURIComponent(slug))
    .then((r) => r.json())
    .then((d) => {
      span.textContent = d.count ?? 0;
    })
    .catch(() => (span.textContent = "0"));

  if (localStorage.getItem(STORAGE)) {
    btn.disabled = true;
    btn.classList.add("voted");
  }

  btn.addEventListener("click", async () => {
    if (btn.disabled) return;
    btn.disabled = true;
    btn.classList.add("voted");
    try {
      const r = await fetch("/api/stats/helpful", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const d = await r.json();
      span.textContent = d.count ?? Number(span.textContent) + 1;
      localStorage.setItem(STORAGE, "1");
    } catch {
      btn.disabled = false;
      btn.classList.remove("voted");
    }
  });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
