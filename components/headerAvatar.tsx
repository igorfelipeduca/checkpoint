"use client";

import { Image } from "@nextui-org/react";
import { Gamepad, Plus, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeaderAvatarProps {
  hovering: boolean;
  setHovering: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderAvatar({
  hovering,
  setHovering,
}: HeaderAvatarProps) {
  return (
    <div
      className="flex flex-col items-end w-48 h-[7rem]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link href={"/profile"}>
        <Image
          className="h-10 w-10 object-cover rounded-lg border border-zinc-800"
          isBlurred
          src={"https://t2.tudocdn.net/315004?w=824&h=494"}
        />
      </Link>

      <div
        className={`${
          hovering
            ? "w-48 bg-gradient-to-br from-zinc-600/75 to-zinc-800/75 rounded-lg mt-2 opacity-1"
            : "h-0 opacity-0"
        } transition-all duration-150 ease-soft-spring rounded-lg p-px`}
      >
        <div className="bg-zinc-950 p-2 h-full rounded-lg">
          <div className="flex flex-col gap-y-2">
            <div className="bg-black hover:bg-zinc-800 py-2 px-4 rounded-lg w-full flex items-center gap-x-2 transition-all duration-150 hover:text-indigo-500 cursor-pointer">
              <User className="h-5 w-5" /> Your profile
            </div>

            <div className="bg-black hover:bg-zinc-800 py-2 px-4 rounded-lg w-full flex items-center gap-x-2 transition-all duration-150 hover:text-indigo-500 cursor-pointer">
              <Gamepad className="h-5 w-5" /> Games
            </div>

            <Link
              href={"/create"}
              className="bg-indigo-700 py-2 px-4 rounded-lg w-full border border-indigo-800 text-white flex items-center gap-x-2 transition-all duration-150 cursor-pointer text-sm hover:bg-indigo-800"
            >
              <Plus className="h-5 w-5" /> Something new?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
