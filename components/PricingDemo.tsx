'use client';

import { useEffect, useRef, useState } from 'react';
import { GetAppLink } from '@/components/GetAppLink';
import type { Dictionary } from '@/lib/content';
import type { Money, QuoteBreakdown } from '@/lib/content/types';
import { formatMoney, formatXAF } from '@/lib/format';
import { prefersReducedMotion, useCountUp } from '@/lib/motion';
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
  appLinks: { googlePlay: string; appStore: string | null };
};

const ROWS = [
  ['product', 'product'],
  ['shipping', 'shipping'],
  ['customs', 'customs'],
  ['fee', 'serviceFee'],
] as const;

const STEP_MS = 650;
const SYMBOL: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' };

/**
 * "€1 = 656 FCFA" (EN) or "1 € = 656 FCFA" (FR), derived from the example
 * itself so it always adds up.
 */
const rateLine = (q: DemoQuote, lang: 'en' | 'fr') => {
  if (!q.originalPrice) return null;
  const symbol = SYMBOL[q.originalPrice.currency] ?? q.originalPrice.currency;
  const fcfa = formatXAF(q.breakdownXAF.product / q.originalPrice.amount);
  return lang === 'fr' ? `1\u00a0${symbol} = ${fcfa} FCFA` : `${symbol}1 = ${fcfa} FCFA`;
};

/**
 * Finds the link in what was pasted. Store apps' share buttons paste text like
 * "Look what I found on SHEIN https://…", and people often drop the https://.
 */
export const extractLink = (v: string) => {
  const text = v.trim();
  const full = text.match(/https?:\/\/[^\s<>"']+/i);
  if (full) return full[0];
  const bare = text.match(/(?:^|\s)((?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s<>"']*)?)/i);
  return bare ? `https://${bare[1]}` : text;
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
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  // Bumped each time a quote arrives: replays the receipt's add-up sequence.
  const [runKey, setRunKey] = useState(0);
  const timers = useRef<number[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const totalRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // On phones the receipt lands below the form: bring the total into view so
  // the answer to "what will it cost?" isn't off-screen.
  useEffect(() => {
    const el = totalRef.current;
    if (!runKey || !el || !window.matchMedia('(max-width: 719px)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top >= 80 && r.bottom <= window.innerHeight - 16) return;
    el.scrollIntoView({ block: 'center', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [runKey]);

  const quote = quotes.find((q) => q.id === quoteId) ?? quotes[0];
  const total = useCountUp(quote?.totalXAF ?? 0, runKey);
  if (!quote) return null;

  const run = (raw: string, example: DemoQuote | null) => {
    timers.current.forEach(clearTimeout);
    setHint(false);
    const link = extractLink(raw);
    const found = detectStore(link, stores);
    if (!found) {
      setNotice(null);
      setPendingId(null);
      setPhase('error');
      return;
    }
    const target = example ?? quotes.find((q) => q.store === found.store) ?? quotes[0];
    setPendingId(target.id);
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
        setPendingId(null);
        setPhase('idle');
        setRunKey((k) => k + 1);
      }, STEP_MS * 2),
    ];
  };

  const busy = phase === 0 || phase === 1;
  const rate = rateLine(quote, lang);
  const pressedId = pendingId ?? (notice ? null : quote.id);
  // Only the outcome is announced, not every row of the receipt.
  const colon = lang === 'fr' ? '\u202f: ' : ': ';
  const announcement = busy
    ? copy.pricing
    : runKey
      ? `${copy.exampleKicker.replace('{store}', quote.store)}${colon}${quote.productName}. ${copy.exampleTotal}${colon}${formatXAF(quote.totalXAF)} FCFA`
      : '';

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
            else {
              setHint(true);
              input.current?.focus();
            }
          }}
        >
          <label className="quote-form__label" htmlFor="quote-link">
            {copy.label}
          </label>
          <div className="quote-form__field">
            <input
              ref={input}
              id="quote-link"
              className="quote-form__input"
              type="url"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              placeholder={copy.placeholder}
              value={value}
              aria-invalid={phase === 'error'}
              aria-describedby={phase === 'error' ? 'quote-error' : hint ? 'quote-hint' : undefined}
              onChange={(e) => {
                setValue(e.target.value);
                setHint(false);
                if (phase === 'error') setPhase('idle');
              }}
            />
            <button className="quote-form__submit" type="submit" disabled={busy}>
              {copy.submit}
            </button>
          </div>
          {phase === 'error' ? (
            <p className="quote-form__error" id="quote-error" role="alert">
              {copy.invalid}
            </p>
          ) : hint ? (
            <p className="quote-form__hint" id="quote-hint">
              {copy.empty}
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
                aria-pressed={q.id === pressedId}
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

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
      <div className="receipt" aria-busy={busy}>
        {busy ? (
          <ol className="quote-steps">
            {[copy.reading, copy.pricing].map((label, i) => (
              <li key={label} className="quote-steps__step" data-state={i < phase ? 'done' : i === phase ? 'active' : 'todo'}>
                {label}
              </li>
            ))}
          </ol>
        ) : (
          <div className="receipt__body" key={runKey} data-enter={runKey > 0 || undefined}>
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
                {rate && quote.originalPrice.currency === 'EUR' ? (
                  <p className="receipt__rate-note">{copy.rateNote}</p>
                ) : null}
              </div>
            ) : null}
            <dl className="receipt__rows">
              {ROWS.map(([label, key], i) => (
                <div key={key} className="receipt__row" style={{ '--i': i } as React.CSSProperties}>
                  <dt>{rows[label]}</dt>
                  <dd>{formatXAF(quote.breakdownXAF[key])}</dd>
                </div>
              ))}
            </dl>
            <div className="receipt__total" ref={totalRef}>
              <span className="receipt__total-label">{copy.exampleTotal}</span>
              <span className="receipt__total-value">
                {formatXAF(total)} <small>FCFA</small>
              </span>
            </div>
            <p className="receipt__disclaimer">{copy.demoNote}</p>
            <GetAppLink className="receipt__cta" links={appLinks} section="pricing-demo">
              {copy.cta}
            </GetAppLink>
          </div>
        )}
      </div>
    </>
  );
}
