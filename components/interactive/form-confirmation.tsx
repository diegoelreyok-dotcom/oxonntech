'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

interface FormConfirmationProps {
  title?: string;
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onReset?: () => void;
}

export function FormConfirmation({
  title = 'Message Sent',
  message = 'Thank you for reaching out. Our team will get back to you within 24 hours.',
  ctaLabel = 'Back to Home',
  ctaHref = '/',
  onReset,
}: FormConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center rounded-xl border border-border bg-surface px-6 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <CheckCircle className="h-16 w-16 text-success" />
      </motion.div>

      <h2 className="mt-6 text-h3 font-bold text-white">{title}</h2>
      <p className="mt-3 max-w-md text-body text-muted">{message}</p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-cyan px-6 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
        >
          {ctaLabel}
        </Link>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
          >
            Send another message
          </button>
        )}
      </div>
    </motion.div>
  );
}
