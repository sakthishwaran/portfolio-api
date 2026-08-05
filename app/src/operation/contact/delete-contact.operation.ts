import { contactRepository } from '@app/repository/contact.repository';
import { NotFoundException } from '@lib/shared/exception';
import { ERROR_MESSAGES } from '@lib/constants/message.constant';
import { isValidUuid } from '@lib/shared/utility/id.utility';

export async function deleteContactOperation(id: string): Promise<void> {
  if (!isValidUuid(id)) {
    throw new NotFoundException(ERROR_MESSAGES.CONTACT_NOT_FOUND);
  }

  const deleted = await contactRepository.remove(id);

  if (!deleted) {
    throw new NotFoundException(ERROR_MESSAGES.CONTACT_NOT_FOUND);
  }
}
