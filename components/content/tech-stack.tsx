'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ── Logo filename map (name → file in /images/tech/) ─────────────── */
const LOGO_FILE: Record<string, string> = {
  'Python': 'python.svg',
  'C++': 'cplusplus.svg',
  'Rust': 'rust.svg',
  'TypeScript': 'typescript.svg',
  'PostgreSQL': 'postgresql.svg',
  'TimescaleDB': 'timescale.svg',
  'Redis': 'redis.svg',
  'Apache Kafka': 'apachekafka.svg',
  'Kubernetes': 'kubernetes.svg',
  'AWS': 'amazonwebservices.svg',
  'Terraform': 'terraform.svg',
  'Datadog': 'datadog.svg',
  'PyTorch': 'pytorch.svg',
  'scikit-learn': 'scikitlearn.svg',
  'Ray': 'ray.svg',
  'MLflow': 'mlflow.svg',
};

/* ── Types ─────────────────────────────────────────────────────────── */
interface TechItem {
  name: string;
  category: string;
  description?: string;
}

interface TechStackProps {
  items: TechItem[];
  className?: string;
}

/* ── Category block (animated independently) ──────────────────────── */
function CategoryBlock({
  category,
  items,
  delay,
}: {
  category: string;
  items: TechItem[];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref}>
      {/* Category label */}
      <motion.h3
        initial={{ opacity: 0, x: -12 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan/70"
      >
        {category}
      </motion.h3>

      {/* gap-px grid */}
      <div className="overflow-hidden rounded-xl border border-border bg-border">
        <div className="grid grid-cols-2 gap-px md:grid-cols-4">
          {items.map((item, i) => {
            const logoFile = LOGO_FILE[item.name];

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.45,
                  delay: delay + i * 0.07,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative flex flex-col items-center gap-3 bg-surface p-6 transition-all duration-300 hover:bg-surface-light"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
                </div>

                {/* Logo */}
                {logoFile && (
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    <Image
                      src={`/images/tech/${logoFile}`}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]"
                    />
                  </div>
                )}

                {/* Name */}
                <p className="text-sm font-medium text-white/90 transition-colors duration-200 group-hover:text-cyan">
                  {item.name}
                </p>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-muted-foreground/70 transition-colors duration-200 group-hover:text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export function TechStack({ items, className }: TechStackProps) {
  const grouped = items.reduce<Record<string, TechItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className={cn('space-y-10', className)}>
      {Object.entries(grouped).map(([category, categoryItems], idx) => (
        <CategoryBlock
          key={category}
          category={category}
          items={categoryItems}
          delay={idx * 0.12}
        />
      ))}
    </div>
  );
}
