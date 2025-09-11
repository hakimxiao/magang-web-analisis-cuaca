import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack(config) {
    // Rule untuk SVG pakai svgr
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Rule untuk JSON (opsional, Next.js sudah support by default)
    config.module.rules.push({
      test: /\.json$/,
      type: "json", // biar diparse sebagai JSON murni
    });

    return config;
  },
};

export default nextConfig;
