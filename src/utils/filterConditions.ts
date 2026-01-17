import { FilterFieldProps } from '../types/filters';

type Condition = { key: string; label: string; hasValue: boolean };

export const FILTER_CONDITIONS: Record<FilterFieldProps['type'], Condition[]> = {
  enum: [
    { key: 'equals', label: 'Igual a', hasValue: true },
    { key: 'not_equals', label: 'Diferente de', hasValue: true },
  ],
  text: [
    { key: 'equals', label: 'Igual a', hasValue: true },
    { key: 'not_equals', label: 'Diferente de', hasValue: true },
    { key: 'contains', label: 'Contém', hasValue: true },
    { key: 'not_contains', label: 'Não contém', hasValue: true },
    { key: 'starts_with', label: 'Começa com', hasValue: true },
    { key: 'ends_with', label: 'Termina com', hasValue: true },
  ],
  currency: [
    { key: 'equals', label: 'Igual a', hasValue: true },
    { key: 'not_equals', label: 'Diferente de', hasValue: true },
    { key: 'greater_than', label: 'Maior que', hasValue: true },
    { key: 'less_than', label: 'Menor que', hasValue: true },
    { key: 'greater_or_equal', label: 'Maior ou igual a', hasValue: true },
    { key: 'less_or_equal', label: 'Menor ou igual a', hasValue: true },
  ],
  number: [
    { key: 'equals', label: 'Igual a', hasValue: true },
    { key: 'not_equals', label: 'Diferente de', hasValue: true },
    { key: 'greater_than', label: 'Maior que', hasValue: true },
    { key: 'less_than', label: 'Menor que', hasValue: true },
    { key: 'greater_or_equal', label: 'Maior ou igual a', hasValue: true },
    { key: 'less_or_equal', label: 'Menor ou igual a', hasValue: true },
  ],
  date: [
    { key: 'equals', label: 'Igual a', hasValue: true },
    { key: 'not_equals', label: 'Diferente de', hasValue: true },
    { key: 'before', label: 'Antes de', hasValue: true },
    { key: 'after', label: 'Depois de', hasValue: true },
  ],
} as const;
