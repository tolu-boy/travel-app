import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ['cf.bstatic.com', 'images.unsplash.com'], // add any external domains you use
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // optional if you use this too
      },
    ],
  },
};

export default nextConfig;
