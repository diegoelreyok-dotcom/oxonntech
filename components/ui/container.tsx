import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const maxWidthStyles = {
  default: 'max-w-[1280px]',
  narrow: 'max-w-[768px]',
  reading: 'max-w-[680px]',
  wide: 'max-w-[1440px]',
} as const;

export type ContainerSize = keyof typeof maxWidthStyles;

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  as?: 'div' | 'section' | 'article' | 'main';
}

function Container({
  className,
  size = 'default',
  as: Tag = 'div',
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full px-6', maxWidthStyles[size], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Container };
