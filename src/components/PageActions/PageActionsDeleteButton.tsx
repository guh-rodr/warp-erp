import { TrashIcon } from '@phosphor-icons/react';

interface Props {
  canShow: boolean;
  onClick: () => void;
}

export function PageActionsDeleteButton({ canShow, onClick }: Props) {
  if (!canShow) return null;

  return (
    <div className="border-l border-l-neutral-200 px-2">
      <button
        type="button"
        onClick={onClick}
        className="rounded-lg size-full px-3 bg-red-200/30 text-red-500 hover:bg-red-200 border border-red-200 transition-colors"
      >
        <TrashIcon size={18} weight="duotone" />
      </button>
    </div>
  );
}
