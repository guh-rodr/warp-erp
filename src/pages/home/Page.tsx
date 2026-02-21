import { IconProps } from '@phosphor-icons/react';
import { Link } from 'react-router';
import { useAuth } from '../../contexts/session/auth-context';
import { usePageTitle } from '../../hooks/usePageTitle';
import { MODULES } from '../../utils/modules';

const iconProps: IconProps = { weight: 'bold', size: 18 };

export function HomePage() {
  usePageTitle('Inicio');

  const { user } = useAuth();

  return (
    <div className="w-screen h-screen flex flex-col gap-24 items-center justify-center text-center">
      <h1 className="w-full font-semibold text-4xl text-neutral-800">
        Seja bem-vindo {user ? `, ${user.name}` : ''} 👋
      </h1>

      <div className="flex flex-wrap max-w-2/3 justify-center gap-5">
        {MODULES.map(({ icon: Icon, ...module }) => {
          return (
            <Link key={module.key} to={module.href}>
              <div className="w-[320px] h-full bg-white pt-12 p-6 text-left shadow-sm border border-neutral-50 rounded-xl space-y-3 relative group overflow-hidden hover:-translate-y-2 transition-transform">
                <span className="block w-fit text-neutral-600 bg-neutral-100 border border-neutral-300 rounded-full p-2 group-hover:bg-emerald-200/30 group-hover:text-emerald-600 group-hover:border-emerald-300 transition-colors">
                  <Icon {...iconProps} />
                </span>

                <span className="block font-medium text-neutral-800 text-lg">{module.name}</span>

                <p className="text-neutral-600">{module.description}</p>

                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bg-gradient-to-b from-emerald-200/35 blur-lg to-emerald-200/35 shadow-[0px_0px_50px_-5px_rgba(52,_211,_153,_0.5)] z-20 mb-auto  w-full h-8 inset-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
