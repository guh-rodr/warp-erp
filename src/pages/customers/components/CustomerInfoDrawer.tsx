import { useState } from 'react';
import { CustomerRow } from '../../../types/customer';
import { CustomerInfoOverview } from './CustomerInfoOverview';
import { CustomerInfoSales } from './CustomerInfoSales';
import { CustomerInfoStats } from './CustomerInfoStats';

interface Props {
  id: CustomerRow['id'];
}

type Tab = 'overview' | 'sales' | 'stats';

export function CustomerInfoDrawer({ id }: Props) {
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <div>
      <div className="flex gap-5 border-b pt-4 text-neutral-600 border-neutral-300">
        <button
          type="button"
          onClick={() => setTab('overview')}
          data-enabled={tab === 'overview'}
          className="border-b-2 py-1 border-transparent data-enabled:border-black data-enabled:text-black"
        >
          Geral
        </button>

        <button
          type="button"
          onClick={() => setTab('sales')}
          data-enabled={tab === 'sales'}
          className="border-b-2 py-1 border-transparent data-enabled:border-black data-enabled:text-black"
        >
          Compras
        </button>

        <button
          type="button"
          onClick={() => setTab('stats')}
          data-enabled={tab === 'stats'}
          className="border-b-2 py-1 border-transparent data-enabled:border-black data-enabled:text-black"
        >
          Estatísticas
        </button>
      </div>

      {tab === 'overview' && <CustomerInfoOverview id={id} />}

      {tab === 'sales' && <CustomerInfoSales id={id} />}

      {tab === 'stats' && <CustomerInfoStats id={id} />}
    </div>
  );
}
