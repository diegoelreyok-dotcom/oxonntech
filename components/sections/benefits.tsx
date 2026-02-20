'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingDown, Clock, TrendingUp, ShieldCheck } from 'lucide-react';
import { Counter } from '@/components/animation/counter';

const BENEFITS = [
  {
    icon: TrendingDown,
    metricValue: 34,
    metricSuffix: '%',
    title: 'Risk Reduction',
    description: 'Average portfolio drawdown decrease',
  },
  {
    icon: Clock,
    metricValue: 120,
    metricSuffix: '+',
    title: 'Hours Saved',
    description: 'Per month on manual processes',
  },
  {
    icon: TrendingUp,
    metricValue: 4,
    metricSuffix: 'x',
    title: 'Capacity Scale',
    description: 'Without additional quant staff',
  },
  {
    icon: ShieldCheck,
    metricValue: 100,
    metricSuffix: '%',
    title: 'Audit Coverage',
    description: 'Every decision logged and traceable',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 sm:py-20 lg:py-[100px]">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-[600px] text-center sm:mb-14"
        >
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[3px] text-[#00E5FF] sm:text-[14px]">
            Impact
          </p>
          <h2 className="text-[1.5rem] font-semibold tracking-tight text-white sm:text-[2rem] lg:text-[2.75rem]">
            Measurable Results from Day One
          </h2>
        </motion.div>

        {/* 4-column metrics grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.08)] bg-[#1F1F1F] lg:grid-cols-4"
        >
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={cardVariants}
                className="group flex flex-col items-center bg-[#0A0A0A] px-6 py-10 text-center transition-colors duration-500 hover:bg-[rgba(0,229,255,0.02)]"
              >
                {/* Icon */}
                <div className="relative mb-5">
                  <div className="absolute -inset-2 rounded-xl bg-[rgba(0,229,255,0.06)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,229,255,0.12)] bg-gradient-to-b from-[rgba(0,229,255,0.1)] to-transparent transition-all duration-500 group-hover:border-[rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    <Icon className="h-[18px] w-[18px] text-[#00E5FF] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>

                {/* Metric — the hero */}
                <Counter
                  to={benefit.metricValue}
                  suffix={benefit.metricSuffix}
                  duration={2}
                  className="text-[2.5rem] font-bold leading-none text-[#00E5FF] drop-shadow-[0_0_16px_rgba(0,229,255,0.3)]"
                />

                {/* Title */}
                <h3 className="mt-3 text-[0.9375rem] font-semibold text-white">
                  {benefit.title}
                </h3>

                {/* One-liner */}
                <p className="mt-1.5 text-[0.8125rem] leading-snug text-[#6B7280]">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
