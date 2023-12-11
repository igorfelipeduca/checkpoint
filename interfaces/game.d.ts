interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

interface Platform {
  id: number;
  name: string;
  slug: string;
  image: null | string;
  year_end: null | number;
  year_start: null | number;
  games_count: number;
  image_background: string;
}

interface PlatformInfo {
  platform: Platform;
  released_at: string;
  requirements_en: null | {
    minimum: string;
    recommended: string;
  };
  requirements_ru: null | {
    minimum: string;
    recommended: string;
  };
}

interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

interface ShortScreenshot {
  id: number;
  image: string;
}

interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedByStatus;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: null | string;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: PlatformInfo[];
  parent_platforms: ParentPlatform[];
  genres: Genre[];
  clip: null | string;
  tags: Tag[];
  esrb_rating: EsrbRating;
  short_screenshots: ShortScreenshot[];
}
