import type { User } from "@prisma/client";

export interface GetUserResponseType {
  user: Pick<User, "avatar" | "cover" | "slug" | "name" | "bio" | "link">;
  followingCount: number;
  followersCount: number;
  tweetCount: number;
}