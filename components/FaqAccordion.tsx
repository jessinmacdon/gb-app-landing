'use client';

import { InlineLinks } from '@/components/InlineLinks';
import { track } from '@/lib/track';
import { useStickyState } from '@/lib/useStickyState';

export type FaqView = { id: string; question: string; answer: string };

/** Single-open accordion; clicking the open item closes it. */
export function FaqAccordion({ items, defaultOpenId }: { items: FaqView[]; defaultOpenId: string | null }) {
  const [openId, setOpenId] = useStickyState<string | null>('faq.open', defaultOpenId);

  return (
    <div className="faq__list">
      {items.map((f) => {
        const open = f.id === openId;
        return (
          <div key={f.id} className="faq__item">
            <h3 className="faq__q">
              <button
                type="button"
                className="faq__btn"
                id={`faq-q-${f.id}`}
                aria-expanded={open}
                aria-controls={`faq-a-${f.id}`}
                onClick={() => {
                  setOpenId(open ? null : f.id);
                  if (!open) track({ event: 'faq_open', faqId: f.id });
                }}
              >
                <span className="faq__q-text">{f.question}</span>
                <span className="faq__icon" aria-hidden="true">
                  {open ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div id={`faq-a-${f.id}`} role="region" aria-labelledby={`faq-q-${f.id}`} hidden={!open}>
              <p className="faq__a">
                <InlineLinks text={f.answer} />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
