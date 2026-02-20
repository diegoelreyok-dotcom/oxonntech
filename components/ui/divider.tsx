import { cn } from '@/lib/utils';

export type DividerVariant = 'line' | 'gradient' | 'dots';

export interface DividerProps {
  variant?: DividerVariant;
  className?: string;
}

function Divider({ variant = 'line', className }: DividerProps) {
  if (variant === 'dots') {
    return (
      <div
        className={cn('flex items-center justify-center gap-2 py-8', className)}
        role="separator"
      >
        <span className="h-1 w-1 rounded-full bg-[#2A2A2A]" />
        <span className="h-1 w-1 rounded-full bg-[#2A2A2A]" />
        <span className="h-1 w-1 rounded-full bg-[#2A2A2A]" />
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={cn('py-8', className)} role="separator">
        <div className="h-px bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent" />
      </div>
    );
  }

  return <hr className={cn('border-t border-[#1F1F1F]', className)} />;
}

export { Divider };
