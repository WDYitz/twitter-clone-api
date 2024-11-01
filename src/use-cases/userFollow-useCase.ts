import { UserNotFound } from "@/error_handler/UserNotFound";
import type { UserRepositoryInterface } from "@/repositories/interfaces/user-interface";

interface IUserFollowUseCaseRequest {
  slug: string;
  mySlug: string;
}

interface IUserFollowUseCaseResponse {
  following: boolean;
}

export class UserFollowUseCase {
  constructor(private userRepository: UserRepositoryInterface) { }

  async execute(data: IUserFollowUseCaseRequest): Promise<IUserFollowUseCaseResponse> {
    const userExists = await this.userRepository.findUserBySlug(data.slug);

    if (!userExists) {
      throw new UserNotFound();
    }

    const follows = await this.userRepository.checkIfFollows(data.slug, data.mySlug);

    if (!follows) {
      await this.userRepository.follow(data.slug, data.mySlug);
      return { following: true };
    }

    await this.userRepository.unfollow(data.slug, data.mySlug);

    return { following: false };
  }
}
