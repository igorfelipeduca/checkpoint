"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PreviewReview from "./previewReview";
import Link from "next/link";
import { supabase } from "@/app/supabase";
import { User } from "@supabase/supabase-js";

export default function RecentGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    supabase.auth.getUser().then((supabaseUser) => {
      if (supabaseUser.data.user) setUser(supabaseUser.data.user);
    });

    axios
      .get(process.env.RAWG_BASE_URL as string, {
        params: {
          page: 1,
          page_size: 20,
          key: process.env.RAWG_API_KEY as string,
        },
      })
      .then((response) => {
        setGames(response.data.results);
      });
  }, []);

  return (
    <div>
      <div className="py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map((game: any, index: number) => (
          <div key={index} className="masonry-item">
            <PreviewReview game={game} />
          </div>
        ))}
      </div>

      {user ? (
        <></>
      ) : (
        <div className="p-8 text-zinc-300">
          <div className="flex justify-center">
            <h1 className="text-lg text-zinc-300">Want to see more?</h1>
          </div>

          <div className="mt-2 flex justify-center">
            <Link
              href={"/signup"}
              className="bg-indigo-700 font-semibold rounded-lg border-zinc-300 py-2 px-4 text-zinc-300 transition-all duration-150 ease-linear hover:bg-indigo-800"
            >
              Create your account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
