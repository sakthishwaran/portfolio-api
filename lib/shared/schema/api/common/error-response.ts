export interface ErrorResponse {
  success: false;
  message: string;
  code: string;
  details?: unknown;
}

export function buildErrorResponse(message: string, code: string, details?: unknown): ErrorResponse {
  return { success: false, message, code, details };
}
