import type { FindTweetsByUserResponseType } from "./find-tweets-by-user-response"

export type  FindTweetsByUserWithPageResponseType = {
  tweets: FindTweetsByUserResponseType;
  page: number;
}