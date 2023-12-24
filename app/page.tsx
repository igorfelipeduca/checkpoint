"use client";

import Header from "@/components/header";
import RecentGames from "@/components/recentGames";
import { Image } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { Gamepad } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Home() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    supabase.auth.getUser().then((supabaseUser) => {
      if (supabaseUser.data.user) setUser(supabaseUser.data.user);
    });
  }, []);

  return (
    <div className="bg-black">
      <Header />

      <main className="lg:min-h-screen w-full bg-black px-4 lg:px-0">
        <div className={`pt-32 space-y-6 ${user ? "lg:pt-40" : ""}`}>
          <div className="flex justify-center">
            <h1 className="text-2xl lg:text-5xl font-bold text-zinc-300">
              Tell us about your games
            </h1>
          </div>

          <div className="flex justify-center">
            <h1 className="text-lg lg:text-3xl font-bold text-zinc-400">
              What have you played recently?
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex justify-center mt-32 px-16">
          <Image
            isBlurred
            src={
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="A game controller"
            className="aspect-video object-cover w-full rounded-xl ring-4 ring-zinc-800"
            height={1080}
            width={1920}
          />
        </div>

        <div className="flex lg:hidden justify-center mt-32">
          <Image
            isBlurred
            src={
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="A game controller"
            className="aspect-square object-cover w-full rounded-xl ring-4 ring-zinc-800"
            height={1080}
            width={1920}
          />
        </div>
      </main>

      <div className="py-4 px-4 pt-16 lg:mt-0">
        <div className="flex gap-x-2 items-center">
          <div className="p-1 rounded-lg bg-gradient-to-b from-zinc-950 to-indigo-950 border-2 border-zinc-800">
            <Gamepad className="text-indigo-300 h-8 w-8" />
          </div>

          <h1 className="text-2xl text-zinc-400 font-semibold">
            Games you might like
          </h1>
        </div>

        <RecentGames />
      </div>
    </div>
  );
}
