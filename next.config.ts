import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,
  
  reactStrictMode: true,
  
  transpilePackages: ['@ionic/react', '@ionic/core'],
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: false,
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
