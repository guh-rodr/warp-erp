import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { useSignup } from '../../hooks/useSignup';
import { SignupForm } from '../../types/auth';
import { ErrorMessage } from './components/ErrorMessage';

const signupFormSchema = z.object({
  name: z.string().nonempty('O nome não pode estar vazio').max(100, 'O limite de caracteres é 100'),
  email: z.email('Formato de email inválido').max(100, 'O limite de caracteres é 100'),
  password: z.string().nonempty('A senha não pode estar vazia').max(100, 'O limite de caracteres é 100'),
});

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useSignup();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/auth/login', { replace: true });
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 space-y-4 shadow-md rounded-3xl bg-white max-w-sm">
          <h1 className="font-semibold text-xl text-center">Crie uma conta de teste</h1>
          <p className="text-neutral-500 text-center px-4">Essa é uma versão de demonstração, não use dados reais.</p>

          <div className="mt-12 space-y-6">
            <div>
              <Label className="text-sm">Nome</Label>
              <Input {...register('name', { required: true })} />

              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

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
                to="/auth/login"
                className="text-sm text-emerald-500 underline underline-offset-2 mt-2 w-fit block hover:opacity-50 transition-all"
              >
                Já tenho uma conta
              </Link>
            </div>

            <Button type="submit" isLoading={isPending} className="w-full">
              Registrar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
