'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lock, Eye, Shield, Users, FileCheck, Globe } from 'lucide-react';

const SECURITY_ITEMS = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'AES-256 at rest, TLS 1.3 in transit.',
  },
  {
    icon: Eye,
    title: 'Read-Only Access',
    description: 'Non-invasive monitoring. Zero trade execution.',
  },
  {
    icon: Shield,
    title: 'SOC 2 Compliant',
    description: '99.9% uptime. Regular security audits.',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description: 'Granular permissions for every team member.',
  },
  {
    icon: FileCheck,
    title: 'Regulatory Ready',
    description: 'Global financial compliance built in.',
  },
  {
    icon: Globe,
    title: 'Data Sovereignty',
    description: 'Data stays in your jurisdiction. Always.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function SecurityTrust() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

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
            Security
          </p>
          <h2 className="text-[1.5rem] font-semibold tracking-tight text-white sm:text-[2rem] lg:text-[2.75rem]">
            Enterprise-Grade Protection
          </h2>
        </motion.div>

        {/* Grid with gap-px dividers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.08)] bg-[#1F1F1F] sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Animated scan line */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-30"
            initial={{ top: '0%' }}
            animate={isInView ? { top: ['0%', '100%'] } : undefined}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
          />

          {SECURITY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group flex flex-col bg-[#0A0A0A] p-6 transition-colors duration-500 hover:bg-[rgba(0,229,255,0.02)]"
              >
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute -inset-2 rounded-xl bg-[rgba(0,229,255,0.06)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,229,255,0.12)] bg-gradient-to-b from-[rgba(0,229,255,0.1)] to-transparent transition-all duration-500 group-hover:border-[rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    <Icon className="h-[18px] w-[18px] text-[#00E5FF] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-1.5 text-[0.9375rem] font-semibold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[0.8125rem] leading-snug text-[#6B7280]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
