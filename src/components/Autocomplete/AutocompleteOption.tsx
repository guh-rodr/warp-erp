import { ReactNode } from 'react';

interface Props {
  value: string;
  children: ReactNode;
  onClick: () => void;
  isGrouped: boolean;
}

export function AutocompleteOption({ children, onClick, isGrouped }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`hover:bg-neutral-200/50 hover:text-neutral-900 text-neutral-700 w-full text-left py-[6px] px-2 transition-colors ${isGrouped ? 'pl-4' : ''}`}
    >
      {children}
    </button>
  );
}
