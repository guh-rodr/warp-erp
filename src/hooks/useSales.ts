import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { FilterForm } from '../components/Filter/Filter';
import {
  createSale,
  createSaleInstallment,
  deleteSaleInstallment,
  deleteSales,
  fetchSaleInstallments,
  fetchSaleItems,
  fetchSaleOverview,
  fetchTableSales,
} from '../services/sale';
import { SaleInstallment, SaleInstallmentForm, SaleItem, SaleOverview, SaleResponse, SaleRow } from '../types/sale';
import { useTableParams } from './useTableParams';

export function useFetchTableSales(filter: FilterForm) {
  const { params } = useTableParams();

  return useQuery<SaleResponse>({
    queryKey: ['sales/list', { ...params, filter }],
    queryFn: () => fetchTableSales(params, filter),
  });
}

// --------------

export function useFetchSaleOverview(id: string) {
  const query = useQuery<SaleOverview>({
    queryKey: ['sales', id, 'overview'],
    queryFn: () => fetchSaleOverview(id),
  });

  return query;
}

export function useFetchSaleItems(id: string) {
  const query = useQuery<SaleItem[]>({
    queryKey: ['sales', id, 'items'],
    queryFn: () => fetchSaleItems(id),
  });

  return query;
}

export function useFetchSaleInstallments(id: string) {
  const query = useQuery<SaleInstallment[]>({
    queryKey: ['sales', id, 'installments'],
    queryFn: () => fetchSaleInstallments(id),
  });

  return query;
}

// --------------

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      toast.success('Venda registrada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['sales/list'] });
    },
  });
}

export function useDeleteSale() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    params: { page },
  } = useTableParams();

  return useMutation({
    mutationFn: deleteSales,
    onSuccess: () => {
      toast.success('Venda removida com sucesso!');

      const queries = queryClient.getQueriesData<SaleResponse>({
        queryKey: ['sales/list', { page }],
        type: 'active',
      });

      const isLastItemOnPage = queries.some(([, data]) => data?.rows?.length === 1);
      const canGoBackPage = page > 1 && isLastItemOnPage;

      if (canGoBackPage) {
        queryClient.invalidateQueries({ queryKey: ['sales/list', { page: page - 1 }] }).then(() => {
          navigate(`?page=${page - 1}`);
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ['sales/list'] });
      }
    },
  });
}

// --------------

export function useCreateSaleInstallment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ saleId, data }: { saleId: SaleRow['id']; data: SaleInstallmentForm }) =>
      createSaleInstallment(saleId, data),
    onSuccess: async (data: SaleInstallmentForm, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['sales', variables.saleId, 'info'],
      });

      toast.success('Parcela registrada com sucesso!');

      queryClient.setQueryData(['sales', variables.saleId, 'installments'], (previous: SaleInstallmentForm[]) => {
        return [...previous, data];
      });
    },
  });
}

interface SaleInstallmentDeleteMutation {
  saleId: SaleRow['id'];
  installmentId: SaleInstallment['id'];
}

export function useDeleteSaleInstallment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ installmentId }: SaleInstallmentDeleteMutation) => deleteSaleInstallment(installmentId),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['sales', variables.saleId, 'info'],
      });

      toast.success('Parcela excluída com sucesso!');

      queryClient.setQueryData(['sales', variables.saleId, 'installments'], (previous: SaleInstallment[]) => {
        return previous.filter((installment) => installment.id !== variables.installmentId);
      });
    },
  });
}
