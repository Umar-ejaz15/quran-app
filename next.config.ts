import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  staticPageGenerationTimeout: 60,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  sw: "sw.js",
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  workboxOptions: {
    skipWaiting: true,
  },
})(nextConfig);
