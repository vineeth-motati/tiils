"use client";
import React, { useEffect, useState } from "react";
import DragAndDrop3 from "./DragAndDrop3";

const DragAndDrop = (props: any) => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);
  const notesData = props.getNotesData;
  return (
    <div className="absolute">
      {winReady && <DragAndDrop3 notesData={notesData} />}
    </div>
  );
};

export default DragAndDrop;
