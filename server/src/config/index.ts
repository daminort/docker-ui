import { env } from './env.config';

export const config = {
  env: {
    isProduction: (env.NODE_ENV === 'production'),
    isDevelopment: (env.NODE_ENV === 'development'),
  },
  api: {
    url: env.API_URL,
    port: env.API_PORT,
    version: env.API_VERSION,
    siteURL: env.SITE_URL,
    sitePort: env.SITE_PORT,
  },
};
