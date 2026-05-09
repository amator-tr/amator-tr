/**
 * Cloudflare Turnstile (CAPTCHA) doğrulayıcı.
 *
 * Form'da cf-turnstile-response token'i sunucuya gelir, biz Cloudflare'in
 * siteverify endpoint'ine gönderip doğrulatırız. IP adresi de eklenir
 * (rate-limit + replay savunması için).
 *
 * Worker secret: TURNSTILE_SECRET (zorunlu)
 * Worker var: TURNSTILE_SITE_KEY (public, formda render)
 */
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token, secret, remoteIp) {
  if (!token || !secret) return false;
  try {
    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    if (remoteIp) body.set('remoteip', remoteIp);
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.success === true;
  } catch (e) {
    console.error('Turnstile verify error:', e);
    return false;
  }
}

/**
 * Form'dan gelen Turnstile token'i okur ve doğrular.
 *
 * - Geliştirme (NODE_ENV !== 'production') ve TURNSTILE_SECRET tanımsız ise
 *   true döner — local dev'de captcha çözmek zorunda kalmamak için.
 * - Üretimde TURNSTILE_SECRET eksikse fail-closed (false) ve uyarı logu —
 *   yanlışlıkla CAPTCHA'yi devre dışı bırakmaya karşı.
 */
let warnedNoSecret = false;
export async function checkTurnstile(c, body) {
  const secret = c.env.TURNSTILE_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      if (!warnedNoSecret) {
        console.error('[turnstile] TURNSTILE_SECRET tanimsiz, fail-closed.');
        warnedNoSecret = true;
      }
      return false;
    }
    return true;
  }
  const token = body['cf-turnstile-response'];
  const ip = c.req.header('cf-connecting-ip') || '';
  return await verifyTurnstile(token, secret, ip);
}
