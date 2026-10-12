import type { NextConfig } from 'next';

// Hosts allowed for remote images (product thumbnails, avatars, lifestyle photos).
// Set IMAGE_HOSTS to a comma-separated list, e.g. "cdn.globalbuy.cm,images.ctfassets.net".
const imageHosts = (process.env.IMAGE_HOSTS ?? '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ protocol: 'https', hostname })),
  },
};

export default nextConfig;
