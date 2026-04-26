// shared/js/code-copy.js — code block kopyala butonu
function init() {
  const blocks = document.querySelectorAll("article.prose pre");
  for (const pre of blocks) {
    if (pre.querySelector(".code-copy-btn")) continue;
    pre.style.position = "relative";
    const btn = document.createElement("button");
    btn.className = "code-copy-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Kodu kopyala");
    btn.textContent = "Kopyala";
    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.textContent ?? pre.textContent;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "✓ Kopyalandı";
        setTimeout(() => (btn.textContent = "Kopyala"), 2000);
      } catch {
        btn.textContent = "✗ Hata";
        setTimeout(() => (btn.textContent = "Kopyala"), 2000);
      }
    });
    pre.appendChild(btn);
  }
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
