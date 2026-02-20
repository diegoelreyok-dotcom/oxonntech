'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScanLine, Cable, SlidersHorizontal, Zap } from 'lucide-react';

const STEPS = [
  {
    icon: ScanLine,
    title: 'Initial Assessment',
    description:
      'We analyze your current infrastructure and trading setup to design the optimal integration plan.',
  },
  {
    icon: Cable,
    title: 'API Connection',
    description:
      'Secure read-only API integration with your existing systems — zero disruption to live operations.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Calibration',
    description:
      'Custom configuration of models and risk parameters tailored to your specific needs and objectives.',
  },
  {
    icon: Zap,
    title: 'Go Live',
    description:
      'Full deployment with real-time monitoring and dedicated support within 48 hours.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-[120px]">
      {/* Subtle background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial fade to soften grid edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000_70%)]" />

      <div
        ref={sectionRef}
        className="relative mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-[800px] text-center sm:mb-16 lg:mb-20"
        >
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[3px] text-[#00E5FF] sm:text-[14px]">
            Integration
          </p>
          <h2 className="mb-4 text-[1.5rem] font-semibold tracking-tight text-white sm:text-[2rem] lg:text-[3rem]">
            Seamless Integration with Your Infrastructure
          </h2>
          <p className="mx-auto max-w-xl text-[0.9375rem] leading-relaxed text-[#9CA3AF] sm:text-[1.125rem]">
            Connect in minutes. No disruption to existing systems.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className="group relative flex flex-col items-center rounded-2xl border border-transparent px-5 py-8 text-center transition-all duration-500 hover:border-[rgba(0,229,255,0.08)] hover:bg-[rgba(0,229,255,0.02)]"
              >
                {/* Animated connector line — desktop only */}
                {i < STEPS.length - 1 && (
                  <div
                    className="pointer-events-none absolute left-[calc(50%+36px)] top-[52px] hidden h-[2px] lg:block"
                    style={{ width: 'calc(100% - 48px)' }}
                  >
                    {/* Track */}
                    <div className="absolute inset-0 rounded-full bg-[#1A1A1A]" />
                    {/* Animated gradient fill */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[rgba(0,229,255,0.6)] to-[rgba(0,229,255,0.1)]"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : undefined}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.3 + i * 0.12,
                      }}
                      style={{ transformOrigin: 'left' }}
                    />
                    {/* Traveling glow pulse */}
                    <motion.div
                      className="absolute -top-[4px] left-0 h-[10px] w-8 rounded-full bg-[#00E5FF] blur-[8px]"
                      initial={{ left: '-10%', opacity: 0 }}
                      animate={
                        isInView
                          ? { left: '100%', opacity: [0, 0.8, 0.8, 0] }
                          : undefined
                      }
                      transition={{
                        duration: 0.7,
                        ease: 'easeInOut',
                        delay: 0.3 + i * 0.12,
                      }}
                    />
                  </div>
                )}

                {/* Icon container */}
                <div className="relative mb-6">
                  {/* Outer glow on hover */}
                  <div className="absolute -inset-4 rounded-2xl bg-[rgba(0,229,255,0.08)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Ring accent */}
                  <div
                    className="absolute -inset-[3px] rounded-[18px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0,229,255,0.3) 310deg, transparent 360deg)',
                    }}
                  />

                  {/* Icon box */}
                  <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-[rgba(0,229,255,0.15)] bg-gradient-to-b from-[rgba(0,229,255,0.1)] to-[rgba(0,229,255,0.02)] backdrop-blur-sm transition-all duration-500 group-hover:border-[rgba(0,229,255,0.35)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.12)]">
                    <Icon className="h-6 w-6 text-[#00E5FF] transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  {/* Step number */}
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(0,229,255,0.25)] bg-[#0A0A0A] text-[12px] font-bold text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.15)]">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-[1.0625rem] font-semibold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
                  {step.title}
                </h3>
                <p className="max-w-[240px] text-[0.875rem] leading-relaxed text-[#6B7280]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
