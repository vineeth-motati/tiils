import DragAndDrop from "./components/DragAndDrop";

const page = () => {
  return (
    <main className="relative flex flex-col w-full h-full p-6 overflow-scroll bg-notes-gradient">
      <DragAndDrop />
    </main>
  );
};

export default page;
