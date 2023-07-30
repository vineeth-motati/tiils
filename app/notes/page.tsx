"use client";
import React, { useEffect, useState } from "react";
import DragAndDrop from "./components/DragAndDrop";

const page = () => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <main className="flex flex-col w-full h-full p-6 bg-notes-gradient">
      {winReady && <DragAndDrop />}
    </main>
  );
};

export default page;
