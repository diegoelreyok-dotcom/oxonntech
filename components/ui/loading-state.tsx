import { cn } from '@/lib/utils';

export type LoadingVariant = 'spinner' | 'skeleton' | 'dots';

export interface LoadingStateProps {
  variant?: LoadingVariant;
  className?: string;
  width?: string;
  height?: string;
}

function LoadingState({
  variant = 'spinner',
  className,
  width = 'w-full',
  height = 'h-4',
}: LoadingStateProps) {
  if (variant === 'skeleton') {
    return (
      <div
        className={cn(
          'animate-pulse rounded-md bg-[#0A0A0A]',
          width,
          height,
          className
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div
        className={cn('inline-flex items-center gap-1', className)}
        role="status"
        aria-label="Loading"
      >
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00E5FF] [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00E5FF] [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00E5FF]" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="h-5 w-5 animate-spin text-[#00E5FF]"
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
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { LoadingState };
