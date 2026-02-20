import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentSlug: string;
  className?: string;
}

export default function RelatedPosts({
  posts,
  currentSlug,
  className,
}: RelatedPostsProps) {
  const related = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className={cn('mt-20', className)}>
      <h2 className="mb-8 text-h3 font-semibold text-white">
        Related Insights
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/insights/${post.slug}`}
            className="group block"
          >
            <article>
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-surface">
                {post.featuredImage?.src ? (
                  <Image
                    src={post.featuredImage.src}
                    alt={post.featuredImage.alt}
                    width={post.featuredImage.width}
                    height={post.featuredImage.height}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-cyan-900/20 via-surface to-surface-light" />
                )}
              </div>

              <h3 className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-cyan">
                {post.title}
              </h3>

              <time
                dateTime={post.publishDate}
                className="mt-2 block text-xs text-muted"
              >
                {formatDate(post.publishDate)}
              </time>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
