const withVideos = require("next-videos");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["uz", "ru", "en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withVideos(nextConfig);