import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { flexRender, Header, Table } from '@tanstack/react-table';
import { MouseEvent } from 'react';

interface Props<TData> {
  table: Table<TData>;
}

export function TableHeader<TData>({ table }: Props<TData>) {
  const handleClickSort = (event: MouseEvent<HTMLDivElement>, header: Header<TData, unknown>) => {
    if (table.getRowCount() <= 1) return;

    const sortHandler = header.column.getToggleSortingHandler();
    sortHandler?.(event);
  };

  return (
    <thead className="bg-white">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            const canSort = header.column.getCanSort();
            const sortState = header.column.getIsSorted();

            return (
              <th
                key={header.id}
                style={{ width: header.getSize() }}
                className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider select-none"
              >
                <div
                  className={`flex items-center ${index === headerGroup.headers.length - 1 ? 'justify-center' : ''} gap-1.5 transition-colors ${canSort ? 'cursor-pointer hover:text-black' : ''}`}
                  onClick={(event) => handleClickSort(event, header)}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}

                  {canSort && (
                    <span className="flex flex-col justify-center text-neutral-400 -mt-1">
                      <CaretUpIcon
                        weight="bold"
                        size={10}
                        className={`mt-[3px] ${sortState === 'asc' ? 'text-black' : ''}`}
                      />
                      <CaretDownIcon
                        weight="bold"
                        size={10}
                        className={`-mt-[3px] ${sortState === 'desc' ? 'text-black' : ''}`}
                      />
                    </span>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
