/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_CLIENT_URL]
    }
  }
};

module.exports = nextConfig;
