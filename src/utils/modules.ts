import { ArrowsClockwiseIcon, ChartLineUpIcon, ShoppingBagIcon, StackIcon, UsersIcon } from '@phosphor-icons/react';

export const MODULES = [
  {
    key: 'customers',
    name: 'Clientes',
    description: 'Cadastro completo e histórico de compras',
    icon: UsersIcon,
    href: '/dashboard/customers',
  },
  {
    key: 'categories',
    name: 'Categorias e Modelos',
    description: 'Definição de grupos e tipos de produtos',
    icon: StackIcon,
    href: '/dashboard/categories',
  },
  {
    key: 'sales',
    name: 'Vendas',
    description: 'Lançamento de vendas e listagem geral',
    icon: ShoppingBagIcon,
    href: '/dashboard/sales',
  },
  {
    key: 'cashflow',
    name: 'Fluxo de Caixa',
    description: 'Controle financeiro e acesso à transações',
    icon: ArrowsClockwiseIcon,
    href: '/dashboard/cashflow',
  },
  {
    key: 'stats',
    name: 'Estatísticas',
    description: 'Visualização completa de gráficos e indicadores',
    icon: ChartLineUpIcon,
    href: '/dashboard/stats',
  },
];
