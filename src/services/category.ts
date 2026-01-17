import { api } from '../lib/api';
import { CreateCategoryForm, EditCategoryForm } from '../types/category';

const API_PATH = '/categories';

export interface FetchCategoriesParams {
  fetchModels?: boolean;
  search?: string;
}

export async function fetchCategories({ fetchModels }: FetchCategoriesParams) {
  const response = await api.get(`${API_PATH}?fetchModels=${fetchModels}`);
  return response.data;
}

export async function fetchCategoriesAutocomplete({ search, fetchModels }: FetchCategoriesParams) {
  const response = await api.get(`${API_PATH}/autocomplete`, { params: { search, fetchModels } });
  return response.data;
}

export async function createCategory(data: CreateCategoryForm) {
  const response = await api.post(API_PATH, data);
  return response.data;
}

export async function editCategory({ id, ...data }: EditCategoryForm) {
  const response = await api.patch(`${API_PATH}/${id}`, data);
  return response.data;
}
