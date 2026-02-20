'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Slot } from './slot';
import { cn } from '@/lib/utils';

const variantStyles = {
  primary:
    'bg-cyan text-black font-semibold hover:bg-cyan-500 active:bg-cyan-600',
  secondary:
    'bg-transparent text-cyan border border-cyan hover:bg-cyan/10 active:bg-cyan/20',
  ghost:
    'bg-transparent text-foreground hover:underline underline-offset-4 decoration-cyan',
  outline:
    'bg-transparent text-foreground border border-white/30 hover:border-white hover:bg-white/5 active:bg-white/10',
} as const;

const sizeStyles = {
  sm: 'h-8 px-3 text-caption gap-1.5 rounded-md',
  md: 'h-10 px-5 text-body gap-2 rounded-lg',
  lg: 'h-12 px-7 text-body-lg gap-2.5 rounded-lg',
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  loading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      loading = false,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap font-sans',
          'transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon ? (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };
