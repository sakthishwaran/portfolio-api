import type { Plugin, Server } from '@hapi/hapi';
import { db, closeDatabaseConnection } from '@lib/config/database';

export const databasePlugin: Plugin<undefined> = {
  name: 'app/database',
  register(server: Server) {
    server.app.db = db;

    server.ext('onPostStop', async () => {
      await closeDatabaseConnection();
    });
  },
};
