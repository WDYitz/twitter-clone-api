import type { UserRepository } from "@/repositories/user-repository";
import { getPublicURL } from "@/utils/url";

export class GetSuggestionsUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(slug: string): Promise<any> {
    const following = await this.userRepository.getUserFollowing(slug);
    const followingPlusMe = [...following, slug];
    
    const suggestions = await this.userRepository.getUserSuggestions(followingPlusMe);

    for (let sugIndex in suggestions) {
      suggestions[sugIndex].avatar = getPublicURL(suggestions[sugIndex].avatar);
    }

    return suggestions;
  }
}
