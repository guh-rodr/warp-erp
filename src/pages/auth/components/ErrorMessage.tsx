import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ErrorMessage({ children }: Props) {
  return <span className="text-sm text-red-500">{children}</span>;
}
