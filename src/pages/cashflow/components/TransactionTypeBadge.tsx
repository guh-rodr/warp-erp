const STYLES = {
  inflow: {
    label: 'Entrada',
    styles: 'bg-emerald-200/30 text-emerald-500 border-emerald-200',
  },
  outflow: {
    label: 'Saída',
    styles: 'bg-orange-200/30 text-orange-500 border-orange-200',
  },
};

const SIZES = {
  xs: 'text-xs font-medium',
  sm: 'text-sm',
};

interface Props {
  flow: keyof typeof STYLES;
  size: 'xs' | 'sm';
}

export function TransactionFlowBadge({ flow, size }: Props) {
  const { label, styles } = STYLES[flow];
  const textSize = SIZES[size];

  return <span className={`py-0.5 px-2 rounded-2xl border ${textSize} ${styles}`}>{label}</span>;
}
