export default function SkeletonProfile() {
  return (
    <div className="h-full relative overflow-y-scroll p-8">
      <div className="animate-pulse flex flex-col">
        <div className="bg-slate-200 dark:bg-slate-700 h-4 rounded-sm mb-4 w-40" />
        <div className="bg-slate-200 dark:bg-slate-700 h-8 rounded-sm mb-4 w-80" />
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-sm w-1/2" />
      </div>
    </div>
  );
}
