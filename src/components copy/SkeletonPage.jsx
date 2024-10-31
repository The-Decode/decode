import Navbar from "./Navbar";
import { Skeleton } from "./ui/skeleton";

export function SkeletonPage() {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col space-y-3 overflow-hidden bg-black">
      <Navbar className={"wrapper"} dropdown={true} />

      <main className="flex h-full items-start justify-center px-4">
        <section className="flex flex-col space-y-10">
          <div>
            <Skeleton className="mb-4 h-[40px] w-[45vw] rounded-xl" />
            <Skeleton className="h-[40px] w-[45vw] rounded-xl" />
          </div>
          <Skeleton className="h-[70vh] w-[45vw] rounded-xl" />
        </section>
        <div className="mx-auto flex w-[47vw] flex-col space-y-6">
          <Skeleton className="h-[40vh] w-full" />
          <Skeleton className="h-[40vh] w-full" />
        </div>
      </main>
    </div>
  );
}
