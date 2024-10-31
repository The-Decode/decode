import { Skeleton } from "./ui/skeleton";

export function SubSkeletonPage() {
  return (
    <div className="pt-3 flex h-full w-full flex-col space-y-3 overflow-hidden border-gray-500">
      <main className="flex flex-col h-full px-4">
            <Skeleton className="mb-4 h-[40px] w-[45vw] rounded-xl bg-gray-700" />
            <Skeleton className="mb-4 h-[40px] w-[45vw] rounded-xl bg-gray-700" />
            <Skeleton className="mb-4 h-[40px] w-[45vw] rounded-xl bg-gray-700" />
            <Skeleton className="mb-4 h-[40px] w-[45vw] rounded-xl bg-gray-700" />
      </main>
    </div>
  );
}
