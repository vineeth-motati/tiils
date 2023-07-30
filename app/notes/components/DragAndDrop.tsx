"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragAndDrop = () => {
  const [listA, setListA] = useState([
    {
      id: 1,
      name: "Item 1",
    },
    {
      id: 2,
      name: "Item 2",
    },
    {
      id: 3,
      name: "Item 3",
    },
    {
      id: 4,
      name: "Item 4",
    },
    {
      id: 5,
      name: "Item 5",
    },
    {
      id: 6,
      name: "Item 6",
    },
    // Add more items as needed
  ]);

  const [listB, setListB] = useState([
    {
      id: 7,
      name: "Item 7",
    },
    {
      id: 8,
      name: "Item 8",
    },
    {
      id: 9,
      name: "Item 9",
    },
    {
      id: 10,
      name: "Item 10",
    },
    {
      id: 11,
      name: "Item 11",
    },
    {
      id: 12,
      name: "Item 12",
    },
    // Add more items as needed
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Check if the drag was outside a droppable area
    if (!destination) {
      return;
    }

    // Check if the drag happened within the same list or across lists
    if (source.droppableId === destination.droppableId) {
      // Reorder the elements in the same list
      const list = source.droppableId === "listA" ? [...listA] : [...listB];
      const [removed] = list.splice(source.index, 1);
      list.splice(destination.index, 0, removed);

      if (source.droppableId === "listA") {
        setListA(list);
      } else {
        setListB(list);
      }
    } else {
      // Move the element from one list to another
      const sourceList =
        source.droppableId === "listA" ? [...listA] : [...listB];
      const destList =
        destination.droppableId === "listA" ? [...listA] : [...listB];

      const [removed] = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, removed);

      // Ensure we update both lists even if one list is empty
      setListA(source.droppableId === "listA" ? sourceList : destList);
      setListB(destination.droppableId === "listA" ? sourceList : destList);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>Notes page</h1>
      <div className="flex min-h-[500px] space-x-4 m-5">
        <div className="h-full border-2 rounded-md w-96">
          <Droppable droppableId="listA">
            {(provided) => (
              <ul
                className="h-full listA" // Changed the className to be unique
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listA.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={i}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="py-6 text-center border"
                      >
                        {item.name}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="h-full border-2 rounded-md w-96">
          <Droppable droppableId="listB">
            {(provided) => (
              <ul
                className="h-full listB" // Changed the className to be unique
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listB.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={i}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="py-6 text-center border"
                      >
                        {item.name}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;
