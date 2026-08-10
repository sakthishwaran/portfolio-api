import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from './env';
import * as schema from '@lib/shared/schema/db';

let client: ReturnType<typeof postgres> | undefined;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getPgClient() {
  if (!client) {
    client = postgres(env.DATABASE_URL, { max: 10 });
  }
  return client;
}

export function getDb() {
  if (!dbInstance) {
    dbInstance = drizzle(getPgClient(), { schema });
  }
  return dbInstance;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    const instance = getDb();
    const value = Reflect.get(instance, prop);
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

export const pgClient = new Proxy({} as ReturnType<typeof postgres>, {
  get(_target, prop) {
    const instance = getPgClient();
    const value = Reflect.get(instance as unknown as Record<string, unknown>, prop);
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

export type Database = ReturnType<typeof drizzle<typeof schema>>;

export async function closeDatabaseConnection(): Promise<void> {
  if (client) {
    await client.end({ timeout: 5 });
    client = undefined;
    dbInstance = undefined;
  }
}
