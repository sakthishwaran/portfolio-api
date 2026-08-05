import { pgTable, uuid, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { DB_TABLES } from '@lib/constants/database.constant';

export const auditLogs = pgTable(DB_TABLES.AUDIT_LOGS, {
  id: uuid('id').defaultRandom().primaryKey(),
  entity: varchar('entity', { length: 100 }).notNull(),
  entityId: uuid('entity_id').notNull(),
  action: varchar('action', { length: 50 }).notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type AuditLogEntity = typeof auditLogs.$inferSelect;
export type NewAuditLogEntity = typeof auditLogs.$inferInsert;
