"use client";

import { supabase } from "@/app/supabase";
import { Review } from "@/interfaces/review";
import { CheckpointUser } from "@/interfaces/user";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TimelineCardProps {
  review: Review;
}
export default function TimelineCard({ review }: TimelineCardProps) {
  const [user, setUser] = useState<CheckpointUser>();
  const [game, setGame] = useState<any>();

  useEffect(() => {
    supabase.auth.getUser().then((loggedUser) => {
      if (loggedUser.data)
        supabase
          .from("users")
          .select("*")
          .eq("email", loggedUser?.data?.user?.email)
          .then(({ data }) => {
            if (data && data.length) {
              setUser(data[0]);
            }
          });
    });

    axios
      .get(`${process.env.RAWG_BASE_URL}/${review.game_id}` as string, {
        params: {
          key: process.env.RAWG_API_KEY as string,
        },
      })
      .then((response) => {
        setGame(response.data);
      });
  }, []);

  return (
    <Link href={`/review/${review.id}`} className="max-w-4xl">
      <div className="flex items-start gap-x-4">
        <Image
          alt={review?.user?.name as string}
          src="https://t2.tudocdn.net/315004?w=824&h=494"
          className="h-24 w-24 rounded-xl object-cover aspect-square"
        />

        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-br from-zinc-200 to-zinc-400 font-semibold tracking-tight max-w-3xl">
            {review?.review}
          </h1>

          <h3 className="text-md text-zinc-500 flex items-center gap-x-1">
            <span className="text-zinc-300 font-bold">{user?.name} </span> sobre{" "}
            <span className="font-bold text-zinc-300">{game?.name}</span>
          </h3>

          <div className="flex gap-x-2 items-center mt-4">
            {Array.from({ length: review?.stars }).map((_, index) => (
              <Star
                className="h-5 w-5 fill-indigo-500 text-indigo-500"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      <Image
        alt="game"
        className="w-[80rem] h-auto aspect-video rounded-xl mt-8"
        src={
          review.screenshots?.length
            ? review.screenshots[
                Math.floor(Math.random() * review.screenshots.length)
              ]
            : ""
        }
        isBlurred
      />
    </Link>
  );
}
