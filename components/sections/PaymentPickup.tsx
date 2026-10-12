import type { Dictionary } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

/** Brand tile colors; unknown payment ids fall back to a neutral tile. */
const TILE_CLASS: Record<string, string> = { mtn: 'pay__tile--mtn', orange: 'pay__tile--orange' };

export function PaymentPickup({ lang, t, site }: { lang: Locale; t: Dictionary; site: SiteContent }) {
  const live = site.payments.filter((p) => p.status === 'live');
  const soon = site.payments.filter((p) => p.status === 'coming_soon');

  return (
    <section className="container paycity" aria-label={`${t.payEyebrow} · ${t.cityEyebrow}`}>
      <div className="card-lg pay">
        <span className="eyebrow">{t.payEyebrow}</span>
        <h2 className="h2">{t.payTitle}</h2>
        <p className="pay__sub">{t.paySub}</p>
        <ul className="pay__tiles">
          {live.map((p) => (
            <li key={p.id} className={`pay__tile ${TILE_CLASS[p.id] ?? ''}`}>
              {p.logoUrl ? (
                // Brand logos are SVG/PNG of arbitrary aspect ratio, so a plain img fits best.
                <img className="pay__tile-logo" src={p.logoUrl} alt={p.name[lang]} />
              ) : (
                <span className="pay__tile-title" aria-hidden="true">
                  {p.tileTitle}
                </span>
              )}
              <span className="pay__tile-sub">
                {p.tileSubtitle}
                {p.logoUrl ? null : <span className="sr-only"> ({p.name[lang]})</span>}
              </span>
            </li>
          ))}
          {soon.map((p) => (
            <li key={p.id} className="pay__soon">
              <span>{p.name[lang]}</span>
              <span className="soon-tag">{t.soon}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-lg cities">
        <span className="eyebrow eyebrow--dark-bg">{t.cityEyebrow}</span>
        <h2 className="h2">{t.cityTitle}</h2>
        <div className="cities__body">
          <ul className="cities__list">
            {site.cities.map((c) => (
              <li key={c.name} className="city">
                <span className="city__name">{c.name}</span>
                <span className={`city__status${c.live ? '' : ' city__status--soon'}`}>
                  <span className="live-dot" aria-hidden="true" />
                  {c.live ? t.live : t.soon}
                </span>
              </li>
            ))}
          </ul>
          <span className="cities__more">{t.cityMore}</span>
        </div>
      </div>
    </section>
  );
}
