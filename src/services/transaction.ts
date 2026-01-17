import { FilterForm } from '../components/Filter/Filter';
import { TableParams } from '../hooks/useTableParams';
import { api } from '../lib/api';
import { TransactionFormProps, TransactionRow } from '../types/transaction';

const API_PATH = '/cashflow-transactions';

export async function fetchTableTransaction(params: TableParams, filter: FilterForm) {
  const response = await api.post(`${API_PATH}/list`, filter, { params });
  return response.data;
}

// --------------

export async function createTransaction(data: TransactionFormProps) {
  const response = await api.post(API_PATH, data);
  return response.data;
}

export async function editTransaction(data: TransactionRow) {
  const { id, ...body } = data;

  const response = await api({
    method: 'PATCH',
    url: `${API_PATH}/${id}`,
    data: body,
  });
  return response.data;
}

export async function deleteTransaction(id: string) {
  const response = await api.delete(`${API_PATH}/${id}`);
  return response.data;
}

export async function deleteManyTransactions(ids: TransactionRow['id'][]) {
  const response = await api.delete(`${API_PATH}`, {
    data: { ids },
  });
  return response.data;
}
