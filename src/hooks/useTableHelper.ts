import {
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useTableParams } from './useTableParams';

type Props<T> = Partial<TableOptions<T>>;

export function useTableHelper<T>({ ...props }: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { params, setParams } = useTableParams();

  const table = useReactTable({
    ...(props as Required<TableOptions<T>>),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: true,
    manualPagination: true,
    enableRowSelection: true,
    state: {
      ...props.state,
      sorting,
      pagination: {
        pageIndex: params.page - 1,
        pageSize: 10,
      },
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(table.getState().sorting) : updater;
      setSorting(newSorting);

      const { id, desc } = newSorting[0] || { id: null, desc: null };

      setParams({
        sortBy: id,
        sortDir: desc === null ? null : desc === true ? 'desc' : 'asc',
      });
    },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
      setParams({
        page: newPagination.pageIndex + 1,
      });
    },
  });

  return table;
}
