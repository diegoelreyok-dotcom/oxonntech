import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/page-hero';
import { SectionReveal } from '@/components/animation/section-reveal';
import { ServiceCard } from '@/components/cards/service-card';
import { CTABlock } from '@/components/interactive/cta-block';
import { services } from '@/content/services';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Institutional Quantitative Solutions — Alpha, Risk & Private',
  description:
    'Systematic alpha generation, real-time risk management, and bespoke quantitative solutions for hedge funds, prop firms, and institutional allocators.',
  path: '/solutions',
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="Quantitative Solutions for Every Edge"
        description="Three distinct pillars — one systematic philosophy. Discover how OXONN delivers institutional-grade quantitative performance."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions' },
        ]}
      />

      <SectionReveal className="px-6 py-section">
        <div className="mx-auto max-w-[var(--width-content)]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="px-6 pb-section">
        <div className="mx-auto max-w-[var(--width-content)]">
          <CTABlock
            title="Not sure which solution fits?"
            description="Our team will help you identify the right quantitative approach for your objectives."
            primaryLabel="Schedule a Consultation"
            primaryHref="/contact"
          />
        </div>
      </SectionReveal>
    </>
  );
}
