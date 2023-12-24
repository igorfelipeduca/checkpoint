"use client";

import Header from "@/components/header";
import TimelineCard from "@/components/timelineCard";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Review } from "@/interfaces/review";

export default function Timeline() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .then(({ data }) => {
        if (data?.length) {
          data.map((review) => {
            supabase
              .from("users")
              .select("*")
              .eq("id", review.user_id)
              .then(({ data: userData }) => {
                if (userData?.length) review.user = userData[0];

                const parsedScreenshots = JSON.parse(review.screenshots);
                const newScreenshots = [];

                for (const screenshot of parsedScreenshots) {
                  const url = `https://yoolmzuipostgxkgksgw.supabase.co/storage/v1/object/public/screenshots/${screenshot}`;

                  newScreenshots.push(url);
                }

                review.screenshots = newScreenshots;

                setReviews((reviews) => [
                  ...reviews.filter((r) => r.id !== review),
                  review,
                ]);
              });
          });
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="py-48 px-16 flex flex-col space-y-16">
        {reviews.map((review, index) => (
          <TimelineCard review={review} key={index} />
        ))}
      </div>
    </div>
  );
}
