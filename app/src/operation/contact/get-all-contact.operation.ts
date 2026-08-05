import { contactRepository } from '@app/repository/contact.repository';
import { toContactDto, type ContactDto } from '@lib/shared/schema/api/contact';
import type { PaginationQuery, PaginationResponse } from '@lib/shared/schema/api/common/pagination';
import { buildPaginationMeta, toOffset } from '@lib/shared/utility/pagination.utility';

export async function getAllContactOperation(query: PaginationQuery): Promise<PaginationResponse<ContactDto>> {
  const offset = toOffset(query.page, query.limit);

  const [items, total] = await Promise.all([
    contactRepository.findAll(query.limit, offset),
    contactRepository.count(),
  ]);

  return {
    items: items.map(toContactDto),
    meta: buildPaginationMeta(query.page, query.limit, total),
  };
}
