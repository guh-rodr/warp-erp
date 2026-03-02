import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { useAuth } from '../../contexts/session/auth-context';
import { usePageTitle } from '../../hooks/usePageTitle';
import { SigninForm } from '../../types/auth';
import { AuthCard } from './components/AuthCard';
import { ErrorMessage } from './components/ErrorMessage';

const signinFormSchema = z.object({
  email: z.email('Formato de email inválido').max(100, 'O limite de caracteres é 100'),
  password: z.string().nonempty('A senha não pode estar vazia').max(100, 'O limite de caracteres é 100'),
});

export function LoginPage() {
  usePageTitle('Entrar');

  const { signIn, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SigninForm>({
    resolver: zodResolver(signinFormSchema),
  });

  const onSubmit: SubmitHandler<SigninForm> = (data) => {
    signIn(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthCard title="Entre em sua conta de teste" description="Essa é uma versão de demonstração, não use dados reais">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-12 space-y-6">
          <div>
            <Label className="text-sm">Email</Label>
            <Input {...register('email', { required: true })} />

            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>

          <div>
            <Label className="text-sm">Senha</Label>

            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} {...register('password', { required: true })} />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 mt-[5px] mr-1.5 rounded-lg hover:bg-neutral-100 p-2 text-neutral-700 transition-colors"
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>

            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

            <Link
              to="/auth/register"
              className="text-sm text-emerald-500 underline underline-offset-2 mt-2 w-fit block hover:opacity-50 transition-all"
            >
              Ainda não tenho uma conta
            </Link>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Entrar
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
