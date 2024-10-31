import { db } from "@/lib/prisma";
import { CreateUserRequestType } from "@/types/request/create-user-request";
import { FindUserBySlugResponseType } from "@/types/response/find-user-by-slug-response";
import { UserResponseType } from "@/types/response/user-response";
import { getPublicURL } from "@/utils/url";
import { UserRepositoryInterface } from "./interfaces/user-interface";
import type { FindTweetsByUserResponseType } from "@/types/response/find-tweets-by-user-response";

export class UserRepository implements UserRepositoryInterface {
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
}
