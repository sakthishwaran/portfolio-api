import { z } from 'zod';

export const createContactRequestSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(150),
  email: z.string().trim().email('A valid email is required').max(255),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
});

export type CreateContactRequest = z.infer<typeof createContactRequestSchema>;
