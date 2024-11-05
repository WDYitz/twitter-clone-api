import { ErrorFetchingTrendsError } from "@/error_handler/ErrorFetchingTrendsError";
import type { TrendsRepository } from "@/repositories/trends-repository";
import type { GetTrendingResponse } from "@/types/response/get-trending-response";

export class GetTrendsUseCase {
  constructor(private trendRepository: TrendsRepository) { }

  async execute(): Promise<GetTrendingResponse> {
    const trends = await this.trendRepository.getTrending();

    if (!trends) {
      throw new ErrorFetchingTrendsError();
    }

    return trends;
  }
}
