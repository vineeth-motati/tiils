import Sidebar from "@/components/Sidebar";
import React from "react";
import Win1 from "./components/Win1";
import Win2 from "./components/Win2";

const SplitScreen = () => {
  return (
    <>
      <div className="flex w-full gap-2">
        <Win1 />
        <Win2 />
      </div>
      <Sidebar side="right" />
    </>
  );
};
export default SplitScreen;
