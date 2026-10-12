import { FaqAccordion } from '@/components/FaqAccordion';
import type { Dictionary } from '@/lib/content';
import type { FaqItem } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

export function Faq({ lang, t, items }: { lang: Locale; t: Dictionary; items: FaqItem[] }) {
  return (
    <section id="faq" className="container faq" aria-labelledby="faq-title">
      <div className="faq__head">
        <span className="eyebrow">{t.faqEyebrow}</span>
        <h2 className="h2" id="faq-title">
          {t.faqTitle}
        </h2>
        <p className="faq__sub">{t.faqSub}</p>
      </div>
      <FaqAccordion
        items={items.map((f) => ({ id: f.id, question: f.question[lang], answer: f.answer[lang] }))}
        defaultOpenId={items.find((f) => f.defaultOpen)?.id ?? null}
      />
    </section>
  );
}
