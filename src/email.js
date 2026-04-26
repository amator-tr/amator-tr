/**
 * Resend (resend.com) ile transactional email gönderimi.
 *
 * Worker secret: RESEND_API_KEY
 * Worker var: EMAIL_FROM (örn. "amator.tr <noreply@amator.tr>")
 *             APP_URL (örn. "https://cagri.amator.tr")
 *
 * Spam'e düşmeme:
 * - amator.tr DNS'te SPF + DKIM + DMARC tam doğrulanmış olmalı
 * - Resend dashboard'da open/click tracking KAPALI (link rewrite + tracking pixel
 *   spam filtrelerini tetikler)
 * - HTML + plain-text alternatif
 * - List-Unsubscribe (RFC 8058 one-click) header → Gmail/iCloud transactional sayar
 * - From: noreply@amator.tr (verified domain), reply-to: noreply@amator.tr
 */
const RESEND_URL = 'https://api.resend.com/emails';

async function sendEmail(env, { to, subject, html, text }) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY tanımlı değil, email gönderilmedi');
    return { ok: false, error: 'no-api-key' };
  }
  const from = env.EMAIL_FROM || 'amator.tr <noreply@amator.tr>';
  const appUrl = env.APP_URL || 'https://cagri.amator.tr';
  try {
    const payload = {
      from,
      to,
      subject,
      html,
      text,
      reply_to: 'noreply@amator.tr',
      headers: {
        'List-Unsubscribe': `<${appUrl}/profil>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        'X-Entity-Ref-ID': crypto.randomUUID(),
      },
    };
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('Resend error:', res.status, data);
      return { ok: false, error: data?.message || 'http-' + res.status };
    }
    return { ok: true, id: data.id };
  } catch (e) {
    console.error('Resend fetch error:', e);
    return { ok: false, error: String(e) };
  }
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Email tasarım template'i — radyo dalgası header, brand renkleri, kod kutusu.
 * Hem güzel hem transactional/relationship sınıflandırma için optimal.
 */
function emailShell({ preheader, contentHtml }) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>amator.tr</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#111827;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#f3f4f6;">${escapeHtml(preheader)}</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f3f4f6;padding:32px 12px;">
  <tr><td align="center">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" style="max-width:560px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
      <!-- Header -->
      <tr><td style="padding:0;background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#312e81 100%);">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr><td style="padding:28px 32px 24px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding-right:14px;vertical-align:middle;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="44" height="44" style="background:#8b5cf6;border-radius:10px;">
                    <tr><td align="center" valign="middle" style="font-size:22px;line-height:44px;">📡</td></tr>
                  </table>
                </td>
                <td style="vertical-align:middle;">
                  <div style="color:#ffffff;font-size:18px;font-weight:700;line-height:1.2;">amator.tr</div>
                  <div style="color:#a5b4fc;font-size:12px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;margin-top:2px;">Çağrı İşareti Defteri</div>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </td></tr>
      <!-- Content -->
      <tr><td style="padding:32px 32px 28px;">${contentHtml}</td></tr>
      <!-- Footer -->
      <tr><td style="padding:18px 32px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
        <div style="font-size:12px;line-height:1.6;color:#6b7280;">
          <strong style="color:#374151;">amator.tr</strong> · Türkiye amatör telsiz portali<br>
          <a href="https://amator.tr" style="color:#8b5cf6;text-decoration:none;">amator.tr</a> ·
          <a href="https://amator.tr/tutorials/" style="color:#8b5cf6;text-decoration:none;">Tutorial'lar</a> ·
          <a href="https://amator.tr/role-export/" style="color:#8b5cf6;text-decoration:none;">Röle CSV</a> ·
          <a href="https://amator.tr/araclar/lisans-sinavi/" style="color:#8b5cf6;text-decoration:none;">Lisans Sınavı</a>
        </div>
        <div style="font-size:11px;color:#9ca3af;margin-top:10px;">
          Bu otomatik bir mesajdır, cevap verilmez. Sorularınız için <a href="https://amator.tr/iletisim" style="color:#9ca3af;text-decoration:underline;">iletişim sayfası</a>.
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function sendVerificationEmail(env, { to, displayName, token, code }) {
  const appUrl = env.APP_URL || 'https://cagri.amator.tr';
  const verifyLink = `${appUrl}/verify/${encodeURIComponent(token)}`;
  const verifyResendUrl = `${appUrl}/verify-resend`;
  const name = (displayName || '').toString().trim() || 'merhaba';
  const safeName = escapeHtml(name);
  const safeLink = escapeHtml(verifyLink);
  const safeCode = escapeHtml(code);

  const text = `Merhaba ${name},

amator.tr Çağrı Defteri hesabını oluşturdun. Email adresini doğrulamak için iki yol var:

1) Linke tıkla:
   ${verifyLink}

2) Veya doğrulama kodunu manuel gir (${verifyResendUrl}):
   ${code}

Link 24 saat geçerli. Bu kaydı sen yapmadıysan bu mesajı yok say, hesap aktive olmaz.

amator.tr — Türkiye amatör telsiz portali`;

  const contentHtml = `
<h1 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 8px;line-height:1.3;">Merhaba ${safeName} 👋</h1>
<p style="font-size:15px;line-height:1.6;color:#4b5563;margin:0 0 24px;">
  amator.tr <strong>Çağrı İşareti Defteri</strong> hesabını oluşturdun. Son adım: email adresini doğrula. İki yol var.
</p>

<!-- Yöntem 1: Buton -->
<p style="font-size:13px;font-weight:600;color:#6b7280;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.04em;">1. Linke tıkla</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
  <tr><td style="border-radius:10px;background:#8b5cf6;">
    <a href="${safeLink}" style="display:inline-block;padding:13px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:10px;">Email'i doğrula</a>
  </td></tr>
</table>

<!-- Ayraç -->
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:24px 0;">
  <tr>
    <td style="border-bottom:1px solid #e5e7eb;line-height:0;font-size:0;">&nbsp;</td>
    <td style="padding:0 12px;color:#9ca3af;font-size:12px;font-weight:600;letter-spacing:0.06em;">VEYA</td>
    <td style="border-bottom:1px solid #e5e7eb;line-height:0;font-size:0;">&nbsp;</td>
  </tr>
</table>

<!-- Yöntem 2: Kod -->
<p style="font-size:13px;font-weight:600;color:#6b7280;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.04em;">2. Kodu manuel gir</p>
<p style="font-size:14px;line-height:1.6;color:#4b5563;margin:0 0 12px;">
  Bu kodu <a href="${escapeHtml(verifyResendUrl)}" style="color:#8b5cf6;font-weight:600;text-decoration:none;">${escapeHtml(verifyResendUrl)}</a> sayfasında gir:
</p>
<div style="text-align:center;margin:16px 0;">
  <div style="display:inline-block;padding:18px 28px;background:#f9fafb;border:2px dashed #c4b5fd;border-radius:12px;">
    <div style="font-family:'SF Mono',Menlo,Consolas,monospace;font-size:32px;font-weight:700;letter-spacing:0.32em;color:#0f172a;line-height:1;">${safeCode}</div>
    <div style="font-size:11px;color:#9ca3af;margin-top:6px;letter-spacing:0.04em;text-transform:uppercase;">Doğrulama kodu</div>
  </div>
</div>

<!-- Bilgi kutusu -->
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:28px 0 0;">
  <tr><td style="padding:14px 16px;background:#fef3c7;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;">
    <div style="font-size:13px;line-height:1.6;color:#78350f;">
      <strong>Süre:</strong> 24 saat. Bu süre dolarsa <a href="${escapeHtml(verifyResendUrl)}" style="color:#78350f;font-weight:600;">yeni link iste</a>.<br>
      <strong>Kayıt sen değilsen:</strong> Bu mesajı yok say, hesap aktive olmaz.
    </div>
  </td></tr>
</table>`;

  return sendEmail(env, {
    to,
    subject: `${code} amator.tr doğrulama kodun`,
    html: emailShell({
      preheader: `Doğrulama kodun: ${code} — Çağrı Defteri kaydını tamamla`,
      contentHtml,
    }),
    text,
  });
}

export async function sendPasswordResetEmail(env, { to, displayName, token }) {
  const appUrl = env.APP_URL || 'https://cagri.amator.tr';
  const resetLink = `${appUrl}/sifre-sifirla/${encodeURIComponent(token)}`;
  const name = (displayName || '').toString().trim() || 'merhaba';
  const safeName = escapeHtml(name);
  const safeLink = escapeHtml(resetLink);

  const text = `Merhaba ${name},

amator.tr Çağrı Defteri için şifre sıfırlama talebi geldi. Yeni şifre belirlemek için:

${resetLink}

Bu link 1 saat geçerli. Sen talep etmediysen bu mesajı yok say — şifren değişmez.

amator.tr`;

  const contentHtml = `
<h1 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 8px;line-height:1.3;">Şifre sıfırlama 🔐</h1>
<p style="font-size:15px;line-height:1.6;color:#4b5563;margin:0 0 8px;">Merhaba ${safeName},</p>
<p style="font-size:15px;line-height:1.6;color:#4b5563;margin:0 0 24px;">
  amator.tr Çağrı Defteri için şifre sıfırlama talebi geldi. Yeni şifre belirlemek için:
</p>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
  <tr><td style="border-radius:10px;background:#8b5cf6;">
    <a href="${safeLink}" style="display:inline-block;padding:13px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:10px;">Yeni şifre belirle</a>
  </td></tr>
</table>

<p style="font-size:13px;line-height:1.6;color:#6b7280;margin:0 0 6px;">Buton çalışmıyorsa şu linki tarayıcına kopyala:</p>
<p style="font-size:12px;line-height:1.5;color:#475569;background:#f9fafb;padding:10px 12px;border-radius:6px;word-break:break-all;margin:0 0 24px;">${safeLink}</p>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:0;">
  <tr><td style="padding:14px 16px;background:#fef3c7;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;">
    <div style="font-size:13px;line-height:1.6;color:#78350f;">
      <strong>Süre:</strong> 1 saat. Bu süre dolarsa yeni link iste.<br>
      <strong>Sen talep etmediysen:</strong> Bu mesajı yok say, şifren değişmez.
    </div>
  </td></tr>
</table>`;

  return sendEmail(env, {
    to,
    subject: 'amator.tr şifre sıfırlama linki',
    html: emailShell({
      preheader: 'Şifreni 1 saat içinde sıfırla — talep etmediysen yok say',
      contentHtml,
    }),
    text,
  });
}
