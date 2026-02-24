import { ArrowsHorizontalIcon, HouseIcon, IconProps, SignOutIcon } from '@phosphor-icons/react';
import { NavLink } from 'react-router';
import { useAuth } from '../contexts/session/auth-context';
import { MODULES } from '../utils/modules';

const iconProps: IconProps = { size: 20, weight: 'regular' };

type Link = (typeof MODULES)[number];

const LINKS: Link[] = [
  {
    key: 'home',
    name: 'Inicio',
    description: '',
    icon: HouseIcon,
    href: '/dashboard',
  },
  ...MODULES,
];

interface Props {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export function Sidebar({ isExpanded, setIsExpanded }: Props) {
  const { signOut } = useAuth();

  return (
    <aside
      className={`${isExpanded ? 'w-72' : 'w-18'} fixed max-h-screen h-full flex flex-col bg-white border-r border-neutral-200 shadow-sm transition-all duration-300`}
    >
      <ul className="mt-8 text-neutral-600 text-[15px] flex flex-col h-full">
        <li className="pl-6 pb-6">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full gap-4 truncate hover:text-black"
          >
            <ArrowsHorizontalIcon {...iconProps} className="min-w-[20px]" size={20} />

            <span className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
              Ocultar barra
            </span>
          </button>
        </li>

        {LINKS.map(({ icon: Icon, ...link }) => (
          <li key={link.key}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `flex pl-6 gap-4 py-3 transition-colors ${isActive && link.key !== 'home' ? 'text-emerald-500' : 'hover:text-black'} truncate`
              }
            >
              <Icon {...iconProps} className="min-w-[20px]" size={20} />

              <span className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
                {link.name}
              </span>
            </NavLink>
          </li>
        ))}

        <li className="pl-6 pb-6 mt-auto">
          <button
            type="button"
            onClick={signOut}
            className="flex w-full gap-4 truncate text-red-500 hover:text-red-700"
          >
            <SignOutIcon {...iconProps} className="min-w-[20px]" size={20} />

            <span className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
              Desconectar
            </span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
