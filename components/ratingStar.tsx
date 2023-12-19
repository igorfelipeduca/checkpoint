"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface RatingStarProps {
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

export default function RatingStar({
  stars,
  setStars,
  index,
}: RatingStarProps) {
  const [starClicked, setStarClicked] = useState<boolean>(false);

  const changeRating = () => {
    if (index == 0) setStars(1);
    if (index > 0) setStars(index + 1);
    if (stars > 0 && index == 0) setStars(0);

    setStarClicked(true);
  };

  useEffect(() => {
    if (starClicked) {
      setTimeout(() => {
        setStarClicked(false);
      }, 300);
    }
  }, [starClicked]);

  if (stars >= index + 1 && stars != 0) {
    return (
      <Star
        className={`text-indigo-500 fill-indigo-500 h-8 w-8 cursor-pointer transition-all duration-75 ease-soft-spring ${
          starClicked ? "scale-105" : ""
        }`}
        onClick={changeRating}
      />
    );
  }
  return (
    <Star
      className={`fill-zinc-500 text-zinc-500  h-8 w-8 cursor-pointer transition-all duration-75 ease-soft-spring ${
        starClicked ? "scale-105" : ""
      }`}
      onClick={changeRating}
    />
  );
}
