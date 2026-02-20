import type { TeamMember } from '@/types';

export const team: TeamMember[] = [
  {
    id: 'ceo',
    name: 'Dimitri Shelovheny',
    role: 'Chief Executive Officer',
    department: 'leadership',
    bio: 'Leading OXONN\'s vision to redefine quantitative finance through systematic innovation and institutional-grade technology.',
    image: {
      src: '/images/team/dimitri-shelovheny.png',
      alt: 'Dimitri Shelovheny',
      width: 800,
      height: 800,
    },
    order: 1,
    isLeadership: true,
  },
  {
    id: 'cofounder',
    name: 'Melvyn Fathd',
    role: 'Co-Founder',
    department: 'leadership',
    bio: 'Driving strategic growth and partnerships, bridging quantitative research with real-world financial applications.',
    image: {
      src: '/images/team/melvyn-fathd.png',
      alt: 'Melvyn Fathd',
      width: 800,
      height: 800,
    },
    order: 2,
    isLeadership: true,
  },
  {
    id: 'cto',
    name: 'Rawdan Parze',
    role: 'Chief Technology Officer',
    department: 'leadership',
    bio: 'Architecting OXONN\'s high-performance infrastructure — from sub-millisecond execution to distributed computing at scale.',
    image: {
      src: '/images/team/rawdan-parze.png',
      alt: 'Rawdan Parze',
      width: 800,
      height: 800,
    },
    order: 3,
    isLeadership: true,
  },
  {
    id: 'cbo',
    name: 'Lee Hsan',
    role: 'Chief Business Officer',
    department: 'leadership',
    bio: 'Spearheading business development and client relationships, connecting institutional investors with OXONN\'s quantitative solutions.',
    image: {
      src: '/images/team/lee-hsan.png',
      alt: 'Lee Hsan',
      width: 800,
      height: 800,
    },
    order: 4,
    isLeadership: true,
  },
];

export function getLeadership(): TeamMember[] {
  return team
    .filter((m) => m.isLeadership)
    .sort((a, b) => a.order - b.order);
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return team.find((m) => m.id === id);
}
