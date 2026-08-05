import { contactRepository } from '@app/repository/contact.repository';
import { toContactDto, type ContactDto } from '@lib/shared/schema/api/contact';
import { NotFoundException } from '@lib/shared/exception';
import { ERROR_MESSAGES } from '@lib/constants/message.constant';
import { isValidUuid } from '@lib/shared/utility/id.utility';

export async function getContactOperation(id: string): Promise<ContactDto> {
  if (!isValidUuid(id)) {
    throw new NotFoundException(ERROR_MESSAGES.CONTACT_NOT_FOUND);
  }

  const entity = await contactRepository.findById(id);

  if (!entity) {
    throw new NotFoundException(ERROR_MESSAGES.CONTACT_NOT_FOUND);
  }

  return toContactDto(entity);
}
