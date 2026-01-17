import { SmileySadIcon } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../../../components/Chart';
import { convertToDecimal } from '../../../functions/currency';
import { FetchStatsParams } from '../../../services/stats';
import { StatsResponse } from '../../../types/stats';

interface Props {
  method: FetchStatsParams['method'];
  chart: StatsResponse['metricsChart'];
}

export function ValuesChart({ method, chart }: Props) {
  const chartConfig = useMemo(() => {
    return {
      col_1: {
        label: method === 'cash_basis' ? 'Entradas' : 'Faturamento',
        color: '#00d492',
        // color: '#7BAAF7',
      },
      col_2: {
        label: method === 'cash_basis' ? 'Saídas' : 'Custos',
        color: '#ff6467',
        // color: '#B8D4F5',
      },
    } satisfies ChartConfig;
  }, [method]);

  if (!chart || chart.length === 0) {
    return (
      <div className="min-h-[466px] w-full flex gap-4 flex-col items-center justify-center bg-neutral-100/60 text-neutral-400 rounded-md">
        <SmileySadIcon weight="duotone" size={120} className="text-neutral-300" />
        <p>Sem dados para exibir com esse filtro.</p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chart}>
        <ChartTooltip
          cursor={{ fillOpacity: '40%' }}
          content={
            <ChartTooltipContent
              className="min-w-[180px]"
              formatter={(value, name) => (
                <>
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                    style={{ background: `var(--color-${name})` }}
                  />

                  <span className="text-muted-foreground leading-none">
                    {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  </span>

                  <div className="ml-auto flex items-baseline gap-0.5 p-0 font-mono font-medium tabular-nums text-foreground leading-none">
                    {convertToDecimal(value as number).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                </>
              )}
            />
          }
        />

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <Bar barSize={14} dataKey="col_1" fill="var(--color-col_1)" radius={[8, 8, 0, 0]} />
        <Bar barSize={14} dataKey="col_2" fill="var(--color-col_2)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
