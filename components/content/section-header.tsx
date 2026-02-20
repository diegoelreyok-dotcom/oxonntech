import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {label && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00E5FF]">
          {label}
        </p>
      )}
      <h2
        className={cn(
          'text-[2rem] font-bold tracking-tight text-white',
          align === 'center' && 'mx-auto max-w-2xl'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-[1.125rem] text-[#9CA3AF]',
            align === 'center' && 'mx-auto max-w-xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
