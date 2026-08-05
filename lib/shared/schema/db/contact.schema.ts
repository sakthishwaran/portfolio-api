import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { DB_TABLES } from '@lib/constants/database.constant';

export const contacts = pgTable(DB_TABLES.CONTACTS, {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: varchar('full_name', { length: 150 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type ContactEntity = typeof contacts.$inferSelect;
export type NewContactEntity = typeof contacts.$inferInsert;
