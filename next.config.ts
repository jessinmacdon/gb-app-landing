import type { NextConfig } from 'next';

// Hosts allowed for remote images (product thumbnails, avatars, lifestyle photos).
// Set IMAGE_HOSTS to a comma-separated list, e.g. "cdn.globalbuy.cm,images.ctfassets.net".
const imageHosts = (process.env.IMAGE_HOSTS ?? '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  // The legacy pages in public/ link to index.html, which is now the Next.js home page.
  async redirects() {
    return [{ source: '/index.html', destination: '/', permanent: true }];
  },
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ protocol: 'https', hostname })),
  },
};

export default nextConfig;
