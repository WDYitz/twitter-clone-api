import { TweetDoesNotExistError } from "@/error_handler/TweetDoesNotExist";
import { TrendsRepository } from "@/repositories/trends-repository";
import { TweetRepository } from "@/repositories/tweets-repository";
import { addTweetSchema } from "@/schemas/addTweet-schema";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { AddTweetUseCase } from "@/use-cases/addTweet-useCase";
import { Response } from "express";

export const addTweetController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const safeData = addTweetSchema.safeParse(req.body);

    if (safeData.error) {
      return res.json({ error: safeData.error.flatten().fieldErrors });
    }

    const tweetRepository = new TweetRepository();
    const trendsRepository = new TrendsRepository();
    const addTweetUseCase = new AddTweetUseCase(tweetRepository, trendsRepository);

    const data = {
      userSlug: req.userSlug,
      body: safeData.data.body,
      answer: safeData.data.answer,
    };

    const newTweet = await addTweetUseCase.execute(data);

    return res.json({ tweet: newTweet })

  } catch (error) {
    if (error instanceof TweetDoesNotExistError) {
      return res.status(404).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro ao criar tweet", message: error });
  }
};
