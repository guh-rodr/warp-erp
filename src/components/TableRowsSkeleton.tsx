interface Props {
  columnCount: number;
}

export function TableRowsSkeleton({ columnCount }: Props) {
  const colList = [...Array(columnCount).keys()];
  const rowList = [...Array(columnCount).keys()];

  return rowList.map((rowIdx) => (
    <tr key={rowIdx} className="bg-white">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
        <span className="w-5 h-5 rounded-lg block bg-neutral-200 animate-pulse" />
      </td>

      {colList.map((colIdx) => (
        <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
          <span className="px-4 py-2 rounded-lg block bg-neutral-200 animate-pulse" />
        </td>
      ))}
    </tr>
  ));
}
