/**
 * Content layer for every dynamic section of the landing page.
 *
 * Today it reads the seed JSON in /content. To move to a CMS or API, replace
 * the bodies of the get* functions with fetches that return the same types;
 * no component needs to change. Everything is validated once per process, so
 * a broken edit fails the build instead of shipping a half-empty page.
 */
import categoriesJson from '@/content/categories.json';
import quotesJson from '@/content/example-quotes.json';
import faqJson from '@/content/faq.json';
import privacyJson from '@/content/legal/privacy.json';
import termsJson from '@/content/legal/terms.json';
import en from '@/content/i18n/en.json';
import fr from '@/content/i18n/fr.json';
import rankingModesJson from '@/content/ranking-modes.json';
import siteJson from '@/content/site.json';
import testimonialsJson from '@/content/testimonials.json';
import type { Locale } from '@/lib/i18n';
import type {
  Category,
  ExampleQuote,
  FaqItem,
  LegalDoc,
  QuoteBreakdown,
  RankingMode,
  SiteContent,
  Testimonial,
} from '@/lib/content/types';
import { validateContent, type ContentBundle } from '@/lib/content/validate';

export type Dictionary = typeof en;

const byOrder = <T extends { order: number }>(items: T[]) => items.slice().sort((a, b) => a.order - b.order);

let bundle: ContentBundle | undefined;

function load(): ContentBundle {
  if (bundle) return bundle;
  const next: ContentBundle = {
    site: siteJson as SiteContent,
    categories: categoriesJson as Category[],
    rankingModes: rankingModesJson as RankingMode[],
    quotes: quotesJson as ExampleQuote[],
    faq: faqJson as FaqItem[],
    testimonials: testimonialsJson as Testimonial[],
    legal: { privacy: privacyJson as LegalDoc, terms: termsJson as LegalDoc },
    dictionaries: { en, fr },
  };
  const errors = validateContent(next);
  if (errors.length) throw new Error(`Invalid landing page content:\n- ${errors.join('\n- ')}`);
  bundle = next;
  return next;
}

export async function getDictionary(lang: Locale): Promise<Dictionary> {
  return (load().dictionaries as Record<Locale, Dictionary>)[lang];
}

export async function getSiteContent(): Promise<SiteContent> {
  const site = load().site;
  return { ...site, steps: byOrder(site.steps), features: byOrder(site.features) };
}

/** Categories in display order, each with its active products only. */
export async function getCategories(): Promise<Category[]> {
  return byOrder(load().categories).map((c) => ({ ...c, products: c.products.filter((p) => p.active) }));
}

export async function getRankingModes(): Promise<RankingMode[]> {
  return load().rankingModes;
}

export async function getExampleQuotes(): Promise<ExampleQuote[]> {
  return byOrder(load().quotes);
}

export async function getFaq(): Promise<FaqItem[]> {
  return byOrder(load().faq);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return byOrder(load().testimonials);
}

export type LegalPageId = 'privacy' | 'terms';

export async function getLegalDoc(id: LegalPageId): Promise<LegalDoc> {
  return load().legal[id];
}

/** Totals are always derived from the breakdown, never stored. */
export const quoteTotal = (b: QuoteBreakdown) => b.product + b.shipping + b.customs + b.serviceFee;
