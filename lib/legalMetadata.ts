import type { Metadata } from 'next';
import { getLegalDoc, type LegalPageId } from '@/lib/content';
import { isLocale } from '@/lib/i18n';
import { localeAlternates } from '@/lib/site';

/** Title, description and per-language URLs for a legal page. */
export async function legalMetadata(lang: string, id: LegalPageId): Promise<Metadata> {
  if (!isLocale(lang)) return {};
  const doc = await getLegalDoc(id);
  const title = `${doc.title[lang]} · GlobalBuy24`;
  const firstParagraph = doc.sections[0].blocks.find((b) => b.type === 'p');
  return {
    title,
    description: doc.intro[0]?.[lang] ?? (firstParagraph && 'text' in firstParagraph ? firstParagraph.text[lang] : undefined),
    alternates: localeAlternates(lang, `/${id}`),
    openGraph: { title, url: `/${lang}/${id}` },
  };
}
