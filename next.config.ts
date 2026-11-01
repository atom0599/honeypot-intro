import type { NextConfig } from "next";

// GitHub Pages serves the site under /<repo>, so the Pages workflow sets PAGES_BASE_PATH.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
