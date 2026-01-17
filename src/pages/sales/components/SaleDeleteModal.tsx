import { Button } from '../../../components/Button';
import { useDialog } from '../../../contexts/dialog/dialog-context';
import { useDeleteSale } from '../../../hooks/useSales';
import { SaleRow } from '../../../types/sale';

interface Props {
  ids: SaleRow['id'][];
  onDelete?: () => void;
}

export function SaleDeleteModal({ ids, onDelete }: Props) {
  const { closeDialog } = useDialog();
  const { mutate, isPending } = useDeleteSale();

  const isManyDelete = ids.length > 1;

  const handleConfirm = () => {
    mutate(ids, {
      onSuccess: () => {
        onDelete?.();
        closeDialog();
      },
    });
  };

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <p>Tem certeza que deseja remover {isManyDelete ? `${ids.length} vendas?` : 'essa venda?'}</p>

        <span className="bg-amber-200/50 block px-2 text-amber-600 py-2 rounded-md border-l-3 border-amber-500 text-sm">
          Todos os dados e estatísticas relacionados a essa venda serão automaticamente removidos ao confirmar.
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 !space-y-0">
        <Button type="button" variant="outline" onClick={() => closeDialog()}>
          Cancelar
        </Button>

        <Button type="button" isLoading={isPending} onClick={handleConfirm}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
