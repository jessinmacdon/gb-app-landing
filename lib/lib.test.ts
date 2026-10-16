import { describe, expect, it } from 'vitest';
import categories from '@/content/categories.json';
import quotes from '@/content/example-quotes.json';
import faq from '@/content/faq.json';
import privacy from '@/content/legal/privacy.json';
import terms from '@/content/legal/terms.json';
import en from '@/content/i18n/en.json';
import fr from '@/content/i18n/fr.json';
import rankingModes from '@/content/ranking-modes.json';
import site from '@/content/site.json';
import testimonials from '@/content/testimonials.json';
import worstCase from '@/content/fixtures/worst-case.json';
import { getCategories, getExampleQuotes, quoteTotal } from '@/lib/content';
import type {
  Category,
  ExampleQuote,
  FaqItem,
  LegalDoc,
  RankingMode,
  SiteContent,
  Testimonial,
} from '@/lib/content/types';
import { validateContent, type ContentBundle } from '@/lib/content/validate';
import { formatDays, formatXAF } from '@/lib/format';
import { localeFromAcceptLanguage } from '@/lib/i18n';
import { rankProducts, type Rankable } from '@/lib/ranking';

const p = (store: string, estimatedTotalXAF: number, rating: number, min: number, max: number) => ({
  store,
  estimatedTotalXAF,
  rating,
  deliveryDays: { min, max },
});

describe('rankProducts', () => {
  const items: (Rankable & { id: string })[] = [
    { id: 'a', ...p('Amazon', 300, 4.5, 8, 12) },
    { id: 'b', ...p('Amazon', 100, 4.8, 8, 10) },
    { id: 'c', ...p('eBay', 200, 4.8, 11, 16) },
    { id: 'd', ...p('Etsy', 50, 4.0, 14, 21) },
  ];
  const ids = (xs: { id: string }[]) => xs.map((x) => x.id).join('');

  it('price: cheapest first', () => expect(ids(rankProducts(items, 'price'))).toBe('dbca'));
  it('quality: rating desc, then price asc', () => expect(ids(rankProducts(items, 'quality'))).toBe('bcad'));
  it('delivery: min days, then max days', () => expect(ids(rankProducts(items, 'delivery'))).toBe('bacd'));
  it('variety: never the same store twice in a row while others remain', () => {
    expect(ids(rankProducts(items, 'variety'))).toBe('bcda');
  });
  it('does not mutate its input', () => {
    const copy = items.slice();
    rankProducts(items, 'price');
    expect(items).toEqual(copy);
  });

  it('matches the prototype for Electronics ranked by price', async () => {
    const electronics = (await getCategories()).find((c) => c.id === 'electronics-and-gadgets')!;
    expect(rankProducts(electronics.products, 'price').map((x) => x.name.en)).toEqual([
      'Anker 20,000 mAh power bank',
      'Redmi Watch',
      'JBL Flip 6 speaker',
      'Sony WH-1000XM5',
      'Samsung Galaxy A55',
      'iPad 10.9" 64 GB',
    ]);
  });
});

describe('format', () => {
  it('groups thousands with plain spaces', () => {
    expect(formatXAF(96800)).toBe('96 800');
    expect(formatXAF(1234567)).toBe('1 234 567');
    expect(formatXAF(900)).toBe('900');
  });
  it('formats delivery ranges', () => {
    expect(formatDays({ min: 10, max: 14 }, 'days')).toBe('10–14 days');
    expect(formatDays({ min: 7, max: 7 }, 'jours')).toBe('7 jours');
  });
});

describe('localeFromAcceptLanguage', () => {
  it('honours quality order', () => {
    expect(localeFromAcceptLanguage('fr-CM,fr;q=0.9,en;q=0.8')).toBe('fr');
    expect(localeFromAcceptLanguage('de;q=1,en;q=0.5,fr;q=0.9')).toBe('fr');
    expect(localeFromAcceptLanguage('en-GB')).toBe('en');
  });
  it('returns null when nothing matches', () => {
    expect(localeFromAcceptLanguage('de,es')).toBeNull();
    expect(localeFromAcceptLanguage(null)).toBeNull();
  });
});

describe('content', () => {
  const bundle = (): ContentBundle =>
    structuredClone({
      site: site as SiteContent,
      categories: categories as Category[],
      rankingModes: rankingModes as RankingMode[],
      quotes: quotes as ExampleQuote[],
      faq: faq as FaqItem[],
      testimonials: testimonials as Testimonial[],
      legal: { privacy: privacy as LegalDoc, terms: terms as LegalDoc },
      dictionaries: { en, fr },
    });

  it('seed content is valid', () => expect(validateContent(bundle())).toEqual([]));
  it('worst-case fixture (break-ui) is valid', () =>
    expect(validateContent({ ...bundle(), ...(worstCase as Partial<ContentBundle>) })).toEqual([]));

  it('quote totals are computed from the breakdown', async () => {
    const hero = (await getExampleQuotes()).find((q) => q.isHeroPhoneExample)!;
    expect(quoteTotal(hero.breakdownXAF)).toBe(96491);
  });

  it('reports editor mistakes', () => {
    const b = bundle();
    b.categories[0].products[1].id = b.categories[0].products[0].id;
    b.categories[0].products[0].name.fr = '';
    b.quotes[1].isHeroPhoneExample = true;
    b.site.whatWeShip.defaultCategoryId = 'nope';
    delete (b.dictionaries.fr as Record<string, unknown>).picksCta;
    b.legal.terms.sections[0].heading.fr = '';
    const errors = validateContent(b).join('\n');
    expect(errors).toMatch(/duplicate id "fashion-and-clothing-1"/);
    expect(errors).toMatch(/missing "fr" text/);
    expect(errors).toMatch(/exactly one quote/);
    expect(errors).toMatch(/defaultCategoryId "nope"/);
    expect(errors).toMatch(/missing key "picksCta"/);
    expect(errors).toMatch(/legal terms section #1 heading: missing "fr" text/);
  });
});
