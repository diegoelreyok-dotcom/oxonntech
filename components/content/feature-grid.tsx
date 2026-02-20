'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp, Shield, Lock, Gem, Activity, Code, Cpu, Database,
  Layers, BarChart3, FileCheck, GitBranch, Box, ShieldCheck,
  Calculator, Users, Combine,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StaggerChildren, staggerItemVariants } from '@/components/animation/stagger-children';
import type { ServiceFeature } from '@/types';

const ICON_MAP: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Lock: <Lock className="h-5 w-5" />,
  Gem: <Gem className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Layers: <Layers className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  FileCheck: <FileCheck className="h-5 w-5" />,
  GitBranch: <GitBranch className="h-5 w-5" />,
  Box: <Box className="h-5 w-5" />,
  ShieldCheck: <ShieldCheck className="h-5 w-5" />,
  Calculator: <Calculator className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Combine: <Combine className="h-5 w-5" />,
};

interface FeatureGridProps {
  features: ServiceFeature[];
  columns?: 2 | 3;
  className?: string;
}

export function FeatureGrid({
  features,
  columns = 3,
  className,
}: FeatureGridProps) {
  return (
    <StaggerChildren
      className={cn(
        'grid gap-6',
        columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={staggerItemVariants}
          className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-border-light hover:bg-surface-light"
        >
          {feature.icon && (
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-cyan">
              {ICON_MAP[feature.icon] || <TrendingUp className="h-5 w-5" />}
            </div>
          )}
          <h3 className="text-sm font-semibold text-white group-hover:text-cyan transition-colors duration-200">
            {feature.title}
          </h3>
          <p className="mt-2 text-caption leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </StaggerChildren>
  );
}
