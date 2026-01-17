import { Option } from '../components/Autocomplete/Autocomplete';

export type FilterLogicalOp = 'OR' | 'AND';

export interface FilterFieldProps {
  key: string;
  label: string;
  type: 'text' | 'enum' | 'number' | 'date' | 'currency';
  options?: Option[];
}
