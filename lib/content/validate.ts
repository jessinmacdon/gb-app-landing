import { locales } from '@/lib/i18n';
import type {
  Category,
  LegalDoc,
  ExampleQuote,
  FaqItem,
  RankingMode,
  SiteContent,
  Testimonial,
} from '@/lib/content/types';

export type ContentBundle = {
  site: SiteContent;
  categories: Category[];
  rankingModes: RankingMode[];
  quotes: ExampleQuote[];
  faq: FaqItem[];
  testimonials: Testimonial[];
  legal: Record<string, LegalDoc>;
  dictionaries: Record<string, unknown>;
};

const RANKING_IDS = ['price', 'quality', 'delivery', 'variety'];

/**
 * Checks the content for mistakes an editor could make (missing translation,
 * duplicate id, bad number). Returns human-readable problems; empty means valid.
 */
export function validateContent(c: ContentBundle): string[] {
  const errors: string[] = [];
  const err = (msg: string) => errors.push(msg);

  const localized = (v: unknown, where: string) => {
    for (const l of locales) {
      const s = (v as Record<string, unknown> | null)?.[l];
      if (typeof s !== 'string' || !s.trim()) err(`${where}: missing "${l}" text`);
    }
  };
  const uniqueIds = (items: { id: string }[], where: string) => {
    const seen = new Set<string>();
    for (const { id } of items) {
      if (!id) err(`${where}: item without id`);
      else if (seen.has(id)) err(`${where}: duplicate id "${id}"`);
      seen.add(id);
    }
  };
  const xaf = (n: unknown, where: string) => {
    if (!Number.isInteger(n) || (n as number) < 0) err(`${where}: must be a non-negative integer XAF amount`);
  };
  const url = (u: string | null, where: string) => {
    if (u !== null && !/^(https?:\/\/|\/|#)/.test(u)) err(`${where}: "${u}" is not an absolute URL, path or anchor`);
  };

  // Categories and products
  uniqueIds(c.categories, 'categories');
  uniqueIds(c.categories.flatMap((cat) => cat.products), 'products');
  for (const cat of c.categories) {
    localized(cat.name, `category ${cat.id} name`);
    for (const p of cat.products) {
      const at = `product ${p.id}`;
      localized(p.name, `${at} name`);
      localized(p.imageAlt, `${at} imageAlt`);
      if (!p.store?.trim()) err(`${at}: missing store`);
      xaf(p.estimatedTotalXAF, `${at} estimatedTotalXAF`);
      if (!(p.rating >= 0 && p.rating <= 5)) err(`${at}: rating must be between 0 and 5`);
      const d = p.deliveryDays;
      if (!d || !Number.isInteger(d.min) || !Number.isInteger(d.max) || d.min < 0 || d.min > d.max)
        err(`${at}: deliveryDays must be integers with 0 <= min <= max`);
      url(p.imageUrl, `${at} imageUrl`);
      url(p.productUrl, `${at} productUrl`);
    }
  }

  // Ranking modes
  uniqueIds(c.rankingModes, 'ranking modes');
  for (const m of c.rankingModes) {
    if (!RANKING_IDS.includes(m.id)) err(`ranking mode "${m.id}" is not one of ${RANKING_IDS.join(', ')}`);
    localized(m.label, `ranking mode ${m.id} label`);
    localized(m.description, `ranking mode ${m.id} description`);
  }

  // Example quotes
  uniqueIds(c.quotes, 'example quotes');
  if (c.quotes.length === 0) err('example quotes: at least one quote is required');
  const heroCount = c.quotes.filter((q) => q.isHeroPhoneExample).length;
  if (heroCount !== 1) err(`example quotes: exactly one quote must have isHeroPhoneExample (found ${heroCount})`);
  for (const q of c.quotes) {
    const at = `quote ${q.id}`;
    localized(q.tabLabel, `${at} tabLabel`);
    localized(q.productName, `${at} productName`);
    localized(q.imageAlt, `${at} imageAlt`);
    for (const k of ['product', 'shipping', 'customs', 'serviceFee'] as const) xaf(q.breakdownXAF?.[k], `${at} breakdownXAF.${k}`);
    url(q.imageUrl, `${at} imageUrl`);
    url(q.sampleUrl, `${at} sampleUrl`);
    if (!q.store?.trim()) err(`${at}: missing store`);
    if (q.originalPrice && !(q.originalPrice.amount > 0 && /^[A-Z]{3}$/.test(q.originalPrice.currency)))
      err(`${at}: originalPrice needs a positive amount and a 3-letter currency code`);
  }

  // FAQ
  uniqueIds(c.faq, 'faq');
  if (c.faq.filter((f) => f.defaultOpen).length > 1) err('faq: at most one item can be defaultOpen');
  for (const f of c.faq) {
    localized(f.question, `faq ${f.id} question`);
    localized(f.answer, `faq ${f.id} answer`);
  }

  // Testimonials
  uniqueIds(c.testimonials, 'testimonials');
  for (const t of c.testimonials) {
    if (!t.name?.trim()) err(`testimonial ${t.id}: missing name`);
    localized(t.quote, `testimonial ${t.id} quote`);
    localized(t.meta, `testimonial ${t.id} meta`);
    url(t.avatarUrl, `testimonial ${t.id} avatarUrl`);
  }

  // Site
  const s = c.site;
  if (!s.cities.some((city) => city.live)) err('site: at least one city must be live');
  for (const p of s.payments) localized(p.name, `payment ${p.id} name`);
  for (const [k, v] of Object.entries(s.images)) {
    localized(v.alt, `site image ${k} alt`);
    url(v.url, `site image ${k} url`);
  }
  for (const [i, x] of [...s.steps, ...s.features].entries()) {
    localized(x.title, `site steps/features #${i + 1} title`);
    localized(x.body, `site steps/features #${i + 1} body`);
  }
  for (const [k, v] of Object.entries({ ...s.appLinks, ...s.social, ...s.legal })) url(v, `site link ${k}`);
  if (!s.company?.legalName?.trim()) err('site: company.legalName is required');
  localized(s.company?.address, 'site company.address');

  // Legal pages
  for (const [name, doc] of Object.entries(c.legal)) {
    localized(doc.title, `legal ${name} title`);
    localized(doc.contact, `legal ${name} contact`);
    if (doc.effective) localized(doc.effective, `legal ${name} effective`);
    doc.intro.forEach((p, i) => localized(p, `legal ${name} intro #${i + 1}`));
    if (!doc.sections.length) err(`legal ${name}: no sections`);
    doc.sections.forEach((sec, i) => {
      const at = `legal ${name} section #${i + 1}`;
      localized(sec.heading, `${at} heading`);
      sec.blocks.forEach((b, j) => {
        if (b.type === 'list') {
          if (!b.items.length) err(`${at} block #${j + 1}: empty list`);
          b.items.forEach((it, k) => {
            if (it.term) localized(it.term, `${at} block #${j + 1} item #${k + 1} term`);
            localized(it.text, `${at} block #${j + 1} item #${k + 1}`);
          });
        } else if (['p', 'h3', 'note'].includes(b.type)) localized(b.text, `${at} block #${j + 1}`);
        else err(`${at} block #${j + 1}: unknown type "${(b as { type: string }).type}"`);
      });
    });
  }
  if (!c.categories.some((cat) => cat.id === s.whatWeShip.defaultCategoryId))
    err(`site: whatWeShip.defaultCategoryId "${s.whatWeShip.defaultCategoryId}" does not match a category`);
  if (!c.rankingModes.some((m) => m.id === s.whatWeShip.defaultRankingMode))
    err(`site: whatWeShip.defaultRankingMode "${s.whatWeShip.defaultRankingMode}" does not match a ranking mode`);
  if (!(Number.isInteger(s.whatWeShip.maxProducts) && s.whatWeShip.maxProducts > 0))
    err('site: whatWeShip.maxProducts must be a positive integer');

  // UI dictionaries must have the same keys in every language.
  const keys = (o: unknown, prefix = ''): string[] =>
    o && typeof o === 'object'
      ? Object.entries(o).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k))
      : [prefix];
  const [base, ...rest] = locales;
  const baseKeys = new Set(keys(c.dictionaries[base]));
  for (const l of rest) {
    const lk = new Set(keys(c.dictionaries[l]));
    for (const k of baseKeys) if (!lk.has(k)) err(`i18n/${l}.json: missing key "${k}"`);
    for (const k of lk) if (!baseKeys.has(k)) err(`i18n/${l}.json: extra key "${k}" not in ${base}.json`);
  }

  return errors;
}
