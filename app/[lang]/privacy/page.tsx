import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/LegalPage';
import { getDictionary, getLegalDoc, getSiteContent } from '@/lib/content';
import { isLocale } from '@/lib/i18n';
import { legalMetadata } from '@/lib/legalMetadata';

export async function generateMetadata({ params }: PageProps<'/[lang]/privacy'>) {
  return legalMetadata((await params).lang, 'privacy');
}

export default async function PrivacyPage({ params }: PageProps<'/[lang]/privacy'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [t, site, doc] = await Promise.all([getDictionary(lang), getSiteContent(), getLegalDoc('privacy')]);
  return <LegalPage lang={lang} t={t} site={site} doc={doc} />;
}
