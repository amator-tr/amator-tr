/**
 * Paylasilan yardimci fonksiyonlar
 */

// 3-sınıflı parola politikası: harf + rakam + (özel karakter VEYA daha uzun parola).
// "12345678!" → reject (harf yok). 12+ karakter parolalarda özel zorunluluğu kalkar
// (passphrase'leri tıkmamak için).
export function validatePassword(pw) {
  if (!pw || pw.length < 8 || pw.length > 200) return false;
  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(pw);
  if (!hasLetter || !hasDigit) return false;
  return pw.length >= 12 || hasSpecial;
}

export function validateUsername(u) {
  return u && u.length >= 3 && u.length <= 20 && /^[a-zA-Z0-9_]+$/.test(u);
}

export const CALLSIGN_RE = /^(TA|TB|TC|YM|YN)\d[A-Z]{1,4}$/;

export const MAX_OPERATORS_PER_USER = 1000;

export const MODELS = {
  kimi: '@cf/moonshotai/kimi-k2.5',
  gpt120: '@cf/openai/gpt-oss-120b',
  llama70: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  llama8: '@cf/meta/llama-3.1-8b-instruct',
};
export const DEFAULT_MODEL = 'gpt120';

const MODEL_OPTS = {
  '@cf/moonshotai/kimi-k2.5': {
    chat_template_kwargs: { enable_thinking: false },
    max_completion_tokens: 300,
  },
};

export function getModel(key) {
  return MODELS[key] || MODELS[DEFAULT_MODEL];
}

export function getModelParams(model, base) {
  const opts = MODEL_OPTS[model];
  if (!opts) return base;
  const merged = { ...base, ...opts };
  if (merged.max_completion_tokens) delete merged.max_tokens;
  return merged;
}

export function extractResponse(response) {
  let text = '';
  const r = response?.response;
  if (typeof r === 'string') text = r;
  else if (r && typeof r === 'object' && typeof r.content === 'string') text = r.content;
  else {
    const choice = response?.choices?.[0]?.message?.content;
    if (typeof choice === 'string') text = choice;
  }
  text = text.replace(/<think>[\s\S]*?<\/think>\s*/g, '');
  text = text.replace(/^[\s\S]*?<\/think>\s*/g, '');
  return text;
}

export function getModelChain(preferred) {
  const pref = getModel(preferred);
  const chain = [pref];
  for (const m of Object.values(MODELS)) {
    if (!chain.includes(m)) chain.push(m);
  }
  return chain;
}

export async function logActivity(db, userId, action, detail) {
  try {
    await db.prepare('INSERT INTO activity_log (user_id, action, detail) VALUES (?,?,?)').bind(userId, action, detail || '').run();
  } catch {}
}
