import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import SignOutButton from "./SignOutButton";
import AuthProviders from "./AuthProviders";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { LuSettings } from "react-icons/lu";
import { getCurrentUser } from "@/lib/session";

const BottomNavSection = async () => {
  const session = await getCurrentUser();

  return (
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
              <AuthProviders />
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BottomNavSection;
