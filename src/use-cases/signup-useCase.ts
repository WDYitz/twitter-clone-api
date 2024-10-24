import { EmailAlreadyExistsError } from "@/error_handler/EmailAlreadyExistsError";
import { CreateUserResponseType, UserRepositoryInterface } from "@/repositories/interfaces/user-interface";
import { createJWT } from "@/utils/jwt";
import { hash } from "bcrypt-ts";
import Slug from "slug";

interface SignupUseCaseRequest {
  name: string,
  email: string,
  password: string
}

interface SignupUseCaseResponse {
  token: string,
  newUser: CreateUserResponseType
}

export class SignupUseCase {
  constructor(private userRepository: UserRepositoryInterface) { }

  async execute({ email, name, password }: SignupUseCaseRequest): Promise<SignupUseCaseResponse> {
    const hasEmail = await this.userRepository.findUserByEmail(email);

    if (hasEmail) {
      throw new EmailAlreadyExistsError();
    }

    let generateSlug = true;
    let userSlug = Slug(name);
    while (generateSlug) {
      const hasSlug = await this.userRepository.findUserBySlug(userSlug);
      if (hasSlug) {
        let slugSuffix = Math.floor(Math.random() * 999999).toString();
        userSlug = Slug(name + slugSuffix);
      } else {
        generateSlug = false;
      }
    }

    const hashPassword = await hash(password, 10);

    const newUser = await this.userRepository.createUser({
      slug: userSlug,
      name,
      email,
      password: hashPassword,
    });

    const token = createJWT(userSlug);

    return { token, newUser };
  }
}