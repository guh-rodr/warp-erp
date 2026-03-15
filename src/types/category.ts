export interface CategoryItem {
  id: string;
  name: string;
}

export interface CreateCategoryForm {
  name: string;
}

export type EditCategoryForm = Pick<CategoryItem, 'id' | 'name'>;
