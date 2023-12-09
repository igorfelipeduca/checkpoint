"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PreviewReview from "./previewReview";
import Link from "next/link";

export default function RecentGames() {
  const [games, setGames] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games`, {
        params: {
          page: 1,
          page_size: 20,
          key: "b7d4e1a93a8646978a37871e1a93a9eb",
        },
      })
      .then((response) => {
        setGames(response.data.results);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      {games.map((game: any, index: number) => (
        <PreviewReview key={index} game={game} />
      ))}

      <div className="p-8text-zinc-300">
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
    </div>
  );
}
