import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { FilterForm } from '../components/Filter/Filter';
import {
  createTransaction,
  deleteManyTransactions,
  deleteTransaction,
  editTransaction,
  fetchTableTransaction,
} from '../services/transaction';
import { TransactionResponse } from '../types/transaction';
import { useTableParams } from './useTableParams';

export function useFetchTableTransactions(filter: FilterForm) {
  const { params } = useTableParams();

  return useQuery<TransactionResponse>({
    queryKey: ['transactions/list', { ...params, filter }],
    queryFn: () => fetchTableTransaction(params, filter),
  });
}

// --------------

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success('Transação registrada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['transactions/list'] });
    },
  });
}

export function useEditTransaction() {
  const queryClient = useQueryClient();

  const {
    params: { page },
  } = useTableParams();

  return useMutation({
    mutationFn: editTransaction,
    onSuccess: (data) => {
      toast.success('Transação editada com sucesso!');

      queryClient.setQueriesData({ queryKey: ['transactions/list', { page }] }, (oldData: TransactionResponse) => {
        return {
          rows: oldData.rows.map((transaction) => {
            if (transaction.id === data.id) {
              return data;
            }
            return transaction;
          }),
        };
      });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    params: { page },
  } = useTableParams();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success('Transação removido com sucesso!');

      const queries = queryClient.getQueriesData<TransactionResponse>({
        queryKey: ['transactions/list', { page }],
        type: 'active',
      });

      const isLastItemOnPage = queries.some(([, data]) => data?.rows?.length === 1);
      const canGoBackPage = page > 1 && isLastItemOnPage;

      if (canGoBackPage) {
        queryClient
          .invalidateQueries({
            queryKey: ['transactions/list', { page: page - 1 }],
          })
          .then(() => {
            navigate(`?page=${page - 1}`);
          });
      } else {
        queryClient.invalidateQueries({ queryKey: ['transactions/list'] });
      }
    },
  });
}

export function useDeleteManyTransactions() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    params: { page },
  } = useTableParams();

  return useMutation({
    mutationFn: deleteManyTransactions,
    onSuccess: () => {
      toast.success('Transações removidas com sucesso!');

      const queries = queryClient.getQueriesData<TransactionResponse>({
        queryKey: ['transactions/list', { page }],
        type: 'active',
      });

      const isLastItemOnPage = queries.some(([, data]) => data?.rows?.length === 1);
      const canGoBackPage = page > 1 && isLastItemOnPage;

      if (canGoBackPage) {
        queryClient
          .invalidateQueries({
            queryKey: ['transactions/list', { page: page - 1 }],
          })
          .then(() => {
            navigate(`?page=${page - 1}`);
          });
      } else {
        queryClient.invalidateQueries({ queryKey: ['transactions/list'] });
      }
    },
  });
}
