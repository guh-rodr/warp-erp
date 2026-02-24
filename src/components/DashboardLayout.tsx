import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';

interface Props {
  title: string;
  children: ReactNode;
}

export function DashboardLayout({ title, children }: Props) {
  const getSidebarState = () => {
    return localStorage.getItem('sidebarExpanded') === 'true';
  };

  const handleSetExpanded = (value: boolean) => {
    localStorage.setItem('sidebarExpanded', String(value));
    setIsSidebarExpanded(value);
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(getSidebarState);

  return (
    <div className="w-full">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={handleSetExpanded} />

      <main className={`${isSidebarExpanded ? 'ml-72' : 'ml-18'} p-12 space-y-10 transition-all duration-300`}>
        <h1 className="font-semibold text-4xl">{title}</h1>

        <div className="space-y-5">{children}</div>
      </main>
    </div>
  );
}
