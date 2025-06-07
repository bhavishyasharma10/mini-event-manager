import type { NextConfig } from "next";
import { appConfig, apiConfig } from '@/lib/config';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_NAME: appConfig.name,
    NEXT_PUBLIC_APP_VERSION: appConfig.version,
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: apiConfig.graphqlEndpoint,
  },
  // Expose environment variables to the client
  publicRuntimeConfig: {
    appName: appConfig.name,
    appVersion: appConfig.version,
    graphqlEndpoint: apiConfig.graphqlEndpoint,
    environment: process.env.NODE_ENV || 'development',
  },
};

export default nextConfig;
