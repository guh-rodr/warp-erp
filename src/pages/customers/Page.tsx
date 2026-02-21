import { PlusIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../components/Button';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Filter } from '../../components/Filter/Filter';
import { PageActions } from '../../components/PageActions/PageActions';
import { SearchBar } from '../../components/SearchBar';
import { useDialog } from '../../contexts/dialog/dialog-context';
import { useFilter } from '../../hooks/useFilter';
import { usePageTitle } from '../../hooks/usePageTitle';
import { FilterFieldProps } from '../../types/filters';
import { CustomerDeleteModal } from './components/CustomerDeleteModal';
import { CustomerFormModal } from './components/CustomerFormModal';
import { CustomersTable } from './components/CustomersTable';

const CUSTOMERS_FILTER_FIELDS: FilterFieldProps[] = [
  {
    key: 'name',
    label: 'Nome',
    type: 'text',
  },
  {
    key: 'phone',
    label: 'Telefone',
    type: 'text',
  },
  {
    key: 'totalSpent',
    label: 'Total gasto',
    type: 'currency',
  },
  {
    key: 'debt',
    label: 'Dívida',
    type: 'currency',
  },
  {
    key: 'lastPurchaseAt',
    label: 'Última compra',
    type: 'date',
  },
];

export function CustomersPage() {
  usePageTitle('Clientes');

  const [selectedRows, setSelectedRows] = useState({});

  const { openDialog } = useDialog();

  const filter = useFilter();
  const { resetFilter, appliedFilter, applyFilter } = filter;

  const openCustomerForm = () => {
    openDialog({
      title: 'Adicionar um novo cliente',
      type: 'modal',
      content: <CustomerFormModal creationQueryType="list" onCreate={() => resetFilter()} />,
    });
  };

  const selectedRowsId = Object.keys(selectedRows);

  const clearSelectedRows = () => {
    setSelectedRows({});
  };

  const onDeleteSelectedRows = () => {
    const ids = selectedRowsId.map((rowId) => ({ id: rowId }));

    openDialog({
      title: 'Confirmar ação',
      type: 'modal',
      content: <CustomerDeleteModal onDelete={clearSelectedRows} customers={ids} />,
    });
  };

  const handleSearch = () => {
    if (appliedFilter.filters.length) {
      applyFilter({ filters: [], logical: 'AND' });

      toast('Os filtros aplicados foram removidos', { position: 'top-right' });
    }
  };

  return (
    <DashboardLayout title="Clientes">
      <PageActions>
        <PageActions.Section>
          <SearchBar placeholder="Buscar por nome ou telefone..." onSearch={handleSearch} />

          <Filter {...filter} fields={CUSTOMERS_FILTER_FIELDS} onApplyFilter={clearSelectedRows} />

          <PageActions.DeleteButton canShow={selectedRowsId.length > 0} onClick={onDeleteSelectedRows} />
        </PageActions.Section>

        <PageActions.Section>
          <Button onClick={openCustomerForm}>
            <PlusIcon size={14} weight="bold" />
            Novo cliente
          </Button>
        </PageActions.Section>
      </PageActions>

      <CustomersTable filter={appliedFilter} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </DashboardLayout>
  );
}
