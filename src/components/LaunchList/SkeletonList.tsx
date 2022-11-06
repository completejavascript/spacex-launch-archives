export default function SkeletonList() {
  return (
    <div className="h-full relative overflow-y-scroll px-8">
      <div className="animate-pulse flex flex-col">
        <div className="sticky top-0">
          <div className="h-8 bg-white dark:bg-slate-900" />
          <div className="h-4 bg-white dark:bg-slate-900 relative w-full">
            <div className="rounded-md py-5 px-3 bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900" />
        </div>

        <div className="mt-5">
          <div className="bg-slate-200 dark:bg-slate-700 h-4 rounded-sm mb-4" />
          <div className="space-y-2">
            <div className="border-l border-slate-100 dark:border-slate-800">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 ml-4 rounded-sm" />
            </div>
            <div className="border-l border-slate-100 dark:border-slate-800">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 ml-4 rounded-sm" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="bg-slate-200 dark:bg-slate-700 h-4 rounded-sm mb-4" />
          <div className="space-y-2">
            <div className="border-l border-slate-100 dark:border-slate-800">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 ml-4 rounded-sm" />
            </div>
            <div className="border-l border-slate-100 dark:border-slate-800">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 ml-4 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
