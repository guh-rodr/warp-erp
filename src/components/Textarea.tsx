import { ComponentProps } from 'react';

export function Textarea(props: ComponentProps<'textarea'>) {
  return (
    <textarea
      {...props}
      className={`${props.className || ''} w-full field bg-white rounded-lg border border-neutral-200 p-2 text-sm shadow-sm outline-none ring-1 ring-transparent ring-offset-0 transition-all focus:ring-emerald-500 focus:border-emerald-400`}
    />
  );
}
