import { ItemListSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <main className="flex-1 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
        <div className="space-y-12">
          {/* Professional Skeleton Header */}
          <div className="pb-8 border-b border-slate-100 space-y-4 animate-pulse">
            <div className="h-10 w-48 rounded-lg bg-slate-100" />
            <div className="h-4 w-96 rounded bg-slate-50" />
          </div>

          <div className="pt-2">
            <ItemListSkeleton count={12} />
          </div>
        </div>
      </div>
    </main>
  );
}
