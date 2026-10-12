import { ImageSlot } from '@/components/ImageSlot';
import type { Dictionary } from '@/lib/content';
import type { Testimonial } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

export function Testimonials({ lang, t, items }: { lang: Locale; t: Dictionary; items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section className="testi" aria-labelledby="testi-title">
      <div className="container testi__inner">
        <div className="section-head">
          <span className="eyebrow">{t.testiEyebrow}</span>
          <h2 className="h2" id="testi-title">
            {t.testiTitle}
          </h2>
        </div>
        <div className="testi__grid">
          {items.map((q) => (
            <figure key={q.id} className="quote-card">
              <blockquote>“{q.quote[lang]}”</blockquote>
              <figcaption>
                <ImageSlot
                  src={q.avatarUrl}
                  alt=""
                  className="quote-card__avatar"
                  placeholder="stripes-avatar"
                  sizes="48px"
                />
                <span className="quote-card__who">
                  <span className="quote-card__name">{q.name}</span>
                  <span className="quote-card__meta">{q.meta[lang]}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
