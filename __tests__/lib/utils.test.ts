import { describe, it, expect } from 'vitest';
import { cn, formatDate, slugify, truncate } from '@/lib/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('');
  });
});

describe('formatDate', () => {
  it('formats ISO date string', () => {
    const result = formatDate('2025-01-15');
    expect(result).toContain('January');
    expect(result).toContain('15');
    expect(result).toContain('2025');
  });

  it('formats date with time component', () => {
    const result = formatDate('2024-12-25T10:00:00Z');
    expect(result).toContain('December');
    expect(result).toContain('2024');
  });
});

describe('slugify', () => {
  it('converts text to lowercase slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Risk & Hedging — Overview!')).toBe('risk-hedging-overview');
  });

  it('collapses multiple spaces/underscores', () => {
    expect(slugify('multiple   spaces   here')).toBe('multiple-spaces-here');
  });

  it('trims leading and trailing hyphens', () => {
    expect(slugify('--trimmed--')).toBe('trimmed');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });
});

describe('truncate', () => {
  it('returns original if within limit', () => {
    expect(truncate('short', 10)).toBe('short');
  });

  it('truncates long text with ellipsis', () => {
    expect(truncate('This is a long sentence that should be cut', 20)).toBe('This is a long sente...');
  });

  it('returns original when length equals max', () => {
    expect(truncate('exact', 5)).toBe('exact');
  });

  it('handles empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});
