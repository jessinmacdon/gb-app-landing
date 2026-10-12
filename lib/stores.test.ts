import { describe, expect, it } from 'vitest';
import { formatMoney } from '@/lib/format';
import { detectStore, storeMonogram } from '@/lib/stores';

const STORES = ['Amazon', 'eBay', 'SHEIN', 'Zalando', 'About You', 'H&M', 'AliExpress'];

describe('detectStore', () => {
  it('matches a store by hostname label, ignoring www and country domains', () => {
    expect(detectStore('https://www.zalando.de/nike-air-max', STORES)).toEqual({ host: 'zalando.de', store: 'Zalando' });
    expect(detectStore('https://www2.hm.com/fr_fr/produit', STORES)?.store).toBe('H&M');
    expect(detectStore('https://www.aboutyou.com/p/x', STORES)?.store).toBe('About You');
    expect(detectStore('http://amazon.fr/dp/123', STORES)?.store).toBe('Amazon');
  });
  it('keeps unknown stores as a host with no store', () => {
    expect(detectStore('https://shop.example.co.uk/item', STORES)).toEqual({ host: 'shop.example.co.uk', store: null });
  });
  it('rejects things that are not web links', () => {
    expect(detectStore('nike air max', STORES)).toBeNull();
    expect(detectStore('ftp://zalando.com/x', STORES)).toBeNull();
    expect(detectStore('https://localhost/x', STORES)).toBeNull();
    expect(detectStore('', STORES)).toBeNull();
  });
});

describe('storeMonogram', () => {
  it('abbreviates store names', () => {
    expect(storeMonogram('Amazon')).toBe('Am');
    expect(storeMonogram('eBay')).toBe('eB');
    expect(storeMonogram('H&M')).toBe('H&M');
    expect(storeMonogram('About You')).toBe('AY');
  });
});

describe('formatMoney', () => {
  it('formats per language with the store currency', () => {
    expect(formatMoney({ amount: 99.99, currency: 'EUR' }, 'en')).toBe('€99.99');
    expect(formatMoney({ amount: 1379, currency: 'USD' }, 'en')).toBe('$1,379.00');
    expect(formatMoney({ amount: 99.99, currency: 'EUR' }, 'fr')).toBe('99,99 €');
    expect(formatMoney({ amount: 1379, currency: 'USD' }, 'fr')).toBe('1 379,00 $');
    expect(formatMoney({ amount: 10, currency: 'CHF' }, 'en')).toBe('10.00 CHF');
  });
});
