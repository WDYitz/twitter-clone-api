import type { Prisma } from "@prisma/client";

export interface CreateUserResponseType {
  user: Prisma.UserCreateInput;
}
