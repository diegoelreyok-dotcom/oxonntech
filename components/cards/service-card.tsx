import Link from 'next/link';
import { TrendingUp, Shield, Lock, Gem, Activity, Code, Cpu, Database, Layers, BarChart3, FileCheck, GitBranch, Box, ShieldCheck, Calculator, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types';

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
};

interface ServiceCardProps {
  service: ServiceDetail;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Link
      href={`/solutions/${service.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-[#1F1F1F] bg-[#0A0A0A] p-6 transition-all duration-300 hover:border-[#00E5FF]/30 hover:bg-[#111111] lg:p-8',
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[#1F1F1F] bg-black text-[#00E5FF] transition-colors duration-300 group-hover:border-[#00E5FF]/40">
        {ICON_MAP[service.icon] || <TrendingUp className="h-5 w-5" />}
      </div>

      {/* Title */}
      <h3 className="text-[1.125rem] font-semibold text-white transition-colors duration-200 group-hover:text-[#00E5FF]">
        {service.title}
      </h3>

      {/* Description */}
      <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-[#6B7280]">
        {service.description}
      </p>

      {/* Target audience */}
      <p className="mt-4 text-xs text-[#9CA3AF]">
        For {service.targetAudience}
      </p>

      {/* Arrow indicator */}
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#00E5FF] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
        Learn more
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
