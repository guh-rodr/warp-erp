import { WarningIcon } from '@phosphor-icons/react';

export function ErrorNotification() {
  return (
    <span className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-300/50 text-red-600">
      <WarningIcon weight="bold" />
      Ocorreu um erro ao buscar os dados
    </span>
  );
}
