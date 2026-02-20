import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BlogBodyProps {
  content?: string;
  children?: ReactNode;
  className?: string;
}

export default function BlogBody({ content, children, className }: BlogBodyProps) {
  const wrapperClasses = cn(
    'prose-oxonn mx-auto max-w-reading',
    'text-lg leading-relaxed text-gray-300',
    '[&_h1]:text-h1 [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-14 [&_h1]:mb-6',
    '[&_h2]:text-h2 [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24',
    '[&_h3]:text-h3 [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:scroll-mt-24',
    '[&_h4]:text-body-lg [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-8 [&_h4]:mb-2',
    '[&_p]:mb-6 [&_p]:leading-relaxed',
    '[&_a]:text-cyan [&_a]:underline-offset-2 [&_a:hover]:underline [&_a]:transition-colors',
    '[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2',
    '[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2',
    '[&_li]:text-gray-300 [&_li]:leading-relaxed',
    '[&_blockquote]:border-l-2 [&_blockquote]:border-cyan [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:my-8',
    '[&_pre]:bg-surface [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-8 [&_pre]:text-sm [&_pre]:leading-relaxed',
    '[&_code]:font-mono [&_code]:text-sm',
    '[&_:not(pre)>code]:bg-surface [&_:not(pre)>code]:rounded [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-cyan',
    '[&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-8',
    '[&_hr]:border-border [&_hr]:my-12',
    '[&_table]:w-full [&_table]:my-8 [&_table]:text-sm',
    '[&_th]:border-b [&_th]:border-border [&_th]:pb-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white',
    '[&_td]:border-b [&_td]:border-border [&_td]:py-3 [&_td]:text-gray-300',
    '[&_strong]:font-semibold [&_strong]:text-white',
    '[&_em]:italic',
    '[&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:mt-3',
    className,
  );

  if (content) {
    return (
      <article
        className={wrapperClasses}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return <article className={wrapperClasses}>{children}</article>;
}
