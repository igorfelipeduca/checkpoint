import { CheckpointUser } from "./user";

export interface Review {
  id: number;
  game_id: number;
  stars: number;
  screenshots: string[];
  review: string;
  user: CheckpointUser;
}
