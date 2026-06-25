import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-only on-screen route indicator. No effect on production builds.
  devIndicators: false,
  experimental: {
    // Tree-shake the Phosphor client barrel so the few client components that
    // import from "@phosphor-icons/react" don't pull the ~1500-module graph.
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  images: {
    // Serve AVIF/WebP from the optimizer (all imagery is local under /public).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
