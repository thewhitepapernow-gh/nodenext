import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* This allows production builds to finish even if there are ESLint errors */
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* This enables the new React Compiler for automatic performance optimization */
  reactCompiler: true,
};

export default nextConfig;
