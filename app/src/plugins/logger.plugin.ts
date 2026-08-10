import type { Plugin, Server } from '@hapi/hapi';
import { logger } from '@lib/shared/logger/logger';

export const loggerPlugin: Plugin<undefined> = {
  name: 'app/logger',
  register(server: Server) {
    const serverApp = server.app as typeof server.app & { logger: typeof logger };
    serverApp.logger = logger;

    server.ext('onRequest', (request, h) => {
      const requestApp = request.app as typeof request.app & { startTime?: number };
      requestApp.startTime = Date.now();
      return h.continue;
    });

    server.events.on('response', (request) => {
      const requestApp = request.app as typeof request.app & { startTime?: number };
      const startTime = requestApp.startTime ?? Date.now();
      const statusCode =
        request.response && 'statusCode' in request.response ? request.response.statusCode : 0;

      logger.info(
        {
          method: request.method.toUpperCase(),
          path: request.path,
          statusCode,
          durationMs: Date.now() - startTime,
        },
        'request completed',
      );
    });
  },
};
