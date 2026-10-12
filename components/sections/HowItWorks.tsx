import type { Dictionary } from '@/lib/content';
import type { SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

export function HowItWorks({ lang, t, steps }: { lang: Locale; t: Dictionary; steps: SiteContent['steps'] }) {
  return (
    <section id="how" className="container how" aria-labelledby="how-title">
      <div className="section-head">
        <span className="eyebrow">{t.howEyebrow}</span>
        <h2 className="h2" id="how-title">
          {t.howTitle}
        </h2>
      </div>
      <ol className="how__grid">
        {steps.map((s, i) => (
          <li key={s.order} className="step">
            <span className="step__n" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="step__title">{s.title[lang]}</h3>
            <p className="step__body">{s.body[lang]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
