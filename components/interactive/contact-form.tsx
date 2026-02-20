'use client';

import { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { ServiceSelector } from '@/components/interactive/service-selector';
import { FormConfirmation } from '@/components/interactive/form-confirmation';
import type { ServiceInterest, InquiryType } from '@/types';

interface ContactFormProps {
  defaultServiceInterest?: ServiceInterest;
  defaultInquiryType?: InquiryType;
  className?: string;
}

export function ContactForm({
  defaultServiceInterest = 'general',
  defaultInquiryType = 'general',
  className,
}: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [serviceInterest, setServiceInterest] = useState<ServiceInterest>(defaultServiceInterest);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      company: (formData.get('company') as string) || undefined,
      role: (formData.get('role') as string) || undefined,
      phone: (formData.get('phone') as string) || undefined,
      serviceInterest,
      inquiryType: defaultInquiryType,
      honeypot: (formData.get('honeypot') as string) || undefined,
    };

    const result = contactFormSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    startTransition(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data),
        });

        if (res.ok) {
          setIsSubmitted(true);
        } else {
          setErrors({ name: 'Something went wrong. Please try again.' });
        }
      } catch {
        setErrors({ name: 'Network error. Please check your connection.' });
      }
    });
  }

  if (isSubmitted) {
    return <FormConfirmation onReset={() => setIsSubmitted(false)} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
    >
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Service interest */}
      <ServiceSelector value={serviceInterest} onChange={setServiceInterest} />

      {/* Name & Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white">
            Name <span className="text-error">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={cn(
              'w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-cyan',
              errors.name ? 'border-error' : 'border-border'
            )}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
            Email <span className="text-error">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={cn(
              'w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-cyan',
              errors.email ? 'border-error' : 'border-border'
            )}
            placeholder="you@company.com"
          />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
        </div>
      </div>

      {/* Company & Role */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-white">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-cyan"
            placeholder="Company name"
          />
        </div>

        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-white">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-cyan"
            placeholder="Your role"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white">
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(
            'w-full resize-none rounded-lg border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-cyan',
            errors.message ? 'border-error' : 'border-border'
          )}
          placeholder="Tell us about your needs..."
        />
        {errors.message && <p className="mt-1 text-xs text-error">{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-cyan px-8 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
