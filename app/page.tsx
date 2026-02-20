import dynamic from 'next/dynamic';
import { HomeHero } from '@/components/hero/home-hero';
import { SectionReveal } from '@/components/animation/section-reveal';
import { getAllPosts } from '@/lib/blog';

/* ── Below-the-fold sections — lazy loaded (code-split) ── */
const DashboardPreview = dynamic(() =>
  import('@/components/sections/dashboard-preview').then(
    (m) => m.DashboardPreview
  )
);
const SolutionsShowcase = dynamic(() =>
  import('@/components/sections/solutions-showcase').then(
    (m) => m.SolutionsShowcase
  )
);
const HowItWorks = dynamic(() =>
  import('@/components/sections/how-it-works').then((m) => m.HowItWorks)
);
const Benefits = dynamic(() =>
  import('@/components/sections/benefits').then((m) => m.Benefits)
);
const SecurityTrust = dynamic(() =>
  import('@/components/sections/security-trust').then(
    (m) => m.SecurityTrust
  )
);
const FAQ = dynamic(() =>
  import('@/components/sections/faq').then((m) => m.FAQ)
);
const CTABlock = dynamic(() =>
  import('@/components/interactive/cta-block').then((m) => m.CTABlock)
);
const InsightsSection = dynamic(() =>
  import('@/components/sections/insights-section').then(
    (m) => m.InsightsSection
  )
);

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* 1. Hero — above the fold, eager load */}
      <HomeHero />

      {/* 2. Dashboard Preview */}
      <DashboardPreview />

      {/* 3. Solutions Showcase */}
      <SolutionsShowcase />

      {/* 4. How It Works */}
      <div className="border-t border-[#1F1F1F]">
        <HowItWorks />
      </div>

      {/* 5. Benefits */}
      <div className="border-t border-[#1F1F1F]">
        <Benefits />
      </div>

      {/* 6. Insights */}
      {posts.length > 0 && (
        <div className="border-t border-[#1F1F1F]">
          <InsightsSection posts={posts} />
        </div>
      )}

      {/* 7. Security & Trust */}
      <div className="border-t border-[#1F1F1F]">
        <SecurityTrust />
      </div>

      {/* 8. FAQ */}
      <div className="border-t border-[#1F1F1F]">
        <FAQ />
      </div>

      {/* 9. Final CTA */}
      <SectionReveal className="py-[120px]">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16">
          <CTABlock
            title="Redefine Your Quantitative Edge."
            description="Partner with OXONN to unlock systematic returns powered by cutting-edge quantitative research and technology."
            primaryLabel="Book a Consultation"
            primaryHref="/contact"
            secondaryLabel="Explore Solutions"
            secondaryHref="/solutions"
          />
        </div>
      </SectionReveal>
    </>
  );
}
