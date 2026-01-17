import { Control, Controller, FieldPath } from 'react-hook-form';
import { FilterFieldProps } from '../../types/filters';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { Input } from '../Input';
import { CurrencyInput } from '../CurrencyInput';
import { FilterForm } from './Filter';

interface Props {
  control: Control<FilterForm>;
  name: FieldPath<FilterForm>;
  field: FilterFieldProps;
}

export function FilterFieldValue({ control, name, field }: Props) {
  const { type, options } = field;

  if (type === 'enum') {
    return (
      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value) => !!value || typeof value === 'boolean',
        }}
        render={({ field }) => (
          <Autocomplete
            readOnly
            value={field.value as string}
            onChangeOption={field.onChange}
            className="h-8 min-w-36 w-auto truncate pr-5"
            placeholder="Valor"
            options={options || []}
          />
        )}
      />
    );
  }

  if (type === 'text') {
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} value={field.value as string} className="min-w-38 h-8" placeholder="Valor" />
        )}
      />
    );
  }

  if (type === 'number') {
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} value={field.value as string} type="number" className="min-w-38 h-8" placeholder="Valor" />
        )}
      />
    );
  }

  if (type === 'currency') {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CurrencyInput
            placeholder="Valor"
            value={field.value as number}
            onValueChange={(val) => field.onChange(val)}
            className="min-w-38 h-8"
          />
        )}
      />
    );
  }

  if (type === 'date') {
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} value={field.value as string} type="date" className="min-w-38 h-8" placeholder="Valor" />
        )}
      />
    );
  }
}
