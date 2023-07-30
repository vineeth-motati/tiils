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
        <div className="w-full h-20 bg-gray-300 border rounded-md"></div>
        <div className="w-full h-20 bg-gray-300 border rounded-md"></div>
        <div className="w-full h-20 bg-gray-300 border rounded-md"></div>
        <div className="w-full h-20 bg-gray-300 border rounded-md"></div>
        <div className="w-full h-20 bg-gray-300 border rounded-md"></div>
        <div className="w-full h-20 bg-gray-300 border rounded-md"></div>
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
* Lists
* [ ] todo
* [x] done
---
***

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |
`;

const DragAndDrop3: React.FC = () => {
  const [listA, setListA] = useState<Item[]>([
    // Existing listA items...
  ]);

  const [listB, setListB] = useState<Item[]>([
    // Existing listB items...
  ]);

  const [listC, setListC] = useState<Item[]>([
    // Add new items for listC as needed
    // Add more items as needed
  ]);

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
        setListA(dataA);
        setTimeout(() => {
          setListB(dataB);
          setTimeout(() => {
            setListC(dataC);
          }, 500);
        }, 500);
      }, 500);
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
      <div className="flex bg-white p-4 rounded-md shadow-xl min-h-[500px] space-x-4 m-5">
        <ContainerDiv className="">
          <Droppable droppableId="listA">
            {(provided) => (
              <Ul
                className="listA"
                {...provided.droppableProps}
                innerRef={provided.innerRef}
              >
                {listA.length > 0 ? (
                  listA.map((item, i) => (
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
                  ))
                ) : (
                  <LiSkeleton />
                )}
                {provided.placeholder}
              </Ul>
            )}
          </Droppable>
        </ContainerDiv>
        <ContainerDiv className="">
          <Droppable droppableId="listB">
            {(provided) => (
              <Ul
                className="listB"
                {...provided.droppableProps}
                innerRef={provided.innerRef}
              >
                {listB.length > 0 ? (
                  listB.map((item, i) => (
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
                  ))
                ) : (
                  <LiSkeleton />
                )}
                {provided.placeholder}
              </Ul>
            )}
          </Droppable>
        </ContainerDiv>
        <ContainerDiv className="">
          <Droppable droppableId="listC">
            {(provided) => (
              <Ul
                className="listC"
                {...provided.droppableProps}
                innerRef={provided.innerRef}
              >
                {listC.length > 0 ? (
                  listC.map((item, i) => (
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
                  ))
                ) : (
                  <LiSkeleton />
                )}
                {provided.placeholder}
              </Ul>
            )}
          </Droppable>
        </ContainerDiv>
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop3;
