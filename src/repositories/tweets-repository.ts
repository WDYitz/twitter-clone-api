import type { TweetRepositoryInterface } from "./interfaces/tweets-interface";
import { db } from "@/lib/prisma";
import type { FindTweetResponseType } from "@/types/request/find-tweet-request";
import type { GetTweetAnswersResponse } from "@/types/response/get-tweet-answers-response";
import type { Tweet } from "@prisma/client";

export class TweetRepository implements TweetRepositoryInterface {
  async findTweetsByBody(bodyContains: string, currentPage: number, perPage: number): Promise<GetTweetAnswersResponse> {
    const tweets = await db.tweet.findMany({
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
        body: {
          contains: bodyContains,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: currentPage * perPage,
      take: perPage,
    })

    return tweets;
  }
  async findTweetFeed(following: string[], currentPage: number, perPage: number): Promise<GetTweetAnswersResponse> {
    const tweets = await db.tweet.findMany({
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
        userSlug: {
          in: following
        },
        answerOf: 0
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: currentPage * perPage,
      take: perPage,
    })

    return tweets;
  }
  async unlikeTweet(id: number, slug: string): Promise<void> {
    await db.tweetLike.deleteMany({
      where: {
        userSlug: slug,
        tweetId: id
      }
    })
  }
  async likeTweet(id: number, slug: string): Promise<void> {
    await db.tweetLike.create({
      data: {
        userSlug: slug,
        tweetId: id
      }
    })
  }
  async checkIfTweetIsLikedByUser(id: number, slug: string): Promise<boolean> {
    const isLiked = await db.tweetLike.findFirst({
      where: {
        userSlug: slug,
        tweetId: id
      }
    })
    return isLiked ? true : false;
  }
  async findAnswersFromTweet(id: number): Promise<GetTweetAnswersResponse> {
    const tweets = await db.tweet.findMany({
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
        answerOf: id
      }
    })

    return tweets;
  }
  async createTweet(slug: string, body: string, answer?: number): Promise<Tweet> {
    const newTweet = await db.tweet.create({
      data: {
        body,
        userSlug: slug,
        answerOf: answer
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
