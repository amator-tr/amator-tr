// shared/js/toc.js — article sayfasında otomatik table of contents
function init() {
  const article = document.querySelector("article.prose");
  if (!article) return;
  const headings = article.querySelectorAll("h2[id], h3[id]");
  if (headings.length < 3) return;

  const aside = document.createElement("nav");
  aside.className = "toc";
  aside.setAttribute("aria-label", "İçindekiler");
  const title = document.createElement("p");
  title.className = "toc-title";
  title.textContent = "İçindekiler";
  aside.appendChild(title);
  const ul = document.createElement("ul");
  for (const h of headings) {
    const li = document.createElement("li");
    li.className = "toc-" + h.tagName.toLowerCase();
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent.replace(/^#\s*/, "").trim();
    li.appendChild(a);
    ul.appendChild(li);
  }
  aside.appendChild(ul);
  article.parentNode.appendChild(aside);

  const links = aside.querySelectorAll("a");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
        }
      }
    },
    { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
  );
  headings.forEach((h) => observer.observe(h));
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
