import type { Metadata } from 'next';
import { getLegalDoc, type LegalPageId } from '@/lib/content';
import { isLocale, locales } from '@/lib/i18n';

/** Title, description and per-language URLs for a legal page. */
export async function legalMetadata(lang: string, id: LegalPageId): Promise<Metadata> {
  if (!isLocale(lang)) return {};
  const doc = await getLegalDoc(id);
  const title = `${doc.title[lang]} · GlobalBuy`;
  const firstParagraph = doc.sections[0].blocks.find((b) => b.type === 'p');
  return {
    title,
    description: doc.intro[0]?.[lang] ?? (firstParagraph && 'text' in firstParagraph ? firstParagraph.text[lang] : undefined),
    alternates: {
      canonical: `/${lang}/${id}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/${id}`])),
    },
    openGraph: { title },
  };
}
