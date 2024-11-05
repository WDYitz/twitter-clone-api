import { TweetRepository } from "@/repositories/tweets-repository";
import { searchSchema } from "@/schemas/search";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { GetSearchUseCase } from "@/use-cases/getSearch-useCase";
import { Response } from "express";

export const getSearchController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const safeData = searchSchema.safeParse(req.query);

    if (safeData.error) {
      return res.json({ error: safeData.error.flatten().fieldErrors });
    }

    const tweetRepository = new TweetRepository();
    const getSearchUseCase = new GetSearchUseCase(tweetRepository);

    const data = {
      page: safeData.data.page,
      q: safeData.data.q
    }

    const { page, tweets } = await getSearchUseCase.execute(data);

    res.json({ tweets, page })
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar tweets", message: error });
  }
}