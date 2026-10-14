import { defaultLocale, locales } from '@/lib/i18n';

/**
 * Public origin used for canonical, hreflang, Open Graph and sitemap URLs.
 * NEXT_PUBLIC_SITE_URL wins; otherwise Netlify's URL (the site's primary
 * production address, also on deploy previews, so previews never compete
 * with production in search results).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? 'https://globalbuy24.com').replace(
  /\/$/,
  '',
);

/** Canonical and per-language URLs for a path below the locale, e.g. '' or '/privacy'. */
export function localeAlternates(lang: string, path = '') {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      'x-default': `/${defaultLocale}${path}`,
    },
  };
}
