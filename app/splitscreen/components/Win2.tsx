"use client";
import dynamic from "next/dynamic";
import useStore from "@/store/store";
import React, { Suspense } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const Win2 = () => {
  const win2 = useStore((store) => store.win2);

  const componentMap = {
    home: dynamic(() => import("../../page"), {
      ssr: false,
    }) as React.LazyExoticComponent<any>,
    calculator: dynamic(() => import("../../calculator/page"), {
      ssr: false,
    }) as React.LazyExoticComponent<any>,
  };

  const LazyComponentWrapper = async ({
    componentName,
  }: {
    componentName: keyof typeof componentMap;
  }) => {
    const Component = componentMap[componentName];
    return <Component />;
  };

  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        {win2 && (
          <LazyComponentWrapper
            componentName={win2 as keyof typeof componentMap}
          />
        )}
        {win2 === "" && <LazyComponentWrapper componentName={"home"} />}
      </Suspense>
    </>
  );
};

export default Win2;
