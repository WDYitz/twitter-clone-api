import { UserNotFound } from "@/error_handler/UserNotFound";
import type { UserRepository } from "@/repositories/user-repository";
import type { GetUserResponseType } from "@/types/response/get-user-response";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(slug: string): Promise<GetUserResponseType> {
    const userSlug = await this.userRepository.findUserBySlug(slug);

    if (!userSlug) {
      throw new UserNotFound();
    }

    const followingCount = await this.userRepository.getUserFollowingCount(userSlug.user.slug);
    const followersCount = await this.userRepository.getUserFollowersCount(userSlug.user.slug);
    const tweetCount = await this.userRepository.getUserTweetCount(userSlug.user.slug);

    const userResponse = {
      avatar: userSlug.user.avatar,
      cover: userSlug.user.cover,
      slug: userSlug.user.slug,
      name: userSlug.user.name,
      bio: userSlug.user.bio,
      link: userSlug.user.link,
    };

    return { user: userResponse, followingCount, followersCount, tweetCount };
  }
}