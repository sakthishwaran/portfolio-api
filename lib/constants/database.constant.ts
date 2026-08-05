export const DB_TABLES = {
  CONTACTS: 'contacts',
  AUDIT_LOGS: 'audit_logs',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
