import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CategoryBrowserSkeleton } from '@/components/CategoryBrowser';
import { ScrollRestorer } from '@/components/ScrollRestorer';
import { StickyDownload } from '@/components/StickyDownload';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Nav } from '@/components/sections/Nav';
import { PaymentPickup } from '@/components/sections/PaymentPickup';
import { Pricing } from '@/components/sections/Pricing';
import { Stores } from '@/components/sections/Stores';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhatWeShip, WhatWeShipBrowser } from '@/components/sections/WhatWeShip';
import { Why } from '@/components/sections/Why';
import { getDictionary, getExampleQuotes, getFaq, getSiteContent, getTestimonials } from '@/lib/content';
import { isLocale } from '@/lib/i18n';

export default async function LandingPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const [t, site, quotes, faq, testimonials] = await Promise.all([
    getDictionary(lang),
    getSiteContent(),
    getExampleQuotes(),
    getFaq(),
    getTestimonials(),
  ]);
  // Validation guarantees exactly one hero quote.
  const heroQuote = quotes.find((q) => q.isHeroPhoneExample) ?? quotes[0];

  return (
    <div className="page">
      <ScrollRestorer lang={lang} />
      <Nav lang={lang} t={t} appLinks={site.appLinks} />
      <main>
        <Hero lang={lang} t={t} site={site} heroQuote={heroQuote} />
        <Stores t={t} stores={site.stores} />
        <HowItWorks lang={lang} t={t} steps={site.steps} />
        <WhatWeShip t={t}>
          <Suspense fallback={<CategoryBrowserSkeleton rows={site.whatWeShip.maxProducts} />}>
            <WhatWeShipBrowser lang={lang} t={t} settings={site.whatWeShip} appLinks={site.appLinks} />
          </Suspense>
        </WhatWeShip>
        <Why lang={lang} t={t} site={site} />
        <Pricing lang={lang} t={t} site={site} quotes={quotes} />
        <PaymentPickup lang={lang} t={t} site={site} />
        <Testimonials lang={lang} t={t} items={testimonials} />
        <Faq lang={lang} t={t} items={faq} />
        <FinalCta lang={lang} t={t} site={site} />
      </main>
      <Footer t={t} site={site} />
      <StickyDownload links={site.appLinks} label={t.nav.download} hint="Google Play · App Store" />
    </div>
  );
}
