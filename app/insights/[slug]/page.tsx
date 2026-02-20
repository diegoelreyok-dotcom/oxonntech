import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogHeader from '@/components/blog/blog-header';
import BlogBody from '@/components/blog/blog-body';
import TableOfContents from '@/components/blog/table-of-contents';
import RelatedPosts from '@/components/blog/related-posts';
import JsonLd from '@/components/seo/json-ld';
import { getPostBySlug, getAllSlugs, getRelatedPosts } from '@/lib/blog';
import { generatePageMetadata, SITE_URL } from '@/lib/metadata';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${slug}`,
    ogImage: post.seoMeta.ogImage,
  });
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    publisher: {
      '@type': 'Organization',
      name: 'OXONN Technologies',
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <BlogHeader post={post} />

      <div className="mx-auto max-w-[var(--width-content)] px-6 py-section">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
          {/* Main content */}
          <div>
            <BlogBody content={post.body} />
          </div>

          {/* Sidebar */}
          {post.tableOfContents.length > 0 && (
            <aside>
              <TableOfContents items={post.tableOfContents} />
            </aside>
          )}
        </div>

        {/* Related posts */}
        <RelatedPosts
          posts={related}
          currentSlug={slug}
          className="border-t border-border pt-16"
        />
      </div>
    </>
  );
}
