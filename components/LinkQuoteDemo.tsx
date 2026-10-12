'use client';

import { useEffect, useRef, useState } from 'react';
import { GetAppLink } from '@/components/GetAppLink';
import type { Dictionary } from '@/lib/content';
import type { QuoteView } from '@/components/QuoteExplorer';
import { formatMoney, formatXAF } from '@/lib/format';
import { detectStore } from '@/lib/stores';
import { track } from '@/lib/track';

export type DemoQuote = QuoteView & { sampleUrl: string | null; tabLabel: string };

type Props = {
  quotes: DemoQuote[];
  /** Every store the site names, for recognising pasted links. */
  stores: string[];
  lang: 'en' | 'fr';
  rows: Dictionary['rows'];
  copy: Dictionary['demo'] & { exampleTag: string; originalPrice: string };
  appLinks: { googlePlay: string; appStore: string };
};

type State =
  | { kind: 'idle' }
  | { kind: 'error' }
  | { kind: 'working'; step: 0 | 1 }
  | { kind: 'done'; quote: DemoQuote; notice: string | null };

const ROWS = [
  ['product', 'product'],
  ['shipping', 'shipping'],
  ['customs', 'customs'],
  ['fee', 'serviceFee'],
] as const;

const STEP_MS = 650;

/**
 * Simulated version of the app's first step: paste any product link, get an
 * itemised quote. It never pretends to price the pasted product; for stores
 * without a sample it says so and shows an example instead.
 */
export function LinkQuoteDemo({ quotes, stores, lang, rows, copy, appLinks }: Props) {
  const [value, setValue] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = (link: string, sample: boolean) => {
    timers.current.forEach(clearTimeout);
    const found = detectStore(link, stores);
    if (!found || quotes.length === 0) {
      setState({ kind: 'error' });
      return;
    }
    const match = quotes.find((q) => q.store === found.store);
    const quote = match ?? quotes[0];
    const notice = match
      ? null
      : copy.unknownStore.replace('{host}', found.host).replace('{store}', quote.store);
    track({ event: 'demo_quote', store: found.store, sample });
    setState({ kind: 'working', step: 0 });
    timers.current = [
      window.setTimeout(() => setState({ kind: 'working', step: 1 }), STEP_MS),
      window.setTimeout(() => setState({ kind: 'done', quote, notice }), STEP_MS * 2),
    ];
  };

  const busy = state.kind === 'working';

  return (
    <div className="demo">
      <div className="demo__intro">
        <h3 className="demo__title">{copy.title}</h3>
        <p className="demo__sub">{copy.sub}</p>
        <form
          className="demo__form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            run(value, false);
          }}
        >
          <label className="demo__label" htmlFor="demo-link">
            {copy.label}
          </label>
          <div className="demo__field">
            <input
              id="demo-link"
              className="demo__input"
              type="url"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              placeholder={copy.placeholder}
              value={value}
              aria-invalid={state.kind === 'error'}
              aria-describedby={state.kind === 'error' ? 'demo-error' : undefined}
              onChange={(e) => {
                setValue(e.target.value);
                if (state.kind === 'error') setState({ kind: 'idle' });
              }}
            />
            <button className="demo__submit" type="submit" disabled={busy || !value.trim()}>
              {copy.submit}
            </button>
          </div>
          {state.kind === 'error' ? (
            <p className="demo__error" id="demo-error" role="alert">
              {copy.invalid}
            </p>
          ) : null}
        </form>
        <div className="demo__try">
          <span className="demo__try-label">{copy.tryLabel}</span>
          <div className="demo__chips">
            {quotes
              .filter((q) => q.sampleUrl)
              .map((q) => (
                <button
                  key={q.id}
                  type="button"
                  className="demo__chip"
                  disabled={busy}
                  onClick={() => {
                    setValue(q.sampleUrl!);
                    run(q.sampleUrl!, true);
                  }}
                >
                  {q.tabLabel}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="demo__result" aria-live="polite" aria-busy={busy}>
        {state.kind === 'working' ? (
          <ol className="demo__steps">
            {[copy.reading, copy.pricing].map((label, i) => (
              <li key={label} className="demo__step" data-state={i < state.step ? 'done' : i === state.step ? 'active' : 'todo'}>
                {label}
              </li>
            ))}
          </ol>
        ) : state.kind === 'done' ? (
          <div className="demo__quote">
            {state.notice ? <p className="demo__notice">{state.notice}</p> : null}
            <div className="receipt__head">
              <div className="receipt__product">
                <span className="demo__quote-kicker">{copy.resultTitle}</span>
                <span className="receipt__name">{state.quote.productName}</span>
                <span className="receipt__store">{state.quote.storeLine}</span>
              </div>
              <span className="receipt__tag">{copy.exampleTag}</span>
            </div>
            {state.quote.originalPrice ? (
              <p className="receipt__origin">
                <span>{copy.originalPrice.replace('{store}', state.quote.store)}</span>
                <span className="receipt__origin-value">{formatMoney(state.quote.originalPrice, lang)}</span>
              </p>
            ) : null}
            <dl className="receipt__rows demo__rows">
              {ROWS.map(([label, key]) => (
                <div key={key} className="receipt__row">
                  <dt>{rows[label]}</dt>
                  <dd>{formatXAF(state.quote.breakdownXAF[key])}</dd>
                </div>
              ))}
            </dl>
            <div className="receipt__total">
              <span className="receipt__total-label">{rows.total}</span>
              <span className="receipt__total-value demo__total">
                {formatXAF(state.quote.totalXAF)} <small>FCFA</small>
              </span>
            </div>
            <p className="receipt__disclaimer">{copy.demoNote}</p>
            <GetAppLink className="demo__cta" links={appLinks} section="demo">
              {copy.cta}
            </GetAppLink>
          </div>
        ) : (
          <div className="demo__empty" aria-hidden="true">
            {ROWS.map(([label]) => (
              <div key={label} className="receipt__row">
                <span>{rows[label]}</span>
                <span className="demo__dash">—</span>
              </div>
            ))}
            <div className="receipt__total">
              <span className="receipt__total-label">{rows.total}</span>
              <span className="receipt__total-value demo__total">— <small>FCFA</small></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
