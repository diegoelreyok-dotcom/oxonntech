'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { TOCItem } from '@/types';

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export default function TableOfContents({
  items,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (visible.length > 0) {
      setActiveId(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    const headingIds = items.map((item) => item.id);
    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-96px 0px -60% 0px',
      threshold: 0,
    });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items, handleObserver]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn('sticky top-24 hidden lg:block', className)}
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        On this page
      </p>

      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isH3 = item.level === 3;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'block border-l-2 py-1.5 text-sm transition-colors duration-200',
                  isH3 ? 'pl-6' : 'pl-3',
                  isActive
                    ? 'border-cyan font-medium text-cyan'
                    : cn(
                        'border-transparent',
                        isH3
                          ? 'text-muted-foreground hover:text-muted'
                          : 'text-muted hover:text-white',
                      ),
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
