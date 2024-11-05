import { TweetRepository } from "@/repositories/tweets-repository";
import { UserRepository } from "@/repositories/user-repository";
import { feedSchema } from "@/schemas/feed";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { GetFeedUseCase } from "@/use-cases/getFeed-useCase";
import { Response } from "express";

export const getFeedController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const safeData = feedSchema.safeParse(req.query);

    if (safeData.error) {
      return res.json({ error: safeData.error.flatten().fieldErrors });
    }

    const tweetRepository = new TweetRepository();
    const userRepository = new UserRepository();
    const getFeedUseCase = new GetFeedUseCase(tweetRepository, userRepository);

    const data = {
      slug: req.userSlug,
      page: safeData.data.page,
    }

    const { page, tweets } = await getFeedUseCase.execute(data);


    res.json({ tweets, page })
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar feed", message: error });
  }
}