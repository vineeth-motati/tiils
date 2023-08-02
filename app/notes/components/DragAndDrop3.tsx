"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Item {
  id: number;
  name: string;
}

const LiSkeleton = () => {
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

const Li = (props: any) => {
  return (
    <li
      {...props}
      ref={props.innerRef}
      className={`py-7 border-2 my-2 border-gray-400 rounded-md bg-white prose  ${props.className}`}
    >
      <ReactMarkdown
        children={`${props.children}`}
        remarkPlugins={[remarkGfm]}
      />
    </li>
  );
};

const Ul = (props: any) => {
  return (
    <ul
      {...props}
      className={`h-full flex flex-col {props.className}`}
      ref={props.innerRef}
    >
      {props.children}
    </ul>
  );
};

const ContainerDiv = (props: any) => {
  return (
    <div className={`h-full rounded-md w-96 ${props.className}`}>
      {props.children}
    </div>
  );
};
const markdown = `A paragraph with *emphasis* and **strong importance**.
> A block quote with ~~strikethrough~~ and a URL: https://reactjs.org.

`;

const DragAndDrop3: React.FC = () => {
  const [lists, setLists] = useState<{ id: string; items: Item[] }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fakeFetchData = () => {
      // Simulated data
      const dataA = [
        {
          id: 1,
          name: "**Item 1**",
        },
        {
          id: 2,
          name: "~~Item 2~~",
        },
        {
          id: 3,
          name: "*Item 3*",
        },
        {
          id: 4,
          name: "#### Item 4",
        },
        {
          id: 5,
          name: "---",
        },
        {
          id: 6,
          name: "*",
        },
        // Add more items as needed
      ];

      const dataB = [
        {
          id: 7,
          name: "https://reactjs.com",
        },
        {
          id: 8,
          name: markdown,
        },
        {
          id: 9,
          name: "# Item 9",
        },
        {
          id: 10,
          name: "# Item 10",
        },
        {
          id: 11,
          name: "# Item 11",
        },
        {
          id: 12,
          name: "# Item 12",
        },
      ];

      const dataC = [
        {
          id: 13,
          name: "# Item 13",
        },
        {
          id: 14,
          name: "# Item 14",
        },
        {
          id: 15,
          name: "# Item 15",
        },
        {
          id: 16,
          name: "# Item 16",
        },
        {
          id: 17,
          name: "# Item 17",
        },
        {
          id: 18,
          name: "# Item 18",
        },
      ];

      // Simulate a delay before setting the state to mimic data fetching

      setTimeout(() => {
        setLists([
          { id: "listA", items: dataA },
          { id: "listB", items: dataB },
          { id: "listC", items: dataC },
        ]);
        setIsLoading(false);
      }, 1500);
    };

    fakeFetchData();
  }, []);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Check if the drag was outside a droppable area
    if (!destination) {
      return;
    }

    // Check if the drag happened within the same list or across lists
    if (source.droppableId === destination.droppableId) {
      // Reorder the elements in the same list
      const listIndex = lists.findIndex(
        (list) => list.id === source.droppableId
      );
      if (listIndex !== -1) {
        const list = [...lists[listIndex].items];
        const [removed] = list.splice(source.index, 1);
        list.splice(destination.index, 0, removed);
        const updatedLists = [...lists];
        updatedLists[listIndex] = { ...lists[listIndex], items: list };
        setLists(updatedLists);
      }
    } else {
      // Move the element from one list to another
      const sourceListIndex = lists.findIndex(
        (list) => list.id === source.droppableId
      );
      const destListIndex = lists.findIndex(
        (list) => list.id === destination.droppableId
      );

      if (sourceListIndex !== -1 && destListIndex !== -1) {
        const sourceList = [...lists[sourceListIndex].items];
        const destList = [...lists[destListIndex].items];

        const [removed] = sourceList.splice(source.index, 1);
        destList.splice(destination.index, 0, removed);

        const updatedLists = [...lists];
        updatedLists[sourceListIndex] = {
          ...lists[sourceListIndex],
          items: sourceList,
        };
        updatedLists[destListIndex] = {
          ...lists[destListIndex],
          items: destList,
        };

        setLists(updatedLists);
      }
    }
  };

  const renderDroppableList = (list: Item[], droppableId: string) => {
    return (
      <ContainerDiv key={droppableId} className="h-full">
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <Ul
              className={droppableId}
              {...provided.droppableProps}
              innerRef={provided.innerRef}
            >
              {list.map((item, i) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={i}
                >
                  {(provided) => (
                    <Li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      innerRef={provided.innerRef}
                      className=""
                    >
                      {item.name}
                    </Li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Ul>
          )}
        </Droppable>
      </ContainerDiv>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>Notes page</h1>
      <div className="flex bg-white p-4 rounded-md shadow-xl min-h-[500px] space-x-4 m-5">
        {isLoading && (
          <>
            <LiSkeleton />
            <LiSkeleton />
            <LiSkeleton />
          </>
        )}
        {lists.map((list) => renderDroppableList(list.items, list.id))}
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop3;
