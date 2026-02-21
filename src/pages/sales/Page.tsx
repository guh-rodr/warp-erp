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
import { SaleDeleteModal } from './components/SaleDeleteModal';
import { SaleFormDrawer } from './components/SaleForm/SaleForm';
import { SalesTable } from './components/SalesTable';

const SALES_FILTER_DEFINITIONS: FilterFieldProps[] = [
  {
    key: 'customerName',
    label: 'Nome do cliente',
    type: 'text',
  },
  {
    key: 'status',
    label: 'Status',
    type: 'enum',
    options: [
      { label: 'Pago', value: 'paid' },
      { label: 'Pendente', value: 'pending' },
    ],
  },
  {
    key: 'total',
    label: 'Valor total',
    type: 'currency',
  },
  {
    key: 'profit',
    label: 'Lucro total',
    type: 'currency',
  },
  {
    key: 'itemCount',
    label: 'Qntd. itens',
    type: 'number',
  },
  {
    key: 'purchasedAt',
    label: 'Data de compra',
    type: 'date',
  },
];

export function SalesPage() {
  usePageTitle('Vendas');

  const [selectedRows, setSelectedRows] = useState({});

  const { openDialog } = useDialog();

  const filter = useFilter();
  const { resetFilter, appliedFilter, applyFilter } = filter;

  const openSaleForm = () => {
    openDialog({
      title: 'Adicionar uma nova venda',
      type: 'drawer',
      content: <SaleFormDrawer onCreate={resetFilter} />,
    });
  };

  const selectedRowsId = Object.keys(selectedRows);

  const clearSelectedRows = () => {
    setSelectedRows({});
  };

  const onDeleteSelectedRows = () => {
    openDialog({
      title: 'Confirmar ação',
      type: 'modal',
      content: <SaleDeleteModal onDelete={clearSelectedRows} ids={selectedRowsId} />,
    });
  };

  const handleSearch = () => {
    if (appliedFilter.filters.length) {
      applyFilter({ filters: [], logical: 'AND' });

      toast('Os filtros aplicados foram removidos', { position: 'top-right' });
    }
  };

  return (
    <DashboardLayout title="Vendas">
      <PageActions>
        <PageActions.Section>
          <SearchBar placeholder="Buscar por nome ou telefone do cliente..." onSearch={handleSearch} />

          <Filter {...filter} fields={SALES_FILTER_DEFINITIONS} onApplyFilter={clearSelectedRows} />

          <PageActions.DeleteButton canShow={selectedRowsId.length > 0} onClick={onDeleteSelectedRows} />
        </PageActions.Section>

        <PageActions.Section>
          <Button onClick={openSaleForm}>
            <PlusIcon size={14} weight="bold" />
            Nova venda
          </Button>
        </PageActions.Section>
      </PageActions>

      <SalesTable filter={appliedFilter} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </DashboardLayout>
  );
}
