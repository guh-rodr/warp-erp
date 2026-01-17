import { flexRender, Row, Table } from '@tanstack/react-table';

interface Props<TData> {
  table: Table<TData>;
  isError: boolean;
  columnsLength: number;
  refetch: () => void;
}

export function TableBody<TData>({ table, isError, columnsLength, refetch }: Props<TData>) {
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columnsLength}
            className={`px-6 py-6 text-center text-base ${isError ? 'text-red-500' : 'text-neutral-500'}`}
          >
            {isError ? (
              <>
                Ocorreu um erro ao buscar os dados,{' '}
                <button type="button" onClick={() => refetch()} className="underline underline-offset-2">
                  tente novamente
                </button>
              </>
            ) : (
              'Nenhum dado para exibir'
            )}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white divide-y divide-neutral-200">
      {rows.map((row: Row<TData>) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
