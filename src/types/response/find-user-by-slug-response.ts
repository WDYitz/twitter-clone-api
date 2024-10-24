import type { User } from "@prisma/client";

export interface FindUserBySlugResponseType {
  user: Pick<User, "avatar" | "cover" | "slug" | "name" | "bio" | "link">;
}
