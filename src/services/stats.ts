import { api } from '../lib/api';

const API_PATH = '/stats';

export interface FetchStatsParams {
  period: 'today' | 'week' | 'month' | 'year' | 'custom';
  method: 'cash_basis' | 'accrual_basis';
  startDate: string;
  endDate: string;
}

export async function fetchStats(params: FetchStatsParams) {
  const response = await api.get(API_PATH, { params });
  return response.data;
}
