import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface Props {
  title: string;
  children: ReactNode;
}

export function DashboardLayout({ title, children }: Props) {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: 290 }} className="page-content p-20 space-y-10">
        <h1 className="font-semibold text-4xl">{title}</h1>

        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}
