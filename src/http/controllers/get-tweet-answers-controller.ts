import { TweetDoesNotExistError } from "@/error_handler/TweetDoesNotExist";
import { TweetRepository } from "@/repositories/tweets-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { GetTweetAnswersUseCase } from "@/use-cases/getTweetAnswers-useCase";
import { Response } from "express";

export const getTweetAnswersController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id || id === null || id === "") {
      return res.status(400).json({ error: "ID do tweet não informado" });
    }

    const tweetRepository = new TweetRepository();
    const getTweetAnswersUseCase = new GetTweetAnswersUseCase(tweetRepository);

    const answers = await getTweetAnswersUseCase.execute(parseInt(id));

    return res.json({ answers })

  } catch (error) {
    if (error instanceof TweetDoesNotExistError) {
      return res.status(404).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro ao buscar tweet", message: error });
  }
};
