import type { Localized } from '@/lib/i18n';

export type RankingModeId = 'price' | 'quality' | 'delivery' | 'variety';

export type Product = {
  id: string;
  name: Localized;
  /** Display name, e.g. "Amazon". */
  store: string;
  /** Source URL (future: "order this" prefill in the app). */
  productUrl: string | null;
  /** Square, at least 256×256; rendered 64×64. Falls back to the striped placeholder. */
  imageUrl: string | null;
  imageAlt: Localized;
  /** Delivered total: product + shipping + customs + fee. */
  estimatedTotalXAF: number;
  /** 0–5, one decimal. */
  rating: number;
  deliveryDays: { min: number; max: number };
  active: boolean;
};

export type Category = {
  id: string;
  order: number;
  name: Localized;
  products: Product[];
};

export type RankingMode = {
  id: RankingModeId;
  label: Localized;
  description: Localized;
};

export type QuoteBreakdown = {
  product: number;
  shipping: number;
  customs: number;
  serviceFee: number;
};

export type ExampleQuote = {
  id: string;
  order: number;
  tabLabel: Localized;
  productName: Localized;
  /** e.g. "Zalando · EU 42" */
  storeLine: string;
  /** Text shown in the hero phone's pasted-link field. */
  linkPreview: string | null;
  imageUrl: string | null;
  imageAlt: Localized;
  breakdownXAF: QuoteBreakdown;
  /** The hero phone mockup shows the quote with this flag. */
  isHeroPhoneExample: boolean;
};

export type FaqItem = {
  id: string;
  order: number;
  question: Localized;
  /** Plain text; inline links may be written as [label](https://…). */
  answer: Localized;
  defaultOpen: boolean;
};

export type Testimonial = {
  id: string;
  order: number;
  name: string;
  avatarUrl: string | null;
  quote: Localized;
  meta: Localized;
  /** True while the quote is invented; replace with real customers before launch. */
  placeholder: boolean;
};

export type ImageSlotContent = {
  url: string | null;
  alt: Localized;
  /** Shown in the striped placeholder while url is null. */
  placeholderLabel: string;
};

export type PaymentMethod = {
  id: string;
  name: Localized;
  tileTitle: string | null;
  tileSubtitle: string | null;
  logoUrl: string | null;
  status: 'live' | 'coming_soon';
};

export type City = { name: string; live: boolean };

export type SocialNetwork = 'instagram' | 'facebook' | 'x' | 'whatsapp' | 'tiktok';

export type SiteContent = {
  stores: string[];
  cities: City[];
  payments: PaymentMethod[];
  appLinks: { googlePlay: string; appStore: string };
  social: Record<SocialNetwork, string>;
  legal: { privacy: string; terms: string; refund: string };
  steps: { order: number; title: Localized; body: Localized }[];
  features: { order: number; title: Localized; body: Localized }[];
  images: { hero: ImageSlotContent; why: ImageSlotContent; cta: ImageSlotContent };
  whatWeShip: {
    defaultCategoryId: string;
    defaultRankingMode: RankingModeId;
    maxProducts: number;
  };
};
