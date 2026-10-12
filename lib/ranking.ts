import type { Product, RankingModeId } from '@/lib/content/types';

/** The fields ranking needs; works on raw or localized products. */
export type Rankable = Pick<Product, 'store' | 'estimatedTotalXAF' | 'rating' | 'deliveryDays'>;

/**
 * Orders products for the "What we ship" browser. Pure, so it can move
 * server-side unchanged once suggestions come from an API.
 */
export function rankProducts<T extends Rankable>(products: readonly T[], mode: RankingModeId): T[] {
  const items = products.slice();
  switch (mode) {
    case 'price':
      return items.sort((a, b) => a.estimatedTotalXAF - b.estimatedTotalXAF);
    case 'quality':
      return items.sort((a, b) => b.rating - a.rating || a.estimatedTotalXAF - b.estimatedTotalXAF);
    case 'delivery':
      return items.sort(
        (a, b) => a.deliveryDays.min - b.deliveryDays.min || a.deliveryDays.max - b.deliveryDays.max,
      );
    case 'variety': {
      // Best-rated first within each store, then round-robin across stores
      // so consecutive items come from different shops.
      const groups = new Map<string, T[]>();
      for (const p of items.sort((a, b) => b.rating - a.rating)) {
        const group = groups.get(p.store);
        if (group) group.push(p);
        else groups.set(p.store, [p]);
      }
      const out: T[] = [];
      const queues = [...groups.values()];
      while (out.length < items.length) {
        for (const q of queues) {
          const next = q.shift();
          if (next) out.push(next);
        }
      }
      return out;
    }
  }
}
