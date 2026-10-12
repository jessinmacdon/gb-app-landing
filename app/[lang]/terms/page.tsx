import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/LegalPage';
import { getDictionary, getLegalDoc, getSiteContent } from '@/lib/content';
import { isLocale } from '@/lib/i18n';
import { legalMetadata } from '@/lib/legalMetadata';

export async function generateMetadata({ params }: PageProps<'/[lang]/terms'>) {
  return legalMetadata((await params).lang, 'terms');
}

export default async function TermsPage({ params }: PageProps<'/[lang]/terms'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [t, site, doc] = await Promise.all([getDictionary(lang), getSiteContent(), getLegalDoc('terms')]);
  return <LegalPage lang={lang} t={t} site={site} doc={doc} />;
}
