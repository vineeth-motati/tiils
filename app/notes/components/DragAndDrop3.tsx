import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getNotes } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import LiSkeleton from "./LiSkeleton";
import { Button } from "@/components/ui/button";
// import Li from "./LiComponent";

interface Item {
  id: number;
  name: string;
}

const Li = (props: any) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    console.log(props);
  }, [isEditMode]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
    // ... existing code ...
    props.handleEdit(props.itemId, value, props.category); // Renamed to handleEdit
  };

  const handleAdd = (e: any) => {
    setAddMode(false);
    console.log(value, props.category);

    // ... existing code ...
    if (value !== "") props.handleAdd(value, props.category); // Renamed to handleAdd
    setValue("");
  };

  return (
    <li
      {...props}
      ref={props.innerRef}
      className={`border-2 my-2 border-gray-400 rounded-md bg-white prose list-none  ${props.className}`}
      onClick={handleEdit}
    >
      {props.addNew ? (
        <div className="px-2 py-1">
          {!addMode && (
            <Button variant="secondary" onClick={() => setAddMode(true)}>
              + Add new
            </Button>
          )}
          {addMode && (
            <textarea
              name=""
              id=""
              autoFocus={true}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-gray-100 outline-none resize-none"
              onBlur={handleAdd}
            ></textarea>
          )}
        </div>
      ) : (
        <div className="px-2 py-1">
          {!isEditMode && (
            <ReactMarkdown
              className=""
              children={`${props.value}`}
              remarkPlugins={[remarkGfm]}
            />
          )}
          {isEditMode && (
            <textarea
              name=""
              id=""
              autoFocus={true}
              value={value}
              className="w-full bg-gray-100 outline-none resize-none"
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleSave}
            ></textarea>
          )}
        </div>
      )}
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
      ];

      const dataC = [
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

    // const fetchNotesData = async () => {
    //   const session = await getCurrentUser();
    //   const notes = await getNotes("vineethdev06@gmail.com");
    //   console.log("====================================");
    //   console.log(notes);
    //   console.log(session);

    //   console.log("====================================");
    // };
    // fetchNotesData();

    fakeFetchData();
  }, []);

  const handleDragEnd = (result: any) => {
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
  const handleItemEdit = (
    itemId: number,
    newValue: string,
    category: string
  ) => {
    // Find the list containing the item and update its value
    const updatedLists = lists.map((list) => {
      if (list.id === category) {
        const updatedItems = list.items.map((item) =>
          item.id === itemId ? { ...item, name: newValue } : item
        );
        return { ...list, items: updatedItems };
      }
      return list;
    });
    setLists(updatedLists);
  };
  const handleItemAdd = (newValue: string, category: string) => {
    // Generate a new unique id for the new item (you can use a library like uuid for this)
    const newId = Date.now();
    // Create a new item object
    const newItem = { id: newId, name: newValue };
    // Find the list containing the category and add the new item
    const updatedLists = lists.map((list) => {
      if (list.id === category) {
        return { ...list, items: [...list.items, newItem] };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const renderDroppableList = (list: Item[], droppableId: string) => {
    return (
      <ContainerDiv key={droppableId} className="h-full">
        <h2 className="text-3xl text-center">{droppableId}</h2>
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
                      value={item.name}
                      category={droppableId}
                      itemId={item.id}
                      handleEdit={handleItemEdit}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Ul>
          )}
        </Droppable>
        <Li category={droppableId} addNew={true} handleAdd={handleItemAdd} />
      </ContainerDiv>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
