import { contactRepository } from '@app/repository/contact.repository';
import { toContactDto, type ContactDto, type CreateContactRequest } from '@lib/shared/schema/api/contact';

export async function createContactOperation(payload: CreateContactRequest): Promise<ContactDto> {
  const entity = await contactRepository.create(payload);
  return toContactDto(entity);
}
