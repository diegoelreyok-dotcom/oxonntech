import { describe, it, expect } from 'vitest';
import { SITE_URL, generatePageMetadata } from '@/lib/metadata';

describe('SITE_URL', () => {
  it('is the production URL', () => {
    expect(SITE_URL).toBe('https://oxonn-tech.com');
  });
});

describe('generatePageMetadata', () => {
  it('generates correct metadata with required fields', () => {
    const meta = generatePageMetadata({
      title: 'Solutions',
      description: 'Our solutions',
      path: '/solutions',
    });

    expect(meta.title).toBe('Solutions');
    expect(meta.description).toBe('Our solutions');
    expect(meta.alternates?.canonical).toBe('https://oxonn-tech.com/solutions');
  });

  it('generates OG image from title when not provided', () => {
    const meta = generatePageMetadata({
      title: 'About Us',
      description: 'About page',
      path: '/about',
    });

    const og = meta.openGraph as Record<string, unknown>;
    const images = og.images as Array<{ url: string }>;
    expect(images[0].url).toContain('/api/og?title=About%20Us');
  });

  it('uses custom OG image when provided', () => {
    const meta = generatePageMetadata({
      title: 'Blog',
      description: 'Blog page',
      path: '/blog',
      ogImage: '/images/blog-og.png',
    });

    const og = meta.openGraph as Record<string, unknown>;
    const images = og.images as Array<{ url: string }>;
    expect(images[0].url).toBe('/images/blog-og.png');
  });

  it('sets noIndex robots when requested', () => {
    const meta = generatePageMetadata({
      title: 'Private',
      description: 'Private page',
      path: '/private',
      noIndex: true,
    });

    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it('does not set robots when noIndex is false', () => {
    const meta = generatePageMetadata({
      title: 'Public',
      description: 'Public page',
      path: '/public',
    });

    expect(meta.robots).toBeUndefined();
  });

  it('includes twitter card metadata', () => {
    const meta = generatePageMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/test',
    });

    const twitter = meta.twitter as Record<string, unknown>;
    expect(twitter.card).toBe('summary_large_image');
    expect(twitter.title).toBe('Test');
  });
});
