import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

// Generated once at build time (static export).
export const dynamic = 'force-static';

const PAGES = [
  { path: '', priority: 1 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])) },
    })),
  );
}
