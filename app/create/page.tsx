"use client";

import Header from "@/components/header";
import SearchGames from "@/components/searchGames";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { User } from "@supabase/supabase-js";
import ReviewDialog from "@/components/reviewDialog";

export default function Create() {
  const [user, setUser] = useState<User>();
  const [query, setQuery] = useState<string>("");
  const [changed, setChanged] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getUser().then((supabaseUser) => {
      if (!supabaseUser.data.user) window.location.href = "/login";

      setUser(supabaseUser.data.user as User);
    });
  }, []);

  useEffect(() => {
    setChanged(false);

    setTimeout(() => {
      setChanged(true);
    }, 500);
  }, [query]);

  useEffect(() => {
    if (selectedGame) setDialogOpen(true);
  }, [selectedGame]);

  useEffect(() => {
    if (changed) {
      axios
        .get(process.env.RAWG_BASE_URL as string, {
          params: {
            page: 1,
            page_size: 20,
            key: process.env.RAWG_API_KEY as string,
            search: query,
          },
        })
        .then((response) => {
          setGames(response.data.results);
        });
    }
  }, [changed]);

  return (
    <div className="bg-black min-h-screen w-full">
      <Header />

      <div className="flex justify-center items-center h-full w-full px-16 transition-all duration-150 ease-soft-spring lg:pt-32">
        <div className="p-px rounded-lg bg-zinc-800 w-ful mt-16">
          <div className="py-4 px-8 rounded-lg w-[30rem] bg-black flex items-center gap-x-4">
            <SearchIcon className="text-zinc-300" />

            <input
              type="text"
              className="text-zinc-300 bg-transparent outline-none w-full"
              placeholder="What have you been playing?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-16 pb-16 px-4 lg:px-16">
        <ReviewDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          user={user}
        />

        <SearchGames loadedGames={games} setSelectedGame={setSelectedGame} />
      </div>
    </div>
  );
}
