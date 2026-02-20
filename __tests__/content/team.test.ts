import { describe, it, expect } from 'vitest';
import { team, getLeadership, getTeamMemberById } from '@/content/team';

describe('team data', () => {
  it('has at least 4 members', () => {
    expect(team.length).toBeGreaterThanOrEqual(4);
  });

  it('every member has required fields', () => {
    for (const member of team) {
      expect(member.id).toBeTruthy();
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.department).toBeTruthy();
      expect(member.bio).toBeTruthy();
      expect(member.image.src).toBeTruthy();
    }
  });

  it('has unique IDs', () => {
    const ids = team.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('getLeadership', () => {
  it('returns only leadership members', () => {
    const leaders = getLeadership();
    expect(leaders.every((m) => m.isLeadership)).toBe(true);
  });

  it('returns members sorted by order', () => {
    const leaders = getLeadership();
    for (let i = 1; i < leaders.length; i++) {
      expect(leaders[i].order).toBeGreaterThanOrEqual(leaders[i - 1].order);
    }
  });
});

describe('getTeamMemberById', () => {
  it('finds CEO by id', () => {
    const ceo = getTeamMemberById('ceo');
    expect(ceo).toBeDefined();
    expect(ceo!.name).toBe('Gacien Loretz');
  });

  it('returns undefined for unknown id', () => {
    expect(getTeamMemberById('nonexistent')).toBeUndefined();
  });
});
