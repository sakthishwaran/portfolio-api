import Hapi from '@hapi/hapi';
import type {} from '@lib/shared/types/hapi';
import { appConfig } from '@lib/config/app.config';
import { registerErrorHandler } from '@lib/shared/middleware/error-handler.middleware';
import { databasePlugin } from './plugins/database.plugin';
import { loggerPlugin } from './plugins/logger.plugin';
import { validationPlugin } from './plugins/validation.plugin';
import { registerContactRoutes } from './routes/contact.route';

export async function createServer(): Promise<Hapi.Server> {
  const server = Hapi.server({
    host: appConfig.server.host,
    port: appConfig.server.port,
    routes: {
      cors: {
        origin: appConfig.cors.origin,
      },
      validate: {
        options: { abortEarly: false },
      },
    },
  });

  await server.register([databasePlugin, loggerPlugin, validationPlugin]);

  registerErrorHandler(server);
  registerContactRoutes(server);

  server.route({
    method: 'GET',
    path: '/health',
    handler: () => ({ status: 'ok', service: appConfig.name }),
  });

  return server;
}
