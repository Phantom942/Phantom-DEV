import type { NextConfig } from "next";

/**
 * GitHub Pages sert un export statique (GITHUB_PAGES=true).
 * Les routes /api/audit restent dans le dépôt pour un déploiement Vercel,
 * et sont retirées uniquement pendant le build Pages.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: "export" as const, trailingSlash: true } : {}),
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
