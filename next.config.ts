import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // We remove the strict pathname requirement to ensure all Cloudinary folders work
      },
    ],
  },
};

export default nextConfig;