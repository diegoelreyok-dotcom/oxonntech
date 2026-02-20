'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Alpha Strategies', href: '/solutions/alpha' },
      { label: 'Risk & Hedging', href: '/solutions/risk' },
      { label: 'Private Solutions', href: '/solutions/private' },
    ],
  },
  { label: 'Technology', href: '/technology' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const panelVariants = {
  closed: { x: '100%' },
  open: { x: 0 },
};

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  let itemIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link href="/" className="text-lg font-bold tracking-[0.2em] text-white" onClick={onClose}>
                OXONN
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F1F1F] text-[#9CA3AF] transition-colors hover:border-[#2A2A2A] hover:text-white"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.children && pathname.startsWith(item.href));

                if (item.children) {
                  const parentIdx = itemIndex++;
                  return (
                    <div key={item.label} className="w-full text-center">
                      <motion.p custom={parentIdx} variants={itemVariants} initial="closed" animate="open" className="py-3 text-2xl font-medium text-[#6B7280]">
                        {item.label}
                      </motion.p>
                      <div className="space-y-1">
                        {item.children.map((child) => {
                          const childIdx = itemIndex++;
                          const isChildActive = pathname === child.href;
                          return (
                            <motion.div key={child.href} custom={childIdx} variants={itemVariants} initial="closed" animate="open">
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className={cn(
                                  'block py-2 text-lg transition-colors duration-200',
                                  isChildActive ? 'text-[#00E5FF]' : 'text-[#9CA3AF] hover:text-white'
                                )}
                              >
                                {child.label}
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                const currentIdx = itemIndex++;
                return (
                  <motion.div key={item.href} custom={currentIdx} variants={itemVariants} initial="closed" animate="open" className="w-full text-center">
                    {item.label === 'Contact' ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#00E5FF] px-8 py-3 text-lg font-semibold text-black transition-colors duration-200 hover:bg-[#33EAFF]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'block py-3 text-2xl font-medium transition-colors duration-200',
                          isActive ? 'text-white' : 'text-[#9CA3AF] hover:text-white'
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="px-6 py-8 text-center">
              <p className="text-xs text-[#6B7280]">&copy; {new Date().getFullYear()} OXONN Technologies</p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
