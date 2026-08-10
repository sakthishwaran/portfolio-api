import { db, closeDatabaseConnection } from '@lib/config/database';
import { contacts } from '@lib/shared/schema/db';
import { logger } from '@lib/shared/logger/logger';

async function seed(): Promise<void> {
  await db.insert(contacts).values({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    message: 'Hi, I would love to discuss a potential project collaboration.',
  });

  logger.info('Database seeded successfully.');
}

seed()
  .catch((error: unknown) => {
    logger.error({ err: error }, 'Failed to seed database');
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDatabaseConnection();
  });
