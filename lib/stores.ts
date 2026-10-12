/** Short label for a store, used where there's no product photo: "Am", "eB", "H&M", "AY". */
export function storeMonogram(store: string): string {
  const name = store.trim();
  if (name.length <= 3) return name;
  const words = name.split(/\s+/);
  if (words.length > 1) return words.map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return name.slice(0, 2);
}

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Matches a product URL to a known store by hostname ("www2.hm.com" → "H&M").
 * Returns null for a URL that isn't http(s) or a store we don't list.
 */
export function detectStore(input: string, stores: readonly string[]): { host: string; store: string | null } | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  const host = url.hostname.replace(/^www\d*\./, '');
  if (!host.includes('.')) return null;
  const labels = host.split('.').map(key);
  const store = stores.find((s) => labels.includes(key(s))) ?? null;
  return { host, store };
}
