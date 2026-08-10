import type { Server } from '@hapi/hapi';
import { CONTACT_ROUTES } from '@lib/constants/api.constant';
import { createContactRequestSchema } from '@lib/shared/schema/api/contact';
import { paginationQuerySchema } from '@lib/shared/schema/api/common/pagination';
import { contactController } from '@app/controller/contact/contact.controller';

export function registerContactRoutes(server: Server): void {
  server.route([
    {
      method: 'POST',
      path: CONTACT_ROUTES.BASE,
      options: {
        validate: server.validatePayload(createContactRequestSchema),
        handler: contactController.create,
      },
    },
    {
      method: 'GET',
      path: CONTACT_ROUTES.BASE,
      options: {
        validate: server.validateQuery(paginationQuerySchema),
        handler: contactController.getAll,
      },
    },
    {
      method: 'GET',
      path: CONTACT_ROUTES.BY_ID,
      options: {
        handler: contactController.getById,
      },
    },
    {
      method: 'DELETE',
      path: CONTACT_ROUTES.BY_ID,
      options: {
        handler: contactController.remove,
      },
    },
  ]);
}
