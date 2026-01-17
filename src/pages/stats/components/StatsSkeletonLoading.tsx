export function StatsSkeletonLoading() {
  return (
    <div className="mt-3">
      <div className="flex animate-pulse flex-wrap gap-4 pb-2">
        <div className="h-[90px] w-full min-w-64 flex-1 rounded-xl bg-neutral-200 p-4" />

        <div className="h-[90px] w-full min-w-64 flex-1 rounded-xl bg-neutral-200 p-4" />

        <div className="h-[90px] w-full min-w-64 flex-1 rounded-xl bg-neutral-200 p-4" />

        <div className="h-[90px] w-full min-w-64 flex-1 rounded-xl bg-neutral-200 p-4" />
      </div>

      <div className="min-h-[466px] mt-2 flex flex-col gap-4 *:flex-1 lg:flex-row">
        <div className="[min-w-[calc(3/4*100%-4px)] rounded-xl bg-neutral-200 p-4" />

        <div className="max-w-[calc(3/12*100%-12px)] rounded-xl bg-neutral-200 p-4" />
      </div>
    </div>
  );
}
