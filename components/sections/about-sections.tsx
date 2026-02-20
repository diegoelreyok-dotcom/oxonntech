'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FlaskConical, ScanEye, Cpu } from 'lucide-react';

/* ═══════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════ */

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

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ═══════════════════════════════════════════
   Mission Section
   ═══════════════════════════════════════════ */

export function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-[100px]">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16"
      >
        <div className="mx-auto max-w-[680px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 text-center"
          >
            <p className="mb-4 text-[14px] font-medium uppercase tracking-[3px] text-[#00E5FF]">
              Our Mission
            </p>
            <h2 className="text-[2rem] font-semibold tracking-tight text-white lg:text-[2.75rem]">
              Where Science Meets Finance
            </h2>
          </motion.div>

          {/* Animated text paragraphs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            <motion.p
              variants={textVariants}
              className="text-[1rem] leading-relaxed text-[#9CA3AF]"
            >
              We believe the future of finance is systematic. At OXONN, every
              investment decision, every risk assessment, and every portfolio
              construction is driven by rigorous quantitative methodology —
              not intuition, not narrative, not market noise.
            </motion.p>
            <motion.p
              variants={textVariants}
              className="text-[1rem] leading-relaxed text-[#9CA3AF]"
            >
              Our team works at the intersection of applied mathematics,
              statistical learning, and high-performance computing to deliver
              alpha with discipline and transparency.
            </motion.p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : undefined}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-12 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Values Section
   ═══════════════════════════════════════════ */

const VALUES = [
  {
    icon: FlaskConical,
    title: 'Systematic Rigor',
    description:
      'Every strategy is built on testable hypotheses, robust statistical frameworks, and continuous validation against real-world data.',
  },
  {
    icon: ScanEye,
    title: 'Radical Transparency',
    description:
      'We believe our clients deserve full visibility into methodology, risk exposures, and performance attribution — no black boxes.',
  },
  {
    icon: Cpu,
    title: 'Engineering Excellence',
    description:
      'Our infrastructure is built for institutional resilience — redundant, low-latency, and designed to perform under extreme market conditions.',
  },
];

export function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-[100px]">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-14 max-w-[600px] text-center"
        >
          <p className="mb-4 text-[14px] font-medium uppercase tracking-[3px] text-[#00E5FF]">
            Our Principles
          </p>
          <h2 className="text-[2rem] font-semibold tracking-tight text-white lg:text-[2.75rem]">
            What Drives Us
          </h2>
        </motion.div>

        {/* Cards grid with gap-px */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.08)] bg-[#1F1F1F] md:grid-cols-3"
        >
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={cardVariants}
                className="group flex flex-col bg-[#0A0A0A] p-8 transition-colors duration-500 hover:bg-[rgba(0,229,255,0.02)]"
              >
                {/* Icon */}
                <div className="relative mb-5">
                  <div className="absolute -inset-2 rounded-xl bg-[rgba(0,229,255,0.06)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,229,255,0.12)] bg-gradient-to-b from-[rgba(0,229,255,0.1)] to-transparent transition-all duration-500 group-hover:border-[rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    <Icon className="h-[18px] w-[18px] text-[#00E5FF] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-[1rem] font-semibold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-[0.8125rem] leading-relaxed text-[#6B7280]">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
