import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function AutocompleteDropdown({ children }: Props) {
  return (
    <div className="bg-white absolute z-50 flex flex-col rounded-lg border border-neutral-200 overflow-y-auto max-h-[300px] mt-1 w-full shadow-sm text-sm">
      {children}
    </div>
  );
}
