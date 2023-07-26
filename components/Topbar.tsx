"use client";
import Link from "next/link";
import React from "react";
import { PiDotsNineBold } from "react-icons/pi";
import { LuSplitSquareHorizontal } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname();
  const isActive = pathname.includes("splitscreen");
  return (
    <>
      <div className="text-center justify-center">
        <Link
          href={"/"}
          className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
        >
          <PiDotsNineBold className="w-full scale-150" />
        </Link>
      </div>
      <div className="w-screen h-12">
        <h1 className="px-3 w-fit h-12 text-xl leading-[48px]">Tools</h1>
      </div>
      <Link
        href={`${isActive ? "/" : "/splitscreen"}`}
        className={`w-16 h-12 block text-center p-4 hover:bg-zinc-100 ${
          isActive ? "text-red-500 bg-zinc-100" : "text-black"
        }`}
      >
        <LuSplitSquareHorizontal className="w-full scale-150" />
      </Link>
    </>
  );
};

export default Topbar;
