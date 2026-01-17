import { RowSelectionState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { FilterForm } from '../../../components/Filter/Filter';
import { TableBody } from '../../../components/Table/TableBody';
import { TableFooter } from '../../../components/Table/TableFooter';
import { TableHeader } from '../../../components/Table/TableHeader';
import { TableRowsSkeleton } from '../../../components/TableRowsSkeleton';
import { useDialog } from '../../../contexts/dialog/dialog-context';
import { useFetchTableSales } from '../../../hooks/useSales';
import { useTableHelper } from '../../../hooks/useTableHelper';
import { CustomerRow } from '../../../types/customer';
import { CustomerInfoDrawer } from '../../customers/components/CustomerInfoDrawer';
import { SaleDeleteModal } from './SaleDeleteModal';
import { SaleInfoDrawer } from './SaleInfoDrawer';
import { getSalesColumns } from './SalesColumns';

interface Props {
  filter: FilterForm;
  selectedRows: RowSelectionState;
  onSelectionChange: Dispatch<SetStateAction<RowSelectionState>>;
}

export function SalesTable({ filter, selectedRows, onSelectionChange }: Props) {
  const { openDialog } = useDialog();

  const onViewInfo = (rowId: string) => {
    openDialog({
      title: 'Informações da venda',
      type: 'drawer',
      content: <SaleInfoDrawer id={rowId} />,
    });
  };

  const onDelete = (rowId: string) => {
    openDialog({
      title: 'Confirmar ação',
      type: 'modal',
      content: <SaleDeleteModal ids={[rowId]} />,
    });
  };

  const onViewCustomerInfo = (customerId: CustomerRow['id']) => {
    openDialog({
      title: 'Informações do cliente',
      type: 'drawer',
      content: <CustomerInfoDrawer id={customerId} />,
    });
  };

  const { data, isFetching, isError, refetch } = useFetchTableSales(filter);
  const columns = useMemo(() => getSalesColumns({ onViewInfo, onDelete, onViewCustomerInfo }), []);

  const table = useTableHelper({
    columns,
    data: data?.rows || [],
    pageCount: data?.pageCount || 0,
    rowCount: data?.rowCount || 0,
    getRowId: (data) => data.id,
    onRowSelectionChange: onSelectionChange,
    state: { rowSelection: selectedRows },
    meta: { isFetching },
  });

  return (
    <table className="min-w-full min-h-full divide-y divide-neutral-200 rounded-xl overflow-hidden shadow-sm">
      <>
        <TableHeader table={table} />
        {isFetching ? (
          <tbody>
            <TableRowsSkeleton columnCount={columns.length - 1} />
          </tbody>
        ) : (
          <TableBody table={table} isError={isError} columnsLength={columns.length} refetch={refetch} />
        )}
      </>
      {!isFetching && <TableFooter table={table} />}
    </table>
  );
}
