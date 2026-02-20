'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionReveal } from '@/components/animation/section-reveal';

/* ── Animated Mini Charts ────────────────────────────── */

function MiniChart({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 200 60" className="h-12 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,229,255,0.3)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,45 L20,42 L40,38 L60,40 L80,30 L100,32 L120,22 L140,25 L160,15 L180,18 L200,8"
        fill="none"
        stroke="#00E5FF"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      />
      <motion.path
        d="M0,45 L20,42 L40,38 L60,40 L80,30 L100,32 L120,22 L140,25 L160,15 L180,18 L200,8 L200,60 L0,60Z"
        fill="url(#chartGrad)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 1.4 }}
      />
    </svg>
  );
}

function MiniBarChart({ animate }: { animate: boolean }) {
  const bars = [35, 50, 42, 65, 55, 72, 60, 80, 68, 75, 85, 70];
  return (
    <svg viewBox="0 0 180 50" className="h-10 w-full" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 15}
          y={50 - (h / 100) * 50}
          width="10"
          height={(h / 100) * 50}
          rx="2"
          fill={i >= 10 ? '#00E5FF' : 'rgba(0,229,255,0.25)'}
          initial={{ scaleY: 0 }}
          animate={animate ? { scaleY: 1 } : undefined}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 + i * 0.04 }}
          style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
        />
      ))}
    </svg>
  );
}

function AlphaMiniBars({ animate }: { animate: boolean }) {
  const values = [60, 45, 70, 55, 80, 65, 90, 75, 85, 95, 88, 92];
  return (
    <div className="mt-3 flex gap-1">
      {values.map((v, i) => (
        <div key={i} className="flex-1">
          <motion.div
            className="rounded-sm bg-[#00E5FF]/30"
            initial={{ height: 0 }}
            animate={animate ? { height: `${(v / 100) * 40}px` } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 + i * 0.04 }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Main Portfolio Chart ────────────────────────────── */

const PORTFOLIO_PATH =
  'M0,90 C30,88 60,85 90,80 C120,75 150,78 180,65 C210,52 240,58 270,50 C300,42 330,48 360,35 C390,22 420,30 450,25 C480,20 510,28 540,18 C570,10 590,12 600,8';

const PORTFOLIO_FILL =
  'M0,90 C30,88 60,85 90,80 C120,75 150,78 180,65 C210,52 240,58 270,50 C300,42 330,48 360,35 C390,22 420,30 450,25 C480,20 510,28 540,18 C570,10 590,12 600,8 L600,120 L0,120Z';

const BENCHMARK_PATH =
  'M0,85 C100,82 200,80 300,75 C400,70 500,68 600,65';

function PortfolioChart({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 600 120" className="h-28 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bigChartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,229,255,0.15)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </linearGradient>
        <filter id="chartGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </radialGradient>
      </defs>

      {/* Grid lines */}
      {[0, 30, 60, 90, 120].map((y) => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#1F1F1F" strokeWidth="0.5" />
      ))}

      {/* Gradient fill — fades in */}
      <motion.path
        d={PORTFOLIO_FILL}
        fill="url(#bigChartGrad)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 1.6 }}
      />

      {/* Portfolio line — animated draw with glow */}
      <motion.path
        d={PORTFOLIO_PATH}
        fill="none"
        stroke="#00E5FF"
        strokeWidth="2"
        filter="url(#chartGlow)"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      />

      {/* Benchmark line — animated draw */}
      <motion.path
        d={BENCHMARK_PATH}
        fill="none"
        stroke="#6B7280"
        strokeWidth="1"
        strokeDasharray="4,4"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      />

      {/* Live pulsing dot at end of portfolio line */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 2.2 }}
      >
        {/* Outer glow pulse */}
        <motion.circle
          cx="600"
          cy="8"
          r="8"
          fill="url(#dotGlow)"
          opacity="0.4"
          animate={{ r: [6, 12, 6], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner dot */}
        <circle cx="600" cy="8" r="3" fill="#0A0A0A" stroke="#00E5FF" strokeWidth="1.5" />
      </motion.g>
    </svg>
  );
}

/* ── Dashboard Component ─────────────────────────────── */

export function DashboardPreview() {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.2 });

  return (
    <SectionReveal className="py-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <p className="mb-4 text-[14px] font-medium uppercase tracking-[3px] text-[#00E5FF]">
            Platform
          </p>
          <h2 className="mb-6 text-[2rem] font-semibold tracking-tight text-white lg:text-[3rem]">
            The OXONN Intelligence Dashboard
          </h2>
          <p className="mx-auto max-w-xl text-[1.125rem] leading-relaxed text-[#9CA3AF]">
            A unified command center for quantitative intelligence, risk monitoring, and alpha generation.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div ref={chartRef} className="relative mx-auto max-w-[1100px]">
          {/* Glow behind dashboard */}
          <div className="pointer-events-none absolute inset-0 -m-8 rounded-3xl bg-[#00E5FF]/[0.04] blur-[60px]" />

          <div className="relative overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.1)] bg-[#0A0A0A] shadow-[0_0_80px_rgba(0,229,255,0.06)]">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-[#1F1F1F] px-6 py-3">
              <div className="flex items-center gap-4">
                {/* Mini wireframe globe icon */}
                <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="#00E5FF" strokeWidth="0.7" opacity="0.5" />
                  <ellipse cx="16" cy="10" rx="11" ry="1.5" stroke="#00E5FF" strokeWidth="0.5" opacity="0.3" />
                  <ellipse cx="16" cy="16" rx="12" ry="1.5" stroke="#00E5FF" strokeWidth="0.5" opacity="0.4" />
                  <ellipse cx="16" cy="22" rx="11" ry="1.5" stroke="#00E5FF" strokeWidth="0.5" opacity="0.3" />
                  <ellipse cx="16" cy="16" rx="5" ry="12" stroke="#00E5FF" strokeWidth="0.6" opacity="0.5" />
                  <ellipse cx="16" cy="16" rx="9" ry="12" stroke="#00E5FF" strokeWidth="0.5" opacity="0.35" />
                  <circle cx="16" cy="4" r="0.8" fill="#00E5FF" opacity="0.9" />
                  <circle cx="16" cy="28" r="0.8" fill="#00E5FF" opacity="0.9" />
                  <circle cx="4" cy="16" r="0.8" fill="#00E5FF" opacity="0.7" />
                  <circle cx="28" cy="16" r="0.8" fill="#00E5FF" opacity="0.7" />
                  <circle cx="8" cy="8" r="0.6" fill="#00E5FF" opacity="0.5" />
                  <circle cx="24" cy="8" r="0.6" fill="#00E5FF" opacity="0.5" />
                  <circle cx="8" cy="24" r="0.6" fill="#00E5FF" opacity="0.5" />
                  <circle cx="24" cy="24" r="0.6" fill="#00E5FF" opacity="0.5" />
                  <circle cx="11" cy="5.5" r="0.5" fill="#00E5FF" opacity="0.6" />
                  <circle cx="21" cy="5.5" r="0.5" fill="#00E5FF" opacity="0.6" />
                  <circle cx="11" cy="26.5" r="0.5" fill="#00E5FF" opacity="0.6" />
                  <circle cx="21" cy="26.5" r="0.5" fill="#00E5FF" opacity="0.6" />
                  <line x1="6" y1="9" x2="26" y2="9" stroke="#00E5FF" strokeWidth="0.3" opacity="0.2" />
                  <line x1="5" y1="13" x2="27" y2="13" stroke="#00E5FF" strokeWidth="0.3" opacity="0.2" />
                  <line x1="5" y1="19" x2="27" y2="19" stroke="#00E5FF" strokeWidth="0.3" opacity="0.2" />
                  <line x1="6" y1="23" x2="26" y2="23" stroke="#00E5FF" strokeWidth="0.3" opacity="0.2" />
                </svg>
                <span className="text-sm font-bold tracking-[0.15em] text-white">OXONN</span>
                <div className="flex items-center gap-1.5 rounded-full bg-[#22C55E]/10 px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
                  <span className="text-[11px] font-medium text-[#22C55E]">Live</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden h-8 w-48 items-center rounded-lg border border-[#1F1F1F] bg-[#111111] px-3 sm:flex">
                  <span className="text-xs text-[#6B7280]">Search...</span>
                </div>
                <div className="relative flex h-7 w-7 items-center justify-center rounded-lg text-[#6B7280]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F1F1F]">
                  <svg className="h-4 w-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="hidden w-52 shrink-0 border-r border-[#1F1F1F] p-4 lg:block">
                <div className="space-y-1">
                  {[
                    { label: 'Overview', icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></svg> },
                    { label: 'Risk Monitor', icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                    { label: 'Alpha Engine', icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                    { label: 'Reports', icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
                    { label: 'Settings', icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] ${i === 0 ? 'bg-[#00E5FF]/[0.08] font-medium text-[#00E5FF]' : 'text-[#6B7280] hover:text-[#9CA3AF]'}`}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 lg:p-6">
                {/* Metrics row */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Capital Protected */}
                  <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-5">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">Capital Protected</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">$12.4M</span>
                      <span className="mb-0.5 flex items-center gap-0.5 rounded bg-[#22C55E]/10 px-1.5 py-0.5 text-[11px] font-medium text-[#22C55E]">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M7 17l5-5 5 5M7 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        +8.2%
                      </span>
                    </div>
                    <div className="mt-3">
                      <MiniChart animate={isInView} />
                    </div>
                  </div>

                  {/* Active Risk Alerts */}
                  <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-5">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">Active Risk Alerts</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">7</span>
                      <span className="mb-0.5 flex items-center gap-0.5 rounded bg-[#F59E0B]/10 px-1.5 py-0.5 text-[11px] font-medium text-[#F59E0B]">
                        3 critical
                      </span>
                    </div>
                    <div className="mt-3">
                      <MiniBarChart animate={isInView} />
                    </div>
                  </div>

                  {/* Alpha Generated */}
                  <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-5">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">Alpha Generated YTD</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-2xl font-bold text-[#00E5FF]">+18.3%</span>
                    </div>
                    <AlphaMiniBars animate={isInView} />
                  </div>
                </div>

                {/* Chart area */}
                <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Portfolio Performance</p>
                    <div className="flex gap-2">
                      {['1D', '1W', '1M', '1Y'].map((period, i) => (
                        <button
                          key={period}
                          className={`rounded px-2.5 py-1 text-[11px] font-medium ${i === 2 ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : 'text-[#6B7280]'}`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  <PortfolioChart animate={isInView} />

                  <div className="mt-2 flex items-center gap-6 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <div className="h-0.5 w-4 rounded bg-[#00E5FF]" />
                      <span className="text-[#9CA3AF]">Portfolio</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-0.5 w-4 rounded bg-[#6B7280]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #6B7280 0, #6B7280 4px, transparent 4px, transparent 8px)' }} />
                      <span className="text-[#9CA3AF]">Benchmark</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
