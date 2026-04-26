const PROXY_URL = process.env.AI_PROXY_URL || 'https://ai-proxy.dikeckaan.workers.dev';

class CloudflareAI {
  async run(model, input) {
    const res = await fetch(`${PROXY_URL}/${model}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (res.status === 404) {
      return { response: 'AI servisi kullanılamıyor' };
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.errors?.[0]?.message || 'AI request failed');
    }
    return data.result;
  }
}

let instance = null;

export function getAI() {
  if (!instance) instance = new CloudflareAI();
  return instance;
}
