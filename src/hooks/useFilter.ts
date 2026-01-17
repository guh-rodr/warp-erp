import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FilterForm } from '../components/Filter/Filter';

export function useFilter(defaultValues?: FilterForm) {
  const { control, setValue, reset } = useForm<FilterForm>({
    defaultValues: defaultValues || {
      logical: 'AND',
      filters: [{ field: '', operator: '', value: undefined }],
    },
  });

  const [appliedFilter, setAppliedFilter] = useState<FilterForm>({
    filters: [],
    logical: 'AND',
  });

  const applyFilter = (newFilter: FilterForm) => setAppliedFilter(newFilter);

  const resetFilter = () => {
    reset();
    setAppliedFilter({ logical: 'AND', filters: [] });
  };

  const filterCount = appliedFilter.filters.length;

  return {
    control,
    setValue,
    appliedFilter,
    applyFilter,
    filterCount,
    resetFilter,
  };
}
