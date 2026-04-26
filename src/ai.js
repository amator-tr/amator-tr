class CloudflareAI {
  constructor(accountId, apiToken) {
    this.accountId = accountId;
    this.apiToken = apiToken;
  }

  async run(model, input) {
    if (!this.accountId || !this.apiToken) {
      return { response: 'AI servisi yapilandirilmamis' };
    }

    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run/${model}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.errors?.[0]?.message || 'AI request failed');
    }
    return data.result;
  }
}

let instance = null;

export function getAI() {
  if (!instance) {
    instance = new CloudflareAI(
      process.env.CLOUDFLARE_ACCOUNT_ID,
      process.env.CLOUDFLARE_API_TOKEN
    );
  }
  return instance;
}
