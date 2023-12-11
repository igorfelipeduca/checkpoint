"use client";

import { supabase } from "@/app/supabase";
import { Image } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderAvatar from "./headerAvatar";

export default function Header() {
  const [user, setUser] = useState<User>();
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then((supabaseUser) => {
      if (supabaseUser.data.user) setUser(supabaseUser.data.user);
    });
  }, []);

  return (
    <div
      className={`pt-8 pb-4 w-screen bg-black text-white px-32 flex justify-between absolute top-0 items-top ${inter.className}`}
    >
      <Link href={"/"}>
        <h1 className="text-lg font-black text-white uppercase mr-16">
          Checkpoint
        </h1>
      </Link>

      <div className="flex gap-x-8">
        <h3 className="text-md text-zinc-400 transition-all duration-150 hover:text-indigo-600 ease-linear cursor-pointer">
          Games
        </h3>

        <h3 className="text-md text-zinc-400 transition-all duration-150 hover:text-indigo-600 ease-linear cursor-pointer">
          How does this work?
        </h3>

        <h3 className="text-md text-zinc-400 transition-all duration-150 hover:text-indigo-600 ease-linear cursor-pointer">
          Scoreboard
        </h3>
      </div>

      {user ? (
        <div className="flex gap-x-2 items-center">
          <HeaderAvatar hovering={hovering} setHovering={setHovering} />
        </div>
      ) : (
        <Link
          href={"/signup"}
          className="py-2 px-4 rounded-lg bg-gradient-to-b from-zinc-black to-zinc-950 text-zinc-300 border border-indigo-700 shadow-sm text-sm transition-all duration-150 hover:bg-gray-950 cursor-pointer hover:ring-1 hover:ring-zinc-500"
        >
          Create your account
        </Link>
      )}
    </div>
  );
}
