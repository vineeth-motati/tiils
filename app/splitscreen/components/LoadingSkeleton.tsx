import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <Skeleton className="flex w-full rounded-md overflow-auto shadow-customShadow">
      <Skeleton className="flex h-full w-full z-10">
        <Skeleton className="flex h-full w-full flex-col p-6"></Skeleton>
      </Skeleton>
    </Skeleton>
  );
};

export default LoadingSkeleton;
