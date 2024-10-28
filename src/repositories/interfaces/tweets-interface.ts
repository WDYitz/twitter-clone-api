import type { FindTweetResponseType } from "@/types/request/find-tweet-request";
import type { Tweet } from "@prisma/client";

export interface TweetRepositoryInterface {
  findTweet(id: number): Promise<FindTweetResponseType | null>;
  createTweet(slug: string, body: string, answer?: number): Promise<Tweet>;
}