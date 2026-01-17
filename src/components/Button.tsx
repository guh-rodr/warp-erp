import { CircleNotchIcon } from '@phosphor-icons/react';
import { ComponentProps } from 'react';
import { cn } from '../utils/cn';

interface Props extends ComponentProps<'button'> {
  variant?: 'default' | 'outline';
  isLoading?: boolean;
}

const variantClasses = {
  default: 'border border-transparent bg-emerald-400 text-white hover:bg-emerald-500',
  outline: 'border border-neutral-300 hover:bg-neutral-200/50 text-neutral-700',
};

export function Button({ variant = 'default', isLoading, ...props }: Props) {
  const loadingClass = isLoading ? 'opacity-50' : '';

  return (
    <button
      {...props}
      disabled={props.disabled || !!isLoading}
      className={cn(
        'px-4 py-2.5 rounded-lg text-sm flex justify-center items-center gap-2 shadow-sm transition-colors disabled:opacity-50',
        loadingClass,
        variantClasses[variant],
        props.className,
      )}
    >
      {isLoading ? (
        <>
          <CircleNotchIcon className="animate-spin" weight="bold" size={14} />
          Aguarde...
        </>
      ) : (
        props.children
      )}
    </button>
  );
}
