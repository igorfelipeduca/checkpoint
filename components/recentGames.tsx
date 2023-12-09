"use client";

import { Game } from "@/interfaces/game";
import { useEffect, useState } from "react";
import axios from "axios";
import PreviewReview from "./previewReview";

export default function RecentGames() {
  const [games, setGames] = useState<Game[]>([]);

  const data =
    "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;";

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.igdb.com/v4/gamesac",
    headers: {
      "Client-ID": "8f250dliy2g5m92nng3ed1m3gj9jix",
      Authorization: "Bearer m4vi3hwx1p1dqebb3e11y4dq8i1t8s",
      Accept: "application/json",
      "Content-Type": "text/plain",
      Cookie:
        "__cf_bm=0n5sHe3L9OZ3zHQHjBJEOFDl4fF307oRhHP4wEoLi5k-1702090261-0-AQJNy5VpHr5etr7wNyNjOPmVEpLJ+tQi2s9YDIZwJ5qH/8MHshAs0ShNY7fQSTb/NVUautqT3mwfLIV58hzjkrM=",
    },
    data: data,
  };

  useEffect(() => {
    try {
      axios.post(`https://api.igdb.com/v4/gamesac`, config).then((data) => {
        setGames(data.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="grid grid-cols-3 gap-x-4">
      {games.map((game, index) => (
        <PreviewReview key={index} />
      ))}
    </div>
  );
}
