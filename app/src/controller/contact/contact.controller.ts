import type { Request, ResponseToolkit } from '@hapi/hapi';
import { createContactOperation } from '@app/operation/contact/create-contact.operation';
import { getContactOperation } from '@app/operation/contact/get-contact.operation';
import { getAllContactOperation } from '@app/operation/contact/get-all-contact.operation';
import { deleteContactOperation } from '@app/operation/contact/delete-contact.operation';
import { sendSuccess } from '@lib/shared/helper/response.helper';
import { SUCCESS_MESSAGES } from '@lib/constants/message.constant';
import type { CreateContactRequest } from '@lib/shared/schema/api/contact';
import type { PaginationQuery } from '@lib/shared/schema/api/common/pagination';

async function create(request: Request, h: ResponseToolkit) {
  const payload = request.payload as CreateContactRequest;
  const contact = await createContactOperation(payload);
  return sendSuccess(h, contact, SUCCESS_MESSAGES.CONTACT_CREATED, 201);
}

async function getAll(request: Request, h: ResponseToolkit) {
  const query = request.query as unknown as PaginationQuery;
  const result = await getAllContactOperation(query);
  return sendSuccess(h, result, SUCCESS_MESSAGES.CONTACTS_FETCHED);
}

async function getById(request: Request, h: ResponseToolkit) {
  const { id } = request.params as { id: string };
  const contact = await getContactOperation(id);
  return sendSuccess(h, contact, SUCCESS_MESSAGES.CONTACT_FETCHED);
}

async function remove(request: Request, h: ResponseToolkit) {
  const { id } = request.params as { id: string };
  await deleteContactOperation(id);
  return sendSuccess(h, null, SUCCESS_MESSAGES.CONTACT_DELETED);
}

export const contactController = { create, getAll, getById, remove };
