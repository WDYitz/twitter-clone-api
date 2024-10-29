import type { TweetRepositoryInterface } from "@/repositories/interfaces/tweets-interface";
import { TweetDoesNotExistError } from "@/error_handler/TweetDoesNotExist";
import type { GetTweetAnswersResponse } from "@/types/response/get-tweet-answers-response";
import { getPublicURL } from "@/utils/url";

export class GetTweetAnswersUseCase {
  constructor(private tweetRepository: TweetRepositoryInterface) { }

  async execute(id: number): Promise<GetTweetAnswersResponse> {
    const tweets = await this.tweetRepository.findAnswersFromTweet(id);

    if (!tweets) {
      throw new TweetDoesNotExistError();
    }

    for (let tweet in tweets) {
      tweets[tweet].User.avatar = getPublicURL(tweets[tweet].User.avatar)
    }

    return tweets;
  }
}
