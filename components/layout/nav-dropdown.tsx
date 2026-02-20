'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Shield, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

const SOLUTIONS_ITEMS: DropdownItem[] = [
  {
    label: 'Alpha Strategies',
    href: '/solutions/alpha',
    description: 'Systematic alpha generation through quantitative models.',
    icon: <TrendingUp className="h-5 w-5 text-cyan" />,
  },
  {
    label: 'Risk & Hedging',
    href: '/solutions/risk',
    description: 'Advanced risk management and portfolio hedging solutions.',
    icon: <Shield className="h-5 w-5 text-cyan" />,
  },
  {
    label: 'Private Solutions',
    href: '/solutions/private',
    description: 'Bespoke quantitative strategies for select investors.',
    icon: <Lock className="h-5 w-5 text-cyan" />,
  },
];

interface NavDropdownProps {
  isActive?: boolean;
}

export function NavDropdown({ isActive }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={cn(
          'flex items-center gap-1 text-sm transition-colors duration-200',
          isActive ? 'text-white' : 'text-muted hover:text-white'
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Solutions
        <svg
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 8, scaleY: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[340px] origin-top -translate-x-1/2 rounded-lg border border-border bg-[#0A0A0A] p-2 shadow-2xl shadow-black/50"
            role="menu"
          >
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-border bg-[#0A0A0A]" />
            <div className="relative space-y-1">
              {SOLUTIONS_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="group flex items-start gap-3 rounded-md px-3 py-3 transition-colors duration-150 hover:bg-[#111111]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#1F1F1F] bg-[#0A0A0A]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-[#00E5FF] transition-colors duration-150">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#6B7280]">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
