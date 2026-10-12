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
