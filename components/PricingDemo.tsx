'use client';

import { useEffect, useRef, useState } from 'react';
import { GetAppLink } from '@/components/GetAppLink';
import type { Dictionary } from '@/lib/content';
import type { Money, QuoteBreakdown } from '@/lib/content/types';
import { formatMoney, formatXAF } from '@/lib/format';
import { detectStore } from '@/lib/stores';
import { track } from '@/lib/track';
import { useStickyState } from '@/lib/useStickyState';

export type DemoQuote = {
  id: string;
  tabLabel: string;
  productName: string;
  store: string;
  storeLine: string;
  originalPrice: Money | null;
  sampleUrl: string | null;
  breakdownXAF: QuoteBreakdown;
  totalXAF: number;
};

type Props = {
  /** Eyebrow, title and copy rendered above the link field. */
  children: React.ReactNode;
  quotes: DemoQuote[];
  /** Shown first; the hero already shows a different example. */
  defaultQuoteId: string;
  /** Every store the site names, for recognising pasted links. */
  stores: string[];
  lang: 'en' | 'fr';
  rows: Dictionary['rows'];
  copy: Dictionary['demo'] & { originalPrice: string };
  appLinks: { googlePlay: string; appStore: string };
};

const ROWS = [
  ['product', 'product'],
  ['shipping', 'shipping'],
  ['customs', 'customs'],
  ['fee', 'serviceFee'],
] as const;

const STEP_MS = 650;
const SYMBOL: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' };

/** "€1 = 656 FCFA", derived from the example itself so it always adds up. */
const rateLine = (q: DemoQuote) =>
  q.originalPrice
    ? `${SYMBOL[q.originalPrice.currency] ?? q.originalPrice.currency + ' '}1 = ${formatXAF(
        q.breakdownXAF.product / q.originalPrice.amount,
      )} FCFA`
    : null;

/** Accepts "zalando.com/…" as well as full https:// links. */
const withScheme = (v: string) => {
  const t = v.trim();
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : `https://${t}`;
};

/**
 * The pricing section is the app's first step, simulated: paste any product
 * link, get an itemised quote. It never pretends to price the pasted product;
 * every receipt is labelled as an example, and says so when it stands in for
 * a link it can't really read.
 */
export function PricingDemo({ children, quotes, defaultQuoteId, stores, lang, rows, copy, appLinks }: Props) {
  const [quoteId, setQuoteId] = useStickyState('pricing.quote', defaultQuoteId);
  const [value, setValue] = useState('');
  const [phase, setPhase] = useState<'idle' | 'error' | 0 | 1>('idle');
  const [notice, setNotice] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const quote = quotes.find((q) => q.id === quoteId) ?? quotes[0];
  if (!quote) return null;

  const run = (raw: string, example: DemoQuote | null) => {
    timers.current.forEach(clearTimeout);
    const link = withScheme(raw);
    const found = detectStore(link, stores);
    if (!found) {
      setPhase('error');
      return;
    }
    const target = example ?? quotes.find((q) => q.store === found.store) ?? quotes[0];
    const isSample = !!example || link === target.sampleUrl;
    const msg = isSample
      ? null
      : (found.store === target.store ? copy.matchedStore : copy.unknownStore)
          .replace('{host}', found.host)
          .replace('{store}', target.store);
    track({ event: 'demo_quote', store: found.store, sample: isSample });
    setPhase(0);
    timers.current = [
      window.setTimeout(() => setPhase(1), STEP_MS),
      window.setTimeout(() => {
        setQuoteId(target.id);
        setNotice(msg);
        setPhase('idle');
      }, STEP_MS * 2),
    ];
  };

  const busy = phase === 0 || phase === 1;
  const rate = rateLine(quote);

  return (
    <>
      <div className="pricing__copy">
        {children}
        <form
          className="quote-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) run(value, null);
          }}
        >
          <label className="quote-form__label" htmlFor="quote-link">
            {copy.label}
          </label>
          <div className="quote-form__field">
            <input
              id="quote-link"
              className="quote-form__input"
              type="url"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              placeholder={copy.placeholder}
              value={value}
              aria-invalid={phase === 'error'}
              aria-describedby={phase === 'error' ? 'quote-error' : undefined}
              onChange={(e) => {
                setValue(e.target.value);
                if (phase === 'error') setPhase('idle');
              }}
            />
            <button className="quote-form__submit" type="submit" disabled={busy || !value.trim()}>
              {copy.submit}
            </button>
          </div>
          {phase === 'error' ? (
            <p className="quote-form__error" id="quote-error" role="alert">
              {copy.invalid}
            </p>
          ) : null}
        </form>
        <div className="pricing__try">
          <span className="pricing__try-label">{copy.tryLabel}</span>
          <div className="quote-tabs">
            {quotes.map((q) => (
              <button
                key={q.id}
                type="button"
                className="quote-tab"
                aria-pressed={q.id === quote.id && !notice}
                disabled={busy}
                onClick={() => {
                  if (q.sampleUrl) setValue(q.sampleUrl);
                  run(q.sampleUrl ?? `https://${q.store.toLowerCase()}.com`, q);
                }}
              >
                {q.tabLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="receipt" aria-live="polite" aria-busy={busy}>
        {busy ? (
          <ol className="quote-steps">
            {[copy.reading, copy.pricing].map((label, i) => (
              <li key={label} className="quote-steps__step" data-state={i < phase ? 'done' : i === phase ? 'active' : 'todo'}>
                {label}
              </li>
            ))}
          </ol>
        ) : (
          <>
            {notice ? <p className="receipt__notice">{notice}</p> : null}
            <div className="receipt__head">
              <div className="receipt__product">
                <span className="receipt__kicker">{copy.exampleKicker.replace('{store}', quote.store)}</span>
                <span className="receipt__name">{quote.productName}</span>
                <span className="receipt__store">{quote.storeLine}</span>
              </div>
            </div>
            {quote.originalPrice ? (
              <div className="receipt__origin">
                <p className="receipt__origin-row">
                  <span>{copy.originalPrice.replace('{store}', quote.store)}</span>
                  <span className="receipt__origin-value">{formatMoney(quote.originalPrice, lang)}</span>
                </p>
                {rate ? (
                  <p className="receipt__origin-row receipt__rate">
                    <span>{copy.rateLabel}</span>
                    <span>{rate}</span>
                  </p>
                ) : null}
              </div>
            ) : null}
            <dl className="receipt__rows">
              {ROWS.map(([label, key]) => (
                <div key={key} className="receipt__row">
                  <dt>{rows[label]}</dt>
                  <dd>{formatXAF(quote.breakdownXAF[key])}</dd>
                </div>
              ))}
            </dl>
            <div className="receipt__total">
              <span className="receipt__total-label">{copy.exampleTotal}</span>
              <span className="receipt__total-value">
                {formatXAF(quote.totalXAF)} <small>FCFA</small>
              </span>
            </div>
            <p className="receipt__disclaimer">{copy.demoNote}</p>
            <GetAppLink className="receipt__cta" links={appLinks} section="pricing-demo">
              {copy.cta}
            </GetAppLink>
          </>
        )}
      </div>
    </>
  );
}
