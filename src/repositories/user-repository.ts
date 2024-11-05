import { db } from "@/lib/prisma";
import { CreateUserRequestType } from "@/types/request/create-user-request";
import type { FindTweetsByUserResponseType } from "@/types/response/find-tweets-by-user-response";
import { FindUserBySlugResponseType } from "@/types/response/find-user-by-slug-response";
import { UserResponseType } from "@/types/response/user-response";
import type { SuggestionsType } from "@/types/SuggestionsType";
import { getPublicURL } from "@/utils/url";
import type { Prisma } from "@prisma/client";
import { UserRepositoryInterface } from "./interfaces/user-interface";


export class UserRepository implements UserRepositoryInterface {
  async getUserSuggestions(following: string[]): Promise<SuggestionsType[]> {
    const suggestions: SuggestionsType[] = await db.$queryRaw`
      SELECT name, avatar, slug 
      FROM "User"
      WHERE slug NOT IN (${following.join(',')}) 
      ORDER BY RANDOM() 
      LIMIT 5
    `

    return suggestions;
  }
  async updateUserInfo(slug: string, data: Prisma.UserUpdateInput): Promise<void> {
    await db.user.update({
      where: {
        slug
      },
      data
    })
  }
  async follow(user1Slug: string, user2Slug: string): Promise<void> {
    await db.follow.create({
      data: {
        user1Slug,
        user2Slug
      }
    })
  }
  async unfollow(user1Slug: string, user2Slug: string): Promise<void> {
    await db.follow.deleteMany({
      where: {
        user1Slug,
        user2Slug
      }
    })
  }
  async checkIfFollows(user1Slug: string, user2Slug: string): Promise<boolean> {
    const follows = await db.follow.findFirst({
      where: {
        user1Slug,
        user2Slug
      }
    })

    return follows ? true : false
  }
  async findTweetsByUser(slug: string, currentPage: number, perPage: number): Promise<FindTweetsByUserResponseType> {
    const tweets = await db.tweet.findMany({
      include: {
        likes: {
          select: {
            userSlug: true
          }
        }
      },
      where: {
        userSlug: slug, answerOf: 0
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: currentPage * perPage,
      take: perPage
    })
    return tweets
  }
  async getUserTweetCount(slug: string): Promise<number> {
    const count = await db.tweet.count({
      where: {
        userSlug: slug
      }
    })

    return count
  }
  async getUserFollowersCount(slug: string): Promise<number> {
    const count = await db.follow.count({
      where: { user2Slug: slug }
    })

    return count
  }
  async getUserFollowingCount(slug: string): Promise<number> {
    const count = await db.follow.count({
      where: { user1Slug: slug }
    })

    return count
  }
  async findUserByEmail(email: string): Promise<UserResponseType | null> {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return {
        user: {
          ...user,
          avatar: getPublicURL(user.avatar),
          cover: getPublicURL(user.cover),
        },
      };
    }

    return null;
  }
  async findUserBySlug(
    slug: string
  ): Promise<FindUserBySlugResponseType | null> {
    const user = await db.user.findFirst({
      select: {
        avatar: true,
        cover: true,
        slug: true,
        name: true,
        bio: true,
        link: true,
      },
      where: {
        slug,
      },
    });

    if (user) {
      return {
        user: {
          ...user,
          avatar: getPublicURL(user.avatar),
          cover: getPublicURL(user.cover),
        },
      };
    }

    return null;
  }
  async createUser(data: CreateUserRequestType): Promise<UserResponseType> {
    const newUser = await db.user.create({ data });

    return {
      user: {
        ...newUser,
        avatar: getPublicURL(newUser.avatar),
        cover: getPublicURL(newUser.cover),
      },
    };
  }
  async getUserFollowing(slug: string): Promise<string[]> {
    const following = [];
    const reqFollow = await db.follow.findMany({
      where: { user1Slug: slug },
      select: { user2Slug: true }
    });

    for (let reqItem of reqFollow) {
      following.push(reqItem.user2Slug)
    }

    return following
  }
}
