import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import type { BreadcrumbItem } from '@/types';

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-[#1F1F1F] bg-gradient-to-b from-[#0A0A0A] to-black px-6 pb-16 pt-28 lg:pb-20 lg:pt-36',
        className
      )}
    >
      <div className="mx-auto max-w-[1280px]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} className="mb-6" />
        )}

        <h1 className="max-w-3xl text-[1.875rem] font-bold tracking-tight text-white sm:text-[3rem] lg:text-[4.5rem] lg:leading-[1.1]">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-xl text-[0.9375rem] text-[#9CA3AF] sm:text-[1.125rem]">
            {description}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>

      {/* Decorative gradient sphere */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#00E5FF]/5 blur-3xl" />
    </section>
  );
}
