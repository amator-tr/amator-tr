/**
 * shared/js/tutorials-search.js
 * Tutorial liste sayfası için client-side fuzzy search.
 * Türkçe karakter normalize + multi-token AND match + substring/subsequence.
 */

const TURKISH_FOLD = {
  ı: "i",
  i: "i",
  İ: "i",
  I: "i",
  ş: "s",
  Ş: "s",
  ğ: "g",
  Ğ: "g",
  ü: "u",
  Ü: "u",
  ö: "o",
  Ö: "o",
  ç: "c",
  Ç: "c",
};

function normalize(s) {
  if (!s) return "";
  let out = "";
  for (const ch of s.toLowerCase()) {
    out += TURKISH_FOLD[ch] || ch;
  }
  return out;
}

/**
 * Subsequence match: "uvk5" matches "uv-k5", "uv programlama k5"
 * Daha gevşek, "fuzzy" davranış sağlar.
 */
function subsequenceMatch(needle, haystack) {
  let i = 0;
  let j = 0;
  while (i < needle.length && j < haystack.length) {
    if (needle[i] === haystack[j]) i++;
    j++;
  }
  return i === needle.length;
}

/**
 * Tek bir token'ın bir article'a match olup olmadığını kontrol et.
 * Substring (yüksek skor) > subsequence (düşük skor)
 */
function tokenMatch(token, searchText) {
  if (searchText.includes(token)) return 2;
  if (subsequenceMatch(token, searchText)) return 1;
  return 0;
}

/**
 * Çoklu token AND mantığıyla skor hesapla.
 * Tüm token'lar match olmalı; biri olmazsa 0.
 */
function scoreArticle(query, searchText) {
  const tokens = query.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 1;
  let total = 0;
  for (const t of tokens) {
    const s = tokenMatch(t, searchText);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

function init() {
  const input = document.getElementById("tutorial-search-input");
  const list = document.querySelector(".tutorials-list");
  const hint = document.getElementById("tutorial-search-hint");
  if (!input || !list) return;

  const cards = Array.from(list.querySelectorAll("[data-search]"));

  function applyFilter() {
    const q = normalize(input.value.trim());
    if (!q) {
      cards.forEach((c) => c.classList.remove("hidden", "search-match"));
      list.querySelectorAll(".tutorial-card").forEach((c) => list.appendChild(c));
      if (hint) hint.hidden = true;
      return;
    }
    const scored = cards
      .map((c) => ({ el: c, score: scoreArticle(q, c.dataset.search) }))
      .sort((a, b) => b.score - a.score);

    let visible = 0;
    for (const { el, score } of scored) {
      if (score > 0) {
        el.classList.remove("hidden");
        list.appendChild(el);
        visible++;
      } else {
        el.classList.add("hidden");
      }
    }
    if (hint) {
      hint.hidden = visible > 0;
      hint.textContent = visible === 0 ? `"${input.value}" için sonuç bulunamadı.` : "";
    }
  }

  let debounce;
  input.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(applyFilter, 80);
  });

  // Auto-focus on '/' keypress
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
