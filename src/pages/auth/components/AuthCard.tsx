import { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({ title, description, children }: Props) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 space-y-4 shadow-md rounded-3xl bg-white max-w-sm">
        <img width={48} height={48} alt="trama-icone" src="/trama-icon.png" className="mx-auto" />

        <div className="space-y-2">
          <h1 className="font-semibold text-xl text-center">{title}</h1>
          <p className="text-neutral-500 text-center px-4">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
