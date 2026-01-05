/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // Rule untuk SVG menggunakan SVGR
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Rule untuk JSON (sebenarnya Next.js sudah support default,
    // tapi ini kita pertahankan sesuai config awal)
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });

    return config;
  },
};

module.exports = nextConfig;
