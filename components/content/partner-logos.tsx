import { cn } from '@/lib/utils';
import type { Partner } from '@/types';

interface PartnerLogosProps {
  partners: Partner[];
  className?: string;
}

export function PartnerLogos({ partners, className }: PartnerLogosProps) {
  const sorted = [...partners].sort((a, b) => a.order - b.order);

  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="flex animate-marquee items-center gap-20">
        {[...sorted, ...sorted].map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="flex shrink-0 items-center opacity-30 transition-opacity duration-300 hover:opacity-80"
          >
            {partner.url ? (
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
                className="text-lg font-semibold tracking-[0.15em] text-white whitespace-nowrap uppercase"
              >
                {partner.name}
              </a>
            ) : (
              <span className="text-lg font-semibold tracking-[0.15em] text-white whitespace-nowrap uppercase">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
