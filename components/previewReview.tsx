import { Image } from "@nextui-org/react";

export default function PreviewReview() {
  return (
    <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950 w-96 h-[31rem]">
      <h1 className="text-2xl text-indigo-400 font-bold">Baldur's Gate 3</h1>

      <div className="grid grid-cols-3 gap-x-2 mt-4">
        <div className="p-1 text-white text-center rounded-lg border-2 border-zinc-800 bg-gradient-to-br from-black via-black to-indigo-950 text-sm">
          RPG
        </div>

        <div className="p-1 text-white text-center rounded-lg border-2 border-zinc-800 bg-gradient-to-br from-black via-black to-indigo-950 text-sm">
          Ação
        </div>

        <div className="p-1 text-white text-center rounded-lg border-2 border-zinc-800 bg-gradient-to-br from-black via-black to-indigo-950 text-sm">
          Aventura
        </div>
      </div>

      <Image
        src={
          "https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png"
        }
        alt="baldurs gate"
        className="aspect-square mt-8"
        isBlurred
      />
    </div>
  );
}
