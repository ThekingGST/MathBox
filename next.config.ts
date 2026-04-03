import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.wasm": {
        type: "wasm",
      },
    },
  },
};

export default nextConfig;
