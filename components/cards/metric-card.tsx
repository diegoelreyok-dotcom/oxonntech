'use client';

import { cn } from '@/lib/utils';
import { Counter } from '@/components/animation/counter';
import type { ServiceMetric } from '@/types';

interface MetricCardProps {
  metric: ServiceMetric;
  className?: string;
}

function parseMetricValue(value: string) {
  // Extract prefix like < or >
  const prefixMatch = value.match(/^([<>≤≥])/);
  const prefix = prefixMatch ? prefixMatch[1] : '';
  const withoutPrefix = prefix ? value.slice(prefix.length) : value;

  // Extract numeric part and any trailing characters (e.g., "+", "B+", "%")
  const numMatch = withoutPrefix.match(/^([0-9,]+\.?[0-9]*)\s*(.*)$/);
  if (!numMatch) {
    return { prefix: '', num: 0, valueSuffix: '', isNumeric: false, decimals: 0 };
  }

  const numStr = numMatch[1].replace(/,/g, '');
  const valueSuffix = numMatch[2];
  const num = parseFloat(numStr);
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

  return { prefix, num: isNaN(num) ? 0 : num, valueSuffix, isNumeric: !isNaN(num), decimals };
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const { prefix, num, valueSuffix, isNumeric, decimals } = parseMetricValue(metric.value);

  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-lg border border-border bg-surface p-6 text-center transition-colors duration-300 hover:border-border-light',
        className
      )}
    >
      <p className="text-h2 font-bold text-cyan">
        {isNumeric ? (
          <Counter to={num} prefix={prefix} suffix={valueSuffix} decimals={decimals} />
        ) : (
          metric.value
        )}
      </p>
      {metric.suffix && (
        <p className="mt-1 text-xs font-medium text-muted">{metric.suffix}</p>
      )}
      <p className="mt-2 text-sm font-medium text-white">{metric.label}</p>
      {metric.description && (
        <p className="mt-1 text-xs text-muted-foreground">{metric.description}</p>
      )}
    </div>
  );
}
