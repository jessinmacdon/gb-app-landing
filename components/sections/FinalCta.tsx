import { ImageSlot } from '@/components/ImageSlot';
import { StoreBadges } from '@/components/StoreBadges';
import type { Dictionary } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

export function FinalCta({ lang, t, site }: { lang: Locale; t: Dictionary; site: SiteContent }) {
  const img = site.images.cta;
  return (
    <section id="download" className="cta" aria-labelledby="cta-title">
      <div className={`cta__panel${img.url ? '' : ' cta__panel--solo'}`}>
        <div className="cta__glow" aria-hidden="true" />
        <div className="cta__copy">
          <h2 className="cta__title" id="cta-title">
            {t.ctaTitle1} <em>{t.ctaTitle2}</em>
          </h2>
          <p className="cta__sub">{t.ctaSub}</p>
          <StoreBadges links={site.appLinks} badge={t.badge} section="download" />
        </div>
        <ImageSlot
          src={img.url}
          alt={img.alt[lang]}
          className="cta__photo"
          fallback={null}
          sizes="(min-width: 960px) 660px, 100vw"
        />
      </div>
    </section>
  );
}
