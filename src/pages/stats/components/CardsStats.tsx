import { ChartLineUpIcon, CurrencyDollarIcon, HandArrowDownIcon, StackIcon, TicketIcon } from '@phosphor-icons/react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useSearchParams } from 'react-router';
import { formatToReal } from '../../../functions/currency';
import { getTodayDate } from '../../../lib/date';
import { FetchStatsParams } from '../../../services/stats';
import { StatsResponse } from '../../../types/stats';
import { CardItem } from './CardItem';

interface Props {
  cards: StatsResponse['cards'];
  method: FetchStatsParams['method'];
}

export function CardsStats({ cards, method }: Props) {
  const [searchParams] = useSearchParams();
  const endDate = searchParams.get('endDate') || getTodayDate();

  const formattedEndAt = format(parseISO(endDate), "dd 'de' MMM, yyyy", {
    locale: ptBR,
  });

  if (method === 'accrual_basis') {
    return (
      <>
        <CardItem icon={StackIcon} label="Vendas realizadas" value={cards.saleCount || 0} />

        <CardItem icon={TicketIcon} label="Ticket médio" value={formatToReal(cards.avgTicket || 0)} />

        <CardItem icon={CurrencyDollarIcon} label="Faturamento" value={formatToReal(cards.invoicing || 0)} />

        <CardItem icon={ChartLineUpIcon} label="Lucro bruto" value={formatToReal(cards.grossProfit || 0)} />

        <CardItem icon={HandArrowDownIcon} label="Lucro líquido" value={formatToReal(cards.netProfit || 0)} />
      </>
    );
  }

  if (method === 'cash_basis') {
    return (
      <>
        <CardItem icon={HandArrowDownIcon} label="Recebimento" value={formatToReal(cards.receipt || 0)} />

        <CardItem icon={TicketIcon} label="Total em Entradas" value={formatToReal(cards.inflow || 0)} />

        <CardItem icon={CurrencyDollarIcon} label="Total em Saídas" value={formatToReal(cards.outflow || 0)} />

        <CardItem icon={ChartLineUpIcon} label="Resultado do Período" value={formatToReal(cards.periodResult || 0)} />

        <CardItem
          icon={ChartLineUpIcon}
          label={`Saldo até ${formattedEndAt}`}
          value={formatToReal(cards.balance || 0)}
        />
      </>
    );
  }
}
