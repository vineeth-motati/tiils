import { getCurrentUser } from "@/lib/session";
import DragAndDrop from "./components/DragAndDrop";
import { getNotes } from "@/lib/actions";

const page = () => {
  const fetchNotesData = async () => {
    "use server";
    const session = await getCurrentUser();
    if (session) {
      const notes = await getNotes(session.user.email);
      return notes;
    }
    return null;
  };

  // fetchNotesData();

  return (
    <main className="relative flex flex-col w-full h-full p-6 overflow-scroll bg-notes-gradient">
      <DragAndDrop getNotesData={fetchNotesData()} />
    </main>
  );
};

export default page;
