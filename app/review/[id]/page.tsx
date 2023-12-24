"use client";

import { supabase } from "@/app/supabase";
import Header from "@/components/header";
import { Review } from "@/interfaces/review";
import { SupabaseReview } from "@/interfaces/supabaseReview";
import { CheckpointUser } from "@/interfaces/user";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TwitterShareButton } from "react-share";
import { BsTwitterX } from "react-icons/bs";

interface ReviewProps {
  params: {
    id: string;
  };
}

export default function Review(props: ReviewProps) {
  const [user, setUser] = useState<CheckpointUser>();
  const [review, setReview] = useState<SupabaseReview>();
  const [game, setGame] = useState<Game>();
  const [screenshots, setScreenshots] = useState<string[]>([]);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .eq("id", props.params.id)
      .then(({ data }) => {
        if (data && data.length) {
          setReview(data[0]);
        }
      });

    supabase.auth.getUser().then((loggedUser) => {
      if (!loggedUser.data.user) return (window.location.href = `/login`);

      if (loggedUser.data) {
        supabase
          .from("users")
          .select("*")
          .eq("email", loggedUser?.data?.user?.email)
          .then(({ data }) => {
            if (data && data.length) setUser(data[0]);
          });
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.RAWG_BASE_URL}/${review?.game_id}` as string, {
        params: {
          key: process.env.RAWG_API_KEY as string,
        },
      })
      .then((response) => {
        setGame(response.data);
      });

    if (review?.screenshots.length) {
      const parsedScreenshots = JSON.parse(review?.screenshots as string);
      const newScreenshots = [];

      if (parsedScreenshots.length) {
        for (const screenshot of parsedScreenshots) {
          const url = `https://yoolmzuipostgxkgksgw.supabase.co/storage/v1/object/public/screenshots/${screenshot}`;
          newScreenshots.push(url);
        }

        setScreenshots(newScreenshots);
      }
    }
  }, [review]);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-48 pb-16 px-16">
        <h1 className="bg-clip-text text-transparent text-3xl bg-gradient-to-br from-zinc-200 to-zinc-400 font-semibold">
          {review?.review}
        </h1>

        <div className={"w-full flex items-top justify-between"}>
          <div>
            {game && (
              <h3 className="text-zinc-400 text-lg font-medium mt-2">
                Review sent by{" "}
                <Link
                  href={"/profile"}
                  className="font-semibold text-zinc-300 hover:underline"
                >
                  {user?.name}
                </Link>{" "}
                about{" "}
                <span className="text-zinc-300 font-semibold">
                  {game?.name}
                </span>
              </h3>
            )}
          </div>

          <TwitterShareButton
            title={`${review?.review} - ${user?.name} at Checkpoint`}
            hashtags={[
              "checkpoint",
              `${game?.name.replace(" ", "").toLowerCase()}`,
            ]}
            url={window.location.href}
            style={{
              background: "#00000",
              color: "white",
              border: "1px solid #3f3f46",
              paddingLeft: 20,
              paddingRight: 20,
              padding: "8px",
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Share with <BsTwitterX className={"ml-2"} />
          </TwitterShareButton>
        </div>

        <div className="flex gap-x-2 items-center mt-2">
          {Array.from({ length: review?.stars || 0 }).map((_, index) => (
            <Star
              className="h-8 w-8 fill-indigo-500 text-indigo-500"
              key={index}
            />
          ))}
        </div>

        <p className="text-lg my-4 font-regular text-zinc-400">
          {review?.text}
        </p>

        <div className="grid grid-cols-2 gap-x-4 mt-16">
          {screenshots?.length &&
            screenshots?.map((screenshot, index) => (
              <Image
                src={screenshot}
                alt={screenshot}
                className="object-cover rounded-xl"
                key={index}
                isBlurred
              />
            ))}
        </div>

        <div className="mt-16">
          <h1 className="bg-clip-text text-2xl bg-gradient-to-br text-transparent from-zinc-200 to-zinc-500 font-bold">
            {game?.name}
          </h1>

          <p className="text-lg mt-4 font-regular text-zinc-500">
            {game?.description_raw}
          </p>
        </div>
      </div>
    </div>
  );
}
