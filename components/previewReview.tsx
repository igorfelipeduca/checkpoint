"use client";

import { Image } from "@nextui-org/react";
import axios from "axios";
import { Gamepad2, StarsIcon, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface PreviewReviewProps {
  game: Game;
}

export default function PreviewReview({ game }: PreviewReviewProps) {
  const [hovering, setHovering] = useState(false);
  const [video, setVideo] = useState<string>("");
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.RAWG_BASE_URL}/games/${game.id}/movies`, {
        params: {
          key: process.env.RAWG_API_KEY,
        },
      })
      .then((response) => {
        if (response.data.results.length) {
          setVideo(response.data.results[0].data[480]);
          setPreview(response.data.results[0].preview);
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    if (hovering) {
      setTimeout(() => {
        setVideoAvailable(true);
      }, 500);
    }

    setVideoAvailable(false);
  }, [hovering]);

  return (
    <div
      className="p-4 rounded-lg border border-zinc-800 bg-zinc-950"
      onMouseEnter={() => {
        setTimeout(() => {
          setHovering(true);
        }, 200);
      }}
      onMouseLeave={() => setHovering(false)}
    >
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

      <div>
        {video && !loading ? (
          <>
            {hovering ? (
              <>
                {videoAvailable ? (
                  <video
                    src={video}
                    className="w-full h-[25.8rem] object-cover mt-4"
                    autoPlay
                    style={{ borderRadius: "5%" }}
                    muted
                  />
                ) : (
                  <Image
                    src={preview}
                    alt="baldurs gate"
                    className="aspect-square mt-8 object-cover w-full h-auto"
                    isBlurred
                  />
                )}
              </>
            ) : (
              <Image
                src={game.background_image}
                alt="baldurs gate"
                className="aspect-square mt-8 object-cover w-full h-auto"
                isBlurred
              />
            )}
          </>
        ) : (
          <Image
            src={game.background_image}
            alt="baldurs gate"
            className="aspect-square mt-8 object-cover w-full h-auto"
            isBlurred
          />
        )}
      </div>
    </div>
  );
}
