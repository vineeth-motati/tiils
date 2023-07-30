import Link from "next/link";
import React from "react";
import { AiOutlineCalculator } from "react-icons/ai";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaRegNoteSticky } from "react-icons/fa6";

const TopNavSection = () => {
  return (
    <div className="">
      <Link
        href={"/home"}
        className="block w-16 h-12 p-4 text-center hover:bg-zinc-100"
      >
        <BiHomeAlt2 className="w-full scale-150" />
      </Link>
      <Link
        href={"/notes"}
        className="block w-16 h-12 p-4 text-center hover:bg-zinc-100"
      >
        <FaRegNoteSticky className="w-full scale-125" />
      </Link>
      <Link
        href={"/calculator"}
        className="block w-16 h-12 p-4 text-center hover:bg-zinc-100"
      >
        <AiOutlineCalculator className="w-full scale-150" />
      </Link>
      <Link
        href={"/calculator"}
        className="block w-16 h-12 p-4 text-center hover:bg-zinc-100"
      >
        <AiOutlineCalculator className="w-full scale-150" />
      </Link>
    </div>
  );
};

export default TopNavSection;
