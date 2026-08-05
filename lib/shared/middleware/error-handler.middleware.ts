import type { Server, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { AppError } from '@lib/shared/exception';
import { buildErrorResponse } from '@lib/shared/schema/api/common/error-response';
import { logger } from '@lib/shared/logger/logger';
import { ERROR_MESSAGES } from '@lib/constants/message.constant';

interface BoomErrorData {
  code?: string;
  details?: unknown;
}

export function registerErrorHandler(server: Server): void {
  server.ext('onPreResponse', (request: Request, h: ResponseToolkit) => {
    const { response } = request;

    if (!response || !(response instanceof Error)) {
      return h.continue;
    }

    if (response instanceof AppError) {
      logger.warn({ err: response }, 'Handled application error');
      return h
        .response(buildErrorResponse(response.message, response.code, response.details))
        .code(response.statusCode);
    }

    if (Boom.isBoom(response)) {
      const statusCode = response.output.statusCode;
      const data = response.data as BoomErrorData | null;

      if (statusCode >= 500) {
        logger.error({ err: response }, 'Unhandled server error');
      }

      const message = (response.output.payload as { message?: string }).message ?? ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

      return h.response(buildErrorResponse(message, data?.code ?? 'ERROR', data?.details)).code(statusCode);
    }

    return h.continue;
  });
}
