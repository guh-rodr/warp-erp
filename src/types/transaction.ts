export interface TransactionRow {
  id: string;
  flow: 'inflow' | 'outflow';
  saleId?: string;
  description: string;
  category: string;
  date: string;
  value: number;
}

export type TransactionFormProps = Omit<TransactionRow, 'id' | 'saleId'>;

export interface TransactionResponse {
  rows: TransactionRow[];
  pageCount: number;
  rowCount: number;
}
