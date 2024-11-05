import type { TweetRepository } from "@/repositories/tweets-repository";
import { getPublicURL } from "@/utils/url";
import type { Tweet } from "@prisma/client";

interface GetSearchUseCaseRequest {
  page: number;
  q: string
}
interface GetSearchUseCaseResponse {
  tweets: Tweet[]
  page: number;
}

export class GetSearchUseCase {
  constructor(private tweetRepository: TweetRepository) { }

  async execute(data: GetSearchUseCaseRequest): Promise<GetSearchUseCaseResponse> {
    let perPage = 2;
    let currentPage = data.page || 0;

    const tweets = await this.tweetRepository.findTweetsByBody(data.q, currentPage, perPage);

    for (let tweetIndex in tweets) {
      tweets[tweetIndex].User.avatar = getPublicURL(tweets[tweetIndex].User.avatar);
    }


    return { tweets, page: currentPage };
  }
}
