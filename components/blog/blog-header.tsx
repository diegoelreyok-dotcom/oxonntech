import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { BLOG_CATEGORY_LABELS } from '@/types';
import type { BlogPost } from '@/types';

interface BlogHeaderProps {
  post: BlogPost;
  className?: string;
}

export default function BlogHeader({ post, className }: BlogHeaderProps) {
  const hasFeaturedImage = post.featuredImage?.src;

  return (
    <header className={cn('relative w-full', className)}>
      {/* Featured image or fallback gradient */}
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        {hasFeaturedImage ? (
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            className="h-full w-full object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-cyan-900/30 via-surface to-background" />
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[var(--width-content)]">
          {/* Category badge */}
          <span className="mb-4 inline-block rounded-full bg-cyan/20 px-3 py-1 text-xs font-medium text-cyan">
            {BLOG_CATEGORY_LABELS[post.category]}
          </span>

          {/* Title */}
          <h1 className="mb-6 max-w-3xl text-h1 font-bold leading-tight text-white">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
            <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime} min read</span>
            <span aria-hidden="true">&middot;</span>
            <div className="flex items-center gap-2">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span>{post.author.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
