import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/types';

interface AuthorBioProps {
  author: TeamMember;
  className?: string;
}

export default function AuthorBio({ author, className }: AuthorBioProps) {
  return (
    <aside className={cn('mt-12', className)}>
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Written by
      </p>

      <div className="flex items-start gap-5 rounded-xl border border-border bg-surface p-6">
        {author.image?.src && (
          <Image
            src={author.image.src}
            alt={author.image.alt}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        )}

        <div className="min-w-0">
          <p className="font-semibold text-white">{author.name}</p>
          <p className="text-sm text-muted">{author.role}</p>

          {author.bio && (
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {author.bio}
            </p>
          )}

          {author.linkedIn && (
            <a
              href={author.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-cyan transition-colors hover:underline"
            >
              Connect on LinkedIn &rarr;
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
