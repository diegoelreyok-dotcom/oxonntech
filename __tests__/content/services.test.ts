import { describe, it, expect } from 'vitest';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/content/services';

describe('services data', () => {
  it('has exactly 3 services', () => {
    expect(services).toHaveLength(3);
  });

  it('every service has required fields', () => {
    for (const service of services) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.slug).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.longDescription).toBeTruthy();
      expect(service.features.length).toBeGreaterThan(0);
      expect(service.targetAudience).toBeTruthy();
      expect(service.cta.label).toBeTruthy();
    }
  });

  it('every feature has title, description, and icon', () => {
    for (const service of services) {
      for (const feature of service.features) {
        expect(feature.title).toBeTruthy();
        expect(feature.description).toBeTruthy();
        expect(feature.icon).toBeTruthy();
      }
    }
  });

  it('has unique slugs', () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('getServiceBySlug', () => {
  it('finds alpha service', () => {
    const service = getServiceBySlug('alpha');
    expect(service).toBeDefined();
    expect(service!.title).toBe('High Alpha Strategies');
  });

  it('finds risk service', () => {
    const service = getServiceBySlug('risk');
    expect(service).toBeDefined();
    expect(service!.title).toBe('Risk & Hedging');
  });

  it('finds private service', () => {
    const service = getServiceBySlug('private');
    expect(service).toBeDefined();
    expect(service!.title).toBe('On-Demand');
  });

  it('returns undefined for unknown slug', () => {
    expect(getServiceBySlug('nonexistent')).toBeUndefined();
  });
});

describe('getAllServiceSlugs', () => {
  it('returns all slugs', () => {
    const slugs = getAllServiceSlugs();
    expect(slugs).toEqual(['alpha', 'risk', 'private']);
  });
});
