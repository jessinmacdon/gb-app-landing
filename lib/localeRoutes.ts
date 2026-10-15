// Relative import with an extension: this file also runs in Netlify's edge
// runtime (Deno), which doesn't know the "@/" alias.
import { defaultLocale, isLocale, localeFromAcceptLanguage } from './i18n.ts';

/**
 * Paths without a language, and the old static site's pages, mapped to their
 * place in the localized site. Old links in emails, the app and search results
 * keep working. Keep in sync with the edge function's `config.path`.
 */
export const LOCALE_ROUTES: Record<string, string> = {
  '/': '',
  '/index.html': '',
  '/privacy': '/privacy',
  '/privacy.html': '/privacy',
  '/terms': '/terms',
  '/terms-of-service.html': '/terms',
  '/how-it-works.html': '#how',
  '/contact.html': '#faq',
};

/**
 * Where a language-less path goes: "/en/…" or "/fr/…", picked from the
 * visitor's saved choice first, then their browser language, then English.
 */
export function localeRedirect(url: URL, savedLang: string | undefined, acceptLanguage: string | null): URL {
  const lang = isLocale(savedLang) ? savedLang : (localeFromAcceptLanguage(acceptLanguage) ?? defaultLocale);
  const [path, hash] = (LOCALE_ROUTES[url.pathname] ?? '').split('#');
  const to = new URL(url);
  to.pathname = `/${lang}${path}`;
  to.hash = hash ? `#${hash}` : '';
  return to;
}
