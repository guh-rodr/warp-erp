import { FilterForm } from '../components/Filter/Filter';
import { TableParams } from '../hooks/useTableParams';
import { api } from '../lib/api';
import { CustomerForm } from '../types/customer';

const API_PATH = '/customers';

export async function fetchTableCustomers(params: TableParams, filter: FilterForm) {
  const response = await api.post(`${API_PATH}/list`, filter, { params });
  return response.data;
}

export async function fetchCustomersAutocomplete(search: string) {
  const response = await api.get(`${API_PATH}/autocomplete`, { params: { search } });
  return response.data;
}

// --------------

export async function fetchCustomerOverview(id: string) {
  const response = await api.get(`${API_PATH}/${id}/overview`);
  return response.data;
}

export async function fetchCustomerPurchases(id: string) {
  const response = await api.get(`${API_PATH}/${id}/purchases`);
  return response.data;
}

export async function fetchCustomerStats(id: string) {
  const response = await api.get(`${API_PATH}/${id}/stats`);
  return response.data;
}

// --------------

export async function createCustomer(data: CustomerForm) {
  const response = await api.post(API_PATH, data);
  return response.data;
}

export async function editCustomer(data: CustomerForm) {
  const { id, ...body } = data;

  const response = await api({
    method: 'PATCH',
    url: `${API_PATH}/${id}`,
    data: body,
  });
  return response.data;
}

export async function deleteCustomers({ id, canDeleteSales }: { id: string; canDeleteSales: boolean }) {
  const response = await api.delete(`${API_PATH}/${id}`, { params: { deleteSales: canDeleteSales } });
  return response.data;
}

export async function deleteManyCustomers({ ids, canDeleteSales }: { ids: string[]; canDeleteSales: boolean }) {
  const response = await api.delete(`${API_PATH}`, {
    data: { ids },
    params: { deleteSales: canDeleteSales },
  });
  return response.data;
}
