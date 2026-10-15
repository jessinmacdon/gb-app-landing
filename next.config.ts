import type { NextConfig } from 'next';

// Hosts allowed for remote images (product thumbnails, avatars, lifestyle photos).
// Set IMAGE_HOSTS to a comma-separated list, e.g. "cdn.globalbuy.cm,images.ctfassets.net".
const imageHosts = (process.env.IMAGE_HOSTS ?? '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  // Every page is prerendered, so the site ships as plain files served from
  // Netlify's CDN: no server function on the request path. The language
  // redirect for "/" runs as a Netlify edge function (netlify/edge-functions).
  output: 'export',
  images: {
    // No image server in a static export; product photos are sized by their source.
    unoptimized: true,
    remotePatterns: imageHosts.map((hostname) => ({ protocol: 'https', hostname })),
  },
};

export default nextConfig;
