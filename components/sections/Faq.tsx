import { FaqAccordion } from '@/components/FaqAccordion';
import type { Dictionary } from '@/lib/content';
import type { FaqItem, SiteContent } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n';

type Props = { lang: Locale; t: Dictionary; items: FaqItem[]; email: SiteContent['company']['supportEmail'] };

export function Faq({ lang, t, items, email }: Props) {
  // "{email}" in the copy becomes a mailto link, so translators can place it anywhere.
  const [before, after] = t.faqSub.split('{email}');
  return (
    <section id="faq" className="container faq" aria-labelledby="faq-title">
      <div className="faq__head">
        <span className="eyebrow">{t.faqEyebrow}</span>
        <h2 className="h2" id="faq-title">
          {t.faqTitle}
        </h2>
        {email ? (
          <p className="faq__sub">
            {before}
            <a href={`mailto:${email}`}>{email}</a>
            {after}
          </p>
        ) : null}
      </div>
      <FaqAccordion
        items={items.map((f) => ({ id: f.id, question: f.question[lang], answer: f.answer[lang] }))}
        defaultOpenId={items.find((f) => f.defaultOpen)?.id ?? null}
      />
    </section>
  );
}
