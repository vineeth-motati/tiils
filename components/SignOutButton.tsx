"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

const SignOutButton = ({ user }: any) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <HoverCard>
          <HoverCardTrigger className="hover:underline">
            {user.name}
          </HoverCardTrigger>
          <HoverCardContent
            align="center"
            side="top"
            className="text-xs text-white bg-black w-fit"
          >
            <span>{user.id}</span>
          </HoverCardContent>
        </HoverCard>

        <Button variant="default" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </>
  );
};

export default SignOutButton;
