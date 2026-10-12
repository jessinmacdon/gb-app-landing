import { ImageSlot } from '@/components/ImageSlot';
import type { Dictionary } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

export function Why({ lang, t, site }: { lang: Locale; t: Dictionary; site: SiteContent }) {
  const img = site.images.why;
  return (
    <section id="why" className="container why" aria-labelledby="why-title">
      <div className="why__left">
        <span className="eyebrow">{t.whyEyebrow}</span>
        <h2 className="h2" id="why-title">
          {t.whyTitle}
        </h2>
        <ImageSlot
          src={img.url}
          alt={img.alt[lang]}
          className="why__photo"
          fallback={null}
          sizes="(min-width: 960px) 560px, 100vw"
        />
      </div>
      <ul className="why__grid">
        {site.features.map((f) => (
          <li key={f.order} className="feature">
            <h3 className="feature__title">{f.title[lang]}</h3>
            <p className="feature__body">{f.body[lang]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
