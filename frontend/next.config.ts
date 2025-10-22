import type { NextConfig } from "next";
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add every remote host you plan to use for covers
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
      // { protocol: "https", hostname: "your.cdn.com" },
    ],
  },
};

export default nextConfig;


