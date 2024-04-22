/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['assets.coingecko.com'],
    },
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
      return config;
    },
  };
  
module.exports = nextConfig;