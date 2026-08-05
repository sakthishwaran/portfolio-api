export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export function buildSuccessResponse<T>(data: T, message: string): ApiResponse<T> {
  return { success: true, message, data };
}
