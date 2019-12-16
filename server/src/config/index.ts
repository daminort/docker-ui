import { env } from './env.config';

const baseURL = `${env.API_URL}/${env.API_VERSION}`;

export const config = {
  env: {
    isProduction: (env.NODE_ENV === 'production'),
    isDevelopment: (env.NODE_ENV === 'development'),
  },
  api: {
    baseURL,
    url: env.API_URL,
    port: env.API_PORT,
    version: env.API_VERSION,
    siteURL: env.SITE_URL,
    sitePort: env.SITE_PORT,
  },
  routes: {
    containers: `${baseURL}/containers`,
    images: `${baseURL}/images`,
    volumes: `${baseURL}/volumes`,
    dashboard: `${baseURL}/dashboard`,
  }
};
