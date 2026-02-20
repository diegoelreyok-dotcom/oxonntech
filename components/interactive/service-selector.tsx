'use client';

import { cn } from '@/lib/utils';
import { SERVICE_INTEREST_LABELS } from '@/types';
import type { ServiceInterest } from '@/types';

interface ServiceSelectorProps {
  value: ServiceInterest;
  onChange: (value: ServiceInterest) => void;
  className?: string;
}

const OPTIONS: { value: ServiceInterest; label: string }[] = Object.entries(
  SERVICE_INTEREST_LABELS
).map(([value, label]) => ({
  value: value as ServiceInterest,
  label,
}));

export function ServiceSelector({
  value,
  onChange,
  className,
}: ServiceSelectorProps) {
  return (
    <fieldset className={cn(className)}>
      <legend className="mb-3 text-sm font-medium text-white">
        What are you interested in?
      </legend>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-all duration-200',
                isSelected
                  ? 'border-cyan bg-cyan/10 text-cyan'
                  : 'border-border text-muted-foreground hover:border-border-light hover:text-white'
              )}
              aria-pressed={isSelected}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
