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
 * Eğer Turnstile yapılandırılmamışsa (secret yok), true döner — geliştirme/deneme için.
 */
export async function checkTurnstile(c, body) {
  const secret = c.env.TURNSTILE_SECRET;
  if (!secret) return true; // dev fallback
  const token = body['cf-turnstile-response'];
  const ip = c.req.header('cf-connecting-ip') || '';
  return await verifyTurnstile(token, secret, ip);
}
