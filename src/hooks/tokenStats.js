let cache = {
  data: null,
  lastFetch: 0,
};

const CACHE_TTL = 10000; // 10 sec

const TOKEN = '0x4F22D15e0F88Db6EB5EcfB3F7c35d76dB3cb3745';

export async function getTokenStats() {
  const now = Date.now();

  if (cache.data && now - cache.lastFetch < CACHE_TTL) {
    return cache.data;
  }

  const res = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${TOKEN}`
  );
  const json = await res.json();

  const pair = json.pairs?.[0];

  const data = {
    price: pair?.priceUsd,
    liquidity: pair?.liquidity?.usd,
    marketCap: pair?.fdv,
  };

  cache = {
    data,
    lastFetch: now,
  };

  return data;
}