import { CheckIcon } from '@/components/Icons';
import { ImageSlot, Monogram } from '@/components/ImageSlot';
import { StoreBadges } from '@/components/StoreBadges';
import { quoteTotal, type Dictionary } from '@/lib/content';
import type { ExampleQuote, SiteContent } from '@/lib/content/types';
import { formatXAF } from '@/lib/format';
import { storeMonogram } from '@/lib/stores';
import type { Locale } from '@/lib/i18n';

type Props = { lang: Locale; t: Dictionary; site: SiteContent; heroQuote: ExampleQuote };

export function Hero({ lang, t, site, heroQuote: q }: Props) {
  const liveCities = site.cities.filter((c) => c.live).map((c) => c.name);
  const rows = [
    [t.rows.product, q.breakdownXAF.product],
    [t.rows.shipping, q.breakdownXAF.shipping],
    [t.rows.customs, q.breakdownXAF.customs],
    [t.rows.fee, q.breakdownXAF.serviceFee],
  ] as const;

  return (
    <section id="top" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__live">
            <span className="live-dot" aria-hidden="true" />
            {t.heroEyebrowPrefix} {liveCities.join(' · ')}
          </div>
          <h1 className="hero__title">
            {t.heroTitle1}
            <br />
            <em>{t.heroTitle2}</em>
          </h1>
          <p className="hero__sub">{t.heroSub}</p>
          <StoreBadges links={site.appLinks} badge={t.badge} section="hero" />
          <p className="hero__note">{t.heroNote}</p>
        </div>

        <div className="hero__visual">
          <ImageSlot
            src={site.images.hero.url}
            alt={site.images.hero.alt[lang]}
            className="hero__photo"
            fallback={null}
            sizes="400px"
            priority
          />

          {/* Phone mockup of the app, showing the quote flagged isHeroPhoneExample. */}
          <div className="phone" role="img" aria-label={`${t.phone.title}: ${q.productName[lang]}, ${t.rows.total} ${formatXAF(quoteTotal(q.breakdownXAF))} FCFA`}>
            <div className="phone__screen" aria-hidden="true">
              <div className="phone__status">
                <span>9:41</span>
                <span className="phone__island" />
                <span>100%</span>
              </div>
              <div className="phone__title">{t.phone.title}</div>
              {q.linkPreview ? (
                <div className="phone__link">
                  <span className="phone__link-dot" />
                  <span className="phone__link-text">{q.linkPreview}</span>
                </div>
              ) : null}
              <div className="phone__product">
                <ImageSlot
                  src={q.imageUrl}
                  alt={q.imageAlt[lang]}
                  className="phone__thumb"
                  fallback={<Monogram text={storeMonogram(q.store)} className="phone__thumb" />}
                  sizes="62px"
                />
                <div className="phone__product-text">
                  <span className="phone__product-name">{q.productName[lang]}</span>
                  <span className="phone__product-store">{q.storeLine}</span>
                </div>
              </div>
              <div className="phone__rows">
                {rows.map(([label, value]) => (
                  <div key={label} className="phone__row">
                    <span className="phone__row-label">{label}</span>
                    <span>{formatXAF(value)}</span>
                  </div>
                ))}
                <div className="phone__rule" />
                <div className="phone__total">
                  <span className="phone__total-label">{t.rows.total}</span>
                  <span className="phone__total-value">
                    {formatXAF(quoteTotal(q.breakdownXAF))} <small>FCFA</small>
                  </span>
                </div>
              </div>
              <div className="phone__pay">
                <div className="phone__pay-btn phone__pay-btn--mtn">{t.phone.payMtn}</div>
                <div className="phone__pay-btn phone__pay-btn--orange">{t.phone.payOrange}</div>
              </div>
            </div>
          </div>

          <div className="hero__notif" aria-hidden="true">
            <span className="hero__notif-icon">
              <CheckIcon size={18} />
            </span>
            <span className="hero__notif-text">
              <span className="hero__notif-title">{t.phone.notifTitle}</span>
              <span className="hero__notif-sub">{t.phone.notifSub}</span>
            </span>
          </div>
          <div className="hero__chip" aria-hidden="true">
            {t.phone.chip}
          </div>
        </div>
      </div>
    </section>
  );
}
