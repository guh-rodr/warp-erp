import { Button } from '../../../components/Button';
import { useDialog } from '../../../contexts/dialog/dialog-context';
import { useDeleteModel } from '../../../hooks/useModels';

interface Props {
  categoryId: string;
  modelId: string;
  modelName: string;
}

export function ModelDeleteModal({ categoryId, modelId, modelName }: Props) {
  const { closeDialog } = useDialog();
  const { mutate, isPending } = useDeleteModel();

  const handleConfirm = () => {
    mutate(
      { categoryId, modelId },
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
        <p>
          Tem certeza que deseja remover <strong>{modelName}</strong>?
        </p>

        <span className="bg-amber-200/50 block h- px-2 text-amber-600 py-2 rounded-md border-l-3 border-amber-500 text-sm">
          Todos os dados e estatísticas relacionados a esse modelo serão automaticamente removidos ao confirmar.
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
