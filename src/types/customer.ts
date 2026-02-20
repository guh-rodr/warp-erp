import { SaleStatus } from './sale';

interface CustomerBase {
  name: string;
  note: string | null;
  phone: string | null;
}

export interface CustomerRow extends CustomerBase {
  id: string;
  totalSpent: number;
  debt: number;
  lastPurchaseAt: string | null;
}

export interface CustomerResponse {
  pageCount: number;
  rowCount: number;
  rows: CustomerRow[];
}

export type CustomerAutocomplete = Pick<CustomerRow, 'id' | 'name'>;

export type CustomerOverview = Pick<CustomerRow, 'name' | 'phone' | 'lastPurchaseAt'>;

export interface CustomerForm extends CustomerBase {
  id?: string;
}

export interface CustomerOverviewResponse {
  name: string;
  phone: string | null;
  lastPurchaseAt: string | null;
}

export interface CustomerSaleItem {
  id: string;
  itemCount: number;
  installmentCount: number;
  status: SaleStatus;
  purchasedAt: string;
  total: number;
  totalReceived: number;
  profit: number;
  profitReceived: number;
}

export interface CustomerStatsResponse {
  metrics: {
    totalPaid: number;
    saleCount: number;
    debt: number;
    avgTicket: number;
  };
  preferences: {
    topColor: string | null;
    topSize: string | null;
    topCategory: string | null;
  };
}
