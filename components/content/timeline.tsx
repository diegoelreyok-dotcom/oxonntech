'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StaggerChildren, staggerItemVariants } from '@/components/animation/stagger-children';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <StaggerChildren className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-px" />

      <div className="space-y-12">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              variants={staggerItemVariants}
              className={cn(
                'relative flex items-start gap-6',
                'lg:gap-0',
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              )}
            >
              {/* Dot */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                <div className="h-2.5 w-2.5 rounded-full bg-cyan" />
              </div>

              {/* Content */}
              <div
                className={cn(
                  'flex-1',
                  'lg:w-[calc(50%-2.5rem)]',
                  isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                  {event.year}
                </span>
                <h3 className="mt-1 text-body-lg font-semibold text-white">
                  {event.title}
                </h3>
                <p className="mt-2 text-caption leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </StaggerChildren>
  );
}
