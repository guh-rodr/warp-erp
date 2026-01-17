import { ReactNode } from 'react';

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export function AutocompleteAction({ onClick, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-t border-neutral-200/80 flex items-center gap-2 w-full justify-center rounded text-emerald-500 font-medium hover:bg-neutral-200/50 transition-colors cursor-pointer py-2"
    >
      {children}
    </button>
  );
}
