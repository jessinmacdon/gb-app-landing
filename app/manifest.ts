import type { MetadataRoute } from 'next';

// Generated once at build time (static export).
export const dynamic = 'force-static';

// One manifest for both languages: start_url '/' lets the language redirect pick the visitor's language.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GlobalBuy24',
    short_name: 'GlobalBuy24',
    description: 'Shop any online store, pay with Mobile Money, pick up in Cameroon.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FBF8F1',
    theme_color: '#061610',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
