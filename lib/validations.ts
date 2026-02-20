import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  company: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  serviceInterest: z.enum(['alpha', 'risk', 'private', 'technology', 'partnership', 'general']),
  inquiryType: z.enum(['demo', 'consultation', 'partnership', 'general']),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
