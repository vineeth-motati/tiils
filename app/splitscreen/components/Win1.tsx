"use client";
import dynamic from "next/dynamic";
import useStore from "@/store/store";
import React, { Suspense } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const Win1 = () => {
  const win1 = useStore((store) => store.win1);

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
        {win1 != "" && (
          <LazyComponentWrapper
            componentName={win1 as keyof typeof componentMap}
          />
        )}
        {win1 === "" && <LazyComponentWrapper componentName={"home"} />}
      </Suspense>
    </>
  );
};

export default Win1;
