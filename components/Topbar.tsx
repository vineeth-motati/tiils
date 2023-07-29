import Link from "next/link";
import React from "react";
import { PiDotsNineBold } from "react-icons/pi";

const Topbar = () => {
  return (
    <>
      <div className="flex">
        <div className="justify-center text-center">
          <Link
            href={"/"}
            className="block w-16 h-12 p-4 text-center hover:bg-zinc-100"
          >
            <PiDotsNineBold className="w-full scale-150" />
          </Link>
        </div>
        <div className="w-screen h-12">
          <h1 className="px-3 w-fit h-12 text-xl leading-[48px]">Tools</h1>
        </div>
      </div>
    </>
  );
};

export default Topbar;
