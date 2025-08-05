import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['styled-components'],
  },
  // Tailwind CSS 4.0 için
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'styled-components': require.resolve('styled-components'),
    };
    return config;
  },
};

export default nextConfig;
