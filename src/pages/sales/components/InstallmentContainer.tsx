import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '../../../components/Input';
import { CurrencyInput } from '../../../components/CurrencyInput';
import { formatToReal } from '../../../functions/currency';

interface Props<T extends FieldValues> {
  control: Control<T>;
  valueFieldName: FieldPath<T>;
  paidAtFieldName: FieldPath<T>;
  missingValue: number;
  maxInstallmentValue: number;
  isInstallmentTooHigh: boolean;
}

export function InstallmentContainer<T extends FieldValues>({
  control,
  valueFieldName,
  paidAtFieldName,
  missingValue,
  maxInstallmentValue,
  isInstallmentTooHigh,
}: Props<T>) {
  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      <div className="flex gap-2">
        <Controller
          name={valueFieldName}
          control={control}
          rules={{ required: true, max: maxInstallmentValue }}
          render={({ field }) => (
            <CurrencyInput
              placeholder="Valor da parcela"
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />

        <Controller
          name={paidAtFieldName}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder="Data"
              type="date"
              value={field.value as string}
              onChange={(val) => field.onChange(val)}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />
      </div>

      {isInstallmentTooHigh ? (
        <span className="border border-red-300/40 bg-red-200/50 text-red-600 rounded-lg py-2 px-3 text-sm font-medium">
          A parcela deve ser menor do que o valor pendente
        </span>
      ) : (
        <span className="border border-amber-300/40 bg-amber-200/50 text-amber-600 rounded-lg py-2 px-3 text-sm font-medium">
          Faltam <span className="font-semibold underline">{formatToReal(missingValue)}</span> para cobrir o valor total
        </span>
      )}
    </div>
  );
}
