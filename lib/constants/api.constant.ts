export const API_PREFIX = '/api/v1';

export const CONTACT_ROUTES = {
  BASE: `${API_PREFIX}/contact`,
  BY_ID: `${API_PREFIX}/contact/{id}`,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;
