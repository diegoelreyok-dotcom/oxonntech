import {
  forwardRef,
  isValidElement,
  cloneElement,
  type ReactNode,
  type HTMLAttributes,
  type ReactElement,
} from 'react';
import { cn } from '@/lib/utils';

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (!isValidElement(children)) {
      return null;
    }

    const childProps = children.props as Record<string, unknown>;

    return cloneElement(children as ReactElement<Record<string, unknown>>, {
      ...props,
      ...childProps,
      ref,
      className: cn(
        props.className as string | undefined,
        childProps.className as string | undefined
      ),
    });
  }
);

Slot.displayName = 'Slot';

export { Slot };
