import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/content';
import { isLocale, locales } from '@/lib/i18n';
import { localeAlternates, SITE_URL } from '@/lib/site';
import '../globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
});
const body = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: '#0C261C' };

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: localeAlternates(lang),
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      siteName: 'GlobalBuy24',
      type: 'website',
      locale: lang === 'fr' ? 'fr_CM' : 'en_CM',
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
