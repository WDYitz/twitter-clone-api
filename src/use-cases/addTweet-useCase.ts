import { TweetDoesNotExistError } from "@/error_handler/TweetDoesNotExist";
import type { TweetRepositoryInterface } from "@/repositories/interfaces/tweets-interface";
import type { TrendsRepository } from "@/repositories/trends-repository";
import type { AddTweetRequestType } from "@/types/request/add-tweet-request";
import type { FindTweetResponseType } from "@/types/request/find-tweet-request";
import { getPublicURL } from "@/utils/url";
import type { Tweet } from "@prisma/client";

export class AddTweetUseCase {
  constructor(private tweetRepository: TweetRepositoryInterface, private trendsRepository: TrendsRepository) { }

  async execute(data: AddTweetRequestType): Promise<Tweet | FindTweetResponseType> {

    if (data.answer) {
      const tweet = await this.tweetRepository.findTweet(parseInt(data.answer));
      if (!tweet) {
        throw new TweetDoesNotExistError();
      }
      tweet.User.avatar = getPublicURL(tweet.User.avatar);
    }

    const newTweet = await this.tweetRepository.createTweet(data.userSlug, data.body, data.answer ? parseInt(data.answer) : 0);

    const hashtags = data.body.match(/#[a-zA-Z0-9_]+/g);
    if (hashtags) {
      for (let hashtag of hashtags) {
        if (hashtag.length >= 2) {
          const hasHashtag = await this.trendsRepository.findHashtag(hashtag);
          if (hasHashtag) {
            await this.trendsRepository.updateHashtag(hasHashtag.id, hasHashtag.counter + 1);
          } else {
            await this.trendsRepository.createHashtag(hashtag);
          }
        }
      }
    }

    return newTweet;
  }
}
