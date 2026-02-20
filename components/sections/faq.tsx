'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How does OXONN integrate with existing trading infrastructure?',
    answer:
      'We connect via secure, read-only APIs to your existing systems — OMS, EMS, risk platforms, and data feeds. Integration typically takes 24-48 hours with zero disruption to live trading operations.',
  },
  {
    question: 'What types of risk does your platform monitor?',
    answer:
      'Our platform covers market risk (VaR, CVaR, Greeks), credit risk, liquidity risk, and operational risk. We compute portfolio-level and position-level metrics in real-time across all asset classes.',
  },
  {
    question: 'How is alpha generated through your quantitative models?',
    answer:
      'Our models combine proprietary factor research, machine learning, and alternative data to identify persistent market inefficiencies. Every strategy undergoes rigorous backtesting and out-of-sample validation before deployment.',
  },
  {
    question: 'What data access does OXONN require?',
    answer:
      'We require read-only access to portfolio positions, market data feeds, and trade history. We never request write access or execution permissions on your accounts.',
  },
  {
    question: 'How long does the onboarding process take?',
    answer:
      'Standard onboarding takes 1-2 weeks from initial assessment to go-live. This includes infrastructure review, API integration, model calibration, and UAT testing with your team.',
  },
  {
    question: 'Can OXONN scale with our growing operations?',
    answer:
      'Absolutely. Our distributed architecture is built to scale horizontally. Whether you manage 100 or 100,000 instruments, the platform maintains sub-millisecond latency without degradation.',
  },
  {
    question: 'What happens if the system flags a false positive?',
    answer:
      'All alerts include confidence scores and supporting data so your team can quickly assess validity. Our models continuously learn from feedback to reduce false positive rates over time.',
  },
  {
    question: 'Is there a trial or pilot program available?',
    answer:
      'Yes. We offer a 30-day pilot program where you can evaluate the platform with live data in a sandboxed environment. No commitment required — we let the results speak for themselves.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className={`overflow-hidden rounded-xl border bg-[rgb(12,12,12)] transition-colors duration-300 ${
        isOpen
          ? 'border-[rgba(0,229,255,0.15)]'
          : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,229,255,0.1)]'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="pr-6 text-[0.875rem] font-medium text-white sm:pr-8 sm:text-[1rem]">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown
            className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
              isOpen ? 'text-[#00E5FF]' : 'text-[#6B7280]'
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 pr-10 text-[0.8125rem] leading-relaxed text-[#9CA3AF] sm:px-6 sm:pb-5 sm:pr-14 sm:text-[0.9375rem]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
            FAQ
          </p>
          <h2 className="text-[1.5rem] font-semibold tracking-tight text-white sm:text-[2rem] lg:text-[2.75rem]">
            Common Questions
          </h2>
        </motion.div>

        {/* FAQ List — stagger entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-[768px] space-y-2"
        >
          {FAQ_ITEMS.map((item) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
