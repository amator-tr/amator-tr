/**
 * shared/js/site-stats.js
 * Silent visitor counter — session başına 1 kez /api/stats/ping POST eder.
 *
 * SEO etki sıfır:
 *   - defer script (render-blocking yok)
 *   - 0 görsel UI (CLS yok)
 *   - 0 inline data (HTML byte etkisi minimal)
 *   - LCP/FCP'yi etkilemez
 *
 * Privacy: hiçbir IP, UA, fingerprint, referrer toplanmaz. Sadece tarayıcı
 * sessionStorage flag'iyle session başına 1 increment.
 *
 * Role-Exporter ile aynı session key kullanılır (kullanıcı her iki sayfayı
 * gezse de toplam ping = 1).
 */

const SESSION_KEY = "roleExporterStatsPinged";

async function pingOnce() {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const resp = await fetch("/api/stats/ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
      keepalive: true,
    });
    sessionStorage.setItem(SESSION_KEY, "1");
    if (resp.ok) {
      const data = await resp.json().catch(() => ({}));
      // Sessizce console'a yaz (debug için, görünür UI yok)
      if (data && data.visitorNumber) {
        console.info(`[amator.tr] visitor #${data.visitorNumber}`);
      }
    }
  } catch {
    // Network hatası önemsiz — sayaç best-effort
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(pingOnce, 100);
  } else {
    window.addEventListener("load", () => setTimeout(pingOnce, 100));
  }
}
