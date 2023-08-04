import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const LiSkeleton = () => {
  const [first, setFirst] = useState(1);
  return (
    <Skeleton>
      <div className="m-h-[500px] bg-white flex gap-4 flex-col">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-20 bg-gray-300 border rounded-md w-96"
          ></div>
        ))}
      </div>
    </Skeleton>
  );
};

export default LiSkeleton;
