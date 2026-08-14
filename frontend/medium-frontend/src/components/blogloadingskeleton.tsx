import { Skeleton } from "./ui/skeleton"

export default function SkeletonText() {
  return (
    <div className="flex w-full  flex-col max-w-4xl gap-2 p-10">
      <Skeleton className="h-4 w-full " />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

