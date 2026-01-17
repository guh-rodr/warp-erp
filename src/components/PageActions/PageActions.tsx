import { ReactNode } from 'react';
import { PageActionsSection } from './PageActionsSection';
import { PageActionsDeleteButton } from './PageActionsDeleteButton';

interface Props {
  children: ReactNode;
}

export function PageActions({ children }: Props) {
  return <div className="flex justify-between">{children}</div>;
}

PageActions.Section = PageActionsSection;
PageActions.DeleteButton = PageActionsDeleteButton;
