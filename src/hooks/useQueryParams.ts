import { useSearchParams } from 'react-router';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const search = searchParams.get('search')?.toLowerCase() || '';

  const setPage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(newPage));
    setSearchParams(newSearchParams);
  };

  const setSearch = (newValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('search', newValue);
    setSearchParams(newSearchParams);
  };

  const setQueryParams = (params: Record<string, string | number | null>) => {
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

  return {
    page,
    search,
    setPage,
    setSearch,
    queryParams: searchParams,
    setQueryParams,
  };
}
