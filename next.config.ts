import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: /edge-functions/,
    };
    return config;
  },
  turbopack: {},
};

export default nextConfig;
