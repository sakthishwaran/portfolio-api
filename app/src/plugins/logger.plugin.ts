import type { Plugin, Server } from '@hapi/hapi';
import { logger } from '@lib/shared/logger/logger';

export const loggerPlugin: Plugin<undefined> = {
  name: 'app/logger',
  register(server: Server) {
    server.app.logger = logger;

    server.ext('onRequest', (request, h) => {
      request.app.startTime = Date.now();
      return h.continue;
    });

    server.events.on('response', (request) => {
      const startTime = request.app.startTime ?? Date.now();
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
