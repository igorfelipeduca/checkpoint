import { Game } from "@/interfaces/game";
import { Image } from "@nextui-org/react";
import { Gamepad2, StarsIcon } from "lucide-react";

interface PreviewReviewProps {
  game: any;
}

export default function PreviewReview({ game }: PreviewReviewProps) {
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

      <div className="grid grid-cols-3 gap-x-2 mt-4">
        {game.genres.map((genre: any) => (
          <div
            className="p-1 text-white text-center rounded-lg border-2 border-zinc-800 bg-zinc-950 text-sm"
            key={genre.id}
          >
            {genre.name}
          </div>
        ))}
      </div>

      <Image
        src={game.background_image}
        alt="baldurs gate"
        className="aspect-square mt-8 object-cover"
        isBlurred
      />

      <div className="mt-4">
        <button className="py-2 px-4 rounded-lg bg-indigo-700 text-white flex items-center gap-x-2">
          <Gamepad2 /> I have played this game
        </button>
      </div>
    </div>
  );
}
