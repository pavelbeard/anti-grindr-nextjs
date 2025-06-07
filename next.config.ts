import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_REACT_STRICT_MODE: "true", // only for development environment
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
