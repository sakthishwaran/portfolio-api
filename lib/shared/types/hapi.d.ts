import type { Database } from '@lib/config/database';
import type { Logger } from '@lib/shared/logger/logger';
import type { createZodValidator, createZodQueryValidator } from '@lib/shared/validator/zod-validator';

declare module '@hapi/hapi' {
  interface ServerApplicationState {
    db: Database;
    logger: Logger;
  }

  interface RequestApplicationState {
    startTime?: number;
  }

  interface Server {
    validatePayload: typeof createZodValidator;
    validateQuery: typeof createZodQueryValidator;
  }
}

export {};
