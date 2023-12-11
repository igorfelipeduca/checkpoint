import { supabase } from "@/app/supabase";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Image, Link } from "@nextui-org/react";
import { Gamepad, Plus, Unlink, User } from "lucide-react";

export default function SheetAvatar() {
  const logout = () => {
    supabase.auth.signOut().then(() => window.location.reload());
  };

  return (
    <div className="dark">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            isBlurred
            alt="profile image"
            src={"https://t2.tudocdn.net/315004?w=824&h=494"}
            className="h-10 w-10 rounded-lg object-cover"
          />
        </SheetTrigger>
        <SheetContent className="dark bg-zinc-950 text-white flex flex-col justify-between">
          <div className="flex flex-col gap-y-8 mt-8">
            <div className="bg-black py-2 px-4 rounded-lg w-full border border-zinc-800 flex items-center gap-x-2 transition-all duration-150 hover:text-indigo-500 cursor-pointer">
              <User className="h-5 w-5" /> Your profile
            </div>

            <div className="bg-black py-2 px-4 rounded-lg w-full border border-zinc-800 flex items-center gap-x-2 transition-all duration-150 hover:text-indigo-500 cursor-pointer">
              <Gamepad className="h-5 w-5" /> Games
            </div>

            <Link
              href={"/create"}
              className="bg-indigo-700 py-2 px-4 rounded-lg w-full border border-indigo-800 text-white flex items-center gap-x-2 transition-all duration-150 cursor-pointer text-md hover:bg-indigo-800"
            >
              <Plus className="h-5 w-5" /> Something new?
            </Link>
          </div>

          <button
            className="py-2 px-4 bg-red-700 text-white rounded-lg flex items-center gap-x-2 justify-center"
            onClick={logout}
          >
            <Unlink className="h-5 w-5" /> Leave
          </button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
