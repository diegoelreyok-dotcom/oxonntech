import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/page-hero';
import { SectionReveal } from '@/components/animation/section-reveal';
import { MissionSection, ValuesSection } from '@/components/sections/about-sections';
import { TeamSection } from '@/components/sections/team-section';
import { CTABlock } from '@/components/interactive/cta-block';
import { getLeadership } from '@/content/team';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'About — Quantitative Finance Team & Mission',
  description:
    'Meet the team behind OXONN Technologies. Quantitative researchers and engineers building institutional-grade risk management and systematic alpha infrastructure.',
  path: '/about',
});

export default function AboutPage() {
  const leadership = getLeadership();

  return (
    <>
      <PageHero
        title="Built for Precision, Driven by Science"
        description="OXONN Technologies combines deep quantitative research with cutting-edge engineering to deliver systematic edge at institutional scale."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      {/* Mission */}
      <MissionSection />

      {/* Team */}
      {leadership.length > 0 && (
        <div className="border-t border-[#1F1F1F]">
          <SectionReveal className="px-6 py-20 lg:py-28">
            <div className="mx-auto max-w-[1280px]">
              <TeamSection members={leadership} />
            </div>
          </SectionReveal>
        </div>
      )}

      {/* Values */}
      <div className="border-t border-[#1F1F1F]">
        <ValuesSection />
      </div>

      {/* CTA */}
      <SectionReveal className="px-6 pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1280px]">
          <CTABlock
            title="Interested in working with us?"
            description="Get in touch to learn how OXONN can help with your quantitative needs."
            primaryLabel="Contact Us"
            primaryHref="/contact"
          />
        </div>
      </SectionReveal>
    </>
  );
}
