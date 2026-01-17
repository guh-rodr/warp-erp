import { ComponentProps } from 'react';

export const INPUT_STYLES =
  'w-full placeholder-neutral-400 bg-white rounded-[10px] border border-neutral-200 p-2.5 text-sm shadow-xs outline-none ring-1 ring-transparent ring-offset-0 transition-all focus:ring-emerald-500 focus:border-emerald-300';

export function Input(props: ComponentProps<'input'>) {
  return <input {...props} className={`${props.className || ''} ${INPUT_STYLES}`} />;
}
