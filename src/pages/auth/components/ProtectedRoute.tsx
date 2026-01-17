import { ReactNode } from 'react';
import { useAuth } from '../../../contexts/session/auth-context';

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const { status, isLoading } = useAuth();

  if (isLoading && !status) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  if (!isLoading && status === 'authorized') {
    return children;
  }
}
