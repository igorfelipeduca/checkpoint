"use client";

import Link from "next/link";
import SearchPreview from "./searchPreview";

interface RecentGamesProps {
  loadedGames?: any[];
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | undefined>>;
}

export default function SearchGames({
  loadedGames,
  setSelectedGame,
}: RecentGamesProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loadedGames?.map((game: any, index: number) => (
          <div key={index} className="masonry-item">
            <SearchPreview game={game} setSelectedGame={setSelectedGame} />
          </div>
        ))}
      </div>

      {loadedGames ? (
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
