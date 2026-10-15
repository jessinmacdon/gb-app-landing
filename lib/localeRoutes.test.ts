import { describe, expect, it } from 'vitest';
import { config } from '../netlify/edge-functions/locale';
import locale from '../netlify/edge-functions/locale';
import { LOCALE_ROUTES, localeRedirect } from './localeRoutes';

const go = (path: string, saved?: string, accept: string | null = null) =>
  localeRedirect(new URL(`https://globalbuy24.com${path}`), saved, accept);

describe('localeRedirect', () => {
  it('prefers the saved language, then the browser, then English', () => {
    expect(go('/', 'fr', 'en-US').pathname).toBe('/fr');
    expect(go('/', undefined, 'fr-CM,fr;q=0.9,en;q=0.8').pathname).toBe('/fr');
    expect(go('/', undefined, 'de-DE').pathname).toBe('/en');
    expect(go('/', 'xx', null).pathname).toBe('/en');
  });

  it('maps old static-site pages and keeps the query', () => {
    expect(go('/terms-of-service.html', 'fr').pathname).toBe('/fr/terms');
    expect(go('/privacy?ref=app', 'en').toString()).toBe('https://globalbuy24.com/en/privacy?ref=app');
    expect(go('/how-it-works.html', 'en').hash).toBe('#how');
  });

  it('edge function covers exactly the mapped paths', () => {
    expect([...config.path].sort()).toEqual(Object.keys(LOCALE_ROUTES).sort());
  });

  it('edge function reads the lang cookie', () => {
    const res = locale(
      new Request('https://globalbuy24.com/', { headers: { cookie: 'a=1; lang=fr', 'accept-language': 'en' } }),
    );
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('https://globalbuy24.com/fr');
  });
});
