/**
 * İçerik moderasyonu - Cloudflare Workers AI kullanarak
 * Prompt injection korumalı, kullanıcıya görünmez
 */

const SYSTEM_PROMPT = `Sen bir icerik filtreleme sistemisin. Amator telsiz radyo toplulugu icin yazilan metinleri degerlendir.

SADECE asagidaki durumlarda REDDET yaz:
- Acik kufur, hakaret veya asagilama
- Cinsel veya mustehcen icerik
- Nefret soylemi, irkcilik
- Siddet tehdidi
- Teror propagandasi

Bunlarin DISINDA her sey ONAYLA. Kisinin yasi, meslegi, hobisi, sehri, kisa notlar, hatirlatmalar, gunluk bilgiler gibi normal icerikler ONAYLA.

Onemli: Supheliysen ONAYLA. Sadece ACIKCA zararli icerikleri reddet.

Tek kelime yaz: ONAYLA veya REDDET`;

// Regex ön-filtre - sadece teknik saldırılar
const BLOCKED_PATTERNS = [
  /[\x00-\x08\x0B\x0C\x0E-\x1F]/,
  /<script/i,
  /javascript:/i,
  /\{\{.*\}\}/,
  /\$\{.*\}/,
];

function sanitizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.slice(0, 500);
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  cleaned = cleaned
    .replace(/```/g, '')
    .replace(/\[INST\]/gi, '')
    .replace(/\[\/INST\]/gi, '')
    .replace(/<\|.*?\|>/g, '')
    .replace(/<<SYS>>/gi, '')
    .replace(/<<\/SYS>>/gi, '')
    .replace(/<s>/gi, '')
    .replace(/<\/s>/gi, '')
    .replace(/\bignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|rules?)/gi, '')
    .replace(/\bforget\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|rules?)/gi, '')
    .replace(/\byou\s+are\s+(now|a)\b/gi, '')
    .replace(/\bact\s+as\b/gi, '')
    .replace(/\bpretend\s+(to\s+be|you\s+are)\b/gi, '')
    .replace(/\bjailbreak\b/gi, '')
    .replace(/\bDAN\b/g, '')
    .replace(/\bdo\s+anything\s+now\b/gi, '');
  return cleaned.trim();
}

function detectInjection(text) {
  if (!text) return false;
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|above|prior)/i,
    /forget\s+(all\s+)?(previous|above|prior)/i,
    /disregard\s+(all\s+)?(previous|above|prior)/i,
    /override\s+(all\s+)?(previous|above|prior)/i,
    /new\s+instructions?\s*:/i,
    /system\s*prompt/i,
    /\bprompt\s*injection\b/i,
    /you\s+are\s+now\s+/i,
    /pretend\s+(to\s+be|you('re|\s+are))/i,
    /reveal\s+your\s+(instructions?|system|prompt)/i,
    /show\s+me\s+your\s+(instructions?|system|prompt)/i,
    /\[INST\]/i,
    /<<SYS>>/i,
    /<\|im_start\|>/i,
    /<\|im_end\|>/i,
    /\bDAN\s+mode\b/i,
    /\bjailbreak\b/i,
    /do\s+anything\s+now/i,
  ];
  return injectionPatterns.some(p => p.test(text));
}

/**
 * Ana moderasyon fonksiyonu
 * mode: 'strict' (operator kaydi) veya 'lenient' (notlar)
 */
export async function moderateContent(ai, text, mode = 'strict') {
  if (!text || text.trim().length === 0) {
    return { safe: true, reason: 'empty' };
  }

  // Regex ön filtre
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return { safe: false, reason: 'blocked_pattern' };
    }
  }

  // Prompt injection tespiti
  if (detectInjection(text)) {
    return { safe: false, reason: 'injection_detected' };
  }

  // Notlar icin sadece regex kontrolu yeterli, LLM'e gonderme
  if (mode === 'lenient') {
    return { safe: true, reason: 'lenient_pass' };
  }

  const sanitized = sanitizeInput(text);
  if (sanitized.length === 0) {
    return { safe: true, reason: 'empty_after_sanitize' };
  }

  try {
    const response = await ai.run('@cf/openai/gpt-oss-120b', {
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Degerlendir. Tek kelime yaz: ONAYLA veya REDDET.\n\nMetin: "${sanitized}"`,
        },
      ],
      max_tokens: 10,
      temperature: 0,
    });

    const raw = response?.response;
    const answer = (typeof raw === 'string' ? raw : raw?.content || '').trim().toUpperCase();

    if (answer.includes('REDDET')) {
      return { safe: false, reason: 'content_rejected' };
    }

    // ONAYLA veya belirsiz yanit = gecir (false positive'den kacin)
    return { safe: true, reason: 'approved' };
  } catch (err) {
    console.error('AI moderation error:', err);
    return { safe: true, reason: 'ai_fallback' };
  }
}
