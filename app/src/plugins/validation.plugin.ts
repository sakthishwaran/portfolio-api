import type { Plugin, Server } from '@hapi/hapi';
import { createZodValidator, createZodQueryValidator } from '@lib/shared/validator/zod-validator';

export const validationPlugin: Plugin<undefined> = {
  name: 'app/validation',
  register(server: Server) {
    server.decorate('server', 'validatePayload', createZodValidator);
    server.decorate('server', 'validateQuery', createZodQueryValidator);
  },
};
