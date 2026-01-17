interface CashBasisCards {
  receipt: number;
  inflow: number;
  outflow: number;
  periodResult: number;
  balance: number;
}

interface AccrualBasisCards {
  saleCount: number;
  invoicing: number;
  avgTicket: number;
  grossProfit: number;
  netProfit: number;
}

type Cards = Partial<CashBasisCards> & Partial<AccrualBasisCards>;

interface Category {
  category: string;
  count: number;
}

export interface StatsResponse {
  cards: Cards;
  metricsChart: Record<string, { col_1: number; col_2: number }>[];
  topCategories: Category[];
}
