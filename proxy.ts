import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, LOCALE_COOKIE, localeFromAcceptLanguage } from '@/lib/i18n';

/**
 * Sends "/" to "/en" or "/fr": the visitor's saved choice first, then their
 * browser language, then English.
 */
export function proxy(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const lang = isLocale(saved)
    ? saved
    : (localeFromAcceptLanguage(request.headers.get('accept-language')) ?? defaultLocale);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}`;
  const res = NextResponse.redirect(url);
  res.headers.set('Vary', 'Accept-Language, Cookie');
  return res;
}

export const config = { matcher: '/' };
