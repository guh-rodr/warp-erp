import React, { ComponentProps } from 'react';
import { extractDigitsFromCurrency } from '../functions/extractDigits';
import { Input } from './Input';

interface Props extends Omit<ComponentProps<'input'>, 'value' | 'onChange'> {
  value?: number | null;
  onValueChange?: (value: number) => void;
}

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(val);

export function CurrencyInput({ value = null, onValueChange, ...rest }: Props) {
  const hasValue = value != null && Number.isFinite(value);
  const displayValue = hasValue ? formatCurrency(value as number) : '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = extractDigitsFromCurrency(event.target.value);
    const numberValue = Number(onlyDigits);

    onValueChange?.(numberValue);
  };

  return <Input {...rest} type="text" inputMode="numeric" value={displayValue} onChange={handleChange} />;
}
