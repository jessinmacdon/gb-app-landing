'use client';

import type { Dictionary } from '@/lib/content';
import type { QuoteBreakdown } from '@/lib/content/types';
import { formatXAF } from '@/lib/format';
import { track } from '@/lib/track';
import { useStickyState } from '@/lib/useStickyState';

export type QuoteView = {
  id: string;
  tabLabel: string;
  productName: string;
  storeLine: string;
  breakdownXAF: QuoteBreakdown;
  totalXAF: number;
};

type Props = {
  /** Eyebrow, title and copy rendered above the quote pills. */
  children: React.ReactNode;
  quotes: QuoteView[];
  rows: Dictionary['rows'];
  copy: { priceTry: string; exampleTag: string; priceDisclaimer: string };
};

const ROWS = [
  ['product', 'product'],
  ['shipping', 'shipping'],
  ['customs', 'customs'],
  ['fee', 'serviceFee'],
] as const;

/** Pricing section body: intro and quote pills on the left, receipt card on the right. */
export function QuoteExplorer({ children, quotes, rows, copy }: Props) {
  const [quoteId, setQuoteId] = useStickyState('pricing.quote', quotes[0]?.id);
  const quote = quotes.find((q) => q.id === quoteId) ?? quotes[0];
  if (!quote) return null;

  return (
    <>
      <div className="pricing__copy">
        {children}
        <div className="pricing__try">
          <span className="pricing__try-label" id="quote-tabs-label">
            {copy.priceTry}
          </span>
          <div className="quote-tabs" role="tablist" aria-labelledby="quote-tabs-label">
            {quotes.map((q) => (
              <button
                key={q.id}
                type="button"
                role="tab"
                aria-selected={q.id === quote.id}
                aria-controls="quote-receipt"
                className="quote-tab"
                onClick={() => {
                  setQuoteId(q.id);
                  track({ event: 'quote_select', quoteId: q.id });
                }}
              >
                {q.tabLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="receipt" id="quote-receipt" role="tabpanel" aria-live="polite">
        <div className="receipt__head">
          <div className="receipt__product">
            <span className="receipt__name">{quote.productName}</span>
            <span className="receipt__store">{quote.storeLine}</span>
          </div>
          <span className="receipt__tag">{copy.exampleTag}</span>
        </div>
        <dl className="receipt__rows">
          {ROWS.map(([label, key]) => (
            <div key={key} className="receipt__row">
              <dt>{rows[label]}</dt>
              <dd>{formatXAF(quote.breakdownXAF[key])}</dd>
            </div>
          ))}
        </dl>
        <div className="receipt__total">
          <span className="receipt__total-label">{rows.total}</span>
          <span className="receipt__total-value">
            {formatXAF(quote.totalXAF)} <small>FCFA</small>
          </span>
        </div>
        <p className="receipt__disclaimer">{copy.priceDisclaimer}</p>
      </div>
    </>
  );
}
