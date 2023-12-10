"use client";

import Header from "@/components/header";
import RecentGames from "@/components/recentGames";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Create() {
  const [query, setQuery] = useState<string>("");
  const [changed, setChanged] = useState<boolean>(false);
  const [games, setGames] = useState<any>([]);

  useEffect(() => {
    setChanged(false);

    setTimeout(() => {
      setChanged(true);
      console.log("changed");
    }, 500);
  }, [query]);

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

          console.log({ data: response.data.results });
        });
    }
  }, [changed]);

  return (
    <div className="bg-black min-h-screen w-full">
      <Header />

      <div className="flex justify-center items-center h-full w-full px-16 transition-all duration-150 ease-soft-spring">
        <div className="p-px rounded-lg bg-zinc-800 w-ful">
          <div className="py-4 px-8 rounded-lg w-96 bg-black flex items-center gap-x-4">
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

      <div className="mt-16 px-16">
        <RecentGames loadedGames={games} />
      </div>
    </div>
  );
}
