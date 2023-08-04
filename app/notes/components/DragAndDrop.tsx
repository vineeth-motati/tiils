"use client";
import React, { useEffect, useState } from "react";
import DragAndDrop3 from "./DragAndDrop3";

const DragAndDrop = () => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);
  return <div className="absolute">{winReady && <DragAndDrop3 />}</div>;
};

export default DragAndDrop;
