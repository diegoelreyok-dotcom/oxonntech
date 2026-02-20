'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { ShaderGradient } from '@/components/effects/shader-gradient';
import { CodeStreams } from '@/components/effects/code-streams';
import { AnimatedBorderButton } from '@/components/interactive/animated-border-button';

interface CTABlockProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTABlock({
  title,
  description,
  primaryLabel = 'Get Started',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  className,
}: CTABlockProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.1)] bg-[#080808] px-5 py-14 text-center sm:rounded-3xl sm:px-8 sm:py-20 lg:px-16 lg:py-24',
        className
      )}
    >
      {/* ── Code streams animated background ── */}
      <CodeStreams
        cols={70}
        rows={16}
        accentColor="#00E5FF"
        secondaryColor="#00E5FF"
        gridOpacity={0.06}
        streamCount={16}
        speedMultiplier={0.8}
        className="pointer-events-none"
      />

      {/* ── Subtle shader gradient overlay ── */}
      <ShaderGradient
        preset="OxonnSubtle"
        noiseOpacity={0.08}
        noiseScale={0.8}
        className="pointer-events-none opacity-40"
      />

      {/* ── Animated top glow sweep ── */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-[1] h-px w-1/3 bg-gradient-to-r from-transparent via-[#00E5FF]/60 to-transparent"
        initial={{ x: '-100%' }}
        animate={isInView ? { x: ['−100%', '400%'] } : undefined}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />

      {/* ── Static edge glow accents ── */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent" />

      {/* ── Readability overlay — radial vignette ── */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_10%,#080808_70%)]" />

      <div className="relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={
            isInView ? { opacity: 1, y: 0, scale: 1 } : undefined
          }
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto max-w-3xl text-[1.5rem] font-bold tracking-tight text-white sm:text-[2rem] lg:text-[3.5rem] lg:leading-[1.1]"
        >
          {title}
        </motion.h2>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-5 max-w-lg text-[0.9375rem] leading-[1.7] text-[#9CA3AF] sm:text-[1.125rem]"
          >
            {description}
          </motion.p>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
        >
          <AnimatedBorderButton href={primaryHref} className="gap-2">
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </AnimatedBorderButton>

          {secondaryLabel && secondaryHref && (
            <AnimatedBorderButton href={secondaryHref}>
              {secondaryLabel}
            </AnimatedBorderButton>
          )}
        </motion.div>
      </div>
    </section>
  );
}
