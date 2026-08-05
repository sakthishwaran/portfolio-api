import { eq, count } from 'drizzle-orm';
import { db } from '@lib/config/database';
import { contacts, type ContactEntity, type NewContactEntity } from '@lib/shared/schema/db';

async function create(data: NewContactEntity): Promise<ContactEntity> {
  const [entity] = await db.insert(contacts).values(data).returning();
  return entity as ContactEntity;
}

async function findById(id: string): Promise<ContactEntity | undefined> {
  const [entity] = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
  return entity;
}

async function findAll(limit: number, offset: number): Promise<ContactEntity[]> {
  return db.select().from(contacts).orderBy(contacts.createdAt).limit(limit).offset(offset);
}

async function countAll(): Promise<number> {
  const [result] = await db.select({ value: count() }).from(contacts);
  return result?.value ?? 0;
}

async function remove(id: string): Promise<boolean> {
  const result = await db.delete(contacts).where(eq(contacts.id, id)).returning({ id: contacts.id });
  return result.length > 0;
}

export const contactRepository = {
  create,
  findById,
  findAll,
  count: countAll,
  remove,
};
