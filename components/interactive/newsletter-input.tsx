'use client';

import { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { newsletterSchema } from '@/lib/validations';

interface NewsletterInputProps {
  source?: string;
  className?: string;
}

export function NewsletterInput({
  source = 'footer',
  className,
}: NewsletterInputProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    const result = newsletterSchema.safeParse({ email, source });

    if (!result.success) {
      setErrorMsg(result.error.issues[0].message);
      setStatus('error');
      return;
    }

    setErrorMsg('');

    startTransition(async () => {
      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data),
        });

        if (res.ok) {
          setStatus('success');
        } else {
          setErrorMsg('Something went wrong. Please try again.');
          setStatus('error');
        }
      } catch {
        setErrorMsg('Network error. Please check your connection.');
        setStatus('error');
      }
    });
  }

  if (status === 'success') {
    return (
      <p className={cn('text-sm text-success', className)}>
        ✓ You&apos;re subscribed! Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-2', className)} noValidate>
      <div className="flex gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-cyan"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && errorMsg && (
        <p className="text-xs text-error">{errorMsg}</p>
      )}
    </form>
  );
}
