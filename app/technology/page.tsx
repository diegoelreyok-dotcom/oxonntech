import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/page-hero';
import { SectionReveal } from '@/components/animation/section-reveal';
import { SectionHeader } from '@/components/content/section-header';
import { FeatureGrid } from '@/components/content/feature-grid';
import { TechStack } from '@/components/content/tech-stack';
import { StatCard } from '@/components/content/stat-card';
import { CTABlock } from '@/components/interactive/cta-block';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Technology — Sub-Millisecond Risk Infrastructure',
  description:
    'Low-latency execution engine, distributed computing, and real-time portfolio analytics. Built for hedge fund and prop firm risk infrastructure at scale.',
  path: '/technology',
});

const TECH_FEATURES = [
  {
    title: 'Sub-Millisecond Latency',
    description:
      'Our execution pipeline processes signals, computes risk, and routes orders in under 1ms end-to-end.',
    icon: 'Activity',
  },
  {
    title: 'Distributed Computing',
    description:
      'Horizontally scalable architecture processing 50B+ data points daily across global compute clusters.',
    icon: 'Combine',
  },
  {
    title: 'Real-Time Analytics',
    description:
      'Streaming risk analytics and P&L attribution delivered with zero-lag to trading desks.',
    icon: 'BarChart3',
  },
  {
    title: 'ML Pipeline',
    description:
      'Automated machine learning pipelines for feature engineering, model training, and signal validation.',
    icon: 'Cpu',
  },
  {
    title: 'API-First Design',
    description:
      'RESTful and WebSocket APIs enabling seamless integration with third-party systems and platforms.',
    icon: 'Code',
  },
  {
    title: 'Enterprise Security',
    description:
      'SOC 2 compliant infrastructure with end-to-end encryption and role-based access control.',
    icon: 'ShieldCheck',
  },
];

const TECH_STACK_ITEMS = [
  { name: 'Python', category: 'Languages', description: 'Research & ML' },
  { name: 'C++', category: 'Languages', description: 'Low-latency execution' },
  { name: 'Rust', category: 'Languages', description: 'Systems programming' },
  { name: 'TypeScript', category: 'Languages', description: 'Platform & APIs' },
  { name: 'PostgreSQL', category: 'Data & Storage', description: 'Primary database' },
  { name: 'TimescaleDB', category: 'Data & Storage', description: 'Time-series data' },
  { name: 'Redis', category: 'Data & Storage', description: 'Caching & state' },
  { name: 'Apache Kafka', category: 'Data & Storage', description: 'Event streaming' },
  { name: 'Kubernetes', category: 'Infrastructure', description: 'Orchestration' },
  { name: 'AWS', category: 'Infrastructure', description: 'Cloud platform' },
  { name: 'Terraform', category: 'Infrastructure', description: 'IaC' },
  { name: 'Datadog', category: 'Infrastructure', description: 'Observability' },
  { name: 'PyTorch', category: 'ML & Research', description: 'Deep learning' },
  { name: 'scikit-learn', category: 'ML & Research', description: 'Classical ML' },
  { name: 'Ray', category: 'ML & Research', description: 'Distributed compute' },
  { name: 'MLflow', category: 'ML & Research', description: 'Experiment tracking' },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        title="Engineering the Quantitative Edge"
        description="Purpose-built infrastructure designed for speed, scale, and institutional-grade reliability."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Technology' },
        ]}
      />

      {/* Stats */}
      <SectionReveal className="border-b border-border px-6 py-section-sm">
        <div className="mx-auto max-w-[var(--width-content)]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard value={1} prefix="<" suffix="ms" label="Execution Latency" />
            <StatCard value={50} suffix="B+" label="Data Points / Day" />
            <StatCard value={99.97} suffix="%" label="System Uptime" />
            <StatCard value={50000} suffix="+" label="Scenarios / Second" />
          </div>
        </div>
      </SectionReveal>

      {/* Features */}
      <SectionReveal className="px-6 py-section">
        <div className="mx-auto max-w-[var(--width-content)]">
          <SectionHeader
            label="Architecture"
            title="Built for Performance"
            description="Every component of our stack is optimized for throughput, reliability, and quantitative precision."
          />
          <FeatureGrid features={TECH_FEATURES} columns={3} />
        </div>
      </SectionReveal>

      {/* Tech Stack */}
      <SectionReveal className="border-t border-border px-6 py-section">
        <div className="mx-auto max-w-[var(--width-content)]">
          <SectionHeader
            label="Stack"
            title="Our Technology Stack"
            description="The tools and frameworks powering OXONN's quantitative infrastructure."
          />
          <TechStack items={TECH_STACK_ITEMS} />
        </div>
      </SectionReveal>

      {/* CTA */}
      <SectionReveal className="px-6 pb-section">
        <div className="mx-auto max-w-[var(--width-content)]">
          <CTABlock
            title="Interested in our technology?"
            description="Explore how OXONN's infrastructure can power your quantitative strategies."
            primaryLabel="Request a Demo"
            primaryHref="/contact?interest=technology"
          />
        </div>
      </SectionReveal>
    </>
  );
}
