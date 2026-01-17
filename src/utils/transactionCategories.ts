export const TRANSACTION_CATEGORIES = {
  inflow: [
    { label: 'Receita de Vendas', value: 'SALES_REVENUE' },
    { label: 'Aporte de Capital', value: 'CAPITAL_INJECTION' },
    { label: 'Empréstimo (Recebido)', value: 'LOAN_PROCEEDS' },
    { label: 'Rendimentos / Outros', value: 'OTHER_INCOME' },
  ],
  outflow: [
    { label: 'Despesa Operacional', value: 'OPERATIONAL_EXPENSE' },
    { label: 'Compra de Estoque', value: 'INVENTORY_ASSET' },
    { label: 'Salário / Pessoal', value: 'PERSONNEL_EXPENSE' },
    { label: 'Impostos e Taxas', value: 'TAX_EXPENSE' },
    { label: 'Equipamentos e Investimentos', value: 'FIXED_ASSET' },
    { label: 'Pagamento de Empréstimo', value: 'LOAN_PAYMENT' },
  ],
};
