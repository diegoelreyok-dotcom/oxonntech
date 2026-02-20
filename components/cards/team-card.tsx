import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/types';

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export function TeamCard({ member, className }: TeamCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col items-center rounded-xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:border-border-light hover:bg-surface-light',
        className
      )}
    >
      {/* Avatar */}
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-border transition-colors duration-300 group-hover:border-cyan/40">
        <Image
          src={member.image.src}
          alt={member.image.alt}
          width={member.image.width}
          height={member.image.height}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <h3 className="text-sm font-semibold text-white">{member.name}</h3>
      <p className="mt-1 text-xs text-cyan">{member.role}</p>

      {member.bio && (
        <p className="mt-3 line-clamp-3 text-caption leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
      )}

      {member.linkedIn && (
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-xs text-muted-foreground transition-colors duration-200 hover:text-cyan"
          aria-label={`${member.name} on LinkedIn`}
        >
          LinkedIn →
        </a>
      )}
    </div>
  );
}
