import type { Lifecycle, Request, ResponseToolkit } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { ZodError, type ZodSchema } from 'zod';
import { ERROR_MESSAGES } from '@lib/constants/message.constant';

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
}

export const zodFailAction: Lifecycle.Method = (_request: Request, _h: ResponseToolkit, error?: Error) => {
  if (error instanceof ZodError) {
    const boomError = Boom.badRequest(ERROR_MESSAGES.VALIDATION_FAILED);
    boomError.data = { code: 'VALIDATION_FAILED', details: formatZodError(error) };
    throw boomError;
  }

  throw error ?? Boom.badRequest(ERROR_MESSAGES.VALIDATION_FAILED);
};

export function createZodValidator<T>(schema: ZodSchema<T>) {
  return {
    payload: async (value: unknown) => schema.parseAsync(value),
    failAction: zodFailAction,
  };
}

export function createZodQueryValidator<T>(schema: ZodSchema<T>) {
  return {
    query: async (value: unknown) => schema.parseAsync(value),
    failAction: zodFailAction,
  };
}
