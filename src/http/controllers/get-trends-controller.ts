import { ErrorFetchingTrendsError } from "@/error_handler/ErrorFetchingTrendsError";
import { TrendsRepository } from "@/repositories/trends-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { GetTrendsUseCase } from "@/use-cases/getTrends-useCase";
import { Response } from "express";

export const getTrendsController = async (_req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const trendsRepository = new TrendsRepository();
    const getTrendsUseCase = new GetTrendsUseCase(trendsRepository);

    const trends = await getTrendsUseCase.execute();

    res.json({ trends })
  } catch (error) {
    if (error instanceof ErrorFetchingTrendsError) {
      return res
        .status(404)
        .json({ message: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro ao buscar os trends", message: error });
  }
}