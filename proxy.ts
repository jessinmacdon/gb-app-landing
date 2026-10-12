import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, LOCALE_COOKIE, localeFromAcceptLanguage } from '@/lib/i18n';

/**
 * Paths without a language, and the old static site's pages, mapped to their
 * place in the localized site. Old links in emails, the app and search results
 * keep working.
 */
const ROUTES: Record<string, string> = {
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
 * Sends a language-less path to "/en/…" or "/fr/…": the visitor's saved
 * choice first, then their browser language, then English.
 */
export function proxy(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const lang = isLocale(saved)
    ? saved
    : (localeFromAcceptLanguage(request.headers.get('accept-language')) ?? defaultLocale);
  const target = ROUTES[request.nextUrl.pathname] ?? '';
  const url = request.nextUrl.clone();
  const [path, hash] = target.split('#');
  url.pathname = `/${lang}${path}`;
  url.hash = hash ? `#${hash}` : '';
  const res = NextResponse.redirect(url);
  res.headers.set('Vary', 'Accept-Language, Cookie');
  return res;
}

// Must be a literal for Next.js to read it at build time; keep in sync with ROUTES.
export const config = {
  matcher: [
    '/',
    '/index.html',
    '/privacy',
    '/privacy.html',
    '/terms',
    '/terms-of-service.html',
    '/how-it-works.html',
    '/contact.html',
  ],
};
