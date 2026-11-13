import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// LAN IPv4 addresses of this machine, so a phone on the same Wi-Fi can load
// dev assets/HMR when running `npm run dev:lan`. Dev-only; ignored in builds.
const lanHosts = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net?.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: lanHosts,
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
