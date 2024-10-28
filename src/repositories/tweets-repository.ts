import type { TweetRepositoryInterface } from "./interfaces/tweets-interface";
import { db } from "@/lib/prisma";
import type { FindTweetResponseType } from "@/types/request/find-tweet-request";
import type { Tweet } from "@prisma/client";

export class TweetRepository implements TweetRepositoryInterface {
  async createTweet(slug: string, body: string, answer?: number): Promise<Tweet> {
    const newTweet = await db.tweet.create({
      data: {
        body,
        userSlug: slug,
        answerOf: answer ?? 0
      }
    })
    return newTweet;
  }
  async findTweet(id: number): Promise<FindTweetResponseType> {
    const tweet = await db.tweet.findFirst({
      include: {
        User: {
          select: {
            name: true,
            avatar: true,
            slug: true
          }
        },
        likes: {
          select: {
            userSlug: true
          }
        }
      },
      where: {
        id
      }
    })

    return tweet;
  }
}
