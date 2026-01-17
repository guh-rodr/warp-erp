import { Button } from '../../../components/Button';
import { useDialog } from '../../../contexts/dialog/dialog-context';
import { useDeleteSaleInstallment } from '../../../hooks/useSales';
import { SaleInstallment, SaleRow } from '../../../types/sale';

interface Props {
  saleId: SaleRow['id'];
  installmentId: SaleInstallment['id'];
}

export function InstallmentDeleteModal({ saleId, installmentId }: Props) {
  const { closeDialog } = useDialog();

  const { mutate, isPending } = useDeleteSaleInstallment();

  const handleConfirm = () => {
    mutate(
      { saleId, installmentId },
      {
        onSuccess: () => {
          closeDialog();
        },
      },
    );
  };

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <p>Tem certeza que deseja remover essa parcela?</p>
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
