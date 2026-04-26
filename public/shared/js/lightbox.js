// shared/js/lightbox.js — article görsellerine tıklayınca lightbox
function openLightbox(img) {
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", img.alt || "Görsel önizleme");
  overlay.tabIndex = -1;

  const big = document.createElement("img");
  big.src = img.src;
  big.alt = img.alt;
  overlay.appendChild(big);

  const closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Kapat");
  closeBtn.textContent = "×";
  overlay.appendChild(closeBtn);

  function close() {
    overlay.remove();
    document.removeEventListener("keydown", onKey);
    img.focus();
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target === closeBtn) close();
  });
  document.addEventListener("keydown", onKey);

  document.body.appendChild(overlay);
  overlay.focus();
}

function init() {
  const imgs = document.querySelectorAll("article.prose img");
  for (const img of imgs) {
    img.style.cursor = "zoom-in";
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    if (!img.hasAttribute("aria-label")) {
      img.setAttribute("aria-label", `${img.alt || "Görsel"} (büyütmek için tıkla)`);
    }
    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img);
      }
    });
  }
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
