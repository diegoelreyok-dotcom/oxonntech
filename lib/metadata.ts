import type { Metadata } from 'next';

export const SITE_URL = 'https://oxonn-tech.com';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const image =
    ogImage ?? `/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
