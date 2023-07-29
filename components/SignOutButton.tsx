"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = ({ user }: any) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {user.name}
        <Button variant="default" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </>
  );
};

export default SignOutButton;
