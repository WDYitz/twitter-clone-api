import { AccessDeniedError } from "@/error_handler/AccessDenied";
import { CreateUserResponseType } from "@/types/response/create-user-response";
import { UserRepositoryInterface } from "@/repositories/interfaces/user-interface";
import { createJWT } from "@/utils/jwt";
import { compare } from "bcrypt-ts";

interface SigninUseCaseRequest {
  email?: string;
  password?: string;
}

interface SigninUseCaseResponse {
  token: string;
  userData: CreateUserResponseType;
}

export class SigninUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(data: SigninUseCaseRequest): Promise<SigninUseCaseResponse> {
    const userData = await this.userRepository.findUserByEmail(data.email);

    if (!userData) {
      throw new AccessDeniedError();
    }

    const verifyPassword = await compare(data.password, userData.user.password);

    if (!verifyPassword) {
      throw new AccessDeniedError();
    }

    const token = createJWT(userData.user.slug);

    return { token, userData };
  }
}
