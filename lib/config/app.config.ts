import { env } from './env';
import { APP_NAME } from '@lib/constants/app.constant';

export const appConfig = {
  name: APP_NAME,
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  isDevelopment: env.NODE_ENV === 'development',
  server: {
    host: env.HOST,
    port: env.PORT,
  },
  cors: {
    origin: env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
  },
  apiPrefix: '/api/v1',
} as const;

export type AppConfig = typeof appConfig;
