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
import { TRANSACTION_CATEGORIES } from '../../utils/transactionCategories';
import { CashflowTable } from './components/CashflowTable';
import { TransactionDeleteModal } from './components/TransactionDeleteModal';
import { TransactionForm } from './components/TransactionForm';

const INFLOW_CATEGORIES = TRANSACTION_CATEGORIES['inflow'].map((cat) => ({
  ...cat,
  group: 'Entradas',
}));

const OUTFLOW_CATEGORIES = TRANSACTION_CATEGORIES['outflow'].map((cat) => ({
  ...cat,
  group: 'Saídas',
}));

const CASHFLOW_FILTER_FIELDS: FilterFieldProps[] = [
  {
    key: 'description',
    label: 'Descrição',
    type: 'text',
  },
  {
    key: 'value',
    label: 'Valor',
    type: 'currency',
  },
  {
    key: 'flow',
    label: 'Fluxo',
    type: 'enum',
    options: [
      { label: 'Entrada', value: 'inflow' },
      { label: 'Saída', value: 'outflow' },
    ],
  },
  {
    key: 'category',
    label: 'Categoria',
    type: 'enum',
    options: [...INFLOW_CATEGORIES, ...OUTFLOW_CATEGORIES],
  },
];

export function CashflowPage() {
  usePageTitle('Fluxo de Caixa');

  const [selectedRows, setSelectedRows] = useState({});

  const { openDialog } = useDialog();

  const filter = useFilter();
  const { resetFilter, appliedFilter, applyFilter } = filter;

  const openTransactionForm = () => {
    openDialog({
      title: 'Adicionar nova transação',
      type: 'modal',
      content: <TransactionForm onCreate={resetFilter} />,
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
      content: <TransactionDeleteModal ids={selectedRowsId} onDelete={clearSelectedRows} />,
    });
  };

  const handleSearch = () => {
    if (appliedFilter.filters.length) {
      applyFilter({ filters: [], logical: 'AND' });

      toast('Os filtros aplicados foram removidos', { position: 'top-right' });
    }
  };

  return (
    <DashboardLayout title="Fluxo de Caixa">
      <PageActions>
        <PageActions.Section>
          <SearchBar placeholder="Buscar por descrição..." onSearch={handleSearch} />

          <Filter {...filter} fields={CASHFLOW_FILTER_FIELDS} onApplyFilter={clearSelectedRows} />

          <PageActions.DeleteButton canShow={selectedRowsId.length > 0} onClick={onDeleteSelectedRows} />
        </PageActions.Section>

        <PageActions.Section>
          <Button onClick={openTransactionForm}>
            <PlusIcon size={14} weight="bold" />
            Nova transação
          </Button>
        </PageActions.Section>
      </PageActions>

      <CashflowTable filter={appliedFilter} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </DashboardLayout>
  );
}
