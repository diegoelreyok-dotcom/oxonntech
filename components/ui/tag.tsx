'use client';

import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function Tag({
  className,
  active = false,
  children,
  onClick,
  ...props
}: TagProps) {
  const isClickable = !!onClick;

  return (
    <button
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
        'transition-colors duration-150',
        active
          ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]'
          : 'border-[#1F1F1F] text-[#9CA3AF] hover:border-[#2A2A2A] hover:text-white',
        isClickable && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export { Tag };
