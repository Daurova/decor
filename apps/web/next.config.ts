import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**", // разрешает любые пути на этом домене
      },
    ],
          unoptimized: true, // <-- Эта строка решает проблему

  },

};

export default nextConfig;
