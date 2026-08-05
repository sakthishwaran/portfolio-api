export const SUCCESS_MESSAGES = {
  CONTACT_CREATED: 'Contact enquiry submitted successfully.',
  CONTACT_FETCHED: 'Contact enquiry fetched successfully.',
  CONTACTS_FETCHED: 'Contact enquiries fetched successfully.',
  CONTACT_DELETED: 'Contact enquiry deleted successfully.',
} as const;

export const ERROR_MESSAGES = {
  CONTACT_NOT_FOUND: 'Contact enquiry not found.',
  VALIDATION_FAILED: 'Validation failed.',
  INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later.',
  INVALID_ID: 'Invalid identifier provided.',
} as const;
