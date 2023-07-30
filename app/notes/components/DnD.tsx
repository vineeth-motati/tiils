import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Item {
  id: number;
  name: string;
}

const DnD: React.FC = () => {
  const [listA, setListA] = useState<Item[]>([
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
    // Existing listA items...
  ]);

  const [listB, setListB] = useState<Item[]>([
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
    // Existing listB items...
  ]);

  const [listC, setListC] = useState<Item[]>([
    // Add new items for listC as needed
    {
      id: 13,
      name: "Item 13",
    },
    {
      id: 14,
      name: "Item 14",
    },
    {
      id: 15,
      name: "Item 15",
    },
    {
      id: 16,
      name: "Item 16",
    },
    {
      id: 17,
      name: "Item 17",
    },
    {
      id: 18,
      name: "Item 18",
    },
    // Add more items as needed
  ]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Check if the drag was outside a droppable area
    if (!destination) {
      return;
    }

    // Check if the drag happened within the same list or across lists
    if (source.droppableId === destination.droppableId) {
      // Reorder the elements in the same list
      if (source.droppableId === "listA") {
        const list = [...listA];
        const [removed] = list.splice(source.index, 1);
        list.splice(destination.index, 0, removed);
        setListA(list);
      } else if (source.droppableId === "listB") {
        const list = [...listB];
        const [removed] = list.splice(source.index, 1);
        list.splice(destination.index, 0, removed);
        setListB(list);
      } else {
        const list = [...listC];
        const [removed] = list.splice(source.index, 1);
        list.splice(destination.index, 0, removed);
        setListC(list);
      }
    } else {
      // Move the element from one list to another
      const sourceList =
        source.droppableId === "listA"
          ? { list: listA, setList: setListA }
          : source.droppableId === "listB"
          ? { list: listB, setList: setListB }
          : { list: listC, setList: setListC };

      const destList =
        destination.droppableId === "listA"
          ? { list: listA, setList: setListA }
          : destination.droppableId === "listB"
          ? { list: listB, setList: setListB }
          : { list: listC, setList: setListC };

      const [removed] = sourceList.list.splice(source.index, 1);
      destList.list.splice(destination.index, 0, removed);

      // Ensure we update both lists even if one list is empty
      sourceList.setList([...sourceList.list]);
      destList.setList([...destList.list]);
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
                className="h-full listA"
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
                className="h-full listB"
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
        <div className="h-full border-2 rounded-md w-96">
          <Droppable droppableId="listC">
            {(provided) => (
              <ul
                className="h-full listC"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listC.map((item, i) => (
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

export default DnD;
