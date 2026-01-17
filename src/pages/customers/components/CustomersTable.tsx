import { RowSelectionState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { FilterForm } from '../../../components/Filter/Filter';
import { TableBody } from '../../../components/Table/TableBody';
import { TableFooter } from '../../../components/Table/TableFooter';
import { TableHeader } from '../../../components/Table/TableHeader';
import { TableRowsSkeleton } from '../../../components/TableRowsSkeleton';
import { useDialog } from '../../../contexts/dialog/dialog-context';
import { useFetchTableCustomers } from '../../../hooks/useCustomers';
import { useTableHelper } from '../../../hooks/useTableHelper';
import { CustomerForm, CustomerRow } from '../../../types/customer';
import { SaleFormDrawer } from '../../sales/components/SaleForm/SaleForm';
import { CustomerDeleteModal } from './CustomerDeleteModal';
import { CustomerFormModal } from './CustomerFormModal';
import { CustomerInfoDrawer } from './CustomerInfoDrawer';
import { getCustomersColumns } from './CustomersColumns';

interface Props {
  filter: FilterForm;
  selectedRows: RowSelectionState;
  onSelectionChange: Dispatch<SetStateAction<RowSelectionState>>;
}

export function CustomersTable({ selectedRows, onSelectionChange, filter }: Props) {
  const { openDialog } = useDialog();

  const onEdit = (data: CustomerRow) => {
    const defaultValues: CustomerForm = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      note: data.note,
    };

    openDialog({
      title: 'Editar informações do cliente',
      type: 'modal',
      content: <CustomerFormModal creationQueryType="list" defaultValues={defaultValues} />,
    });
  };

  const onViewInfo = (rowId: string) => {
    openDialog({
      title: 'Informações do cliente',
      type: 'drawer',
      content: <CustomerInfoDrawer id={rowId} />,
    });
  };

  const onCreateSale = (data: CustomerRow) => {
    openDialog({
      title: 'Adicionar uma nova venda',
      type: 'drawer',
      content: <SaleFormDrawer defaultCustomer={data} />,
    });
  };

  const onDelete = (rowId: string, rowName: string) => {
    openDialog({
      title: 'Confirmar ação',
      type: 'modal',
      content: <CustomerDeleteModal customers={[{ id: rowId, name: rowName }]} />,
    });
  };

  const { data, isFetching, isError, refetch } = useFetchTableCustomers(filter);
  const columns = useMemo(() => getCustomersColumns({ onEdit, onViewInfo, onCreateSale, onDelete }), []);

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
