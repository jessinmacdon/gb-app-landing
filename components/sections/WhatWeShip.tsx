import { CategoryBrowser, type CategoryView, type RankingModeView } from '@/components/CategoryBrowser';
import { getCategories, getRankingModes, type Dictionary } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

type Props = { lang: Locale; t: Dictionary; settings: SiteContent['whatWeShip'] };

/** Section frame; renders immediately while the browser's data streams in. */
export function WhatWeShip({ t, children }: { t: Dictionary; children: React.ReactNode }) {
  return (
    <section className="ship" aria-labelledby="ship-title">
      <div className="container ship__inner">
        <div className="ship__head">
          <div className="section-head">
            <span className="eyebrow eyebrow--plain">{t.catEyebrow}</span>
            <h2 className="h2" id="ship-title">
              {t.catTitle}
            </h2>
          </div>
          <p className="ship__note">{t.catNote}</p>
        </div>
        {children}
        <p className="ship__ban">{t.catBan}</p>
      </div>
    </section>
  );
}

/** Loads categories and ranking modes, localizes them, and hands them to the client browser. */
export async function WhatWeShipBrowser({ lang, t, settings }: Props) {
  const [categories, modes] = await Promise.all([getCategories(), getRankingModes()]);

  const categoryViews: CategoryView[] = categories.map((c) => ({
    id: c.id,
    name: c.name[lang],
    products: c.products.map((p) => ({
      id: p.id,
      name: p.name[lang],
      store: p.store,
      imageUrl: p.imageUrl,
      imageAlt: p.imageAlt[lang],
      estimatedTotalXAF: p.estimatedTotalXAF,
      rating: p.rating,
      deliveryDays: p.deliveryDays,
    })),
  }));
  const modeViews: RankingModeView[] = modes.map((m) => ({
    id: m.id,
    label: m.label[lang],
    description: m.description[lang],
  }));

  return (
    <CategoryBrowser
      categories={categoryViews}
      modes={modeViews}
      defaultCategoryId={settings.defaultCategoryId}
      defaultMode={settings.defaultRankingMode}
      maxProducts={settings.maxProducts}
      copy={{
        popularIn: t.popularIn,
        rankBy: t.rankBy,
        picksNote: t.picksNote,
        picksCta: t.picksCta,
        picksEmpty: t.picksEmpty,
        daysUnit: t.daysUnit,
        photo: t.photo,
      }}
    />
  );
}
