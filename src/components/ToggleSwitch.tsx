import { memo } from 'react';

interface Props {
  isOn: boolean;
  onToggle: (value: boolean) => void;
}

export const ToggleSwitch = memo(({ isOn, onToggle }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(!isOn)}
      className={`
        relative
        w-11 h-6 p-[2px] rounded-full
        ${isOn ? 'bg-emerald-500' : 'bg-neutral-300'}
        transition-colors duration-200
        flex items-center
      `}
    >
      <span
        className={`
          block w-4 h-4 rounded-full bg-white
          transform
          ${isOn ? 'translate-x-[21px]' : 'translate-x-0.5'}
          transition-transform duration-200
        `}
      />
    </button>
  );
});
