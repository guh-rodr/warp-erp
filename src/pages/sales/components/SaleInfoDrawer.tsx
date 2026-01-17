import { useState } from 'react';
import { SaleRow } from '../../../types/sale';
import { SaleInfoInstallments } from './SaleInfoInstallments';
import { SaleInfoItems } from './SaleInfoItems';
import { SaleInfoOverview } from './SaleInfoOverview';

interface Props {
  id: SaleRow['id'];
}

type Tab = 'overview' | 'items' | 'installments';

export function SaleInfoDrawer({ id }: Props) {
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
          onClick={() => setTab('items')}
          data-enabled={tab === 'items'}
          className="border-b-2 py-1 border-transparent data-enabled:border-black data-enabled:text-black"
        >
          Itens
        </button>

        <button
          type="button"
          onClick={() => setTab('installments')}
          data-enabled={tab === 'installments'}
          className="border-b-2 py-1 border-transparent data-enabled:border-black data-enabled:text-black"
        >
          Parcelas
        </button>
      </div>

      {tab === 'overview' && <SaleInfoOverview id={id} />}

      {tab === 'items' && <SaleInfoItems id={id} />}

      {tab === 'installments' && <SaleInfoInstallments id={id} />}
    </div>
  );
}
