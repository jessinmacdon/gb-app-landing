import { PricingDemo } from '@/components/PricingDemo';
import { quoteTotal, type Dictionary } from '@/lib/content';
import type { ExampleQuote, SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

type Props = { lang: Locale; t: Dictionary; site: SiteContent; quotes: ExampleQuote[] };

/** Pricing transparency, shown by doing: paste a link, get an itemised example quote. */
export function Pricing({ lang, t, site, quotes }: Props) {
  return (
    <section id="pricing" className="pricing" aria-labelledby="pricing-title">
      <div className="container pricing__grid">
        <PricingDemo
          quotes={quotes.map((q) => ({
            id: q.id,
            tabLabel: q.tabLabel[lang],
            productName: q.productName[lang],
            store: q.store,
            storeLine: q.storeLine,
            originalPrice: q.originalPrice,
            sampleUrl: q.sampleUrl,
            breakdownXAF: q.breakdownXAF,
            totalXAF: quoteTotal(q.breakdownXAF),
          }))}
          defaultQuoteId={(quotes.find((q) => !q.isHeroPhoneExample) ?? quotes[0]).id}
          stores={[...new Set([...site.stores, ...quotes.map((q) => q.store)])]}
          lang={lang}
          rows={t.rows}
          copy={{ ...t.demo, originalPrice: t.originalPrice }}
          appLinks={site.appLinks}
        >
          <span className="eyebrow eyebrow--dark-bg">{t.priceEyebrow}</span>
          <h2 className="pricing__title" id="pricing-title">
            {t.priceTitle}
          </h2>
          <p className="pricing__sub">{t.priceSub}</p>
        </PricingDemo>
      </div>
    </section>
  );
}
