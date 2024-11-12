import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  // Disables typescript errors on build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disables ESLint warnings on build
  eslint: {
    ignoreDuringBuilds: true,
  },


};

export default nextConfig;
