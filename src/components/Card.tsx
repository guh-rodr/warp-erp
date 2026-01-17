import { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils/cn';

interface Props extends ComponentProps<'div'> {
  children: ReactNode;
}

export function Card({ children, ...props }: Props) {
  return (
    <div {...props} className={cn('rounded-xl p-2 border border-neutral-200 bg-white shadow-sm', props.className)}>
      {children}
    </div>
  );
}
