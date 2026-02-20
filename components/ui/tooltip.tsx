import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  position?: 'top' | 'bottom';
  children: ReactNode;
}

function Tooltip({
  content,
  position = 'top',
  className,
  children,
  ...props
}: TooltipProps) {
  return (
    <div className={cn('group/tooltip relative inline-flex', className)} {...props}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap',
          'rounded-md bg-[#0A0A0A] px-2.5 py-1 text-xs text-white',
          'border border-[#1F1F1F] shadow-lg',
          'opacity-0 transition-opacity duration-150',
          'group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100',
          position === 'top' && 'bottom-full mb-2',
          position === 'bottom' && 'top-full mt-2'
        )}
      >
        {content}
      </span>
    </div>
  );
}

export { Tooltip };
