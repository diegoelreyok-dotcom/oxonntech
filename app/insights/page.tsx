import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/page-hero';
import { InsightsSection } from '@/components/sections/insights-section';
import { getAllPosts } from '@/lib/blog';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Insights — Quantitative Research & Risk Analysis',
  description:
    'Quantitative research, risk management analysis, and institutional market perspectives from the OXONN Technologies research team.',
  path: '/insights',
});

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        title="Insights & Research"
        description="Perspectives from our quantitative research team on markets, technology, and systematic finance."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Insights' },
        ]}
      />

      {posts.length > 0 ? (
        <InsightsSection
          posts={posts}
          showHeader={false}
          className="px-6 py-[80px]"
        />
      ) : (
        <div className="py-20 text-center">
          <p className="text-[1.125rem] text-[#9CA3AF]">
            No insights published yet. Check back soon.
          </p>
        </div>
      )}
    </>
  );
}
