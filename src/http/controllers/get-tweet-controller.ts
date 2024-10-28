import { TweetDoesNotExistError } from "@/error_handler/TweetDoesNotExist";
import { TweetRepository } from "@/repositories/tweets-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { GetTweetUseCase } from "@/use-cases/getTweet-useCase";
import { Response } from "express";

export const getTweetController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID do tweet não informado" });
    }
    
    const tweetRepository = new TweetRepository();
    const getTweetUseCase = new GetTweetUseCase(tweetRepository);

    const tweet = await getTweetUseCase.execute(parseInt(id));

    return res.status(200).json({ tweet });

  } catch (error) {
    if (error instanceof TweetDoesNotExistError) {
      return res.status(404).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro ao buscar tweet", message: error });
  }
};
