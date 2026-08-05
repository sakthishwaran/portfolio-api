import { defineConfig } from 'drizzle-kit';
import { env } from '../config/env';

export default defineConfig({
  schema: './lib/shared/schema/db/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
