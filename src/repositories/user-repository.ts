import { db } from "@/lib/prisma";
import { getPublicURL } from "@/utils/url";
import { UserRepositoryInterface } from "./interfaces/user-interface";
import { UserResponseType } from "@/types/response/user-response";
import { CreateUserRequestType } from "@/types/request/create-user-request";
import { FindUserBySlugResponseType } from "@/types/response/find-user-by-slug-response";

export class UserRepository implements UserRepositoryInterface {
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
