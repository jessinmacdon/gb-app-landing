import { QuoteExplorer } from '@/components/QuoteExplorer';
import { quoteTotal, type Dictionary } from '@/lib/content';
import type { ExampleQuote } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

export function Pricing({ lang, t, quotes }: { lang: Locale; t: Dictionary; quotes: ExampleQuote[] }) {
  return (
    <section id="pricing" className="pricing" aria-labelledby="pricing-title">
      <div className="container pricing__grid">
        <QuoteExplorer
          quotes={quotes.map((q) => ({
            id: q.id,
            tabLabel: q.tabLabel[lang],
            productName: q.productName[lang],
            store: q.store,
            storeLine: q.storeLine,
            originalPrice: q.originalPrice,
            breakdownXAF: q.breakdownXAF,
            totalXAF: quoteTotal(q.breakdownXAF),
          }))}
          defaultQuoteId={(quotes.find((q) => !q.isHeroPhoneExample) ?? quotes[0]).id}
          lang={lang}
          rows={t.rows}
          copy={{
            priceTry: t.priceTry,
            exampleTag: t.exampleTag,
            priceDisclaimer: t.priceDisclaimer,
            originalPrice: t.originalPrice,
          }}
        >
          <span className="eyebrow eyebrow--dark-bg">{t.priceEyebrow}</span>
          <h2 className="pricing__title" id="pricing-title">
            {t.priceTitle}
          </h2>
          <p className="pricing__sub">{t.priceSub}</p>
        </QuoteExplorer>
      </div>
    </section>
  );
}
