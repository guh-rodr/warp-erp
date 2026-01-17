import { PlusIcon } from '@phosphor-icons/react';
import { useCallback } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Label } from '../../../components/Label';
import { useDialog } from '../../../contexts/dialog/dialog-context';
import { useCreateCategory } from '../../../hooks/useCategories';
import { CreateCategoryForm } from '../../../types/category';
import { ModelItemForm } from './ModelItemForm';

export function CategoryForm() {
  const { closeDialog } = useDialog();
  const { mutate, isPending } = useCreateCategory();

  const { handleSubmit, control, register, formState } = useForm<CreateCategoryForm>();

  const {
    fields: models,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'models',
    keyName: 'uuid',
  });

  const onError = useCallback(() => {
    toast.error('Existem campos vazios ou inválidos.', { id: 'form-error' });
  }, []);

  const onSubmit: SubmitHandler<CreateCategoryForm> = (data) => {
    mutate(data, {
      onSuccess: () => {
        closeDialog();
      },
    });
  };

  const handleAddModel = () => {
    append({ name: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="h-full flex flex-col justify-between space-y-4">
      <div>
        <div>
          <Label htmlFor="name">Nome da categoria</Label>
          <Input
            id="name"
            {...register('name', {
              required: 'O nome da categoria é obrigatório.',
            })}
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between pb-2">
            <Label htmlFor="models">Modelos</Label>
            <button
              type="button"
              onClick={handleAddModel}
              className="text-emerald-500 text-sm whitespace-nowrap flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <PlusIcon weight="bold" />
              Adicionar modelo
            </button>
          </div>

          {models.map((item, index) => (
            <ModelItemForm key={item.uuid} index={index} control={control} onRemove={() => remove(index)} />
          ))}
        </div>
      </div>

      <div>
        <Button type="submit" disabled={!formState.isDirty} isLoading={isPending} className="w-full mt-4 text-center">
          Criar categoria
        </Button>
      </div>
    </form>
  );
}
