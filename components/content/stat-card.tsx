'use client';

import { cn } from '@/lib/utils';
import { Counter } from '@/components/animation/counter';

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  decimals?: number;
  className?: string;
}

export function StatCard({
  value,
  suffix,
  prefix,
  label,
  description,
  decimals = 0,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-xl border border-[#1F1F1F] bg-[#0A0A0A] p-8 text-center transition-colors duration-300 hover:border-[#2A2A2A]',
        className
      )}
    >
      <p className="text-[3rem] font-bold text-[#00E5FF] lg:text-[4rem]">
        <Counter to={value} suffix={suffix} prefix={prefix} decimals={decimals} />
      </p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white">
        {label}
      </p>
      {description && (
        <p className="mt-2 text-[0.875rem] text-[#6B7280]">{description}</p>
      )}
    </div>
  );
}
