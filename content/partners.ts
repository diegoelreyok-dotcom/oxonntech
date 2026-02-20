import type { Partner } from '@/types';

// Partners - Replace with real partner data when available
export const partners: Partner[] = [];

export function getPartnersByTier(tier?: Partner['tier']): Partner[] {
  if (!tier) return partners.sort((a, b) => a.order - b.order);
  return partners
    .filter((p) => p.tier === tier)
    .sort((a, b) => a.order - b.order);
}
