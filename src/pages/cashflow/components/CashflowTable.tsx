import { RowSelectionState } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { FilterForm } from '../../../components/Filter/Filter';
import { TableBody } from '../../../components/Table/TableBody';
import { TableFooter } from '../../../components/Table/TableFooter';
import { TableHeader } from '../../../components/Table/TableHeader';
import { TableRowsSkeleton } from '../../../components/TableRowsSkeleton';
import { useDialog } from '../../../contexts/dialog/dialog-context';
import { convertToDecimal } from '../../../functions/currency';
import { useTableHelper } from '../../../hooks/useTableHelper';
import { useFetchTableTransactions } from '../../../hooks/useTransactions';
import { TransactionRow } from '../../../types/transaction';
import { SaleInfoDrawer } from '../../sales/components/SaleInfoDrawer';
import { getCashflowColumns } from './CashflowColumns';
import { TransactionDeleteModal } from './TransactionDeleteModal';
import { TransactionForm } from './TransactionForm';

interface Props {
  filter: FilterForm;
  selectedRows: RowSelectionState;
  onSelectionChange: Dispatch<SetStateAction<RowSelectionState>>;
}

export function CashflowTable({ selectedRows, onSelectionChange, filter }: Props) {
  const { openDialog } = useDialog();

  const onEdit = (data: TransactionRow) => {
    const defaultValues: TransactionRow = {
      ...data,
      value: convertToDecimal(data.value),
      date: format(parseISO(data.date), 'yyyy-MM-dd'),
    };

    openDialog({
      title: 'Editar informações da transação',
      type: 'modal',
      content: <TransactionForm defaultValues={defaultValues} />,
    });
  };

  const onDelete = (id: string, isSale: boolean) => {
    openDialog({
      title: 'Confirmar ação',
      type: 'modal',
      content: <TransactionDeleteModal ids={[id]} isSale={isSale} />,
    });
  };

  const onViewSaleInfo = (saleId: string) => {
    openDialog({
      title: 'Informações da venda',
      type: 'drawer',
      content: <SaleInfoDrawer id={saleId} />,
    });
  };

  const { data, isFetching, isError, refetch } = useFetchTableTransactions(filter);
  const columns = useMemo(() => getCashflowColumns({ onEdit, onDelete, onViewSaleInfo }), []);

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
