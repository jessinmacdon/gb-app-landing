/**
 * Formats an integer XAF amount with a plain-space thousands separator
 * ("96 800"), matching fr-FR grouping without depending on the runtime's ICU
 * data, so server and client output are identical.
 */
export function formatXAF(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  return sign + String(Math.round(Math.abs(amount))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const formatRating = (rating: number) => rating.toFixed(1);

export const formatDays = (d: { min: number; max: number }, unit: string) =>
  d.min === d.max ? `${d.min} ${unit}` : `${d.min}–${d.max} ${unit}`;

const SYMBOLS: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' };

/**
 * Formats a listing price in its own currency, deterministically so server
 * and client render the same string: "€99.99" in English, "99,99 €" in French.
 */
export function formatMoney(m: { amount: number; currency: string }, lang: 'en' | 'fr'): string {
  const [int, dec] = m.amount.toFixed(2).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'fr' ? ' ' : ',');
  const symbol = SYMBOLS[m.currency];
  if (lang === 'fr') return `${grouped},${dec} ${symbol ?? m.currency}`;
  return symbol ? `${symbol}${grouped}.${dec}` : `${grouped}.${dec} ${m.currency}`;
}
