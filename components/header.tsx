import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  return (
    <div
      className={`py-4 w-full bg-black text-white px-32 flex justify-between items-center ${inter.className}`}
    >
      <h1 className="text-lg font-black text-white uppercase mr-16">
        Checkpoint
      </h1>

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

      <div className="py-2 px-4 rounded-lg bg-gradient-to-b from-zinc-black to-zinc-950 text-zinc-300 border border-indigo-700 shadow-sm text-sm transition-all duration-150 hover:bg-gray-950 cursor-pointer hover:ring-1 hover:ring-zinc-500">
        Create your account
      </div>
    </div>
  );
}
