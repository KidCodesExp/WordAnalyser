/**
 * @type {import('next').NextConfig}
 *
 * Repo name matters for GitHub Pages:
 *  - Deploying to https://<user>.github.io/<repo>/  → set REPO to '<repo>'
 *  - Deploying to https://<user>.github.io/         → set REPO to ''
 *    (that means the repo is literally named <user>.github.io)
 *  - Using a custom domain                          → set REPO to ''
 */
const REPO = 'words-analyser';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd && REPO ? `/${REPO}` : '';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['three'],
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
