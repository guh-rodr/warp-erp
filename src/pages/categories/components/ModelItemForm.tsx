import { XIcon } from '@phosphor-icons/react';
import { Control, Controller } from 'react-hook-form';
import { Input } from '../../../components/Input';
import { CurrencyInput } from '../../../components/CurrencyInput';
import { CreateCategoryForm } from '../../../types/category';

interface Props {
  index: number;
  onRemove: () => void;
  control: Control<CreateCategoryForm>;
}

export function ModelItemForm({ onRemove, index, control }: Props) {
  return (
    <div className="border-t border-neutral-300 py-4 m-0 space-y-1">
      <Controller
        name={`models.${index}.name`}
        rules={{ required: true }}
        control={control}
        render={({ field }) => <Input {...field} placeholder="Nome do modelo (obrigatório)" />}
      />
      <div className="flex gap-1">
        <Controller
          name={`models.${index}.costPrice`}
          control={control}
          render={({ field }) => (
            <CurrencyInput {...field} onValueChange={field.onChange} placeholder="Preço de compra" />
          )}
        />

        <Controller
          name={`models.${index}.salePrice`}
          control={control}
          render={({ field }) => (
            <CurrencyInput {...field} onValueChange={field.onChange} placeholder="Preço de venda" />
          )}
        />
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 text-sm whitespace-nowrap flex items-center gap-1 hover:text-red-600 transition-colors pt-1 ml-1"
      >
        <XIcon weight="bold" />
        Remover
      </button>
    </div>
  );
}
