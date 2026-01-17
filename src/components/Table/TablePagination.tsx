import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

interface Props {
  pageCount: number;
  pageIndex: number;
  canClickPrev: boolean;
  canClickNext: boolean;
  setPage: (newPage: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export function TablePagination({
  pageCount,
  pageIndex,
  canClickPrev,
  canClickNext,
  setPage,
  goToNextPage,
  goToPreviousPage,
}: Props) {
  const handleClickPrevious = () => {
    if (!canClickPrev) return;

    goToPreviousPage();
  };
  const handleClickNext = () => {
    if (!canClickNext) return;

    goToNextPage();
  };

  const maxPagesToShow = 3;

  const getPageNumbers = () => {
    let startPage = Math.max(1, pageIndex - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="flex gap-2 float-right">
      <button
        className={`size-8 grid place-items-center rounded-lg border border-neutral-200 bg-white shadow-sm ${!canClickPrev ? 'opacity-60 cursor-default' : ''}`}
        onClick={handleClickPrevious}
      >
        <CaretLeftIcon weight="bold" />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={`text-sm font-medium size-8 grid place-items-center rounded-lg border border-neutral-200 shadow-sm ${pageIndex === page - 1 ? 'bg-emerald-400 text-white' : 'bg-white'}`}
        >
          {page}
        </button>
      ))}

      <button
        className={`size-8 grid place-items-center rounded-lg border border-neutral-200 bg-white shadow-sm ${!canClickNext ? 'opacity-60 cursor-default' : ''}`}
        onClick={handleClickNext}
      >
        <CaretRightIcon weight="bold" />
      </button>
    </div>
  );
}
