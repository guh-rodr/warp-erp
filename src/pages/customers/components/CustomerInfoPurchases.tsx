import { ArrowSquareOutIcon, CaretRightIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Card } from '../../../components/Card';
import { ErrorNotification } from '../../../components/ErrorNotification';
import { LoadingNotification } from '../../../components/LoadingNotification';
import { formatToReal } from '../../../functions/currency';
import { formatDate } from '../../../functions/formatDate';
import { useFetchCustomerPurchases } from '../../../hooks/useCustomers';

interface Props {
  id: string;
}

export function CustomerInfoPurchases({ id }: Props) {
  const [expandedPurchaseId, setExpandedPurchaseId] = useState('');

  const { data: purchases, isLoading, isError, isSuccess } = useFetchCustomerPurchases({ id });

  const handleExpandPurchase = (id: string) => {
    if (id === expandedPurchaseId) {
      setExpandedPurchaseId('');
    } else {
      setExpandedPurchaseId(id);
    }
  };

  return (
    <div className="mt-4 space-y-1">
      {isLoading && <LoadingNotification />}

      {isError && <ErrorNotification />}

      {isSuccess && !!purchases && (
        <div className="space-y-3">
          {purchases.length ? (
            purchases!.map((purchase) => (
              <Card key={purchase.id} className="p-0">
                <div
                  key={purchase.id}
                  className="flex text-sm p-2.5 hover:bg-neutral-100/70 transition-colors cursor-pointer"
                  onClick={() => handleExpandPurchase(purchase.id)}
                >
                  {purchase.status === 'paid' ? (
                    <span className="bg-emerald-200/20 border border-emerald-200 rounded-lg p-2 block w-fit text-emerald-300">
                      <ShoppingCartIcon size={24} />
                    </span>
                  ) : (
                    <span className="bg-amber-200/20 border border-amber-200 rounded-lg p-2 block w-fit text-amber-300">
                      <ShoppingCartIcon size={24} />
                    </span>
                  )}

                  <div className="flex items-center flex-1 justify-between">
                    <div className="flex flex-col justify-between ml-2">
                      <div className="text-neutral-800 font-medium flex gap-2">{formatToReal(purchase.total)}</div>

                      <div className="text-neutral-500">{formatDate(purchase.purchasedAt)}</div>
                    </div>

                    <CaretRightIcon
                      weight="bold"
                      size={14}
                      className={`text-neutral-500 ${expandedPurchaseId === purchase.id ? 'rotate-90' : ''} transition-all`}
                    />
                  </div>
                </div>
                {expandedPurchaseId === purchase.id && (
                  <div className="p-2.5 pt-0">
                    <div className="grid grid-cols-3 gap-y-3 w-full border-y border-neutral-200 py-2 px-1">
                      <div className="flex flex-col text-sm text-neutral-500">
                        Qntd. Itens
                        <span className="text-black">{purchase.itemCount}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        Valor total
                        <span className="text-black">{formatToReal(purchase.total)}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        Valor recebido
                        <span className="text-black">{formatToReal(purchase.totalReceived)}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        Qntd. Parcelas
                        <span className="text-black">{purchase.installmentCount}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        Lucro total
                        <span className="text-black">{formatToReal(purchase.profit)}</span>
                      </div>

                      <div className="flex flex-col text-sm text-neutral-500">
                        Lucro recebido
                        <span className="text-black">{formatToReal(purchase.profitReceived)}</span>
                      </div>
                    </div>

                    <Link
                      to={`/sales?id=${purchase.id}`}
                      target="_blank"
                      className="flex w-fit items-center gap-1 mt-2 text-sm text-emerald-500 underline underline-offset-2 hover:opacity-70 transition-all"
                    >
                      Ver informações detalhadas <ArrowSquareOutIcon weight="bold" />
                    </Link>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <span className="text-center text-base text-neutral-400 pt-4 px-4 block">
              Nenhuma compra registrada, comece adicionando uma
            </span>
          )}
        </div>
      )}
    </div>
  );
}
