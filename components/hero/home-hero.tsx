'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { WireframeGlobe } from '@/components/effects/wireframe-globe';
import { CyclingWave } from '@/components/effects/cycling-wave';
import { AnimatedBorderButton } from '@/components/interactive/animated-border-button';

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* ── Wireframe globe background ── */}
      <WireframeGlobe className="pointer-events-none" />

      {/* ── CyclingWave 3D rings ── */}
      <CyclingWave />

      {/* ── Radial overlay for text readability ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.82) 78%)',
        }}
      />

      {/* ── Top/bottom edge fade ── */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/70" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1280px] text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 text-[12px] font-medium uppercase tracking-[3px] text-[#00E5FF] sm:text-[14px] sm:tracking-[4px]"
        >
          Quantitative Finance · Institutional Grade
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[900px] text-[2.25rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[3.5rem] lg:text-[4.5rem]"
        >
          Systematic Alpha.
          <br />
          <span className="hero-text-glow text-[#00E5FF]">
            Zero Guesswork.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-[580px] text-[0.9375rem] leading-[1.7] text-[#9CA3AF] sm:text-[1.125rem]"
        >
          Quantitative strategies engineered for consistent risk-adjusted
          performance — from signal research to sub-millisecond execution.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <AnimatedBorderButton href="/solutions" className="w-full sm:w-auto sm:min-w-[200px]">
            See How It Works
          </AnimatedBorderButton>
          <AnimatedBorderButton href="/contact" className="w-full sm:w-auto sm:min-w-[200px]">
            Talk to Our Team
          </AnimatedBorderButton>
        </motion.div>

        {/* Social proof badge — below CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-1.5 backdrop-blur-sm"
        >
          {/* Avatar stack — cyan-tinted with thick dark border */}
          <div className="flex -space-x-2">
            {['/avatars/art-cyan-1.jpg', '/avatars/art-cyan-2.jpg', '/avatars/art-cyan-3.jpg', '/avatars/art-cyan-4.jpg'].map((src, i) => (
              <div
                key={i}
                className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-[#0A0A0A]"
              >
                <Image src={src} alt="" fill sizes="28px" className="object-cover" />
              </div>
            ))}
          </div>
          {/* Shield check icon */}
          <svg className="h-4 w-4 shrink-0 text-[#22C55E]" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
          <span className="text-[13px] text-[#9CA3AF]">
            Trusted by{' '}
            <span className="font-medium text-white">50+</span> institutional clients
          </span>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-[#6B7280]">
          <span className="text-[11px] uppercase tracking-[2px]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-[#00E5FF]/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
