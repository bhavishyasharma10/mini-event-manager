import * as Yup from 'yup';

/**
 * The configuration schema
 */
const configSchema = Yup.object({
  // API Configuration
  api: Yup.object({
    graphqlEndpoint: Yup.string()
      .required()
      .default('/api/graphql')
      .test('is-valid-endpoint', 'Must be a valid endpoint', (value) => {
        if (!value) return false;
        if (value.startsWith('/')) return true;
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      }),
    defaultFetchPolicy: Yup.string()
      .oneOf(['cache-first', 'cache-only', 'network-only', 'no-cache'])
      .required()
      .default('network-only'),
    retryConfig: Yup.object({
      maxAttempts: Yup.number()
        .min(1)
        .max(5)
        .required()
        .default(3),
      initialDelay: Yup.number()
        .min(100)
        .max(1000)
        .required()
        .default(300),
      maxDelay: Yup.number()
        .min(1000)
        .max(5000)
        .required()
        .default(3000),
    }).required().default({
      maxAttempts: 3,
      initialDelay: 300,
      maxDelay: 3000,
    }),
  }),

  // Application Settings
  app: Yup.object({
    name: Yup.string()
      .required()
      .default('Mini Event Manager'),
    version: Yup.string()
      .required()
      .default('0.1.0'),
    environment: Yup.string()
      .oneOf(['development', 'production', 'test'])
      .required()
      .default('development'),
    maxEventTitleLength: Yup.number()
      .min(1)
      .max(100)
      .required()
      .default(100),
    maxAttendeeNameLength: Yup.number()
      .min(1)
      .max(100)
      .required()
      .default(100),
    maxAttendeeEmailLength: Yup.number()
      .min(1)
      .max(255)
      .required()
      .default(255),
  }),

  // UI Configuration
  ui: Yup.object({
    defaultDateFormat: Yup.string()
      .required()
      .default('MMM d, yyyy'),
    defaultTimeFormat: Yup.string()
      .required()
      .default('h:mm a'),
    itemsPerPage: Yup.number()
      .min(1)
      .required()
      .default(10),
    maxTagsPerEvent: Yup.number()
      .min(1)
      .required()
      .default(5),
  }),
});

/**
 * The configuration type
 */
export type AppConfig = {
  api: {
    graphqlEndpoint: string;
    defaultFetchPolicy: 'cache-first' | 'cache-only' | 'network-only' | 'no-cache';
    retryConfig: {
      maxAttempts: number;
      initialDelay: number;
      maxDelay: number;
    };
  };
  app: {
    name: string;
    version: string;
    environment: 'development' | 'production' | 'test';
    maxEventTitleLength: number;
    maxAttendeeNameLength: number;
    maxAttendeeEmailLength: number;
  };
  ui: {
    defaultDateFormat: string;
    defaultTimeFormat: string;
    itemsPerPage: number;
    maxTagsPerEvent: number;
  };
};

/**
 * Get environment variables with fallbacks
 */
const getEnvVar = (key: string, fallback: string): string => {
  if (typeof window !== 'undefined') {
    // Client-side: use window.env or fallback
    return (window as any).env?.[key] || fallback;
  }
  // Server-side: use process.env or fallback
  return process.env[key] || fallback;
};

/**
 * Default configuration values with environment variable overrides
 */
const defaultConfig: AppConfig = {
  api: {
    graphqlEndpoint: getEnvVar('NEXT_PUBLIC_GRAPHQL_ENDPOINT', '/api/graphql'),
    defaultFetchPolicy: 'network-only',
    retryConfig: {
      maxAttempts: 3,
      initialDelay: 300,
      maxDelay: 3000,
    },
  },
  app: {
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Mini Event Manager'),
    version: getEnvVar('NEXT_PUBLIC_APP_VERSION', '0.1.0'),
    environment: (getEnvVar('NODE_ENV', 'development') as AppConfig['app']['environment']),
    maxEventTitleLength: 100,
    maxAttendeeNameLength: 100,
    maxAttendeeEmailLength: 255,
  },
  ui: {
    defaultDateFormat: 'MMM d, yyyy',
    defaultTimeFormat: 'h:mm a',
    itemsPerPage: 10,
    maxTagsPerEvent: 5,
  },
};

/**
 * Validate the configuration
 */
const config = configSchema.validateSync(defaultConfig, { stripUnknown: true }) as AppConfig;

/**
 * Export the validated configuration
 */
export default config;

/**
 * Export individual sections for convenience
 */
export const apiConfig = config.api;
export const appConfig = config.app;
export const uiConfig = config.ui; 