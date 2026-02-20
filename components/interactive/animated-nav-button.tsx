'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AnimatedNavButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedNavButton({
  href,
  children,
  className,
}: AnimatedNavButtonProps) {
  const borderRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = borderRef.current;
    const glow = glowRef.current;
    if (!el) return;

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
    const speed = 60;

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
        'group relative z-0 inline-flex items-center justify-center overflow-visible rounded-[10px] px-5 py-2.5 text-[14px] font-semibold text-white transition-[box-shadow,transform] duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,229,255,0.12),0_0_40px_rgba(0,229,255,0.05)]',
        className
      )}
    >
      {/* Soft glow layer */}
      <span
        ref={glowRef}
        className="pointer-events-none absolute inset-[-3px] z-[-4] rounded-[13px] opacity-35 blur-[3px]"
      />
      {/* Sharp border layer */}
      <span
        ref={borderRef}
        className="pointer-events-none absolute inset-[-1px] z-[-2] rounded-[11px]"
      />
      {/* Dark fill interior */}
      <span className="pointer-events-none absolute inset-[0.5px] z-[-1] rounded-[9.5px] bg-black/85" />
      {children}
    </Link>
  );
}
