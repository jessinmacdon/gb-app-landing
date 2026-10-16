// Language redirect for "/" and the old static site's URLs. Runs at Netlify's
// edge, so the localized pages themselves stay plain static files on the CDN.
import { LOCALE_COOKIE } from '../../lib/i18n.ts';
import { localeRedirect } from '../../lib/localeRoutes.ts';

const readCookie = (header: string | null, name: string) =>
  header
    ?.split(';')
    .map((c) => c.trim().split('='))
    .find(([k]) => k === name)?.[1];

export default function locale(request: Request): Response {
  const to = localeRedirect(
    new URL(request.url),
    readCookie(request.headers.get('cookie'), LOCALE_COOKIE),
    request.headers.get('accept-language'),
  );
  return new Response(null, {
    status: 307,
    headers: { Location: to.toString(), Vary: 'Accept-Language, Cookie', 'Cache-Control': 'private, no-store' },
  });
}

// Must list the same paths as LOCALE_ROUTES.
export const config = {
  path: [
    '/',
    '/index.html',
    '/privacy',
    '/privacy.html',
    '/terms',
    '/terms-of-service.html',
    '/refunds',
    '/how-it-works.html',
    '/contact.html',
  ],
};
