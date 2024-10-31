import type { TweetRepositoryInterface } from "@/repositories/interfaces/tweets-interface";
import type { CheckIfTweetIsLikedByUserRequestType } from "@/types/request/check-tweet-likes-request";

export class CheckIfTweetIsLikedByUserUseCase {
  constructor(private tweetRepository: TweetRepositoryInterface) { }

  async execute(data: CheckIfTweetIsLikedByUserRequestType): Promise<any> {
    const liked = await this.tweetRepository.checkIfTweetIsLikedByUser(data.id, data.slug);

    if (liked) {
      await this.tweetRepository.unlikeTweet(data.id, data.slug);
    } else {
      await this.tweetRepository.likeTweet(data.id, data.slug);
    }

  }
}
