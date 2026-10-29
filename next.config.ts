import type { NextConfig } from "next";

/** Export statique désactivé : l'audit automatique requiert des API routes (déployer sur Vercel). */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
