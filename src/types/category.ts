import { ModelItem, ModelItemForm } from './model';

export interface CategoryItem {
  id: string;
  name: string;
  models: ModelItem[];
}

export interface CreateCategoryForm {
  name: string;
  models: ModelItemForm[];
}

export type EditCategoryForm = Pick<CategoryItem, 'id' | 'name'>;
