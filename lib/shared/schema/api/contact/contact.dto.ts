import type { ContactEntity } from '@lib/shared/schema/db';

export interface ContactDto {
  id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export function toContactDto(entity: ContactEntity): ContactDto {
  return {
    id: entity.id,
    fullName: entity.fullName,
    email: entity.email,
    message: entity.message ?? '',
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}
