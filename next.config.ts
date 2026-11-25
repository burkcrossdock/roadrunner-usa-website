import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev is bound to 0.0.0.0, so browsers that open 127.0.0.1 must be allowed
  // or Next blocks the dev client and forms never hydrate.
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
