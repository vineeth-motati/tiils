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
  name?: string;
  content?: string;
}

const Li = (props: any) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    // console.log(props);
  }, [isEditMode]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
    props.handleEdit(props.itemID, value, props.category);
  };

  const handleAdd = (e: any) => {
    setAddMode(false);
    console.log(value, props.category);

    if (value !== "") props.handleAdd(value, props.category);
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

const AddNew = (props: any) => {
  const [addMode, setAddMode] = useState(false);
  const [value, setValue] = useState("");

  const handleAdd = (e: any) => {
    setAddMode(false);
    console.log(value, props.category);

    if (value !== "") props.handleAdd(value, props.category);
    setValue("");
  };
  return (
    <div className="">
      {!addMode && (
        <Button variant="secondary" onClick={() => setAddMode(true)}>
          + Add new
        </Button>
      )}
      {addMode && (
        <div
          className={`border-2 my-2 px-1 py-2 border-gray-400 rounded-md bg-white prose list-none  ${props.className}`}
        >
          <textarea
            name=""
            id=""
            autoFocus={true}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-100 outline-none resize-none"
            onBlur={handleAdd}
          ></textarea>
        </div>
      )}
    </div>
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
interface DragAndDrop3Props {
  notesData: any;
}
const DragAndDrop3: React.FC<DragAndDrop3Props> = ({ notesData }) => {
  const [lists, setLists] = useState<{ id: string; items: Item[] }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [organizedData, setOrganizedData] = useState([]);

  function organizeDataByCategory(data) {
    const organizedData = {};

    data.forEach(({ node }) => {
      const { category, ...rest } = node;

      if (organizedData) {
        if (!organizedData[category]) {
          organizedData[category] = {
            id: category,
            items: [],
          };
        }
      }

      organizedData[category].items.push(rest);
    });

    return Object.values(organizedData);
  }
  // Function to organize the data
  // const organizeData = (data) => {
  //   const organized = data.reduce((acc, curr) => {
  //     const category = curr.node.category;
  //     const existingCategory = acc.find((item) => item.id === category);

  //     if (existingCategory) {
  //       existingCategory.items.push(curr.node);
  //     } else {
  //       acc.push({ id: category, items: [curr.node] });
  //     }

  //     return acc;
  //   }, []);

  //   setOrganizedData(organized);
  // };

  // console.log(JSON.parse(notesData.value));

  // organizeData(JSON.parse(notesData.value));

  // notesData
  //   .then((result) => {
  //     const notes = result.user.notes.edges;
  //     organizeData(notes);
  //   })
  //   .then(() => {
  //     // setLists(organizedData);
  //     setIsLoading(false);
  //   });
  useEffect(() => {
    const fakeFetchData = () => {
      // Simulated data
      const dataA = [
        {
          id: 1,
          content: "**Item 1**",
        },
        {
          id: 2,
          content: "~~Item 2~~",
        },
        {
          id: 3,
          content: "*Item 3*",
        },
        {
          id: 4,
          content: "#### Item 4",
        },
        {
          id: 5,
          content: "---",
        },
        {
          id: 6,
          content: "*",
        },
        // Add more items as needed
      ];

      const dataB = [
        {
          id: 7,
          content: "https://reactjs.com",
        },
        {
          id: 8,
          content: markdown,
        },
        {
          id: 9,
          content: "Item 9",
        },
        {
          id: 10,
          content: "Item 10",
        },
        {
          id: 11,
          content: "Item 11",
        },
        {
          id: 12,
          content: "Item 12",
        },
      ];

      const dataC = [
        {
          id: 13,
          content: "Item 13",
        },
        {
          id: 14,
          content: "Item 14",
        },
        {
          id: 15,
          content: "Item 15",
        },
        {
          id: 16,
          content: "Item 16",
        },
        {
          id: 17,
          content: "Item 17",
        },
        {
          id: 18,
          content: "Item 18",
        },
      ];

      // Simulate a delay before setting the state to mimic data fetching
      setLists([
        { id: "1", items: dataA },
        { id: "2", items: dataB },
        { id: "3", items: dataC },
      ]);

      // setLists(organizedData);
    };

    //   // // const fetchNotesData = async () => {
    //   // //   const session = await getCurrentUser();
    //   // //   const notes = await getNotes("vineethdev06@gmail.com");
    //   // //   console.log("====================================");
    //   // //   console.log(notes);
    //   // //   console.log(session);

    //   // //   console.log("====================================");
    //   // // };
    //   // // fetchNotesData();
    const data = JSON.parse(notesData.value);
    if (data) {
      console.log(data && data.user.notes.edges);
      setLists(organizeDataByCategory(data.user.notes.edges));
      // setOrganizedData(organizeDataByCategory(data.user.notes.edges))
      // console.log(organizeDataByCategory(data.user.notes.edges));
      setIsLoading(false);
    } else {
      fakeFetchData();
      setIsLoading(false);
    }

    // console.log(lists, organizedData);
  }, [notesData]);

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
    itemID: number,
    newValue: string,
    category: string
  ) => {
    // Find the list containing the item and update its value
    const updatedLists = lists.map((list) => {
      if (list.id === category) {
        const updatedItems = list.items.map((item) =>
          item.id === itemID ? { ...item, content: newValue } : item
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
    const newItem = { id: newId, content: newValue };
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
                      value={item.content}
                      category={droppableId}
                      itemID={item.id}
                      handleEdit={handleItemEdit}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Ul>
          )}
        </Droppable>
        {/* <Li
          itemID={list.length + 1}
          category={droppableId}
          addNew={true}
          handleAdd={handleItemAdd}
        /> */}
        <AddNew
          category={droppableId}
          addNew={true}
          handleAdd={handleItemAdd}
        />
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
