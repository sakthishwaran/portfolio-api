import type { ResponseToolkit } from '@hapi/hapi';
import { buildSuccessResponse } from '@lib/shared/schema/api/common/api-response';

export function sendSuccess<T>(h: ResponseToolkit, data: T, message: string, statusCode = 200) {
  return h.response(buildSuccessResponse(data, message)).code(statusCode);
}
