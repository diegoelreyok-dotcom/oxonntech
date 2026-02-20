import { describe, it, expect } from 'vitest';
import { contactFormSchema, newsletterSchema } from '@/lib/validations';

describe('contactFormSchema', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I would like to learn more about your services.',
    serviceInterest: 'alpha' as const,
    inquiryType: 'demo' as const,
  };

  it('accepts valid contact data', () => {
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('accepts optional fields', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      company: 'OXONN',
      role: 'CTO',
      phone: '+1234567890',
    });
    expect(result.success).toBe(true);
  });

  it('rejects name shorter than 2 chars', () => {
    const result = contactFormSchema.safeParse({ ...validData, name: 'J' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactFormSchema.safeParse({ ...validData, email: 'not-email' });
    expect(result.success).toBe(false);
  });

  it('rejects message shorter than 10 chars', () => {
    const result = contactFormSchema.safeParse({ ...validData, message: 'Hi' });
    expect(result.success).toBe(false);
  });

  it('rejects message longer than 2000 chars', () => {
    const result = contactFormSchema.safeParse({ ...validData, message: 'x'.repeat(2001) });
    expect(result.success).toBe(false);
  });

  it('rejects invalid serviceInterest enum', () => {
    const result = contactFormSchema.safeParse({ ...validData, serviceInterest: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid inquiryType enum', () => {
    const result = contactFormSchema.safeParse({ ...validData, inquiryType: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('catches honeypot filled by bots', () => {
    const result = contactFormSchema.safeParse({ ...validData, honeypot: 'bot-filled' });
    expect(result.success).toBe(false);
  });

  it('accepts empty honeypot', () => {
    const result = contactFormSchema.safeParse({ ...validData, honeypot: '' });
    expect(result.success).toBe(true);
  });
});

describe('newsletterSchema', () => {
  it('accepts valid email', () => {
    const result = newsletterSchema.safeParse({ email: 'user@example.com' });
    expect(result.success).toBe(true);
  });

  it('accepts email with optional source', () => {
    const result = newsletterSchema.safeParse({ email: 'user@example.com', source: 'footer' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = newsletterSchema.safeParse({ email: 'bad' });
    expect(result.success).toBe(false);
  });

  it('rejects missing email', () => {
    const result = newsletterSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
