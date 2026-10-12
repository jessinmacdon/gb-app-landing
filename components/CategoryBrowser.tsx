'use client';

import { useEffect, useRef } from 'react';
import { GetAppLink } from '@/components/GetAppLink';
import { StarIcon } from '@/components/Icons';
import { ImageSlot, Monogram } from '@/components/ImageSlot';
import type { RankingModeId } from '@/lib/content/types';
import { formatDays, formatRating, formatXAF } from '@/lib/format';
import { rankProducts } from '@/lib/ranking';
import { onRovingKeyDown } from '@/lib/rovingTabs';
import { storeMonogram } from '@/lib/stores';
import { track } from '@/lib/track';
import { useStickyState } from '@/lib/useStickyState';

export type ProductView = {
  id: string;
  name: string;
  store: string;
  imageUrl: string | null;
  imageAlt: string;
  estimatedTotalXAF: number;
  rating: number;
  deliveryDays: { min: number; max: number };
};

export type CategoryView = { id: string; name: string; products: ProductView[] };
export type RankingModeView = { id: RankingModeId; label: string; description: string };

type Props = {
  categories: CategoryView[];
  modes: RankingModeView[];
  defaultCategoryId: string;
  defaultMode: RankingModeId;
  maxProducts: number;
  /** Labels the list as examples while products are placeholder data. */
  sampleData: boolean;
  appLinks: { googlePlay: string; appStore: string };
  copy: {
    popularIn: string;
    rankBy: string;
    picksNote: string;
    picksCta: string;
    picksEmpty: string;
    daysUnit: string;
    sampleTag: string;
    tabsLabel: string;
  };
};

/** Highlighted chip for the metric the list is currently ranked by. */
const chip = (active: boolean, extra = '') => `chip${active ? ' chip--hi' : ''}${extra}`;

export function CategoryBrowser({
  categories,
  modes,
  defaultCategoryId,
  defaultMode,
  maxProducts,
  sampleData,
  appLinks,
  copy,
}: Props) {
  const [catId, setCatId] = useStickyState('ship.category', defaultCategoryId);
  const [mode, setMode] = useStickyState<RankingModeId>('ship.mode', defaultMode);
  const pillRefs = useRef(new Map<string, HTMLButtonElement>());
  const pillRow = useRef<HTMLDivElement>(null);

  // On the swipeable mobile row, keep the chosen pill fully visible. Only the
  // row scrolls sideways; the page never moves.
  const revealPill = (id: string, smooth: boolean) => {
    const row = pillRow.current;
    const pill = pillRefs.current.get(id);
    if (!row || !pill || row.scrollWidth <= row.clientWidth) return;
    const pad = parseFloat(getComputedStyle(row).paddingLeft) || 0;
    const r = row.getBoundingClientRect();
    const p = pill.getBoundingClientRect();
    if (p.left >= r.left + pad && p.right <= r.right - pad) return;
    // Align the pill to the row's start: that's also a scroll-snap point, so it stays put.
    const to = row.scrollLeft + (p.left - r.left) - pad;
    row.scrollTo({ left: to, behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    // Mount only: later changes come from selectCategory.
    revealPill(catId, false);
  }, []);

  const category = categories.find((c) => c.id === catId) ?? categories[0];
  const activeMode = modes.find((m) => m.id === mode) ?? modes[0];
  if (!category || !activeMode) return null;

  const picks = rankProducts(category.products, activeMode.id).slice(0, maxProducts);

  const selectCategory = (id: string) => {
    setCatId(id);
    track({ event: 'category_select', categoryId: id });
    revealPill(id, true);
  };

  return (
    <div className="ship__browser">
      <div className="cat-pills" ref={pillRow} role="tablist" aria-label={copy.tabsLabel} onKeyDown={onRovingKeyDown}>
        {categories.map((c) => (
          <button
            key={c.id}
            ref={(el) => {
              if (el) pillRefs.current.set(c.id, el);
              else pillRefs.current.delete(c.id);
            }}
            type="button"
            role="tab"
            id={`cat-tab-${c.id}`}
            aria-selected={c.id === category.id}
            tabIndex={c.id === category.id ? 0 : -1}
            aria-controls="ship-picks"
            className="cat-pill"
            onClick={() => selectCategory(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="picks" id="ship-picks" role="tabpanel" aria-labelledby={`cat-tab-${category.id}`}>
        <div className="picks__head">
          <div className="picks__heading">
            <span className="picks__kicker">
              {copy.popularIn}
              {sampleData ? <span className="picks__sample">{copy.sampleTag}</span> : null}
            </span>
            <h3 className="picks__cat">{category.name}</h3>
            <span className="picks__desc" aria-live="polite">
              {activeMode.description}
            </span>
          </div>
          <div className="rank-by">
            <span className="rank-by__label" id="rank-by-label">
              {copy.rankBy}
            </span>
            <div className="rank-by__seg" role="radiogroup" aria-labelledby="rank-by-label" onKeyDown={onRovingKeyDown}>
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={m.id === activeMode.id}
                  tabIndex={m.id === activeMode.id ? 0 : -1}
                  className="rank-by__opt"
                  onClick={() => {
                    setMode(m.id);
                    track({ event: 'ranking_select', mode: m.id, categoryId: category.id });
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {picks.length === 0 ? (
          <p className="picks__empty">{copy.picksEmpty}</p>
        ) : (
          <ol className="picks__list">
            {picks.map((p, i) => (
              <li key={p.id} className="pick">
                <span className={`pick__rank${i === 0 ? ' pick__rank--first' : ''}`}>{i + 1}</span>
                <ImageSlot
                  src={p.imageUrl}
                  alt={p.imageAlt}
                  className="pick__img"
                  fallback={<Monogram text={storeMonogram(p.store)} className="pick__img" />}
                  sizes="64px"
                />
                <div className="pick__body">
                  <div className="pick__top">
                    <span className="pick__name">{p.name}</span>
                    <span className="pick__store">{p.store}</span>
                  </div>
                  <div className="pick__chips">
                    <span className={chip(activeMode.id === 'price', ' chip--price')}>
                      {formatXAF(p.estimatedTotalXAF)} FCFA
                    </span>
                    <span className={chip(activeMode.id === 'quality', ' chip--rating')}>
                      <StarIcon />
                      {formatRating(p.rating)}
                    </span>
                    <span className={chip(activeMode.id === 'delivery')}>{formatDays(p.deliveryDays, copy.daysUnit)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}

        <div className="picks__foot">
          <span className="picks__foot-note">{copy.picksNote}</span>
          <GetAppLink className="picks__cta" links={appLinks} section="what-we-ship">
            {copy.picksCta}
          </GetAppLink>
        </div>
      </div>
    </div>
  );
}

/** Placeholder shown while suggestions load (used once data comes from an API). */
export function CategoryBrowserSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="ship__browser" aria-busy="true">
      <div className="cat-pills">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="skeleton" style={{ flex: 'none', width: 160, height: 52, borderRadius: 999, background: 'rgba(12,38,28,0.12)' }} />
        ))}
      </div>
      <div className="picks">
        <span className="skeleton" style={{ width: 240, height: 40 }} />
        <ul className="picks__list">
          {Array.from({ length: rows }, (_, i) => (
            <li key={i} className="pick">
              <span />
              <span className="skeleton" style={{ width: 64, height: 64, borderRadius: 12 }} />
              <div className="pick__body">
                <span className="skeleton" style={{ width: '70%', height: 16 }} />
                <span className="skeleton" style={{ width: '50%', height: 24, borderRadius: 999 }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
