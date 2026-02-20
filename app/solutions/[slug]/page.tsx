import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageHero } from '@/components/hero/page-hero';
import { SectionReveal } from '@/components/animation/section-reveal';
import { SectionHeader } from '@/components/content/section-header';
import { FeatureGrid } from '@/components/content/feature-grid';
import { MetricCard } from '@/components/cards/metric-card';
import { CTABlock } from '@/components/interactive/cta-block';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/content/services';
import { generatePageMetadata } from '@/lib/metadata';

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return generatePageMetadata({
    title: service.title,
    description: service.description,
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: service.shortTitle },
        ]}
      />

      {/* Long description */}
      <SectionReveal className="px-6 py-section">
        <div className="mx-auto max-w-[var(--width-reading)]">
          <p className="text-body-lg leading-relaxed text-muted">
            {service.longDescription}
          </p>
        </div>
      </SectionReveal>

      {/* Features */}
      <SectionReveal className="border-t border-border px-6 py-section">
        <div className="mx-auto max-w-[var(--width-content)]">
          <SectionHeader
            label="Capabilities"
            title="What Sets Us Apart"
          />
          <FeatureGrid features={service.features} />
        </div>
      </SectionReveal>

      {/* Metrics */}
      {service.metrics.length > 0 && (
        <SectionReveal className="border-t border-border px-6 py-section">
          <div className="mx-auto max-w-[var(--width-content)]">
            <SectionHeader
              label="Performance"
              title="By the Numbers"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.metrics.map((metric, i) => (
                <MetricCard key={i} metric={metric} />
              ))}
            </div>
          </div>
        </SectionReveal>
      )}

      {/* Target audience */}
      <SectionReveal className="border-t border-border px-6 py-section">
        <div className="mx-auto max-w-[var(--width-reading)] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            Who This Is For
          </p>
          <p className="mt-4 text-body-lg text-muted">
            {service.targetAudience}
          </p>
        </div>
      </SectionReveal>

      {/* CTA */}
      <SectionReveal className="px-6 pb-section">
        <div className="mx-auto max-w-[var(--width-content)]">
          <CTABlock
            title={`Ready to explore ${service.title}?`}
            primaryLabel={service.cta.label}
            primaryHref={`/contact?interest=${service.cta.prefilledInterest}`}
            secondaryLabel="View All Solutions"
            secondaryHref="/solutions"
          />
        </div>
      </SectionReveal>
    </>
  );
}
