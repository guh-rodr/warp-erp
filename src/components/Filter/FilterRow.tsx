import { ArrowsClockwiseIcon, TrashIcon } from '@phosphor-icons/react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { FilterFieldProps, FilterLogicalOp } from '../../types/filters';
import { FILTER_CONDITIONS } from '../../utils/filterConditions';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { FilterForm } from './Filter';
import { FilterFieldValue } from './FilterFieldValue';

interface Props {
  control: Control<FilterForm>;
  index: number;
  fields: FilterFieldProps[];
  currentLogical: FilterLogicalOp;
  handleToggleLogical: () => void;
  clearFieldConditions: (field: string) => void;
  remove: (index: number) => void;
}

const logicalOperatorsMap: Record<FilterLogicalOp, string> = {
  AND: 'e',
  OR: 'ou',
};

export function FilterRow({
  control,
  index,
  fields,
  currentLogical,
  clearFieldConditions,
  handleToggleLogical,
  remove,
}: Props) {
  const [fieldKey, fieldOp] = useWatch({
    control,
    name: [`filters.${index}.field`, `filters.${index}.operator`],
  });

  const fieldsOptions = fields.map((f) => ({ label: f.label, value: f.key }));

  const currentField = fields.find((f) => f.key === fieldKey);

  const conditions = currentField?.type ? FILTER_CONDITIONS[currentField.type] : [];
  const conditionsOptions = conditions.map((c) => ({
    label: c.label,
    value: c.key,
  }));

  const currentCondition = conditions.find((c) => c.key === fieldOp);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="min-w-11 text-center text-neutral-700">
        {index === 0 ? (
          'Onde'
        ) : (
          <button
            type="button"
            onClick={handleToggleLogical}
            className="border border-neutral-200 bg-neutral-100/30 w-full rounded-lg flex gap-1 justify-center items-center p-1 h-8 transition-colors hover:bg-neutral-100"
          >
            {logicalOperatorsMap[currentLogical]}
            <ArrowsClockwiseIcon weight="bold" size={12} color="gray" />
          </button>
        )}
      </span>

      <div className="flex items-center gap-2">
        <Controller
          control={control}
          name={`filters.${index}.field`}
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              readOnly
              value={field.value}
              onChangeOption={(value) => {
                field.onChange(value);
                clearFieldConditions(value);
              }}
              className="h-8 min-w-40"
              placeholder="Campo"
              options={fieldsOptions}
            />
          )}
        />

        <Controller
          control={control}
          name={`filters.${index}.operator`}
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              readOnly
              value={field.value}
              onChangeOption={field.onChange}
              className="h-8 min-w-40"
              placeholder="Condição"
              options={conditionsOptions}
            />
          )}
        />

        {currentField && currentCondition?.hasValue && (
          <FilterFieldValue control={control} field={currentField} name={`filters.${index}.value`} />
        )}
      </div>

      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-400 rounded-md hover:bg-red-100/40 p-2 transition-colors mr-0 ml-auto"
      >
        <TrashIcon size={16} weight="bold" />
      </button>
    </div>
  );
}
