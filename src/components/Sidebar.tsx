import { HouseIcon, IconProps, SignOutIcon } from '@phosphor-icons/react';
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

export function Sidebar() {
  const { signOut } = useAuth();

  return (
    <aside className="min-w-[290px] fixed max-h-screen h-full flex flex-col bg-white border-r border-neutral-200 p-6 shadow-sm">
      <ul className="mt-8 text-neutral-600 text-[15px] flex flex-col h-full">
        {LINKS.map(({ icon: Icon, ...link }) => (
          <li key={link.key}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `flex items-center gap-4 py-2.5 transition-colors ${isActive && link.key !== 'home' ? 'text-emerald-500' : 'hover:text-black'}`
              }
            >
              <Icon {...iconProps} />
              {link.name}
            </NavLink>
          </li>
        ))}

        <li className="mt-auto">
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-4 text-red-500 hover:text-red-700 transition-colors"
          >
            <SignOutIcon {...iconProps} />
            Desconectar
          </button>
        </li>
      </ul>
    </aside>
  );
}
