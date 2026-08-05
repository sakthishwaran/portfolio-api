import { bootstrap } from './bootstrap';
import { logger } from '@lib/shared/logger/logger';

bootstrap().catch((error: unknown) => {
  logger.fatal({ err: error }, 'Failed to bootstrap application');
  process.exit(1);
});
