import { ImageSlot, Monogram } from '@/components/ImageSlot';
import type { Dictionary } from '@/lib/content';
import type { Testimonial } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

/** First letters of the first and last word that start with a letter ("Marie-Claire … Mbarga" → "MM"). */
const initials = (name: string) => {
  const words = name.split(/\s+/).filter((w) => /^\p{L}/u.test(w));
  const pick = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return pick
    .map((w) => Array.from(w)[0])
    .join('')
    .toUpperCase();
};

/** Renders only real testimonials; the section disappears while none exist. */
export function Testimonials({ lang, t, items }: { lang: Locale; t: Dictionary; items: Testimonial[] }) {
  const real = items.filter((q) => !q.placeholder);
  if (real.length === 0) return null;
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
          {real.map((q) => (
            <figure key={q.id} className="quote-card">
              <blockquote>“{q.quote[lang]}”</blockquote>
              <figcaption>
                <ImageSlot
                  src={q.avatarUrl}
                  alt=""
                  className="quote-card__avatar"
                  fallback={<Monogram text={initials(q.name)} className="quote-card__avatar" />}
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
