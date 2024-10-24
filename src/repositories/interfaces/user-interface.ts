import { CreateUserRequestType } from "@/types/request/create-user-request";
import { CreateUserResponseType } from "@/types/response/create-user-response";
import { FindUserBySlugResponseType } from "@/types/response/find-user-by-slug-response";
import { UserResponseType } from "@/types/response/user-response";

export interface UserRepositoryInterface {
  findUserByEmail(email: string): Promise<UserResponseType | null>;
  findUserBySlug(slug: string): Promise<FindUserBySlugResponseType | null>;
  createUser(data: CreateUserRequestType): Promise<CreateUserResponseType>;
}
