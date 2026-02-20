import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = {
  default: 'bg-[#0A0A0A] text-[#9CA3AF] border border-[#1F1F1F]',
  accent: 'bg-[#00E5FF] text-black',
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
