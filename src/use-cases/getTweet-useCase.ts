import type { TweetRepositoryInterface } from "@/repositories/interfaces/tweets-interface";
import type { FindTweetResponseType } from "@/types/request/find-tweet-request";
import { TweetDoesNotExistError } from "@/error_handler/TweetDoesNotExist";

export class GetTweetUseCase {
  constructor(private tweetRepository: TweetRepositoryInterface) { }

  async execute(id: number): Promise<FindTweetResponseType | null> {
    const tweet = await this.tweetRepository.findTweet(id);

    if (!tweet) {
      throw new TweetDoesNotExistError();
    }

    return tweet;
  }
}
