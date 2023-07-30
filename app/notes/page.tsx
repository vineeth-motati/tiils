"use client";
import React, { useEffect, useState } from "react";
import DragAndDrop from "./components/DragAndDrop";
import DragAndDrop2 from "./components/DragAndDrop2";
import DragAndDrop3 from "./components/DragAndDrop3";

const page = () => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <main className="relative flex flex-col w-full h-full p-6 overflow-scroll bg-notes-gradient">
      {/* <div className="absolute">{winReady && <DnD />}</div> */}
      <div className="absolute">{winReady && <DragAndDrop3 />}</div>
      {/* {winReady && <DragAndDrop />} */}
    </main>
  );
};

export default page;
