'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavDropdown } from '@/components/layout/nav-dropdown';
import { MobileNav } from '@/components/layout/mobile-nav';
import { AnimatedNavButton } from '@/components/interactive/animated-nav-button';

const SCROLL_THRESHOLD = 50;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const isLinkActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isSolutionsActive =
    pathname.startsWith('/solutions/alpha') ||
    pathname.startsWith('/solutions/risk') ||
    pathname.startsWith('/solutions/private');

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'border-b border-[#1F1F1F] bg-black/90 backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-12" aria-label="Main navigation">
          <Link href="/" className="text-[22px] font-bold tracking-[-0.05em] text-white transition-opacity duration-200 hover:opacity-80">
            OXONN
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/about" className={cn('text-sm transition-colors duration-200', isLinkActive('/about') ? 'text-white' : 'text-[#9CA3AF] hover:text-white')}>
              About
            </Link>
            <NavDropdown isActive={isSolutionsActive} />
            <Link href="/technology" className={cn('text-sm transition-colors duration-200', isLinkActive('/technology') ? 'text-white' : 'text-[#9CA3AF] hover:text-white')}>
              Technology
            </Link>
            <Link href="/insights" className={cn('text-sm transition-colors duration-200', isLinkActive('/insights') ? 'text-white' : 'text-[#9CA3AF] hover:text-white')}>
              Insights
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <AnimatedNavButton href="/contact" className="hidden lg:inline-flex">
              Contact
            </AnimatedNavButton>
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-md text-[#9CA3AF] transition-colors hover:text-white lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <MobileNav isOpen={isMobileOpen} onClose={closeMobile} />
    </>
  );
}
