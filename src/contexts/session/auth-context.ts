import { createContext, useContext } from 'react';
import { SigninForm } from '../../types/auth';

export interface User {
  id: string;
  name: string;
}

export type AuthStatus = 'authorized' | 'unauthorized' | null;

interface AuthContextProps {
  user: User | null;
  status: AuthStatus;
  isLoading: boolean;
  signIn: (data: SigninForm) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);
