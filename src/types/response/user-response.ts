import { Prisma, User } from "@prisma/client";

// interfaces contract response types
export interface UserResponseType {
  user: User;
}