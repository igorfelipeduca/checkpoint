"use client";
import { Image } from "@nextui-org/react";
import { Gamepad2, StarsIcon } from "lucide-react";

interface SearchPreviewProps {
  game: Game;
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | undefined>>;
}

export default function SearchPreview({
  game,
  setSelectedGame,
}: SearchPreviewProps) {
  return (
    <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950">
      <h1 className="text-2xl text-indigo-400 font-bold">{game.name}</h1>

      <div className="my-4 flex items-center gap-x-2">
        <div className="h-8 w-8 p-1 rounded-lg bg-gradient-to-b from-black to-indigo-950 flex justify-center items-center">
          <StarsIcon className="h-6 w-6 text-zinc-300" />
        </div>

        <h3 className="text-zinc-400">
          {game.suggestions_count} gamers enjoyed this game.{" "}
          <span className="text-indigo-400">(Rating {game.rating}/5)</span>
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {game.genres.map((genre: any) => (
          <div
            className="p-1 text-white text-center rounded-lg border-2 border-zinc-800 bg-zinc-950 text-sm"
            key={genre.id}
          >
            {genre.name}
          </div>
        ))}
      </div>

      <div className="hidden lg:flex h-[25.8rem] w-full justify-center">
        <div
          className="bg-indigo-500/75 opacity-0 hover:opacity-100 transition-all duration-150 ease-soft-spring h-[24rem] w-[24rem] z-50 absolute mt-8 rounded-lg flex justify-center items-center"
          onClick={() => setSelectedGame(game)}
        >
          <Gamepad2 className="h-16 w-16 text-white cursor-pointer" />
        </div>

        <div className="absolute h-auto w-[24rem]">
          <Image
            src={game.background_image}
            alt={game.name}
            className="aspect-square mt-8 object-cover w-full h-auto"
            isBlurred
          />
        </div>
      </div>

      <div className="flex lg:hidden h-[25.8rem] w-full justify-center">
        <Image
          src={game.background_image}
          alt={game.name}
          className="aspect-square mt-8 object-cover w-full h-auto"
          isBlurred
          onClick={() => setSelectedGame(game)}
        />
      </div>
    </div>
  );
}
