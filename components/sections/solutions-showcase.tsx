'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, Gem } from 'lucide-react';
import { SectionReveal } from '@/components/animation/section-reveal';

/* ── Helper: cubic bezier wave path (from Framer LineChart) ── */

function buildWavePath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return '';
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const midX = (p0.x + p1.x) / 2;
    d += ` C${midX},${p0.y} ${midX},${p1.y} ${p1.x},${p1.y}`;
  }
  return d;
}

function buildWaveFillPath(pts: { x: number; y: number }[], bottom: number): string {
  const line = buildWavePath(pts);
  if (!line) return '';
  const last = pts[pts.length - 1];
  const first = pts[0];
  return `${line} L${last.x},${bottom} L${first.x},${bottom}Z`;
}

/* ── 1. Alpha Chart — Dual-line wave chart ───────────── */

function AlphaChart({ animate }: { animate: boolean }) {
  const viewW = 320;
  const viewH = 180;
  const padL = 36;
  const padR = 12;
  const padT = 24;
  const padB = 28;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const oxonnData = [2.1, 4.8, 3.6, 8.2, 6.9, 11.4, 14.2, 18.3];
  const benchData = [1.8, 3.2, 2.1, 4.5, 3.8, 5.2, 6.1, 7.4];

  const yMin = 0;
  const yMax = 22;
  const yTicks = [0, 5, 10, 15, 20];

  function toSvg(data: number[]) {
    return data.map((v, i) => ({
      x: padL + (i * (viewW - padL - padR)) / (data.length - 1),
      y: padT + ((yMax - v) * (viewH - padT - padB)) / (yMax - yMin),
    }));
  }

  const oxonnPts = toSvg(oxonnData);
  const benchPts = toSvg(benchData);
  const oxonnPath = buildWavePath(oxonnPts);
  const oxonnFill = buildWaveFillPath(oxonnPts, viewH - padB);

  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`} className="h-full w-full">
      <defs>
        <linearGradient id="alphaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,229,255,0.25)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </linearGradient>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {yTicks.map((val) => {
        const y = padT + ((yMax - val) * (viewH - padT - padB)) / (yMax - yMin);
        return (
          <g key={val}>
            <line x1={padL} y1={y} x2={viewW - padR} y2={y} stroke="#1A1A1A" strokeWidth="0.5" />
            <text x={padL - 6} y={y + 3} fontSize="8" fill="#4B5563" textAnchor="end" fontFamily="var(--font-mono)">
              {val}%
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {months.map((m, i) => {
        const x = padL + (i * (viewW - padL - padR)) / (months.length - 1);
        return (
          <text key={m} x={x} y={viewH - 6} fontSize="8" fill="#4B5563" textAnchor="middle" fontFamily="var(--font-mono)">
            {m}
          </text>
        );
      })}

      {/* Benchmark line (muted, behind) */}
      <motion.path
        d={buildWavePath(benchPts)}
        fill="none"
        stroke="#333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 3"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />

      {/* OXONN fill area */}
      <motion.path
        d={oxonnFill}
        fill="url(#alphaGrad)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 1.4 }}
      />

      {/* OXONN line with glow */}
      <motion.path
        d={oxonnPath}
        fill="none"
        stroke="#00E5FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#lineGlow)"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />

      {/* Data points */}
      {oxonnPts.map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r="3"
          fill="#0A0A0A"
          stroke="#00E5FF"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.25, delay: 1.6 + i * 0.06 }}
        />
      ))}

      {/* Legend */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <line x1={padL} y1={10} x2={padL + 16} y2={10} stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
        <text x={padL + 20} y={13} fontSize="8" fill="#9CA3AF">OXONN Strategy</text>
        <line x1={padL + 110} y1={10} x2={padL + 126} y2={10} stroke="#333" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={padL + 130} y={13} fontSize="8" fill="#4B5563">S&P 500</text>
      </motion.g>
    </svg>
  );
}

/* ── 2. Risk Bars — Animated horizontal metrics ──────── */

const RISK_METRICS = [
  { label: 'VaR Reduction', value: 92, color: '#00E5FF' },
  { label: 'Drawdown Control', value: 87, color: 'rgba(0,229,255,0.7)' },
  { label: 'Hedge Coverage', value: 95, color: 'rgba(0,229,255,0.85)' },
];

function RiskBars({ animate }: { animate: boolean }) {
  return (
    <div className="flex w-full flex-col gap-4 px-2">
      {RISK_METRICS.map((metric, i) => (
        <div key={metric.label}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#9CA3AF]">{metric.label}</span>
            <motion.span
              className="font-mono text-[12px] font-bold text-[#00E5FF]"
              initial={{ opacity: 0 }}
              animate={animate ? { opacity: 1 } : undefined}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.15 }}
            >
              {metric.value}%
            </motion.span>
          </div>
          <div className="relative h-[6px] w-full overflow-hidden rounded-full bg-[#1A1A1A]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, rgba(0,229,255,0.3), ${metric.color})`,
                boxShadow: `0 0 12px ${metric.color}40`,
              }}
              initial={{ width: '0%' }}
              animate={animate ? { width: `${metric.value}%` } : undefined}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4 + i * 0.15,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 3. Allocation Bars — Animated vertical bar chart ── */

const ALLOC_DATA = [
  { label: 'Equity', value: 35, color: '#00E5FF' },
  { label: 'Fixed\nInc.', value: 25, color: '#00B8CC' },
  { label: 'Alts', value: 22, color: '#008A99' },
  { label: 'Cash', value: 18, color: '#005C66' },
];

function AllocationBars({ animate }: { animate: boolean }) {
  const maxVal = 40;
  const barH = 100;

  return (
    <div className="flex w-full items-end justify-center gap-5 px-4">
      {ALLOC_DATA.map((item, i) => {
        const height = (item.value / maxVal) * barH;
        return (
          <div key={item.label} className="flex flex-col items-center gap-2">
            {/* Value label */}
            <motion.span
              className="font-mono text-[11px] font-bold text-[#00E5FF]"
              initial={{ opacity: 0, y: 6 }}
              animate={animate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
            >
              {item.value}%
            </motion.span>
            {/* Bar */}
            <div
              className="relative w-10 overflow-hidden rounded-t-md"
              style={{ height: barH }}
            >
              <motion.div
                className="absolute inset-x-0 bottom-0 rounded-t-md"
                style={{
                  background: `linear-gradient(to top, ${item.color}40, ${item.color})`,
                  boxShadow: `0 -4px 16px ${item.color}30`,
                }}
                initial={{ height: 0 }}
                animate={animate ? { height } : undefined}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4 + i * 0.12,
                }}
              />
            </div>
            {/* Label */}
            <span className="text-center text-[10px] leading-tight text-[#4B5563]">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export function SolutionsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <SectionReveal className="border-t border-[#1F1F1F] py-[120px]">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16"
      >
        {/* Header */}
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <p className="mb-4 text-[14px] font-medium uppercase tracking-[3px] text-[#00E5FF]">
            Solutions
          </p>
          <h2 className="mb-4 text-[2rem] font-semibold tracking-tight text-white lg:text-[3rem]">
            Three Pillars of Quantitative Edge
          </h2>
          <p className="mx-auto max-w-xl text-[1.125rem] leading-relaxed text-[#9CA3AF]">
            From alpha generation to risk management and bespoke private
            solutions.
          </p>
        </div>

        {/* Featured card — Alpha */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/solutions/alpha"
            className="group mb-6 flex flex-col overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.08)] bg-[#0A0A0A] transition-all duration-500 hover:border-[rgba(0,229,255,0.2)] hover:-translate-y-0.5 lg:flex-row"
          >
            <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
              <div className="relative mb-4">
                <div className="absolute -inset-2 rounded-xl bg-[rgba(0,229,255,0.06)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,229,255,0.12)] bg-gradient-to-b from-[rgba(0,229,255,0.1)] to-transparent transition-all duration-500 group-hover:border-[rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                  <TrendingUp className="h-5 w-5 text-[#00E5FF] transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="mb-2 text-[1.375rem] font-semibold text-white transition-colors duration-200 group-hover:text-[#00E5FF]">
                High Alpha Strategies
              </h3>
              <p className="mb-4 text-[0.9375rem] leading-relaxed text-[#6B7280]">
                Systematic alpha generation through quantitative models and
                factor-driven investing. Proprietary multi-factor models
                capturing cross-sectional and time-series anomalies.
              </p>
              <p className="mb-4 text-[0.8125rem] text-[#9CA3AF]">
                For hedge funds, asset managers, and institutional allocators
              </p>
              <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-[#00E5FF] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                Explore Strategies
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="flex items-center justify-center border-t border-[#1F1F1F] p-6 lg:w-[400px] lg:border-l lg:border-t-0">
              <AlphaChart animate={isInView} />
            </div>
          </Link>
        </motion.div>

        {/* Two smaller cards */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Risk & Hedging */}
          <motion.div variants={cardVariants}>
            <Link
              href="/solutions/risk"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.08)] bg-[#0A0A0A] transition-all duration-500 hover:border-[rgba(0,229,255,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex-1 p-8">
                <div className="relative mb-4">
                  <div className="absolute -inset-2 rounded-xl bg-[rgba(0,229,255,0.06)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,229,255,0.12)] bg-gradient-to-b from-[rgba(0,229,255,0.1)] to-transparent transition-all duration-500 group-hover:border-[rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    <Shield className="h-5 w-5 text-[#00E5FF] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                <h3 className="mb-2 text-[1.125rem] font-semibold text-white transition-colors duration-200 group-hover:text-[#00E5FF]">
                  Risk & Hedging
                </h3>
                <p className="mb-3 text-[0.875rem] leading-relaxed text-[#6B7280]">
                  Institutional-grade risk management and real-time hedging
                  infrastructure for trading desks.
                </p>
                <p className="text-[0.8125rem] text-[#9CA3AF]">
                  For brokers, prop firms, and institutional desks
                </p>
              </div>
              <div className="border-t border-[#1F1F1F] p-6">
                <RiskBars animate={isInView} />
              </div>
              <div className="px-8 pb-6">
                <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-[#00E5FF] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Learn More
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* On-Demand */}
          <motion.div variants={cardVariants}>
            <Link
              href="/solutions/private"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.08)] bg-[#0A0A0A] transition-all duration-500 hover:border-[rgba(0,229,255,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex-1 p-8">
                <div className="relative mb-4">
                  <div className="absolute -inset-2 rounded-xl bg-[rgba(0,229,255,0.06)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,229,255,0.12)] bg-gradient-to-b from-[rgba(0,229,255,0.1)] to-transparent transition-all duration-500 group-hover:border-[rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    <Gem className="h-5 w-5 text-[#00E5FF] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                <h3 className="mb-2 text-[1.125rem] font-semibold text-white transition-colors duration-200 group-hover:text-[#00E5FF]">
                  On-Demand
                </h3>
                <p className="mb-3 text-[0.875rem] leading-relaxed text-[#6B7280]">
                  Bespoke quantitative services for discerning private clients
                  and family offices.
                </p>
                <p className="text-[0.8125rem] text-[#9CA3AF]">
                  For UHNW individuals and family offices
                </p>
              </div>
              <div className="border-t border-[#1F1F1F] p-6 pb-4">
                <AllocationBars animate={isInView} />
              </div>
              <div className="px-8 pb-6">
                <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-[#00E5FF] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Learn More
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
