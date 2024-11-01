import { CreateUserRequestType } from "@/types/request/create-user-request";
import { CreateUserResponseType } from "@/types/response/create-user-response";
import { FindUserBySlugResponseType } from "@/types/response/find-user-by-slug-response";
import { UserResponseType } from "@/types/response/user-response";
import type { Prisma, Tweet } from "@prisma/client";

export interface UserRepositoryInterface {
  findUserByEmail(email: string): Promise<UserResponseType | null>;
  findUserBySlug(slug: string): Promise<FindUserBySlugResponseType | null>;
  createUser(data: CreateUserRequestType): Promise<CreateUserResponseType>;
  getUserFollowingCount(slug: string): Promise<number>;
  getUserFollowersCount(slug: string): Promise<number>;
  getUserTweetCount(slug: string): Promise<number>;
  findTweetsByUser(slug: string, currentPage: number, perPage: number): Promise<Tweet[]>;
  checkIfFollows(user1Slug: string, user2Slug: string): Promise<boolean>;
  follow(user1Slug: string, user2Slug: string): Promise<void>;
  unfollow(user1Slug: string, user2Slug: string): Promise<void>;
  updateUserInfo(slug: string, data: Prisma.UserUpdateInput): Promise<void>;
}
