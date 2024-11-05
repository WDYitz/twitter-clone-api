import type { TweetRepositoryInterface } from "@/repositories/interfaces/tweets-interface";
import type { TweetRepository } from "@/repositories/tweets-repository";
import type { UserRepository } from "@/repositories/user-repository";
import type { AddTweetRequestType } from "@/types/request/add-tweet-request";
import type { FindTweetResponseType } from "@/types/request/find-tweet-request";
import { getPublicURL } from "@/utils/url";
import type { Tweet } from "@prisma/client";

interface GetFeedUseCaseRequest {
  page: number;
  slug: string;
}

interface GetFeedUseCaseResponse {
  tweets: Tweet[];
  page: number
}

export class GetFeedUseCase {
  constructor(private tweetRepository: TweetRepository, private userRepository: UserRepository) { }

  async execute(data: GetFeedUseCaseRequest): Promise<GetFeedUseCaseResponse> {
    let perPage = 2;
    let currentPage = data.page || 0;

    const following = await this.userRepository.getUserFollowing(data.slug);

    const tweets = await this.tweetRepository.findTweetFeed(following, currentPage, perPage);

    for (let tweetIndex in tweets) {
      tweets[tweetIndex].User.avatar = getPublicURL(tweets[tweetIndex].User.avatar);
    }

    return { tweets, page: currentPage };
  }
}
