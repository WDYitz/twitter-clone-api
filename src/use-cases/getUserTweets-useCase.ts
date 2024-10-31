import { UserTweetsCouldNotBeFound } from "@/error_handler/UserTweetsCouldNotBeFound";
import type { UserRepository } from "@/repositories/user-repository";
import type { FindTweetsByUserWithPageResponseType } from "@/types/response/find-tweets-by-user-with-page-response";

export class GetUserTweetsUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(slug: string, page: number): Promise<FindTweetsByUserWithPageResponseType> {
    // NUMERO DE TWEETS POR PAGINA
    let perPage = 10;
    let currentPage = page ?? 0;

    const tweets = await this.userRepository.findTweetsByUser(slug, currentPage, perPage);

    if (!tweets) {
      throw new UserTweetsCouldNotBeFound();
    }

    return { tweets, page: currentPage };
  }
}