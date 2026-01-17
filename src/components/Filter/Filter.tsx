import { FunnelSimpleIcon, FunnelSimpleXIcon, PlusIcon } from '@phosphor-icons/react';
import { useCallback, useRef, useState } from 'react';
import { Control, SubmitHandler, useFieldArray, UseFormSetValue, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useQueryParams } from '../../hooks/useQueryParams';
import { FilterFieldProps, FilterLogicalOp } from '../../types/filters';
import { FilterRow } from './FilterRow';

export interface FilterItem {
  field: string;
  operator: string;
  value?: string | number;
}

export interface FilterForm {
  logical: FilterLogicalOp;
  filters: FilterItem[];
}

interface Props {
  filterCount: number;
  onApplyFilter?: () => void;
  applyFilter: (newFilter: FilterForm) => void;
  control: Control<FilterForm>;
  setValue: UseFormSetValue<FilterForm>;
  fields: FilterFieldProps[];
}

export function Filter({ filterCount, onApplyFilter, applyFilter, control, setValue, fields }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { setQueryParams } = useQueryParams();

  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const {
    fields: rows,
    append,
    update,
    remove,
  } = useFieldArray({
    control,
    name: 'filters',
  });

  const watchedForm = useWatch({ control });
  const currentLogical = watchedForm.logical as FilterLogicalOp;

  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    setIsOpen(false);
    applyFilter(data);
    onApplyFilter?.();
    setQueryParams({
      page: 1,
      search: null,
    });
  };

  const onError = useCallback(() => {
    toast.error('Existem campos vazios ou inválidos.', {
      id: 'form-error',
      position: 'top-right',
    });
  }, []);

  const handleToggleLogical = () => {
    const logical = watchedForm.logical === 'OR' ? 'AND' : 'OR';

    setValue('logical', logical);
  };

  const handleToggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className="relative flex size-full">
      <div className="relative">
        <button
          type="button"
          id="btn"
          onClick={handleToggleVisibility}
          className="flex h-full w-11 justify-center items-center shadow-sm bg-white rounded-lg text-sm border border-neutral-200 text-neutral-500"
        >
          <FunnelSimpleIcon size={18} weight="bold" />
        </button>

        {filterCount > 0 && (
          <span className="absolute top-0 right-0 bg-indigo-500 text-white rounded-full px-2 text-xs py-0.5 -mt-2 -mr-2">
            {filterCount}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-12 left-0 top-0 bg-white rounded-lg shadow-lg p-2 border border-neutral-200 z-40">
          <form onSubmit={control.handleSubmit(onSubmit, onError)} className="space-y-2">
            {rows.length ? (
              rows.map((row, index) => {
                return (
                  <FilterRow
                    key={row.id}
                    index={index}
                    control={control}
                    fields={fields}
                    currentLogical={currentLogical}
                    clearFieldConditions={(field) => {
                      update(index, { field, operator: '', value: '' });
                    }}
                    handleToggleLogical={handleToggleLogical}
                    remove={remove}
                  />
                );
              })
            ) : (
              <span className="text-center w-full block text-neutral-400 text-sm pt-2">
                Não há filtros, comece adicionando um
              </span>
            )}

            <div className="flex gap-8 justify-between border-t border-neutral-200 mt-4 pt-2 px-1">
              <div className="flex gap-3">
                <button
                  className="text-sm whitespace-nowrap text-emerald-500 transition-opacity cursor-pointer hover:opacity-60 flex items-center gap-1"
                  type="button"
                  onClick={() => append({ field: '', operator: '', value: '' })}
                >
                  <PlusIcon weight="bold" /> Novo filtro
                </button>

                <button
                  className="text-sm whitespace-nowrap text-blue-500 transition-opacity cursor-pointer hover:opacity-60 flex items-center gap-1"
                  type="button"
                  onClick={() => remove()}
                >
                  <FunnelSimpleXIcon weight="bold" /> Limpar tudo
                </button>
              </div>

              <button
                type="submit"
                className="bg-emerald-300/10 text-emerald-500 border border-emerald-100 text-sm px-2.5 py-1.5 rounded-lg whitespace-nowrap hover:bg-emerald-100 transition-colors"
              >
                Aplicar filtros
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
