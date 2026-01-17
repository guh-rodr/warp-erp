import { useQuery } from '@tanstack/react-query';
import { fetchStats, FetchStatsParams } from '../services/stats';
import { StatsResponse } from '../types/stats';

export function useFetchStats(params: FetchStatsParams) {
  return useQuery<StatsResponse>({
    queryKey: ['sales/list', { ...params }],
    queryFn: () => fetchStats(params),
  });
}
