import { CustomerRow } from './customer';

export type SaleStatus = 'paid' | 'pending';

interface SaleItemBase {
  color: string;
  print: string;
  size: string;
  costPrice: number;
  salePrice: number;
}

export interface SaleItemForm extends SaleItemBase {
  modelId: string;
}

export interface SaleItem extends SaleItemBase {
  id: string;
  categoryName: string;
  modelName: string;
}

export interface SaleInstallmentForm {
  value: number;
  paidAt: string;
}

export interface SaleInstallment extends SaleInstallmentForm {
  id: string;
}

export interface SaleRow {
  id: string;
  status: SaleStatus;
  purchasedAt: string;
  itemCount: number;
  total: number;
  profit: number;
  customer: Pick<CustomerRow, 'id' | 'name'> | null;
}

export interface SaleResponse {
  pageCount: number;
  rowCount: number;
  rows: SaleRow[];
}

export interface SaleForm {
  customerId?: string;
  purchasedAt: string;
  items: SaleItemForm[];
  installment: SaleInstallmentForm | null;
}

export interface SaleOverview {
  customer: Pick<CustomerRow, 'id' | 'name'> | null;
  status: SaleStatus;
  purchasedAt: string;
  total: number;
  totalReceived: number;
  profit: number;
  profitReceived: number;
}
