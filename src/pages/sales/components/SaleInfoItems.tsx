import { CaretRightIcon, TShirtIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Card } from '../../../components/Card';
import { ErrorNotification } from '../../../components/ErrorNotification';
import { LoadingNotification } from '../../../components/LoadingNotification';
import { formatToReal } from '../../../functions/currency';
import { useFetchSaleItems } from '../../../hooks/useSales';
import { SaleRow } from '../../../types/sale';
import { COLORS } from '../../../utils/colors';
import { PRINTS } from '../../../utils/prints';

interface Props {
  id: SaleRow['id'];
}

export function SaleInfoItems({ id }: Props) {
  const { data, isLoading, isSuccess, isError } = useFetchSaleItems(id);

  const [expandedItemId, setExpandedItemId] = useState('');

  const handleExpandSale = (itemId: string) => {
    if (itemId === expandedItemId) {
      setExpandedItemId('');
    } else {
      setExpandedItemId(itemId);
    }
  };

  return (
    <div className="mt-4 space-y-1">
      {isLoading && <LoadingNotification />}

      {isError && <ErrorNotification />}

      {isSuccess && !!data && (
        <div className="space-y-6">
          {data.map((item) => {
            const print = PRINTS.find((p) => p.value === item.print);
            const color = COLORS.find((c) => c.value === item.color);

            return (
              <Card key={item.id} className="p-0">
                <div
                  className="flex text-sm p-2.5 hover:bg-neutral-100/70 transition-colors cursor-pointer"
                  onClick={() => handleExpandSale(item.id!)}
                >
                  <span className="bg-gray-200/20 border border-gray-200 rounded-lg p-2 block w-fit text-gray-300">
                    <TShirtIcon size={24} />
                  </span>

                  <div className="flex items-center flex-1 justify-between">
                    <div className="flex flex-col justify-between ml-2">
                      <span className="pt-0.5">
                        <strong className="font-semibold">{item.categoryName}</strong> - {item.modelName}
                      </span>

                      <div className="text-neutral-500">{formatToReal(item.salePrice)}</div>
                    </div>

                    <CaretRightIcon
                      weight="bold"
                      size={14}
                      className={`text-neutral-500 ${expandedItemId === item.id ? 'rotate-90' : ''} transition-all`}
                    />
                  </div>
                </div>
                {expandedItemId === item.id && (
                  <div className="p-2.5 pt-0">
                    <div className="grid grid-cols-3 gap-y-3 w-full border-t border-neutral-200 py-2 px-1">
                      <div className="flex flex-col text-sm text-neutral-500">
                        Tamanho
                        <span className="text-black">{item.size?.toUpperCase() || 'N/A'}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        Estampa
                        <span className="text-black">{print?.label || 'N/A'}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        Cor
                        <span className="text-black">{color?.label || 'N/A'}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        P. de compra
                        <span className="text-black">{formatToReal(item.costPrice)}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        P. de venda
                        <span className="text-black">{formatToReal(item.salePrice)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
