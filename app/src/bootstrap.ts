import { createServer } from './server';
import { logger } from '@lib/shared/logger/logger';
import { appConfig } from '@lib/config/app.config';

export async function bootstrap(): Promise<void> {
  const server = await createServer();

  await server.start();

  logger.info(`${appConfig.name} running at ${server.info.uri} [${appConfig.env}]`);

  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    await server.stop({ timeout: 5000 });
    process.exit(0);
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    logger.error({ err: reason }, 'Unhandled promise rejection');
  });

  process.on('uncaughtException', (error) => {
    logger.fatal({ err: error }, 'Uncaught exception');
    process.exit(1);
  });
}
