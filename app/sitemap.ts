import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog';
import { getAllServiceSlugs } from '@/content/services';

const SITE_URL = 'https://oxonn-tech.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/solutions',
    '/technology',
    '/insights',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const serviceRoutes = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const insightRoutes = getAllSlugs().map((slug) => ({
    url: `${SITE_URL}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes];
}
