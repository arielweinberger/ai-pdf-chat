/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["llamaindex", "tiktoken-node"],
  },
};

module.exports = nextConfig;
