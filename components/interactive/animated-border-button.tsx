'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AnimatedBorderButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBorderButton({
  href,
  children,
  className,
}: AnimatedBorderButtonProps) {
  const borderRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = borderRef.current;
    const glow = glowRef.current;
    if (!el) return;

    // Conic gradient matching Framer's technique:
    // ~160deg visible arc (transparent 56%, color peak, transparent 100%)
    // This is tighter than before — more subtle, elegant sweep
    const makeGradient = (angle: number) =>
      `conic-gradient(from ${angle}deg, transparent 0deg, transparent 200deg, rgba(0,229,255,0.4) 240deg, rgba(0,229,255,0.9) 280deg, rgba(0,229,255,0.4) 320deg, transparent 360deg)`;

    // Respect reduced-motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      el.style.background = makeGradient(0);
      if (glow) glow.style.background = makeGradient(0);
      return;
    }

    let rafId: number;
    let start: number | null = null;
    const speed = 60; // degrees per second (~6s per revolution)

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const angle = (((ts - start) * speed) / 1000) % 360;
      const gradient = makeGradient(angle);
      el.style.background = gradient;
      if (glow) glow.style.background = gradient;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <Link
      href={href}
      className={cn(
        'group relative z-0 inline-flex items-center justify-center overflow-visible rounded-xl px-8 py-3.5 text-[15px] font-semibold text-white transition-[box-shadow,transform] duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,229,255,0.15),0_0_50px_rgba(0,229,255,0.06)]',
        className
      )}
    >
      {/* Soft glow layer — blurred gradient behind everything */}
      <span
        ref={glowRef}
        className="pointer-events-none absolute inset-[-4px] z-[-4] rounded-[16px] opacity-40 blur-[4px]"
      />
      {/* Sharp border layer — spinning conic gradient */}
      <span
        ref={borderRef}
        className="pointer-events-none absolute inset-[-1px] z-[-2] rounded-[13px]"
      />
      {/* Black fill interior */}
      <span className="pointer-events-none absolute inset-[0.5px] z-[-1] rounded-[11.5px] bg-black" />
      {children}
    </Link>
  );
}
