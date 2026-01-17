import { ComponentProps } from 'react';
import { cn } from '../utils/cn';

interface Props extends ComponentProps<'label'> {
  required?: boolean;
}

export function Label({ required = false, ...props }: Props) {
  return (
    <label
      {...props}
      className={cn('text-neutral-500 font-medium text-sm w-full flex items-center gap-1.5 pb-1.5', props.className)}
    >
      {props.children}
      {required && <span className="text-red-500 translate-y-0.5">*</span>}
    </label>
  );
}
