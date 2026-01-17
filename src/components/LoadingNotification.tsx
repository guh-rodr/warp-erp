import { CircleNotchIcon } from '@phosphor-icons/react';

export function LoadingNotification() {
  return (
    <span className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-300/50 text-blue-600">
      <CircleNotchIcon className="animate-spin" weight="bold" />
      Buscando os dados, aguarde...
    </span>
  );
}
