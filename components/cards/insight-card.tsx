import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { BLOG_CATEGORY_LABELS } from '@/types';
import type { BlogPost } from '@/types';

/* ── Placeholder patterns — each card gets a unique visual ── */
const PLACEHOLDER_VARIANTS = [
  {
    // Grid lines
    bg: 'from-[#001a1d] via-[#0A0A0A] to-[#0d1117]',
    pattern: (
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage:
          'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
    ),
    deco: (
      <svg viewBox="0 0 80 50" className="w-20 opacity-25 transition-opacity duration-300 group-hover:opacity-45">
        <path d="M0,40 Q20,35 30,25 T50,18 T80,5" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
        <path d="M0,40 Q20,35 30,25 T50,18 T80,5 V50 H0Z" fill="url(#plFill)" />
        <defs><linearGradient id="plFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,229,255,0.12)" /><stop offset="100%" stopColor="rgba(0,229,255,0)" /></linearGradient></defs>
      </svg>
    ),
  },
  {
    // Dot matrix
    bg: 'from-[#0d1a1c] via-[#0A0A0A] to-[#0A0A0A]',
    pattern: (
      <div className="absolute inset-0 opacity-[0.1]" style={{
        backgroundImage: 'radial-gradient(circle, #00E5FF 0.8px, transparent 0.8px)',
        backgroundSize: '20px 20px',
      }} />
    ),
    deco: (
      <div className="flex items-center gap-2 opacity-25 transition-opacity duration-300 group-hover:opacity-45">
        <div className="h-14 w-14 rounded-xl border border-[#00E5FF]/30 bg-[#00E5FF]/[0.04]" />
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-16 rounded-full bg-[#00E5FF]/20" />
          <div className="h-1.5 w-10 rounded-full bg-[#00E5FF]/10" />
        </div>
      </div>
    ),
  },
  {
    // Diagonal lines
    bg: 'from-[#001214] via-[#0A0A0A] to-[#111318]',
    pattern: (
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'repeating-linear-gradient(135deg, #00E5FF 0px, #00E5FF 1px, transparent 1px, transparent 14px)',
      }} />
    ),
    deco: (
      <div className="flex flex-col items-center gap-2 opacity-25 transition-opacity duration-300 group-hover:opacity-45">
        <div className="flex gap-1">
          {[20, 32, 16, 28, 12].map((h, i) => (
            <div key={i} className="w-2 rounded-sm bg-[#00E5FF]/20" style={{ height: h }} />
          ))}
        </div>
        <div className="h-px w-16 bg-[#00E5FF]/15" />
      </div>
    ),
  },
];

function InsightPlaceholder({ slug }: { slug: string }) {
  // Deterministic variant based on slug
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const variant = PLACEHOLDER_VARIANTS[hash % PLACEHOLDER_VARIANTS.length];

  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${variant.bg}`}>
      {variant.pattern}
      <div className="relative">{variant.deco}</div>
    </div>
  );
}

interface InsightCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export function InsightCard({
  post,
  featured = false,
  className,
}: InsightCardProps) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className={cn(
        'group block overflow-hidden rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] transition-all duration-300 hover:border-[rgba(0,229,255,0.15)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,229,255,0.04)]',
        featured && 'md:grid md:grid-cols-2 md:gap-0',
        className
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'aspect-[16/10] md:aspect-auto md:h-full' : 'aspect-[16/10]'
        )}
      >
        {post.featuredImage?.src && !post.featuredImage.src.includes('placeholder') ? (
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        ) : (
          <InsightPlaceholder slug={post.slug} />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-6 lg:p-7">
        {/* Category */}
        <span className="mb-3 inline-block w-fit rounded-full bg-[#00E5FF]/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#00E5FF]">
          {BLOG_CATEGORY_LABELS[post.category]}
        </span>

        {/* Title */}
        <h3
          className={cn(
            'font-semibold text-white transition-colors duration-200 group-hover:text-[#00E5FF]',
            featured ? 'text-[1.5rem] leading-tight' : 'text-[1.0625rem] leading-snug'
          )}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className={cn(
            'mt-3 text-[#6B7280]',
            featured ? 'text-[1rem] leading-relaxed line-clamp-3' : 'text-[0.875rem] leading-relaxed line-clamp-2'
          )}
        >
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-5 flex items-center gap-2 text-[12px] text-[#9CA3AF]">
          <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
          <span aria-hidden="true" className="text-[#2A2A2A]">|</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
