import { AiOutlineCalculator } from "react-icons/ai";
import { LuSettings } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-48px)]  justify-between">
      <div className="">
        <Link
          href={"/calculator"}
          className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
        >
          <AiOutlineCalculator className="w-full scale-150" />
        </Link>
        <Link
          href={"/calculator"}
          className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
        >
          <AiOutlineCalculator className="w-full scale-150" />
        </Link>
        <Link
          href={"/calculator"}
          className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
        >
          <AiOutlineCalculator className="w-full scale-150" />
        </Link>
        <Link
          href={"/calculator"}
          className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
        >
          <AiOutlineCalculator className="w-full scale-150" />
        </Link>
      </div>
      <div>
        <Link
          href={"/calculator"}
          className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
        >
          <FaRegUser className="w-full scale-150" />
        </Link>
        <Link
          href={"/calculator"}
          className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
        >
          <LuSettings className="w-full scale-150" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
