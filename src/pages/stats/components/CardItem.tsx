import { Icon } from '@phosphor-icons/react';

interface Props {
  icon: Icon;
  label: string;
  value: string | number;
}

export function CardItem({ icon: Icon, label, value }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-sm text-neutral-500">
      <span className="flex items-center gap-2 text-sm truncate">
        <Icon size={16} />
        {label}
      </span>

      <span
        className={`font-semibold ${value.toString().startsWith('-') ? 'text-red-500' : 'text-neutral-800'} text-xl mt-4 block`}
      >
        {value}
      </span>
    </div>
  );
}
