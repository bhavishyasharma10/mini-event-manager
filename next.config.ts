import type { NextConfig } from "next";
import { appConfig } from '@/lib/config';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_NAME: appConfig.name,
    NEXT_PUBLIC_APP_VERSION: appConfig.version,
  },
  // Expose environment variables to the client
  publicRuntimeConfig: {
    appName: appConfig.name,
    appVersion: appConfig.version,
    environment: process.env.NODE_ENV || 'development',
  },
  output: 'standalone',
};

export default nextConfig;
