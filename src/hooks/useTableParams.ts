import { useSearchParams } from 'react-router';

export interface TableParams {
  page: number;
  search: string;
  sortBy: string | null;
  sortDir: string | null;
}

export function useTableParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const search = searchParams.get('search')?.toLowerCase() || '';

  const sortBy = searchParams.get('sortBy');
  const sortDir = searchParams.get('sortDir');

  const setParams = (params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    });

    setSearchParams(newSearchParams);
  };

  const params: TableParams = {
    page,
    search,
    sortBy,
    sortDir,
  };

  return { params, setParams };
}
