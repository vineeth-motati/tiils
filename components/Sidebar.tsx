import { AiOutlineCalculator } from "react-icons/ai";
import { LuSettings } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaRegNoteSticky } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getCurrentUser } from "@/lib/session";

import Link from "next/link";
import AuthProviders from "./AuthProviders";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import SignOutButton from "./SignOutButton";

const Sidebar = async () => {
  const session = await getCurrentUser();

  return (
    <div className="w-16">
      <div className="flex flex-col h-[calc(100vh-48px)] justify-between">
        <div className="">
          <Link
            href={"/calculator"}
            className="block w-16 h-12 p-4 text-center hover:bg-zinc-100"
          >
            <AiOutlineCalculator className="w-full scale-150" />
          </Link>
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
            <FaRegNoteSticky className="w-full scale-150" />
          </Link>
          <Link
            href={"/calculator"}
            className="block w-16 h-12 p-4 text-center hover:bg-zinc-100"
          >
            <AiOutlineCalculator className="w-full scale-150" />
          </Link>
        </div>
        <div>
          <Popover>
            <PopoverTrigger className="flex items-center justify-center w-16 h-12 hover:bg-zinc-100">
              {session?.user ? (
                <Image
                  src={session.user.image}
                  alt="Profile pic"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <FaRegUser className="w-full scale-150" />
              )}
            </PopoverTrigger>
            <PopoverContent side="right" className="w-96" align="end">
              {session?.user ? (
                <SignOutButton user={session.user} />
              ) : (
                <>
                  Login to save your work <AuthProviders />
                </>
              )}
            </PopoverContent>
          </Popover>
          <Sheet>
            <SheetTrigger className="block w-16 h-12 p-4 text-center hover:bg-zinc-100">
              <LuSettings className="w-full scale-150" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
