/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          source: '/:path*',
          destination: '/api/url?key=:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
