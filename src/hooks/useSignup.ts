import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { SignupForm } from '../types/auth';

export function useSignup() {
  return useMutation({
    mutationFn: async (data: SignupForm) => {
      const response = await api.post('/auth/signup', data);
      return response.data;
    },
  });
}
