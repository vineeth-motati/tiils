"use client";
import { AiOutlineCalculator } from "react-icons/ai";
import { LuSettings } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
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

import useStore from "@/store/store";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";

const Sidebar = ({ side, session }: { side: string; session?: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const windows = useStore((store) => store);

  const handleRoute = (page: string) => {
    const isSplitScreen = pathname.includes("splitscreen");
    if (isSplitScreen) {
      if (side === "left") {
        windows.updateWin1(page);
      }
      if (side === "right") {
        windows.updateWin2(page);
      }
    } else {
      router.push(page);
    }
  };

  return (
    <div className="w-16">
      <div className="flex flex-col h-[calc(100vh-48px)]  justify-between">
        <div className="">
          <button
            onClick={() => handleRoute("calculator")}
            className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
          >
            <AiOutlineCalculator className="w-full scale-150" />
          </button>
          <button
            onClick={() => handleRoute("home")}
            className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
          >
            <AiOutlineCalculator className="w-full scale-150" />
          </button>
          <button
            onClick={() => handleRoute("calculator")}
            className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
          >
            <AiOutlineCalculator className="w-full scale-150" />
          </button>
          <button
            onClick={() => handleRoute("calculator")}
            className="w-16 h-12 block text-center p-4 hover:bg-zinc-100"
          >
            <AiOutlineCalculator className="w-full scale-150" />
          </button>
        </div>
        {side === "left" && (
          <div>
            <Popover>
              <PopoverTrigger className="w-16 h-12 block text-center p-4 hover:bg-zinc-100">
                <FaRegUser className="w-full scale-150" />
              </PopoverTrigger>
              <PopoverContent side="right" className="w-96" align="end">
                {session && (
                  <>
                    <p>{session.user.name}</p>
                  </>
                )}
                Login to save your work <AuthProviders />
              </PopoverContent>
            </Popover>
            <Sheet>
              <SheetTrigger className="w-16 h-12 block text-center p-4 hover:bg-zinc-100">
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
        )}
      </div>
    </div>
  );
};

export default Sidebar;
