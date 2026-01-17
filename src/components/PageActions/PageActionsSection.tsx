import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function PageActionsSection({ children }: Props) {
  return <div className="flex gap-2">{children}</div>;
}
