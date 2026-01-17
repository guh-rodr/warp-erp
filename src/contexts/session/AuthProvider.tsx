import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../../lib/api';
import { SigninForm } from '../../types/auth';
import { AuthContext, AuthStatus } from './auth-context';

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: user,
    isError,
    isLoading: isLoadingProfile,
  } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
    retry: false,
    staleTime: Infinity,
  });

  const { mutateAsync: signIn, isPending: isLoggingIn } = useMutation({
    mutationFn: async (data: SigninForm) => {
      const response = await api.post('/auth/signin', data);
      return response.data;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(['me'], newUser);
      navigate('/dashboard', { replace: true });
    },
  });

  const { mutateAsync: signOut } = useMutation({
    mutationFn: async () => {
      const response = await api.post('/auth/signout');
      return response.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(['me'], null);
      navigate('/auth/login', { replace: true });
    },
  });

  let status: AuthStatus = 'unauthorized';

  if (isLoadingProfile) {
    status = null;
  } else if (user) {
    status = 'authorized';
  } else if (isError || !user) {
    status = 'unauthorized';
  }

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        status,
        isLoading: isLoadingProfile || isLoggingIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
