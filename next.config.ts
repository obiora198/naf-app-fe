import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Bypass server-side optimization to avoid network-related fetch errors
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rnryhnnzzxwrlvpnxhcs.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
