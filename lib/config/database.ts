import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from './env';
import * as schema from '@lib/shared/schema/db';

export const pgClient = postgres(env.DATABASE_URL, { max: 10 });

export const db = drizzle(pgClient, { schema });

export type Database = typeof db;

export async function closeDatabaseConnection(): Promise<void> {
  await pgClient.end({ timeout: 5 });
}
