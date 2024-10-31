import { TweetRepository } from "@/repositories/tweets-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { CheckIfTweetIsLikedByUserUseCase } from "@/use-cases/checkTweetLikedByUser-useCase";
import { Response } from "express";

export const checkIfTweetIsLikedByUserController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const tweetRepository = new TweetRepository();
    const checkIfTweetIsLikedByUser = new CheckIfTweetIsLikedByUserUseCase(tweetRepository);

    const data = {
      id: parseInt(id),
      slug: req.userSlug
    }

    await checkIfTweetIsLikedByUser.execute(data)

    res.status(200).json({});

  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao dar like nesse tweet", message: error }); 
  }
};
