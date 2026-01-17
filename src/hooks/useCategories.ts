import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../lib/api';
import {
  createCategory,
  editCategory,
  fetchCategories,
  fetchCategoriesAutocomplete,
  FetchCategoriesParams,
} from '../services/category';
import { CategoryItem } from '../types/category';

export function useFetchCategories({ fetchModels }: FetchCategoriesParams) {
  return useQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories({ fetchModels }),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success('Categoria registrada com sucesso!');

      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}

export function useCategoriesAutocomplete(props: FetchCategoriesParams) {
  const [enabled, setEnabled] = useState(false);

  const enableFetch = () => {
    setEnabled(true);
  };

  const query = useQuery<CategoryItem[]>({
    queryKey: ['categories', 'autocomplete', props],
    queryFn: () => fetchCategoriesAutocomplete(props),
    enabled,
  });

  return { ...query, enableFetch };
}

export function useEditCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCategory,
    onSuccess: (data: CategoryItem) => {
      toast.success('Categoria editada com sucesso!');

      queryClient.setQueryData(['categories'], (previous: CategoryItem[]) => {
        return previous.map((cat) => {
          if (cat.id === data.id) {
            return {
              ...cat,
              name: data.name,
            };
          } else {
            return cat;
          }
        });
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/categories/${id}`);
    },
    onSuccess: ({ data }) => {
      toast.success('Categoria excluída com sucesso.');

      queryClient.setQueryData(['categories'], (previous: CategoryItem[]) => {
        return previous.filter((category) => category.id !== data.id);
      });
    },
  });
}
