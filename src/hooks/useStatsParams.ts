import { useSearchParams } from 'react-router';
import { getTodayDate } from '../lib/date';
import { FetchStatsParams } from '../services/stats';

const VALID_PERIODS: FetchStatsParams['period'][] = ['today', 'week', 'month', 'year'];
const VALID_METHODS: FetchStatsParams['method'][] = ['cash_basis', 'accrual_basis'];

function getValidParam<T extends readonly string[]>(value: string | null, validValues: T) {
  return value && (validValues as readonly string[]).includes(value) ? (value as T[number]) : null;
}

export function useStatsParams(): FetchStatsParams {
  const [searchParams] = useSearchParams();
  const currentDate = getTodayDate();

  const period = getValidParam(searchParams.get('period'), VALID_PERIODS) || 'today';
  const method = getValidParam(searchParams.get('method'), VALID_METHODS) || 'cash_basis';

  const startDate = searchParams.get('startDate') ?? currentDate;
  const endDate = searchParams.get('endDate') ?? currentDate;

  return {
    period,
    method,
    startDate,
    endDate,
  };
}
