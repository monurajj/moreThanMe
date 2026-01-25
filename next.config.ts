import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: /edge-functions/,
    };
    return config;
  },
};

export default nextConfig;
