import { LinkQuoteDemo } from '@/components/LinkQuoteDemo';
import { quoteTotal, type Dictionary } from '@/lib/content';
import type { ExampleQuote, SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

type Props = { lang: Locale; t: Dictionary; site: SiteContent; quotes: ExampleQuote[] };

export function HowItWorks({ lang, t, site, quotes }: Props) {
  return (
    <section id="how" className="container how" aria-labelledby="how-title">
      <div className="section-head">
        <span className="eyebrow">{t.howEyebrow}</span>
        <h2 className="h2" id="how-title">
          {t.howTitle}
        </h2>
      </div>
      <ol className="how__grid">
        {site.steps.map((s, i) => (
          <li key={s.order} className="step">
            <span className="step__n" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="step__title">{s.title[lang]}</h3>
            <p className="step__body">{s.body[lang]}</p>
          </li>
        ))}
      </ol>
      <LinkQuoteDemo
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
        stores={[...new Set([...site.stores, ...quotes.map((q) => q.store)])]}
        lang={lang}
        rows={t.rows}
        copy={{ ...t.demo, exampleTag: t.exampleTag, originalPrice: t.originalPrice }}
        appLinks={site.appLinks}
      />
    </section>
  );
}
